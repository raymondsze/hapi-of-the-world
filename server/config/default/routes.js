/* 
* @Author: Sze Ka Wai Raymond (FakeC)
* @Date:   2016-01-02 22:26:53
* @Last Modified by:   Sze Ka Wai Raymond (FakeC)
* @Last Modified time: 2016-01-21 05:06:40
*/

// The routes to be included, the format exported from modules should be
// Example
// [
// 		{
// 			method: 'GET',
// 			path: '/foo',
// 			config: {
// 				handler: {
// 					async: function (request, reply) {
// 						....
// 					}
// 				}
// 			}
// 		},
// 		{
// 			method: 'POST',
// 			path: '/bar',
// 			config: {
// 				handler: {
// 					async: function (request, reply) {
// 						....
// 					}
// 				}
// 			}
// 		},
// 		...
// ] 
import routes from '../../routes';
export default [routes];
