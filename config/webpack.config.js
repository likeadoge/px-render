const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = (
    entry,
    tsloader
) => ({
    entry: {
        'app': entry,
        'task.worker': entry
    },
    mode: 'production',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].js',
        globalObject: 'this',
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },
    module: {
        rules: [
            { test: /\.tsx?$/, loader: tsloader }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            excludeChunks: ['task.worker']
        })
    ],
    devServer: {
        contentBase: path.join(__dirname, "build"),
        compress: true,
        port: 9000
    }
})