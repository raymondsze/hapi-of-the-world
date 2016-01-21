/* 
* @Author: Sze Ka Wai Raymond (FakeC)
* @Date:   2016-01-01 02:43:46
* @Last Modified by:   Sze Ka Wai Raymond (FakeC)
* @Last Modified time: 2016-01-21 04:58:21
*/
import server from './server';
import acl from './acl';
import auth from './auth';
import database from './database';
import logger from './logger';
import methods from './methods';
import routes from './routes';

export default {
	server: server,
	acl: acl,
	auth: auth,
	database: database,
	logger: logger,
	methods: methods,
	routes: routes
};
