### 项目说明
快速开始Javascript工具类库开发的手脚架

安装依赖：`yarn install` `npm install`

启动项目：`npm run dev`

打包项目：`npm run build`

#### 目录结构
```$xslt
| + build
| + dist 输出文件
| + doc 工具类库使用说明文档
| - index.html 文档首页
|   + js 工具类库js存放位置
| + src 
| - main.js 项目主入口
|   gulpfile.js
|   rollup.config.js  rollup配置
```

#### 项目配置说明
package.json
```$xslt
{
  ...
  "name": "LibraryName", // 工具类库的方法名称，调用示例：const lib = new LibraryName(params)
  "version": "0.0.0", // 工具类库的版本号，打包输出的文件名: ${name}.v${version}.js
  "main": "src/main.js", // 项目主入口文件
  ...
}
```
