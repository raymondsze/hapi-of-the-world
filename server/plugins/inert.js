/* 
* @Author: Sze Ka Wai Raymond (FakeC)
* @Date:   2016-01-21 04:12:02
* @Last Modified by:   Sze Ka Wai Raymond (FakeC)
* @Last Modified time: 2016-02-23 01:28:56
*/
// This plugin is prerequist of hapi-swagger
import Inert from 'inert';

export default {
	plugin: {
		register: Inert
	},
	next: function (server, error) {
		if (error) {
			return server.log(['error'], 'Fail to install plugin: inert...');
		}
		return server.log(['info'], 'Installed plugin: inert.');
	}
};
