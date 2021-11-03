const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const WebpackObfuscator = require('webpack-obfuscator');

module.exports = {
	entry       : './src/header.js',
	output      : {
		path    : path.resolve(__dirname, 'dist'),
		filename: 'main.js'
	},
	mode        : 'development',
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
				test: /\.s[ac]ss$/i,
				use : [
					'style-loader',
					'css-loader',
					'sass-loader',
					{
						loader: 'sass-resources-loader',
						options: {
							resources: [
								'src/styles.css/vars.scss'
							]
						}
					}
				]
			}
		]
	},
	plugins     : [
		new HtmlWebPackPlugin({
			template: './src/index.html',
			filename: './index.html'
		}),
		new WebpackObfuscator({
			rotateStringArray: true
		}, ['excluded_bundle_name.js'])
	],
	optimization: {
		minimize: true,
	},
	devServer   : {
		compress: true,
		port    : 3000,
	},
}