const path = require('path')
function load (dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    lintOnSave: true,
    chainWebpack: config => {
        config.when(process.env.NODE_ENV === 'production', config => {
            config.entry('app').clear().add('./src/main.prod.js')
            config.plugin('html').tap(args => {
                args[0].isProd = true
                return args
            })
        })
        config.when(process.env.NODE_ENV === 'development', config => {
            config.entry('app').clear().add('./src/main.dev.js')
            config.plugin('html').tap(args => {
                args[0].isProd = false
                return args
            })
        })
        config.resolve.alias
            .set('@api', load('src/api'))
            .set('@utils', load('src/utils'))
            .set('@mixins', load('src/mixins'))
            .set('@css', load('src/assets/css'))
    }

}