const MyPlugins = {}

function pad0 (data, len = 2) {
    return ('00000000000' + data).substr(-len)
}

MyPlugins.install = function (Vue, options) {
    Vue.directive('focus', {
        inserted (el) {
            el.focus()
        }
    })
    Vue.filter('formatDate', function (date) {
        if (!date) return 'unknown error'
        date = new Date(date)
        const year = date.getFullYear()
        const month = pad0(date.getMonth() + 1)
        const day = pad0(date.getDate())
        const hour = pad0(date.getHours())
        const minute = pad0(date.getMinutes())
        const second = pad0(date.getSeconds())
        return `${year}-${month}-${day} ${hour}:${minute}:${second}`
    })
}

export default MyPlugins