/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-env node, amd */

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
	entry: path.resolve(__dirname, "src", "main.ts"),
	mode: "development",
	devtool: "eval-source-map",
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			title: "Timetable",
			template: path.resolve(__dirname, "src", "index.html"),
		}),
	],
	output: {
		filename: "main.js",
		path: path.resolve(__dirname, "dist"),
	},
	module: {
		rules: [
			{
				test: /\.css$/i,
				use: ["style-loader", "css-loader"],
			},
			{
				test: /\.tsx?$/,
				loader: ["babel-loader", "ts-loader"],
			},
		],
	},
	resolve: {
		extensions: [
			"*", ".js", ".jsx", ".tsx", ".ts",
		],
	},
};
