import { _get, _post } from './helper'

// user 
const getUser = _get('/account/list')
const getUserList = _post('/account/pageAccount')
// log
const getLogList = _get('/logs/page')

export {
    // user
    getUser,
    getUserList,
    // log
    getLogList
}
