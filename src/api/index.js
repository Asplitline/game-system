import { _get, _post, _delete, _put } from './helper'

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
// post
const _getPost = _get('/post/api/pagePosts')
// log
const _getLogList = _get('/logs/page')

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
    // post
    _getPost,
    // log
    _getLogList
}
