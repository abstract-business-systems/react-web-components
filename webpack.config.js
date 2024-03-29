const path = require('path');
const nodeExternals = require('webpack-node-externals');
const { prepareEntry } = require('./lib/webpackManager');
const config = require('./lib/config');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const entry = prepareEntry(config);

module.exports = {
	mode: 'production',
	externals: [nodeExternals()],
	plugins: [new CleanWebpackPlugin()],
	entry: entry,
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: { loader: 'babel-loader' },
			},
			{
				test: /\.css$/,
				use: [
					'style-loader',
					'css-loader',
				],
			},
			{
				test: /\.s[ac]ss$/i,
				use: [
					'style-loader',
					'css-loader',
					'sass-loader',
				],
			},
		],
	},
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: '[name].js',
		libraryTarget: 'umd',
	},
};
