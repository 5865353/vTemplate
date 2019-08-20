module.exports = {
    presets: [
        ['@vue/app', {
        "polyfills":[
            'es6.array.iterator',
            'es6.promise',
            'es6.object.assign',
            "es6.set",
            "es6.map",
            'es7.promise.finally',
        ]
        }]
    ]
}