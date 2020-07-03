const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const autoprefixer = require("autoprefixer");


module.exports = {
	entry: {
		app: './index.js',
	},
	plugins: [
		new webpack.ProvidePlugin({
			jQuery: 'jquery',
			$: 'jquery',
			jquery: 'jquery'
		}),
		new HtmlWebpackPlugin({
			template: './index.html',
		}),
		new webpack.NamedModulesPlugin(),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('development')
		}),
		new webpack.LoaderOptionsPlugin({
			options: {postcss: [autoprefixer()]}
		}),
	],
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist'),
		publicPath: '/',
	},
	devtool: 'eval',
	devServer: {
		port: 8080,
		contentBase: [path.join(__dirname, 'dist'), path.join(__dirname, 'src')],
		compress: true,
		quiet: false,
		disableHostCheck: true,
		historyApiFallback: true,
		publicPath: "/",
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /(node_modules)/,
				loader: "babel-loader",
			},
			{
				test: /\.json$/,
				loader: 'json-loader'
			},
			{ test: /bootstrap\/dist\/js\/umd\//, loader: 'imports?jQuery=jquery' },
			{
				test: /\.(sa|sc|c)ss$/,
				use: [
					'style-loader',
					{
						loader: "css-loader",
						options: {
							modules: false,
							localIdentName: '[local]__[hash:base64:5]',
						}
					},
					{
						loader: 'postcss-loader',
					},
					'sass-loader',
				],
			},
			{
				test: /\.(gif|png|jpe?g|svg)$/i,
				include : path.join(__dirname, 'img'),
				use: [
					{
						loader: 'file-loader',
						options: {
							name: "img/[name].[ext]"
						},
					},
				],
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				use: {
					loader: 'file-loader',
					options: {
						name: './[name].[ext]',
						publicPath: 'fonts/',
						outputPath: 'fonts/'
					}
				}
			}
		]
	}
};