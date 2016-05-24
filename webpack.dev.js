const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: './example/js/default.js',
    output: {
        path: __dirname + '/example',
        filename: 'build.js',
        libraryTarget: 'var'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react', 'stage-0']
                }
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('css!autoprefixer?browsers=last 2 version!sass?outputStyle=compact')
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('build.css'),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ]
};
