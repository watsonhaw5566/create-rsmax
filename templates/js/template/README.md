# Rsmax <%= platformTitle %>

<% if (one) { -%>
使用 Rsmax 开发跨平台小程序。
<% } else if (wechat) { -%>
使用 Rsmax 开发微信小程序。
<% } else if (toutiao) { -%>
使用 Rsmax 开发头条小程序。
<% } else if (ali) { -%>
使用 Rsmax 开发阿里小程序。
<% } else if (xhs) { -%>
使用 Rsmax 开发小红书小程序。
<% } -%>

## Getting Start

安装依赖

```bash
npm install
```
or
```bash
yarn
```
or
```bash
pnpm install
```

调试项目

```bash
<% if (one) { -%>
# 选定要进行开发的平台，如 wechat，并调试
$ npm run dev wechat
or
$ yarn dev wechat
or
$ pnpm dev wechat
<% } else { -%>
# 执行调试命令
$ npm run dev
or
$ yarn dev
or
$ pnpm dev
<% } -%>
```

<% if (one) { -%>
使用小程序开发者工具打开项目下的 `dist/[target]` 目录。
<% } else { -%>
使用小程序开发者工具打开项目下的 `dist` 目录
<% } -%>

## 构建

```bash
<% if (one) { -%>
# 选定要构建的平台，如 wechat，并执行构建
$ npm run build wechat
or
$ yarn build wechat
or
$ pnpm build wechat
<% } else { -%>
# 执行构建命令
$ npm run build
or
$ yarn build
or
$ pnpm build
<% } -%>
```

<% if (one) { -%>
使用小程序开发者工具打开项目下的 `dist/[target]` 目录，上传代码即可。
<% } else { -%>
使用小程序开发者工具打开项目下的 `dist` 目录，上传代码即可。
<% } -%>
