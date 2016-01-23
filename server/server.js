/* 
* @Author: Sze Ka Wai Raymond (FakeC)
* @Date:   2015-12-31 03:06:43
* @Last Modified by:   Sze Ka Wai Raymond (FakeC)
* @Last Modified time: 2016-01-24 03:02:26
*/
import {format} from 'util';
import _ from 'lodash';
import Hapi from 'hapi';
import Mongoose from 'mongoose';
import Promise from 'bluebird';
import config from './config';
import middlewares from './plugins';
Mongoose.Promise = Promise;
const {server, database, methods, routes} = config;
const hapiServer = new Hapi.Server(server.options || {});
hapiServer.connection({host: server.host, port: server.port});

// Use const <function_name> = async function () {...} instead of async function <function_name> () {...} to prevent validation failure for eslint.
// TODO: Change the style after eslint support ES7 syntax well
// 
/**
 * register all middewares specified in config.plugins
 * @return {array} middlewares
 */
const registerMiddlewares = async function () {
	hapiServer.log(['info'], format('...Register middlewares'));
	const register = index => {
		const plugin = middlewares[index];
		if (plugin) {
			hapiServer.register(plugin.plugin, err => {
				if (err) {
					throw err;
				} else {
					_.isFunction(plugin.next) && plugin.next(hapiServer);
					register(index + 1);
				}
			});
		} else {
			return middlewares;
		}
	};
	register(0);
};

/**
 * register all methods specified in config.methods
 * @return {array} methods
 */
const registerMethods = async function () {
	hapiServer.log(['info'], format('...Register server methods'));
	const modules = _.flattenDeep(methods);
	let methodsAsync = {};
	_.each(modules, methodConfig => {
		hapiServer.log(['info'], format('Register server method: %s.', methodConfig.name));
		const method = methodConfig.method;
		const thunky = function (...args) {
			const next = args[args.length - 1];
			method.apply(null, args.slice(0, args.length - 1)).then((...margs) => {
				next.apply(null, [null].concat(margs));
			}).catch((...margs) => {
				next.apply(null, margs);
			});
		};
		hapiServer.method(_.merge(_.clone(methodConfig), {method: thunky}));
		methodsAsync[methodConfig.name] = function (...args) {
			return new Promise((resolve, reject) => {
				hapiServer.methods[methodConfig.name].apply(null, args.concat([(error, result) => {
					if (error) {
						return reject(error);
					}
					return resolve(result);
				}]));
			});
		};
		const cache = hapiServer.methods[methodConfig.name].cache;
		if (cache) {
			methodsAsync[methodConfig.name].cache = Promise.promisifyAll(cache);
		}
	});
	hapiServer.decorate('server', 'methodsAsync', methodsAsync);
	return modules;
};

/**
 * register all routes specified in config.routes
 * @return {array} methods
 */
const registerRoutes = async function () {
	hapiServer.log(['info'], format('...Register routes'));
	// register custom handler to support async handler
	hapiServer.handler('async', function (route, asyncHandler) {
		return function (request, reply) {
			// call the handler, the handler should be async function return Promise object
			asyncHandler(request, reply).catch(err => {
				reply(err);
			});
		};
	});
	const modules = _.flattenDeep(routes);
	_.each(modules, routeConfig => {
		hapiServer.log(['info'], format('Register route: %s %s.', routeConfig.method, routeConfig.path));
		hapiServer.route(routeConfig);
	});
	return modules;
};

/**
 * register all database models specified in config.database
 * @return {array} models
 */
const registerDBModels = async function () {
	hapiServer.log(['info'], format('...Register database models'));
	const modules = _.flattenDeep(database.models);
	let models = {};
	_.each(modules, model => {
		hapiServer.log(['info'], format('Register database model: %s.', model.modelName));
		models[model.modelName] = model;
	});
	hapiServer.decorate('server', 'models', models);
	return modules;
};

/**
 * connect to mongo database specified in config.database
 * @return {object} mongoose
 */
const connectToDatabase = async function () {
	hapiServer.log(['info'], format('...Connect to database'));
	const {username, password, port: dbPort, host: dbHost, database: instance, options = {}} = database;
	const mongodbPath = username ?
		'mongodb://' + username + ':' + password + '@' + dbHost + ':' + dbPort + '/' + instance :
		'mongodb://' + dbHost + ':' + dbPort + '/' + instance;
	return new Promise((resolve, reject) => 
		Mongoose.connect(mongodbPath, options, err => {
			if (err) {
				return reject(err);
			}
			hapiServer.log(['info'], format('Connection with database %s succeeded.', mongodbPath));
			hapiServer.decorate('server', 'mongoose', Mongoose);
			resolve(Mongoose);
		})
	);
};

/**
 * Starts the Hapi server
 * @return {object} server
 */
const startServer = async function () {
	await registerMiddlewares();
	await registerMethods();
	await registerRoutes();
	await registerDBModels();
	await connectToDatabase();
	return new Promise((resolve, reject) => 
		hapiServer.start(err => {
			if (err) {
				return reject(err);
			}
			resolve(server);
		})
	);
};

startServer().then(() => {
	hapiServer.log(['info'], format('Server started at %s.', hapiServer.info.uri));
}).catch((err) => {
	hapiServer.log(['error'], format('Fail to start server at %s due to unexpected error', hapiServer.info.uri));
	hapiServer.log(['error'], err);
});

export default server;
