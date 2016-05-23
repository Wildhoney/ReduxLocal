const webpack = require('webpack');

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
            }
        ]
    }
};