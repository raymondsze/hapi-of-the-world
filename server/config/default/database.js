/* 
* @Author: Sze Ka Wai Raymond (FakeC)
* @Date:   2016-01-01 02:59:11
* @Last Modified by:   Sze Ka Wai Raymond (FakeC)
* @Last Modified time: 2016-01-21 05:06:49
*/
// The models to be included, the format exported from modules should be
// Example
// [
// 		{
// 			name: 'foo',
// 			// Use async function to return promise, also return thunky function. 
// 			method: async function (x, y, next) {
// 				const foo = await fs.promise.readFile('foo.txt', 'utf-8');
// 				next(null, foo); // to support thunky function
// 				return foo; // to support return Promise
// 			},
// 			cache: {
// 				....
// 			}
// 		},
// 		{
// 			...
// 		},
// 		...
// ]
import models from '../../models'; 
export default {
	host: 'localhost',
	port: 27017,
	database: 'example',
	// the options passed to mongoose when connect
	options: {},
	// array of mongoose models
	models: [models]
};
