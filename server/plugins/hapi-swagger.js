/* 
* @Author: Sze Ka Wai Raymond (FakeC)
* @Date:   2016-01-21 04:12:02
* @Last Modified by:   Sze Ka Wai Raymond (FakeC)
* @Last Modified time: 2016-02-23 01:28:52
*/
// This plugin is used to enabled api documentation with tag specified in routes
import HapiSwagger from 'hapi-swagger';
import pack from '../../package';

export default {
	plugin: {
		register: HapiSwagger,
		options: {
			info: {
				title: 'Hapi-of-the-World',
				version: pack.version
			}
		}
	},
	next: function (server, error) {
		if (error) {
			return server.log(['error'], 'Fail to install plugin: hapi-swagger...');
		}
		return server.log(['info'], 'Installed plugin: hapi-swagger.');
	}
};
