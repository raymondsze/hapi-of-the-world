/* 
* @Author: Sze Ka Wai Raymond (FakeC)
* @Date:   2016-01-01 03:43:46
* @Last Modified by:   Sze Ka Wai Raymond (FakeC)
* @Last Modified time: 2016-01-22 00:20:28
*/

import documents from '../controllers/document';
export default [
	{method: 'POST', path: '/documents', config: documents.createOne},
	{method: 'GET', path: '/documents/{documentId}', config: documents.readOne},
	{method: 'PUT', path: '/documents/{documentId}', config: documents.updateOne},
	{method: 'DELETE', path: '/documents/{documentId}', config: documents.deleteOne},
	{method: 'GET', path: '/documents', config: documents.read}
];
