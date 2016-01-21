/* 
* @Author: Sze Ka Wai Raymond (FakeC)
* @Date:   2016-01-01 03:44:58
* @Last Modified by:   Sze Ka Wai Raymond (FakeC)
* @Last Modified time: 2016-01-20 22:43:55
*/
// babel-register is used to enable the later require module pre-complied with babel (so it can read import, export, async, await, decorator, etc)
require('babel-register');
// separate require the server. (we cannot use ES7 syntax inline with babel-register.)
require('./server/server');
