const path = require("path");
const fs = require("fs");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require("css-minimizer-webpack-plugin");
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const ejsFiles = [
    {
        filePath: path.resolve(__dirname, './app/pages'),
        outputPath: './',
        inject: true
    }

];


module.exports = (env, {mode}) => {

    const isDev = mode === 'development'

    const generateHtmlPlugins = (files) => {
        const htmlPlugins = [];
        files.map(config => {
            const {filePath, outputPath, inject} = config;
            const templateFiles = fs.readdirSync(path.resolve(__dirname, filePath));
            templateFiles.map(item => {
                const parts = item.split('.');
                const name = parts[0];
                const extension = parts[1];
                const _filePath = path.resolve(__dirname, `${filePath}/${name}.${extension}`);
                htmlPlugins.push(
                    new HtmlWebpackPlugin({
                        filename: `${outputPath}/${name}.html`,
                        template: `!!ejs-compiled-loader!${_filePath}`,
                        scriptLoading: 'blocking',
                        minify: false,
                        inject
                    })
                )
            })
        });
        return htmlPlugins
    }

    const htmlPlugins = generateHtmlPlugins(ejsFiles);

    return {
        mode: mode,
        entry: './app/app.js',
        output: {
            path: path.join(__dirname, 'assets'),
            filename: "bundle.js"
        },
        devServer: {
            hot: true,
            open: true,
            port: 3000,
            static: {
                directory: "./assets",
            },
            watchFiles: "./app/**/*.ejs",
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    use: {
                        loader: "babel-loader",
                    }
                },
                {
                    test: /\.ejs$/,
                    use: [
                        {
                            loader: "ejs-compiled-loader",
                            options: {}
                        }
                    ]
                },
                {
                    test: /\.p?css$/i,
                    use: [
                        isDev ? "style-loader" : MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                        },
                        {
                            loader: "postcss-loader",
                            options: {
                                postcssOptions: {
                                    config: './postcss.config.js'
                                }
                            }
                        }
                    ]
                },
                {
                    test: /\.svg$/,
                    exclude: path.resolve(__dirname, './app/fonts/'),
                    use: [
                        {
                            loader: 'svg-sprite-loader',
                            options: {
                                extract: true,
                                spriteFilename: 'icons.svg',
                            }
                        }
                    ]
                },
            ],
        },
        plugins: [
            ...htmlPlugins,
            new MiniCssExtractPlugin({
                filename: 'styles/[name].css'
            }),
            new CopyWebpackPlugin({
                patterns: [
                    {
                        from: path.resolve(__dirname, './app/images'),
                        to: './images',
                        noErrorOnMissing: true
                    },
                    {
                        from: path.resolve(__dirname, './app/icons'),
                        to: './icons',
                        noErrorOnMissing: true
                    },
                    {
                        from: path.resolve(__dirname, './app/json'),
                        to: './json',
                        noErrorOnMissing: true
                    },
                    {
                        from: path.resolve(__dirname, './app/fonts'),
                        to: './fonts',
                        noErrorOnMissing: true
                    }
                ]
            }),
            new SpriteLoaderPlugin({
                plainSprite: true
            }),
        ]
    };
}