import marked from 'marked'

export function convertParams (params) {
    const result = []
    for (const key in params) {
        result.push(`${key}=${params[key]}`)
    }
    return result.join('&')
}

export function bindURL (url) {
    return 'http://127.0.0.1:8088/' + url
}

export function convertDeepCopy (data) {
    return JSON.parse(JSON.stringify(data))
}

export function validateEmail (rule, value, callback) {
    const mailReg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/
    if (!value) {
        return callback(new Error('请输入邮箱'))
    }
    setTimeout(() => {
        if (mailReg.test(value)) {
            callback()
        } else {
            callback(new Error('请输入正确的邮箱'))
        }
    }, 100)
}

export function validatePhone (rule, value, callback) {
    const phoneReg = /^1[34578]\d{9}$/
    if (!value) {
        return callback(new Error('请输入手机号'))
    }
    setTimeout(() => {
        if (phoneReg.test(value)) {
            callback()
        } else {
            callback(new Error('请输入正确的手机号'))
        }
    }, 100)
}

export function markdownToHtml (val) {
    return marked(val)
}

export function htmlToText (val) {
    return marked(val)
        .replace(/<(style|script|iframe)[^>]*?>[\s\S]+?<\/\1\s*>/gi, '')
        .replace(/<[^>]+?>/g, '')
        .replace(/\s+/g, ' ')
        .replace(/ /g, ' ')
        .replace(/>/g, ' ')
        .trim()
}