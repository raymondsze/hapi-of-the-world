/* 
* @Author: Sze Ka Wai Raymond (FakeC)
* @Date:   2015-12-30 02:11:09
* @Last Modified by:   Sze Ka Wai Raymond (FakeC)
* @Last Modified time: 2016-01-24 03:06:21
*/

import util from 'util';
import _ from 'lodash';
import Joi from 'joi';
import JoiObjectId from 'joi-objectid';
import Boom from 'boom';
import Document from '../models/document';

import {validators as AuthValidators} from './auth';

Joi.objectId = JoiObjectId(Joi);

const Errors = {
	userNotFound: 'Unable to find the user.',
	userListNotFound: 'Unable to retrieve user list.',
	unableToUpdateOtherUser: 'Do not have permission to perform this action',
	emailDuplicated: 'The email address %s is already used by others.'
};

export {Errors as errors};

const Validators = {
	documentId: Joi.objectId().description('The document id stored in database'),
	title: Joi.string().min(1).description('The title'),
	content: Joi.string().min(1).description('The content'),
	predicate: Joi.string().default('{}').description('The predicate used to search, same format as predicated used in Mongoose.find'),
	sort: Joi.string().default('{}').description('The predicate used to sort, same format as predicated used in Mongoose.sort'),
	page: Joi.number().integer().min(1).default(1).description('The page number to query'),
	pageSize: Joi.number().integer().min(1).max(20).default(20).description('The number of records in a page')
};

export {Validators as validators};

export default {
	createOne: {
		auth: 'jwt',
		tags: ['document', 'api'],
		description: 'Create a document.',
		validate: {
			payload: {
				title: Validators.title.required(),
				content: Validators.content.required()
			},
			headers: Joi.object({
				authorization: AuthValidators.authorization
			}).unknown()
		},
		handler: {
			async: async function (request, reply) {
				const userId = request.auth.credentials.userId;
				const doc = new Document(_.merge(request.payload, {
					createdBy: userId
				}));
				const result = await doc.save();
				return reply(result.toObject());
			}
		}
	},
	read: {
		auth: false,
		tags: ['document', 'api'],
		description: 'Read a list of document',
		validate: {
			query: {
				page: Validators.page.optional(),
				pageSize: Validators.pageSize.optional(),
				predicate: Validators.predicate.optional(),
				sort: Validators.sort.optional()
			}
		},
		handler: {
			async: async function (request, reply) {
				const predicate = JSON.parse(request.query.predicate);
				const sort = JSON.parse(request.query.sort);
				const page = request.query.page;
				const pageSize = request.query.pageSize;

				const result = await Document.find(predicate).sort(sort).skip((page - 1) * pageSize).limit(pageSize).exec();
				if (!result) {
					throw Boom.notFound(Errors.documentListNotFound);
				}
				reply(_.map(result, doc => doc.toObject()));
			}
		}
	},
	readOne: {
		auth: false,
		tags: ['document', 'api'],
		description: 'Read a document.',
		validate: {
			params: {
				documentId: Validators.documentId.required()
			}
		},
		handler: {
			async: async function (request, reply) {
				const result = await Document.findById(request.params.documentId).exec();
				if (!result) {
					throw Boom.notFound(util.format(Errors.documentNotFound, request.params.documentId));
				}
				reply(result);
			}
		}
	},
	updateOne: {
		auth: 'jwt',
		tags: ['document', 'api'],
		description: 'Update a document.',
		validate: {
			payload: {
				title: Validators.title.optional(),
				content: Validators.content.optional()
			},
			params: {
				documentId: Validators.documentId.required()
			},
			headers: Joi.object({
				authorization: AuthValidators.authorization
			}).unknown()
		},
		handler: {
			async: async function (request, reply) {
				const userId = request.auth.credentials.userId;
				const existingDocument = await Document.findById(request.params.documentId).exec();
				if (!existingDocument) {
					throw Boom.notFound(util.format(Errors.documentNotFound));
				}
				if (existingDocument.createdBy !== userId) {
					throw Boom.unauthorized(util.format(Errors.notAuthor));
				}
				await existingDocument.update(request.payload);
				const result = await Document.findById(request.params.documentId).exec();
				return reply(result.toObject());
			}
		}
	},
	deleteOne: {
		auth: 'jwt',
		tags: ['user', 'api'],
		description: 'Delete a user.',
		plugins: {
			hapiAuthorization: {role: 'ADMIN'}
		},
		validate: {
			params: {
				documentId: Validators.documentId.required()
			},
			headers: Joi.object({
				authorization: AuthValidators.authorization
			}).unknown()
		},
		handler: {
			async: async function (request, reply) {
				const userId = request.auth.credentials.userId;
				const existingDocument = await Document.findById(request.params.documentId).exec();
				if (!existingDocument) {
					throw Boom.notFound(util.format(Errors.documentNotFound));
				}
				if (existingDocument.createdBy !== userId) {
					throw Boom.unauthorized(util.format(Errors.notAuthor));
				}
				const result = await existingDocument.remove();
				return reply(result.toObject());
			}
		}
	}
};
