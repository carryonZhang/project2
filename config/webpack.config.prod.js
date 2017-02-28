var autoprefixer = require('autoprefixer');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
var url = require('url');
var paths = require('./paths');
var path = require('path');
var getClientEnvironment = require('./env');

var publicPath = paths.servedPath;
var shouldUseRelativeAssetPaths = publicPath === './';
var publicUrl = publicPath.slice(0, -1);
var env = getClientEnvironment(publicUrl);

// url:   {CDN_*}/js/main.js

var CDN_JS = process.env.CDN_JS_URL || '';
var CDN_CSS = process.env.CDN_CSS_URL || '';
var CDN_IMG = process.env.CDN_IMG_URL || '';

if (env.stringified['process.env'].NODE_ENV !== '"production"') {
    throw new Error('Production builds must have NODE_ENV=production.');
}

const cssFilename = 'static/css/[name].[contenthash:8].css';
const chunkFilename = 'main.chunk.js';

const extractTextPluginOptions = shouldUseRelativeAssetPaths ? {
        publicPath: Array(cssFilename.split('/').length).join('../')
    } : undefined;

module.exports = {
    bail: true,

    devtool: 'source-map',

    entry: [
        require.resolve('./polyfills'),
        paths.appIndexJs
    ],
    output: {
        path: paths.appBuild,
        filename: 'static/js/[name].[chunkhash:8].js',
        chunkFilename: 'static/js/[name].[chunkhash:8].chunk.js',
        publicPath: ''
    },

    resolve: {
        fallback: paths.nodePaths,
        extensions: ['.js', '.json', '.jsx', '']
    },

    module: {
        preLoaders: [
            {
                test: /\.(js|jsx)$/,
                loader: 'eslint',
                include: paths.appSrc
            }
        ],
        loaders: [
            {
                exclude: [
                    /\.html$/,
                    /\.(js|jsx)$/,
                    /\.less$/,
                    /\.css$/,
                    /\.json$/,
                    /\.svg$/
                ],
                loader: 'imageCDN-webpack?domain=' + CDN_IMG + '!url?limit=10000&name=static/media/[name].[hash:8].[ext]',
            },
            {
                test: /\.(js|jsx)$/,
                include: paths.appSrc,
                loader: 'babel',
                query: {
                    plugins: [
                        ['import', [{libraryName: "antd", style: true}]]
                    ]
                }
            },
            {
                test: /global.css$/,
                exclude: /node_modules/,
                loader: ExtractTextPlugin.extract('style', 'css?importLoaders=1!postcss')
            },
            {
                test: /^((?!global).)*\.css$/,
                loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]&-autoprefixer!postcss'),
                exclude: /node_modules/
            },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract('style', 'css?importLoaders=2!postcss!less?{"sourceMap":true,"modifyVars":{"@primary-color":"#d52632"}}'),
                include: /node_modules/
            },
            {
                test: /\.json$/,
                loader: 'json'
            },
            {
                test: /\.svg$/,
                loader: 'imageCDN-webpack?domain=' + CDN_IMG + '!file?name=static/media/[name].[hash:8].[ext]'
            }
        ]
    },

    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM'
    },

    postcss: function () {
        return [
            autoprefixer({
                browsers: [
                    '>1%',
                    'last 4 versions',
                    'Firefox ESR',
                    'not ie < 9', // React doesn't support IE8 anyway
                ]
            }),
        ];
    },
    plugins: [
        new webpack.DefinePlugin(Object.assign({}, env.stringified, {
            '__CDN_JS__': `"${CDN_JS}"`
        })),
        new webpack.optimize.CommonsChunkPlugin({
            name: chunkFilename,
            filename: 'static/js/' + chunkFilename
        }),
        new InterpolateHtmlPlugin(env.raw),
        new HtmlWebpackPlugin({
            inject: false,
            template: paths.appHtml,
            prefix: {CDN_JS, CDN_CSS},
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true
            }
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.DedupePlugin(),
        // Minify the code.
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                screw_ie8: true, // React doesn't support IE8 anyway
                warnings: false
            },
            mangle: {
                screw_ie8: true
            },
            output: {
                comments: false,
                screw_ie8: true
            }
        }),
        new ExtractTextPlugin(cssFilename, {
            allChunks: true
        })
    ],
    node: {
        fs: 'empty',
        net: 'empty',
        tls: 'empty'
    }
};
