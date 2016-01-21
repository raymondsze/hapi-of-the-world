/* 
* @Author: Sze Ka Wai Raymond (FakeC)
* @Date:   2016-01-02 22:26:53
* @Last Modified by:   Sze Ka Wai Raymond (FakeC)
* @Last Modified time: 2016-01-21 05:06:35
*/

// The routes to be included, the format exported from modules should be
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
import methods from '../../methods';
export default [methods];
