const htmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports={
    mode:'development',
    optimization: {
        minimizer: [new OptimizeCssAssetsPlugin()]
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                exclude: /styles\.css$/,
                use:[
                    'style-loader',
                    'css-loader'
                    
                ]
            },
            {
                test: /styles\.css$/,
                use:[
                    MiniCssExtractPlugin.loader,
                    {
                        loader:'css-loader',
                        options: {
                            sourceMap: true,
                            url: false,
                        }
                    }
                    
                ]
            },
            {
                test: /\.html$/i,
                loader: 'html-loader',
                options: {
                    minimize: true
                }
            },
            {
                test: /\.(png|svg|jpg|gif)$/i,
                type: "javascript/auto",
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'assets',
                        publicPath: 'assets',
                        emitFile: true,
                        esModule: false
                    }
                }
            }
            // el type es super importante para no generar otro path roto, las opciones hacen posible guardarlo en otra carpeta dentro de dist
        ]
    },
    plugins: [
        new htmlWebpackPlugin({
            template: './src/index.html',
            filename: './index.html'
        }),
        new MiniCssExtractPlugin({
            filename : '[name].css',
            ignoreOrder: false,
        }),
    ]
}