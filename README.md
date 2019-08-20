### 项目技术栈 （环境）
```
   架构 ：Vue2.X全家桶 Vue-cli3 node10.X+ webpack 4.X + babel 7.X
   Ui: ant-design-vue
   request: axios
   utils : vue-ls, moment, nprogress
   
```

### 项目启动 
```
 请确保你环境已搭建完毕
 输入 npm i 安装项目依赖 速度慢可切换 cnpm (淘宝镜像)
 输入 npm run serve 启动项目
```

### 项目打包
```
npm run build
```
## 兼容性配置
```
    项目兼容: 配置 browserslistrc文件
```
+ 兼容ie9
```javascript
> 1%
last 3 versions
not ie <= 8 
```
+ 兼容ie11
```javascript
> 1%
last 2 versions
not ie <= 10
```
+ 查看当前项目的兼容
```javascript
npx browserslist
```
+ 如遇到 ie 报错 
```javascript
打开控制台查看不兼容的语法
打开babel.config.js 配置 presets--> polyfills 在里面添加转换插件 
vue-cli 脚手架 默认使用的是core-js 2 [查看文档配置](https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/babel-preset-app#polyfills)
```