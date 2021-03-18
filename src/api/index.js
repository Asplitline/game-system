import { _get, _post, _delete, _put } from './helper'

// default - MODEL_RESTFUL
// const MODEL_RESTFUL = 1 
const MODEL_TRADITION = 0

// login
const _postLogin = _post('/account/api/login')
// register 
const _postRegister = _post('/account/insert')
// user 
const _getUser = _get('/account/list')
const _getUserList = _post('/account/pageAccount')
const _deleteUser = _delete('/account/delete')
const _getChangePassword = _get('/account/changePassword')
const _putEditUser = _put('/account/updateIgnoreNull')
// notice
const _getNotice = _get('/notice/list')
const _getNoticeList = _get('/notice/page')
const _addNotice = _post('/notice/insert')
const _editNotice = _put('/notice/updateIgnoreNull')
const _deleteNotice = _delete('/notice/delete', MODEL_TRADITION)
// post
// -getAllPost
const _getPostList = _get('/post/api/pagePosts')
const _addPost = _post('/post/api/addPost')
const _editPost = _post('/post/api/updatePost')
const _deletePost = _delete('/post/api/deletePost')
// comment
const _getComment = _get('/comment/api/pageComment')
const _deleteComment = _delete('/comment/api/deleteComment')
// category
const _getCategoryList = _get('/gameType/page')
const _addCategory = _post('/gameType/insert')
const _editCategory = _put('/gameType/updateIgnoreNull')
const _deleteCategory = _delete('/gameType/delete', MODEL_TRADITION)
// log
const _getLogList = _get('/logs/page')
// upload
const _uploadFile = _post('/uploadfile')
export {
    // login
    _postLogin,
    // register
    _postRegister,
    // user
    _getUser,
    _getUserList,
    _deleteUser,
    _getChangePassword,
    _putEditUser,
    // notice
    _getNotice,
    _getNoticeList,
    _addNotice,
    _editNotice,
    _deleteNotice,
    // category
    _getCategoryList,
    _addCategory,
    _editCategory,
    _deleteCategory,
    // post
    _getPostList,
    _addPost,
    _editPost,
    _deletePost,
    // comment
    _getComment,
    _deleteComment,
    // log
    _getLogList,
    // upload
    _uploadFile
}
