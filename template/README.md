# <%= name %>

<%- description %>

基于 [Rsmax](https://github.com/watsonhaw5566/rsmax) `^2.0.0-beta.5` 的微信小程序模板。

## 环境要求

- Node.js >= 20
- pnpm >= 10
- 微信开发者工具

## 安装依赖

```bash
pnpm install
```

## 开发

启动监听模式（默认 `mode=development`，加载 `.env.development`）：

```bash
pnpm dev
```

然后用微信开发者工具打开当前项目根目录，工具会以 `dist/` 为小程序根目录。

## 构建

```bash
# 生产构建（默认 mode=production）
pnpm build

# 指定环境
pnpm build -- -m staging
```

## 清理

```bash
pnpm clean
```

## 目录结构

```
├── public/                 # 静态资源，直接拷贝到 dist/ 根目录
├── src/
│   ├── pages/
│   │   └── index/
│   │       ├── index.jsx         # 页面逻辑 + JSX 模板
│   │       └── index.module.css  # CSS Modules 样式
│   ├── app.js              # 小程序入口
│   ├── app.css             # 全局样式
│   ├── app.json            # 小程序配置
│   └── theme.json          # 深色模式主题
├── project.config.json     # 微信开发者工具项目配置
├── rsmax.config.js         # Rsmax 配置（可选）
└── package.json
```

## 进一步阅读

- 官网文档：<https://rsmax.watsonhaw.top/>
- 快速开始：<https://rsmax.watsonhaw.top/guide/getting-started>
- JSX 语法：<https://rsmax.watsonhaw.top/guide/jsx>
- Hooks API：<https://rsmax.watsonhaw.top/guide/hooks>
- 环境变量：<https://rsmax.watsonhaw.top/guide/env>
- 组件映射与 UI 库：<https://rsmax.watsonhaw.top/guide/ui-libraries>
