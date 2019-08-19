module.exports = {
    presets: [
        ['@vue/app', {
            polyfills: [
                'es6.promise',
                'es6.object.assign',
                /*'es6.set',
                'es6.map'*/ // 具体配置项查看 node_modules --> core-js
            ]
        }],
        ["@babel/preset-env", {
            "useBuiltIns": "usage", // entry or "usage"
            "corejs": 3,
            "modules": "commonjs",
            "debug":true  // 在控制输出转换信息
        }]
    ],
    plugins: ["@babel/plugin-transform-runtime"]
}