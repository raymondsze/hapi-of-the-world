/* 
* @Author: Sze Ka Wai Raymond (FakeC)
* @Date:   2016-01-01 03:08:44
* @Last Modified by:   Sze Ka Wai Raymond (FakeC)
* @Last Modified time: 2016-01-24 02:51:22
*/
export default {
	// here is the config for access_token authentication, see hapi-auth-jwt2
	// secret used to sign access_token
	key: '5e4bde6c-ae02-11e5-bf7f-feff819cdc9f',
	// verify token options, see jsonwebtoken.verify
	verifyOptions: {
		// set it to true as we use database cache with expire options
		ignoreExpiration: true,
		// algorithm for signing token
		algorithms: ['HS256'],
		// audience
		audience: 'example',
		// issuer
		issuer: 'company'
	},
	// sign token options, see jsonwebtoken.sign
	signOptions: {
		// algorithm for decode token, should be same as verify options 
		algorithms: ['HS256'],
		// audience, should be same as verify options
		audience: 'example',
		// issuer, should be same as verify options
		issuer: 'company'
	},
	cookieOptions: {
		// time to live
		ttl: 7 * 24 * 60 * 60 * 1000,
		// encoding, it is not required as jsonwebtoken is already encoded
		encoding: 'none',
		// Secure flag, enable https only?
		isSecure: false,
		// httpOnly flag, only used in browser?
		isHttpOnly: true,
		// remove invalid cookie
		clearInvalid: false,
		// don't allow violation of RFC 6265
		strictHeader: true
	}
};
