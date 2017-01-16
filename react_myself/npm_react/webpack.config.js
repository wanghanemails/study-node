var htmlWebpackPlugin = require('html-webpack-plugin'); //使用自动生成html文件的一个插件
var path = require('path');
var webpack = require('webpack')


var componentsPath = path.resolve(__dirname, 'src/components')
var configPath = path.resolve(__dirname, 'src/config')
var widgetsPath = path.resolve(__dirname, 'src/widgets')
var rootPath = path.resolve(__dirname, 'src')
module.exports = {
    entry: [
        'webpack-dev-server/client?http://127.0.0.1:6666', // WebpackDevServer host and port
        'webpack/hot/only-dev-server',
        './example/index.jsx' // Your appʼs entry point
    ],
    output: {
        path: path.join(__dirname, 'build'),
        filename: '[name].bundle.js',
        publicPath: '/build/'
    },
    module:{
        loaders:[
            {
                test:/\.css$/,
                loaders:['style','css'],
                exclude:'node_modules'
            },
            {
                test:/\.jsx?$/,
                loaders: ['react-hot', 'babel?presets[]=react,presets[]=es2015'],
                exclude:"/node_modules/",
                include:path.resolve(__dirname,"example")

            },
            //{ test: /\.js?$/, loaders: ['react-hot', 'babel'], exclude: /node_modules/ },
            //{ test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
            { test: /\.scss$/, loader: 'style!css!sass?sourceMap'},
        ]

    },
    resolve:{
        extensions:['','.js','.css','.jsx','.json']    },
    devServer: {
        hot:true,
        inline:true
    },

    plugins:[
        new htmlWebpackPlugin({
            title:"First react app"
        })
    ]}