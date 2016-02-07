/* 
* @Author: Sze Ka Wai Raymond (FakeC)
* @Date:   2015-12-30 02:11:09
* @Last Modified by:   Sze Ka Wai Raymond (FakeC)
* @Last Modified time: 2016-02-07 18:19:55
*/

import util from 'util';
import _ from 'lodash';
import Joi from 'joi';
import JoiObjectId from 'joi-objectid';
import Boom from 'boom';
import bcrypt from 'bcrypt';

import config from '../config';
import User from '../models/user';

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
	userId: Joi.objectId().description('The user id stored in database'),
	username: Joi.string().alphanum().min(8).max(20).description('The user name'),
	password: Joi.string().regex(/^[a-zA-Z0-9]{8,30}$/).description('The user password'),
	email: Joi.string().email().description('The user email address'),
	role: Joi.string().default('USER').description('The role of user'),
	predicate: Joi.string().default('{}').description('The predicate used to search, same format as predicated used in Mongoose.find'),
	sort: Joi.string().default('{}').description('The predicate used to sort, same format as predicated used in Mongoose.sort'),
	page: Joi.number().integer().min(1).default(1).description('The page number to query'),
	pageSize: Joi.number().integer().min(1).max(20).default(20).description('The number of records in a page')
};

export {Validators as validators};

export default {
	createOne: {
		auth: false,
		tags: ['user', 'api'],
		description: 'Register a new user.',
		validate: {
			payload: {
				username: Validators.username.required(),
				password: Validators.password.required(),
				email: Validators.email.required(),
				role: Validators.role.required()
			}
		},
		handler: {
			async: async function (request, reply) {
				const existingUser = await User.findOne({email: request.payload.email}).exec();
				if (existingUser) {
					throw Boom.forbidden(util.format(Errors.emailDuplicated, request.payload.email));
				}
				const validateResult = Joi.any().valid(config.acl.roles).validate(request.payload.role);
				if (!validateResult.error) {
					const user = new User(request.payload);
					const result = await user.save();
					return reply(result.toObject());
				}
				throw Boom.forbidden(validateResult.error);
			}
		}
	},
	read: {
		auth: false,
		tags: ['user', 'api'],
		description: 'Read a list of user',
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

				const result = await User.find(predicate).sort(sort).skip((page - 1) * pageSize).limit(pageSize).exec();
				if (!result) {
					throw Boom.notFound(Errors.userListNotFound);
				}
				reply(_.map(result, user => user.toObject()));
			}
		}
	},
	readOne: {
		auth: false,
		tags: ['user', 'api'],
		description: 'Read a user.',
		validate: {
			params: {
				userId: Validators.userId.required()
			}
		},
		handler: {
			async: async function (request, reply) {
				const result = await User.findById(request.params.userId).exec();
				if (!result) {
					throw Boom.notFound(util.format(Errors.userNotFound, request.params.userId));
				}
				reply(result.toObject());
			}
		}
	},
	updateOne: {
		auth: 'jwt',
		tags: ['user', 'api'],
		description: 'Update a user.',
		validate: {
			payload: {
				username: Validators.username.optional(),
				password: Validators.password.optional(),
				email: Validators.email.optional(),
				role: Validators.role.optional()
			},
			params: {
				userId: Validators.userId.required()
			},
			headers: Joi.object({
				authorization: AuthValidators.authorization
			}).unknown()
		},
		handler: {
			async: async function (request, reply) {
				const {role, userId} = request.auth.credentials;
				if (role !== 'ADMIN' && userId !== request.params.userId) {
					throw Boom.forbidden(Errors.unableToUpdateOtherUser);
				}
				const existingUser = await User.findById(request.params.userId).exec();
				if (!existingUser) {
					throw Boom.notFound(util.format(Errors.userNotFound, request.params.userId));
				}
				await existingUser.update(request.payload);
				const result = await User.findById(request.params.userId).exec();
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
				userId: Validators.userId.required()
			},
			headers: Joi.object({
				authorization: AuthValidators.authorization
			}).unknown()
		},
		handler: {
			async: async function (request, reply) {
				const existingUser = await User.findById(request.params.userId).exec();
				if (!existingUser) {
					throw Boom.notFound(util.format(Errors.userNotFound, request.params.userId));
				}
				const result = await existingUser.remove();
				return reply(result.toObject());
			}
		}
	}
};
