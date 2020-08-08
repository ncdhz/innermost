module.exports = {
    pluginOptions: {
        electronBuilder: {
            builderOptions: {
                "electronDownload": {
                    "mirror": "https://npm.taobao.org/mirrors/electron/"
                },
                "appId": "com.github.ncdhz.innermost",
                "productName": "innermost",
                "copyright": "Copyright © 2020 ncdhz",
                "directories": {
                    "output": "./dist_electron"
                }, 
                "dmg": {
                    "contents": [
                        {
                            "x": 410,
                            "y": 150,
                            "type": "link",
                            "path": "/Applications"
                        },
                        {
                            "x": 130,
                            "y": 150,
                            "type": "file"
                        }
                    ]
                },
                "mac": {
                    "icon": "./public/icons/icon.icns"
                },
                "win": {
                    "icon": "./public/icons/icon.ico"
                },
                "linux": {
                    "icon": "./public/icons"
                }
            }
        }
    }
}