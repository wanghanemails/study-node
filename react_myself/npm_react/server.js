var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config.js');
new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,
    noInfo: false,
    historyApiFallback: true
}).listen(6666, '127.0.0.1', function (err, result) {
    if (err) {
        console.log(err);
        console.log(111);
    }
    console.log('Listening at localhost:3000');
});