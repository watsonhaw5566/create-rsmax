# <%= name %>

<%- description %>

## 快速开始

安装依赖：

```bash
npm install
```

## 开发

启动开发模式，监听文件变化：

```bash
npm run dev
```

## 构建

构建生产版本：

```bash
npm run build
```

## 清理

清理构建输出目录：

```bash
npm run clean
```

## 预览

使用微信开发者工具打开项目根目录，`dist` 为编译输出目录。

## 目录结构

```
├── dist/           # 编译输出目录（构建后生成）
├── public/         # 静态资源
├── src/            # 源代码
│   ├── pages/      # 页面
│   ├── app.js      # 小程序入口
│   ├── app.json    # 小程序配置
│   ├── app.css     # 全局样式
│   └── theme.json  # 主题配置（支持暗色模式）
├── .gitignore
├── package.json
└── project.config.json  # 微信开发者工具项目配置
```

## License

MIT
