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
/**
 * @param {*} url
 * @param {*} model 1(restful风格) 2(传统风格)
 * @returns
 */
export function _delete (url, model = 1) {
    return function (params) {
        let URL
        if (model === 1) {
            URL = `${url}/${params}`
        } else {
            URL = `${url}?id=${params}`
        }
        return $http.delete(URL)
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
