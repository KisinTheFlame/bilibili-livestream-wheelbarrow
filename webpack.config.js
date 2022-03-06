const path = require("path")

module.exports = {
    entry: "./src/index.tsx",
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "dist"),
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            ["@babel/preset-env"],
                            ["@babel/preset-react", {runtime: "automatic"}],
                        ],
                        plugins: [
                            ["@babel/plugin-transform-runtime"],
                            ["@babel/plugin-transform-react-jsx", { "runtime": "automatic" }]
                        ]
                    }
                },
                exclude: /node-modules/,
            }
        ]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js", ".jsx"],
    },
    mode: "production",
};
