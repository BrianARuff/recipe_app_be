const path = require('path');

module.exports = {
    entry: path.resolve(__dirname, 'src/index.ts'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.ts$/i,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'ts-loader',
                    }

                ]
            },
        ]
    },
    mode: 'production',
    target: "node",
    resolve: {
        extensions: ['.ts', '.js']
    }
};