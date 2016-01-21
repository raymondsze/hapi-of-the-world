/* 
* @Author: Sze Ka Wai Raymond (FakeC)
* @Date:   2016-01-01 03:09:59
* @Last Modified by:   Sze Ka Wai Raymond (FakeC)
* @Last Modified time: 2016-01-21 05:09:18
*/
// This plugin is used to enabled role based acl
import HapiAuthorization from 'hapi-authorization';
import config from '../config';

export default {
	plugin: {
		register: HapiAuthorization,
		options: config.acl
	},
	next: function (server, error) {
		if (error) {
			server.log(['error'], 'Fail to install plugin: hapi-authorization...');
		}
		server.log(['info'], 'Installed plugin: hapi-authorization.');
	}
};
