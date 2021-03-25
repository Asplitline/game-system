import { _get, _post, _delete, _put } from './helper'

// default - MODEL_RESTFUL
// const MODEL_RESTFUL = 1
const MODEL_TRADITION = 0
const MODEL_NO = 2

// login
const _login = _post('/account/api/login', MODEL_NO)
// register
const _register = _post('/account/insert')
// user
const _getUser = _get('/account/list')
const _getUserList = _post('/account/pageAccount')
const _deleteUser = _delete('/account/delete')
const _changePassword = _get('/account/changePassword')
const _editUser = _put('/account/updateIgnoreNull')
// game
const _getGame = _get('/game/list')
const _getGameList = _get('/game/page')
const _addGame = _post('/game/insert')
const _editGame = _put('/game/updateIgnoreNull')
const _deleteGame = _delete('/game/delete', MODEL_TRADITION)
// notice
const _getNotice = _get('/notice/list')
const _getNoticeList = _get('/notice/page')
const _addNotice = _post('/notice/insert')
const _editNotice = _put('/notice/updateIgnoreNull')
const _deleteNotice = _delete('/notice/delete', MODEL_TRADITION)
// post
const _getPostList = _get('/post/api/pagePosts')
const _getPostByAuthorId = _get('/post/api/pagePostByAuthorId')
const _addPost = _post('/post/api/addPost')
const _editPost = _post('/post/api/updatePost')
const _deletePost = _delete('/post/api/deletePost')
// comment
const _addComment = _post('/comment/api/addComment')
const _getComment = _get('/comment/api/pageComment')
const _getCommentByPostId = _post('/reply/api/getCommentsByPostId', MODEL_TRADITION)
const _deleteComment = _delete('/comment/api/deleteComment')
// category
const _getCategory = _get('/gameType/list')
const _getCategoryList = _get('/gameType/page')
const _addCategory = _post('/gameType/insert')
const _editCategory = _put('/gameType/updateIgnoreNull')
const _deleteCategory = _delete('/gameType/delete', MODEL_TRADITION)
// log
const _getLogList = _get('/logs/page')
const _deleteLog = _delete('/logs/delete', MODEL_TRADITION)
// upload
const _uploadFile = _post('/uploadfile')
// star
const _getStar = _get('/likeGame/list')
const _addStar = _post('/likeGame/insert')
const _deleteStar = _delete('/likeGame/delete', MODEL_TRADITION)
export {
    // login
    _login,
    // register
    _register,
    // user
    _getUser,
    _getUserList,
    _deleteUser,
    _changePassword,
    _editUser,
    // game
    _getGame,
    _getGameList,
    _addGame,
    _editGame,
    _deleteGame,
    // notice
    _getNotice,
    _getNoticeList,
    _addNotice,
    _editNotice,
    _deleteNotice,
    // category
    _getCategory,
    _getCategoryList,
    _addCategory,
    _editCategory,
    _deleteCategory,
    // post
    _getPostList,
    _getPostByAuthorId,
    _addPost,
    _editPost,
    _deletePost,
    // comment
    _getComment,
    _getCommentByPostId,
    _addComment,
    _deleteComment,
    // log
    _getLogList,
    _deleteLog,
    // upload
    _uploadFile,
    // star
    _getStar,
    _addStar,
    _deleteStar
}
