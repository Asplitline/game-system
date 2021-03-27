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

/**
 * @param {*} url 
 * @param {*} model 0(传统风格) 1(restful风格) 2(不处理)
 * @returns 
 */
export function _post (url, model = 1) {
    return function (params) {
        if (model === 1) {
            return $http.post(url, params)
                .then(res => {
                    return res.data
                }).catch(err => {
                    console.log(err)
                })
        } else {
            let URL
            if (model === 2) {
                URL = `${url}?${params}`
            } else if (model === 0) {
                URL = `${url}?postId=${params}`
            }
            return $http.post(URL)
                .then(res => {
                    return res.data
                }).catch(err => {
                    console.log(err)
                })
        }
    }
}

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
