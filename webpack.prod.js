module.exports = {
    entry: './src/redux-local.js',
    output: {
        path: __dirname + '/dist',
        filename: 'redux-local.js',
        libraryTarget: 'commonjs2'
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
