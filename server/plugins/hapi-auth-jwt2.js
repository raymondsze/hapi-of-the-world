/* 
* @Author: Sze Ka Wai Raymond (FakeC)
* @Date:   2016-01-01 03:13:36
* @Last Modified by:   Sze Ka Wai Raymond (FakeC)
* @Last Modified time: 2016-01-22 01:41:26
*/
// This plugin is used to enabled token authentication for user
import HapiAuthJWT2 from 'hapi-auth-jwt2';
import _ from 'lodash';
import Boom from 'boom';
import config from '../config';

export default {
	plugin: {
		register: HapiAuthJWT2
	},
	next: function (server, error) {
		if (error) {
			server.log(['error'], 'Fail to install plugin: hapi-auth-jwt2...');
		}
		server.auth.strategy('jwt', 'jwt', true, _.merge({}, config.auth, {
			/**
			 * Validate the decoded session, compare it with the session stored in redis cache
			 * @param  {object}   decoded decoded session
			 * @param  {object}   request request
			 * @param  {Function} next    next callback
			 * @return {object} session subject, it could be accessed by request.auth.credential       
			 */
			validateFunc: function (decoded, request, next) {
				const asyncFunc = async function () {
					const invalidTokenError = Boom.unauthorized('Token is invalid or expired. Please login again.');
					// the request.server.methods.session is to obtain cached session in server
					// subject is not provided, if not exist in cache, the subject would be empty object.
					const session = await request.server.methodsAsync.session(decoded.id);
					if (decoded.userId === session.userId) {
						// if the session exist, continue to next
						return session.subject;
					}
					throw Error(invalidTokenError);
				};
				asyncFunc().then(result => {
					next(null, true, result);
				}).catch(err => {
					next(null, false);
				});
			}
		}));
		server.log(['info'], 'Installed plugin: hapi-auth-jwt2.');
	}
};
