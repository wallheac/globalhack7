const path = require("path");

module.exports = function(env) {
    return {
        mode: env && env.production ? "production" : "development",
        context: path.resolve(__dirname, "src", "static"),
        entry: {
            "index": "./index.js",
            "room/index": "./room/index.js"
        },
        output: {
            filename: "[name].bundle.js",
            path: path.resolve(__dirname, "dist", "static")
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader",
                        options: {
                            presets: ["@babel/preset-env"],
                            plugins: [
                                "@babel/plugin-transform-react-jsx",
                                "@babel/plugin-proposal-export-default-from",
                                ["@babel/plugin-proposal-optional-chaining", {loose: false}],
                                ["@babel/plugin-proposal-pipeline-operator", {proposal: "minimal"}],
                                ["@babel/plugin-proposal-nullish-coalescing-operator", {loose: false}],
                                ["@babel/plugin-proposal-decorators", {legacy: true}],
                                "@babel/plugin-proposal-export-namespace-from",
                                ["@babel/plugin-proposal-class-properties", {loose: true}]
                            ],
                            cacheDirectory: "tmp",
                            babelrc: false
                        }
                    }
                },
                {
                    test: /(\.png|\.jpg|\.gif|\.eot|\.woff|\.svg|\.woff2|\.ttf|\.swf)(\?.*)?$/,
                    use: {
                        loader: "file-loader",
                        options: {
                            name: "[path][name].[ext]"
                        }
                    }
                }
            ]
        },
        resolve: {
            modules: ["node_modules"],
            extensions: [".js", ".json"]
        },
        devServer: {
            // host: "0.0.0.0", // Enable it if you want your server to be accessible externally
            https: true,
            contentBase: path.join(__dirname, "dist", "static"),
            index: "index.html",
            compress: true,
            port: 9080,
            proxy: {
                "/static": {
                    target: "https://localhost:9080",
                    pathRewrite: {"^/static": ""},
                    secure: false
                },
                "/test": {
                    target: "wss://localhost:9081",
                    ws: true,
                    secure: false
                }
            },
            open: true,
            openPage: "static/index.html"
        }
    };
};
