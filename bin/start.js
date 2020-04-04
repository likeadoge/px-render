#!/usr/bin/env node

const Webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('../config/webpack.config.js');
const path = require('path')
var fs = require("fs");


; // 根据不同的安装形式，两种不同的 ts-loader 路径
Promise.all([
    path.resolve(__dirname, '../../ts-loader/index.js'),
    path.resolve(__dirname, '../node_modules/ts-loader/index.js')
].map(url => new Promise(res => {
    fs.exists(url, function(exists) {
        res([exists, url])
    })
}))).then(v => {
    const tsloader = v.find(v => v[0])

    if (!tsloader) return console.error("Can't Find ts-loader!!!")


    const compiler = Webpack(webpackConfig(
        path.resolve(process.cwd(), './app.tsx'),
        tsloader[1],
        path.resolve(__dirname, '../tsconfig.json'),
    ))

    const devServerOptions = Object.assign({}, webpackConfig.devServer, {
        open: true,
        stats: {
            colors: true,
        },
    });
    const server = new WebpackDevServer(compiler, devServerOptions);

    server.listen(8080, '127.0.0.1', (e) => {
        console.log('Starting server on http://localhost:8080');
    });

})