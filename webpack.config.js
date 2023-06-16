const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")


const isProduction = process.env.NODE_ENV === "production";
const stylesHandler = MiniCssExtractPlugin.loader;

const config = {
	mode: 'production',
	entry: "/src/index.ts",
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "bundle.js"
	},
	devServer: {
		port: 3000,
		open: true,
		host: "localhost",
		historyApiFallback: true
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "index.html"
		}),
		new MiniCssExtractPlugin(),
	],

	module: {
		rules: [
			{
				test: /\.(ts|tsx)$/i,
				use: [
					{
						loader: "ts-loader",
						options: {
							configFile: path.resolve(__dirname, 'tsconfig.json'),
						},
					}],
				exclude: /(node_modules)/

			},
			{
				test: /\.css$/i,
				use: [stylesHandler, "css-loader"],
			},
			{
				test: /\.pcss$/i,
				use: [stylesHandler, "css-loader", "postcss-loader",
					{
						loader: "postcss-loader",
						options: {
							postcssOptions: {
								plugins: [
									[
										"postcss-preset-env",
										
									],
								],
							},
						},
					}

				],
			},
			{
				test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
				type: "asset",
			},
			{
				test: /\.hbs$/,
				use: ["handlebars-loader"]
			}
		],
	},
	resolve: {
		extensions: [".ts", ".js", ".json"],
		alias: {
			'handlebars': 'handlebars/dist/handlebars.js',
		}
	},
}

module.exports = () => {
	if (isProduction) {
		config.mode = "production"
	} else {
		config.mode = "development"
	}
	return config
}
