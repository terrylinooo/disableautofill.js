/**
 * Webpack 5.x configuration for disableautofill.js
 * https://github.com/terrylinooo/disableautofill.js
 */
var path = require('path');
var webpack = require('webpack');
var packageConfig = require('./package.json');
const TerserPlugin = require('terser-webpack-plugin');

function getConfig(env) {
	var NODE_ENV = env.env || 'development';

	var config = {
		mode : NODE_ENV,
		devtool: 'source-map',
		optimization: {
			minimize: false,
			minimizer: [
				new TerserPlugin({
					terserOptions: {
						format: {
							comments: false,
						},
					},
					extractComments: false,
				}),
			],
		},
		entry: [
			'webpack-hot-middleware/client',
			'./index',
		],
		output: {
			path: path.join(__dirname, 'demo'),
			filename: packageConfig.name + '.js',
			publicPath: '/demo/',
			hotUpdateChunkFilename: 'hot-update.js',
			hotUpdateMainFilename: 'hot-update.json'
		},
		plugins: [
			new webpack.HotModuleReplacementPlugin(),
			new webpack.NoEmitOnErrorsPlugin(),
			new webpack.DefinePlugin({
				'process.env': {
					'NODE_ENV': JSON.stringify(NODE_ENV)
				}
			})
		],
		resolve: {
			extensions: ['.js'],
			modules: ['src', 'node_modules']
		}
	};
	
	if (NODE_ENV === 'production') {
		var minified = env.minified == 'yes';
		var filename = minified ? packageConfig.name + '.min.js' : packageConfig.name + '.js';

		if (minified) {
			config.optimization = {
				minimize: true,
				minimizer: [
					new TerserPlugin({
						terserOptions: {
							format: {
								comments: false,
							},
						},
						extractComments: false,
					}),
				],
			};
		}
	
		config.entry = './index';
		config.output = {
			sourceMapFilename: filename + '.map',
			path: path.join(__dirname, 'dist'),
			filename: filename,
			libraryTarget: 'umd'
		};
	
		config.mode = NODE_ENV;
		config.plugins = [
			new webpack.DefinePlugin({
				'process.env': {
					'NODE_ENV': JSON.stringify(NODE_ENV)
				}
			}),
		];
	}

	return config;
}

function getJqueryConfig(env) {
	var NODE_ENV = env.env || 'development';

	var config = {
		mode : NODE_ENV,
		devtool: 'source-map',
		optimization: {
			minimize: false,
			minimizer: [
				new TerserPlugin({
					terserOptions: {
						format: {
							comments: false,
						},
					},
					extractComments: false,
				}),
			],
		},
		entry: [
			'webpack-hot-middleware/client',
			'./index.jquery',
		],
		output: {
			path: path.join(__dirname, 'demo'),
			filename: 'jquery.' + packageConfig.name + '.js',
			publicPath: '/dist/',
			hotUpdateChunkFilename: 'jquery.hot-update.js',
			hotUpdateMainFilename: 'jquery.hot-update.json'
		},
		plugins: [
			new webpack.HotModuleReplacementPlugin(),
			new webpack.NoEmitOnErrorsPlugin(),
			new webpack.DefinePlugin({
				'process.env': {
					'NODE_ENV': JSON.stringify(NODE_ENV)
				}
			})
		],
		resolve: {
			extensions: ['.js'],
			modules: ['src', 'node_modules']
		}
	};
	
	if (NODE_ENV === 'production') {
		var minified = env.minified == 'yes';
		var filename = minified ? packageConfig.name + '.min.js' : packageConfig.name + '.js';

		filename = 'jquery.' + filename;

		if (minified) {
			config.optimization = {
				minimize: true,
				minimizer: [
					new TerserPlugin({
						terserOptions: {
							format: {
								comments: false,
							},
						},
						extractComments: false,
					}),
				],
			};
		}
	
		config.entry = './index.jquery';
		config.output = {
			sourceMapFilename: filename + '.map',
			path: path.join(__dirname, 'dist'),
			filename: filename,
			libraryTarget: 'umd'
		};
	
		config.mode = NODE_ENV;
		config.plugins = [
			new webpack.DefinePlugin({
				'process.env': {
					'NODE_ENV': JSON.stringify(NODE_ENV)
				}
			}),
		];
	}
	return config;
}

if (process.argv[2] === '--dev-server') {
	let env = {};
	env.env = 'development';
	env.minified = 'no';
	module.exports = getConfig(env);
} else {
	module.exports = [
		function(env) {
			return getConfig(env);
		},
		function(env) {
			return getJqueryConfig(env);
		},
	]
}
