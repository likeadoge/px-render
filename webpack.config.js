const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: {
        'app': path.resolve(__dirname, './app.ts'),
        'task.worker': path.resolve(__dirname, './app.ts')
    },
    mode: 'production',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].js',
        globalObject: 'this',
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
        // plugins: [new TsconfigPathsPlugin({ configFile:tsconfig })]
    },
    module: {
        rules: [
            { test: /\.tsx?$/, loader: 'ts-loader' }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            excludeChunks: ['task.worker']
        })
    ],
    devtool: 'source-map',
    devServer: {
        contentBase: path.join(__dirname, "build"),
        compress: true,
        port: 9000
    }
}