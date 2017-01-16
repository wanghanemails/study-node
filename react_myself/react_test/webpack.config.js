//
//var path = require('path');
//
//module.exports = {
//
//    entry:
//        [
//            'webpack-dev-server/client?http://127.0.0.1:3000',
//            "webpack/hot/only-dev-server",
//            path.resolve(__dirname, 'app/index.js'),
//        ],
//
//    output: {
//        path: path.resolve(__dirname, 'build'),
//        filename: 'bundle.js'
//    },
//    module: {
//        loaders: [
//            {
//                test: /\.jsx?$/,
//                exclude: /node_modules/,
//                loader: 'babel',
//                query: {
//                    presets: ['es2015','react']
//                }
//                //loader: 'babel',
//                //loaders: ['react-hot', 'babel?presets[]=react,presets[]=es2015']
//            }
//        ]
//    },
//    plugins: [
//        //new webpack.HotModuleReplacementPlugin()
//    ]
//};
var path = require('path');
var webpack = require("webpack")
var APP_DIR = path.join(__dirname, 'app');
module.exports = {
    devtool: "inline-source-map",
    entry: [
        'webpack-dev-server/client?http://localhost:3000', // WebpackDevServer host and port
        'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
        './app/index.js'
        ],
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js'
    },
    module: {

        loaders: [
            {
                test: /\.jsx?/,
                include: APP_DIR,
                loader: 'babel'
            },
            //{
            //    test: /\.jsx?$/,
            //    exclude: "/node_modules/",
            //    loaders: ["react-hot-loader", "babel?presets[]=react,presets[]=es2015"]
            //},
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            },
            {
                test: /\.gif$/,
                loader: "url-loader?mimetype=image/png"
            },
            {
                test: /\.woff(2)?(\?v=[0-9].[0-9].[0-9])?$/,
                loader: "url-loader?mimetype=application/font-woff"
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9].[0-9].[0-9])?$/,
                loader: "file-loader?name=[name].[ext]"
            }
        ]

        //loaders: [
        //    {
        //        test: /\.jsx?$/,
        //        loaders: ['react-hot', 'jsx?harmony'],
        //        include: path.join(__dirname, 'app')
        //    },
        //    {
        //        test: /\.js$/,
        //        exclude: /node_modules/,
        //        loader: 'react-hot!jsx-loader?harmony'
        //    },
        //    {
        //        test: /\.less/,
        //        loader: 'style-loader!css-loader!less-loader'
        //    },
        //    {
        //        test: /\.sass/,
        //        loader: 'style-loader!css-loader!sass-loader'
        //    },
        //    {
        //        test: /\.(css)$/,
        //        loader: 'style-loader!css-loader'
        //    },
        //    {
        //        test: /\.(png|jpg)$/,
        //        loader: 'url-loader?limit=8192'
        //    },
        //
        //]
    },plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("development")
            }
        })
    ]
};