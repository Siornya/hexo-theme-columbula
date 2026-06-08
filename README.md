# Columbula

一款为 [Hexo](https://hexo.io/) 打造的主题

---

## 特性

- **导航栏** — 文章页空闲 3 秒自动收缩为「标题 + 阅读进度条」，鼠标移入立即展开。
- **三栏首页** — 左侧个人名片 + 分类，中间文章卡片流，右侧最近更新 + 标签云。
- **文章页自动目录** — 从正文 `h1~h4` 自动生成 TOC，滚动高亮跟随；移动端为抽屉式。
- **随机封面** — 未指定封面的文章自动从 `covers` 目录随机取图，加载失败时回退为渐变色块。
- **代码高亮** — 基于 [highlight.js](https://highlightjs.org/)，并自动给代码块加语言角标。
- **数学公式** — 内置 [MathJax 3](https://www.mathjax.org/)，支持 TeX/MML。
- **配置化的特殊页面** — `categories` / `tags` / `about` 等页面通过 `_config.yml` 映射模板，新增页面无需改 JS。
- **多语言菜单** — 导航文案支持多语言，跟随站点 `language`。
- **响应式** — 桌面三栏 / 两栏，移动端自动单栏。

---

## 功能

---

## 安装

将本主题放到 Hexo 站点的 `themes/columbula` 目录下，然后在**站点根目录**的 `_config.yml` 中启用：

```yaml
theme: columbula
```

主题依赖 highlight.js 与 MathJax，均通过 CDN 加载，无需额外安装。

---

## 配置

### 1. 站点配置

主题会从站点根目录`_config.yml`读取以下站点级字段：

| 字段 | 用途 |
| --- | --- |
| `title` | 站点标题，显示在导航栏 logo 与页面标题 |
| `author` | 作者名，显示在首页名片与关于页 |
| `description` | 个人简介 / 副标题（支持 HTML） |
| `language` | `zh` 或 `en`，决定导航菜单文案 |

可以使用`<br>`换行

### 2. 主题配置

默认的主题配置位于`themes/columbula/_config.yml`，但是在新版本Hexo中推荐使用站点根目录的`_config.columbula.yml`。你可以选择将默认配置文件复制一份到站点根目录。

---

## 写作

### 文章 front-matter

```yaml
---
title: 文章标题
date: 2026-06-05 12:00:00
categories: [分类]
tags: [标签1, 标签2]
cover: /images/covers/my-cover.jpg   # 可选，缺省则随机取图
sticky: true                         # 可选，置顶
---
```

### 封面图

- 在 `source/images/covers/` 放入封面图，命名为 `cover-01.jpg`、`cover-02.jpg` …
- 文件名列表维护在 `source/js/main.js` 顶部的 `COVERS` 数组中，可按需修改。

---

## 特殊页面

主题已经配置了 `categories` / `tags` / `about` 这类页面的特殊模板，如果还需要添加特殊页面，可以在配置中的`special_pages`里添加。

### 工作机制

`special_pages` 的**键**会按如下顺序匹配，命中后自动为该页面套用 `layout/<值>.ejs`：

1. 页面 front-matter 中的 `type`；
2. 若无 `type`，则回退到页面所在的**顶层目录名**（如 `source/about/index.md` → `about`）。

构建时若 `special_pages` 配置的 layout 缺少对应 `.ejs` 模板，会打印一条 `WARN` 提示，并回退到默认 layout。

### 关于页

`source/about/index.md` 中**每个一级标题 `#` 会自动渲染为一张独立卡片**，标题下方的内容（段落、`##` 子标题、列表、图片等）归入该卡片，直到下一个 `#`。

front-matter 支持可选的 `social` 映射，用于在名片处展示社交链接：

```yaml
---
title: 关于
social:
  GitHub: https://github.com/yourname
  Email: mailto:you@example.com
---

# 你好
这是第一张卡片的内容。

# 关于本站
这是第二张卡片的内容。
```

---

## 目录结构

```
columbula/
├── _config.yml                 # 默认配置
├── languages/                  # 多语言
├── layout/
│   ├── *.ejs                   # 页面模板
│   └── _partial/navbar.ejs     # 导航栏
├── scripts/
│   └── special-pages-layout.js # 特殊页面布局对应
└── source/
    ├── css/                    # 样式
    ├── js/                     # 脚本
    └── images/                 # 图片
```

---

## 🎨 自定义样式

所有样式以 `source/css/style.css` 为入口，按页面拆分：`base` / `home` / `post` / `components` / `archive` / `about`。主题色、玻璃参数等通过 `layout.ejs` 注入为 CSS 变量（`--accent`、`--glass-blur` 等），可在各 CSS 文件中直接使用。

---

## 许可

**版权所有 © 2026 Siornya。**

本主题原创自制。在保留本版权声明的前提下，**允许**：

- ✅ 下载并将本主题用于**自己的**网站（请在任意位置标注，谢谢）
- ✅ 为适配自己的站点而进行**任意修改**

但**不得**：

- ❌ 以任何形式**再分发**，无论是否收费
- ❌ 作为你自己的作品**公开发布**
- ❌ 用于任何**商业用途**

> 本主题运行时通过 CDN 加载的 [highlight.js](https://highlightjs.org/)、[MathJax](https://www.mathjax.org/) 等第三方库各自遵循其原始许可，不在本声明范围内。
