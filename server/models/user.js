/* 
* @Author: Sze Ka Wai Raymond (FakeC)
* @Date:   2016-01-01 03:05:37
* @Last Modified by:   Sze Ka Wai Raymond (FakeC)
* @Last Modified time: 2016-01-24 03:12:45
*/

import Mongoose from 'mongoose';
import Promise from 'bluebird';
import bcrypt from 'bcrypt';
Mongoose.Promise = Promise;
 
const schema = new Mongoose.Schema({
	username: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		index: {
			unique: true
		}
	},
	password: {
		type: String,
		required: true
	},
	role: {
		type: String,
		required: true,
		default: 'USER'
	}
}, {timestamps: true, versionKey: false});

// After validate hook
schema.post('validate', (doc) => {
	// encrypt the password
	doc.password = bcrypt.hashSync(doc.password, 10);
});

// Remove the password information when toObject()
schema.options.toObject = {
	transform: function (doc, ret) {
		delete ret.password;
	}
};

export default Mongoose.model('User', schema, 'Users');
