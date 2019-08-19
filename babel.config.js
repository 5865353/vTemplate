module.exports = {
    presets: [
        ["@babel/preset-env", {
            "useBuiltIns": "usage", // entry or "usage"
            "corejs": 3,
            "modules": "commonjs",
            "targets": {
                "browsers": ["> 1%", "last 2 versions", "not ie <= 11"]
            }
        }]
    ],
    plugins: ["@babel/plugin-transform-runtime"]
}