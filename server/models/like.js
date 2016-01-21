/* 
* @Author: Sze Ka Wai Raymond (FakeC)
* @Date:   2016-01-01 03:05:37
* @Last Modified by:   Sze Ka Wai Raymond (FakeC)
* @Last Modified time: 2016-01-21 22:15:55
*/

import Mongoose from 'mongoose';
import Promise from 'bluebird';
Mongoose.Promise = Promise;
 
const schema = new Mongoose.Schema({
	userId: {
		type: Mongoose.Types.ObjectId,
		required: true
	},
	documentId: {
		type: Mongoose.Types.ObjectId,
		required: true
	},
	likes: {
		type: Number,
		min: 0,
		default: 0
	}
}, {timestamps: true, versionKey: false});

export default Mongoose.model('Like', schema, 'Likes');
