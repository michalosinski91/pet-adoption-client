const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const config = (env, argv) => {
    return{
        entry: ['@babel/polyfill', './src/index.js'],
        output: {
            path: path.resolve(__dirname, 'build'),
            filename: 'main.js',
            publicPath: '/'
        },
        devServer: {
            contentBase: path.resolve(__dirname, 'build'),
            compress: true,
            port: 3000,
            historyApiFallback: true
        },
        devtool: 'source-map',
        module: {
            rules: [
                {
                    test: /\.js$/,
                    loader: 'babel-loader',
                    query: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                        plugins: ['babel-plugin-styled-components']
                    }
    
                },
                {
                    test: /\.css$/,
                    loaders: ['style-loader', 'css-loader']
                }
            ]
        },
        node: {
            fs: 'empty'
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: path.join(__dirname, './build/index.html'),
                inject: false
            })
        ]
    }
}

module.exports = config