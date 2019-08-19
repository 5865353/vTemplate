module.exports = {
    presets: [
        ['@vue/app', {
            polyfills: [
                'es6.promise',
                'es6.object.assign'
            ]
        }],
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