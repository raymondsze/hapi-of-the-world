/* 
* @Author: Sze Ka Wai Raymond (FakeC)
* @Date:   2016-01-03 01:11:04
* @Last Modified by:   Sze Ka Wai Raymond (FakeC)
* @Last Modified time: 2016-02-05 14:25:21
*/

import _ from 'lodash';
import JWT from 'jsonwebtoken';
import config from '../config';

export default [
	{
		name: 'session',
		/**
		 * To obtain session from redis cache if exists, else create a new one.
		 * @param  {string}   id      session id
		 * @param  {object}   session session subject
		 * @return {object}           session
		 */
		method: async function (id, session) {
			if (_.isUndefined(session)) {
				throw Error('Token is invalid or expired.');
			}
			return session;
		},
		options: {
			cache: {
				cache: 'redis',
				expiresIn: 7 * 24 * 60 * 1000,
				segment: 'session',
				generateTimeout: 100
			},
			generateKey: function (id) {
				return id;
			}
		}
	},
	{
		name: 'sign',
		/**
		 * To sign and obtain the token using sign options defined by configuration
		 * @param  {string}   session session object
		 * @return {string}           token
		 */
		method: async function (session) {
			const token = JWT.sign(session, config.auth.key, config.auth.signOptions || {});
			return token;
		}
	},
	{
		name: 'verify',
		/**
		 * To verify token and obtain the decoded session
		 * @param  {string}   token token
		 * @param  {Function} next  next callback
		 * @return {object}         session object
		 */
		method: async function (token) {
			const decoded = JWT.verify(token, config.auth.key, config.auth.verifyOptions || {});
			return decoded;
		}
	}
];
