const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
	entry : './src/index.js',
	output : {
		filename : 'bundle.js',
		path : path.resolve(__dirname, 'dist')
	},
	module : {
		rules : [ // module rule setting
			{
				test : /\.js/, //all js file
				exclude : /node_modules/, //npm module excluing
				use: 'babel-loader'
			}
		]
	},
	plugins : [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			template : './src/index.html'
		})
	],
	mode : 'production', 
};