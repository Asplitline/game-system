import axios from 'axios'

const BASEURL = 'http://127.0.0.1:8088'

const $http = axios.create({
    baseURL: BASEURL,
    timeout: 2000,
    withCredentials: false// 不允许携带cookie
})

export function _get (url) {
    return function (params) {
        return $http.get(url, {
            params
        }).then(res => {
            return res.data
        }).catch(err => {
            console.log(err)
        })
    }
}

export function _post (url) {
    return function (params) {
        return $http.post(url,
            params
        ).then(res => {
            return res.data
        }).catch(err => {
            console.log(err)
        })
    }
}

export function _delete (url) {
    return function (params) {
        return $http.delete(url + '/' + params)
            .then(res => {
                return res.data
            }).catch(err => {
                console.log(err)
            })
    }
}

export function _put (url) {
    return function (params) {
        return $http.put(url, params)
            .then(res => {
                return res.data
            }).catch(err => {
                console.log(err)
            })
    }
}