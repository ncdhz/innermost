module.exports = {
  configureWebpack: {
    watchOptions: {
      ignored: ['/public/config/']
    }
  },
  productionSourceMap: false,
  runtimeCompiler: true,
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      builderOptions: {
        electronDownload: {
          mirror: 'https://npm.taobao.org/mirrors/electron/'
        },
        appId: 'com.github.ncdhz.innermost',
        productName: 'Innermost',
        copyright: 'Copyright © 2020 ncdhz',
        directories: {
          output: './dist_electron'
        },
        asar: false,
        dmg: {
          contents: [
            {
              x: 410,
              y: 150,
              type: 'link',
              path: '/Applications'
            },
            {
              x: 130,
              y: 150,
              type: 'file'
            }
          ]
        },
        mac: {
          icon: './public/icons/icon.icns'
        },
        win: {
          icon: './public/icons/icon.ico'
        },
        linux: {
          icon: './public/icons'
        }
      }
    }
  }
}
