import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'
const MyPlugins = {}
const DEFAULT = 0
const MINI = 1
function pad0 (data, len = 2) {
    return ('00000000000' + data).substr(-len)
}

MyPlugins.install = function (Vue, options) {
    Vue.directive('focus', {
        inserted (el) {
            el.focus()
        }
    })
    Vue.directive('hljs', {
        inserted (el) {
            const blocks = el.querySelectorAll('pre code')
            blocks.forEach(b => {
                hljs.highlightBlock(b)
            })
        }
    })
    Vue.filter('formatDate', function (date, MODEL = DEFAULT) {
        if (!date) return 'unknown error'
        date = new Date(date)
        const year = date.getFullYear()
        const month = pad0(date.getMonth() + 1)
        const day = pad0(date.getDate())
        const hour = pad0(date.getHours())
        const minute = pad0(date.getMinutes())
        const second = pad0(date.getSeconds())
        if (MODEL === DEFAULT) {
            return `${year}-${month}-${day} ${hour}:${minute}:${second}`
        } else if (MODEL === MINI) {
            return `${year}-${month}-${day}`
        } else {
            return `${year}-${month}-${day} ${hour}:${minute}`
        }
    })
}

export default MyPlugins
