/* 
* @Author: Sze Ka Wai Raymond (FakeC)
* @Date:   2016-01-11 00:01:35
* @Last Modified by:   Sze Ka Wai Raymond (FakeC)
* @Last Modified time: 2016-01-21 05:02:38
*/

export default {
	// see the plugin hapi-authorization, here is config to enable role based acl
	// roles available for users
	roles: ['ADMIN', 'USER', 'GUEST'],
	// enable hierachy, inherientance of user roles
	hierarchy: true,
	// lower index have higher access right
	roleHierarchy: ['ADMIN', 'USER', 'GUEST']
};
