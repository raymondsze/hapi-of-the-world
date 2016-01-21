/* 
* @Author: Sze Ka Wai Raymond (FakeC)
* @Date:   2016-01-01 03:05:37
* @Last Modified by:   Sze Ka Wai Raymond (FakeC)
* @Last Modified time: 2016-01-21 22:18:27
*/

import Mongoose from 'mongoose';
import Promise from 'bluebird';
Mongoose.Promise = Promise;
 
const schema = new Mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	content: {
		type: String,
		required: true
	},
	createdBy: {
		type: String,
		required: true
	}
}, {timestamps: true, versionKey: false});

export default Mongoose.model('Document', schema, 'Documents');
