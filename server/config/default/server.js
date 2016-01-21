/* 
* @Author: Sze Ka Wai Raymond (FakeC)
* @Date:   2016-01-01 02:32:28
* @Last Modified by:   Sze Ka Wai Raymond (FakeC)
* @Last Modified time: 2016-01-20 23:01:54
*/
// The catbox-redis is used to cache the result of server.methods or server.cache into redis database 
import CatboxRedis from 'catbox-redis';
export default {
	// host name
	host: 'localhost',
	// port number
	port: 8080,
	// here is the option initalizing hapi server
	options: {
		cache: [
			{
				name: 'redis',
				engine: CatboxRedis,
				host: '127.0.0.1',
				port: 6379,
				partition: 'cache'
			}
		]
	}
};
