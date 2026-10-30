# Create Rsmax App

一个用于快速生成 [Rsmax](https://github.com/watsonhaw5566/rsmax) 微信小程序项目的脚手架，开箱即用，无需手动配置构建流程。

## 特性

- 🚀 **零配置**：一行命令生成可运行的微信小程序工程
- ⚛️ **JSX + Hooks**：使用熟悉的 React 风格语法开发小程序
- 🎨 **CSS Modules**：天然支持样式隔离
- 🌙 **深色模式**：模板内置 `theme.json` 主题切换示例
- 🔧 **现代工具链**：基于 Rsmax 2.0 的全新编译内核

## 环境要求

- Node.js >= 20
- pnpm >= 10（也可使用 npm / yarn）
- 微信开发者工具

## 快速开始

### 使用 pnpm（推荐）

```sh
pnpm create rsmax first-rsmax-app
cd first-rsmax-app && pnpm install
```

### 使用 npm

```sh
npx create-rsmax first-rsmax-app
cd first-rsmax-app && npm install
```

### 使用 yarn

```sh
yarn create rsmax first-rsmax-app
cd first-rsmax-app && yarn
```

生成完成后，进入项目目录依次执行：

```sh
pnpm dev        # 启动开发模式，监听源码变化
pnpm build      # 生产构建
pnpm clean      # 清理 dist/
```

随后用微信开发者工具打开项目根目录即可预览，开发者工具会以 `dist/` 作为小程序目录。

## 命令行参数

```
create-rsmax <project-directory> [options]

Options:
  -c, --check              启用 npm 版本检查（默认开启）
  -y, --yes                跳过交互式提问，使用默认值（CI 场景）
  -n, --name <name>        项目名（默认取目录名）
  -a, --author <author>    作者（默认取 git user）
  -d, --description <desc> 项目描述
  -h, --help               查看帮助
  -v, --version            查看版本
```

## 相关链接

- Rsmax 官网：<https://rsmax.watsonhaw.top/>
- Rsmax 仓库：<https://github.com/watsonhaw5566/rsmax>
- 问题反馈：<https://github.com/watsonhaw5566/create-rsmax/issues>

## License

[MIT](./LICENSE)
