const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
// const WebpackObfuscator = require('webpack-obfuscator');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
	entry       : './src/index.js',
	output      : {
		path    : path.resolve(__dirname, 'dist'),
		filename: 'main.js'
	},
	module      : {
		rules: [
			{
				test: /\.html$/,
				use : [
					{
						loader : 'html-loader',
						options: {
							minimize: false
						}
					}
				]
			}, {
				test: /\.(s[ac]ss|css)$/i,
				use : [
					'style-loader',
					'css-loader',
					'postcss-loader',
					'sass-loader',
					{
						loader : 'sass-resources-loader',
						options: {
							resources: [
								'src/styles/vars.scss'
							]
						}
					}
				]
			}, {
				test   : /\.js$/,
				exclude: /node_modules/,
				use    : ['babel-loader'],
			}, {
				test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
				type: 'asset/resource',
			}, {
				test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
				type: 'asset/inline',
			},
		]
	},
	plugins     : [
		new HtmlWebPackPlugin({
			template: './src/index.html',
			filename: './index.html'
		}),
		// new WebpackObfuscator({
		// 	rotateStringArray: true
		// }, ['excluded_bundle_name.js']),
		new CleanWebpackPlugin()
	],
	optimization: {
		minimize: true,
	},
	mode        : 'development',
	devServer   : {
		historyApiFallback: true,
		open              : true,
		compress          : true,
		hot               : true,
		port              : 8080,
	},
}