const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const autoprefixer = require("autoprefixer");

module.exports = {
	entry: {
		app: './index.js',
	},
	devtool: 'hidden-source-map',
	optimization: {
		minimizer: [
			new UglifyJsPlugin({sourceMap: false}),
			new OptimizeCSSAssetsPlugin({})
		]
	},
	plugins: [
		new CleanWebpackPlugin(['dist']),
		new HtmlWebpackPlugin({
			template: './index.html',
			hash: true,
		}),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('production')
		}),
		new MiniCssExtractPlugin({
			filename: "[name]_[hash].css",
			chunkFilename: "[id]_[hash].css"
		}),
		new webpack.LoaderOptionsPlugin({
			options: {postcss: [autoprefixer()]}
		}),
	],
	output: {
		filename: '[name]_[hash].js',
		path: path.resolve(__dirname, 'dist'),
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
					MiniCssExtractPlugin.loader,
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
						name: './[hash].[ext]',
						publicPath: 'fonts/',
						outputPath: 'fonts/'
					}
				}
			}
		]
	}
};