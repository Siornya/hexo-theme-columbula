# Columbula

一款为 [Hexo](https://hexo.io/) 打造的主题

目前还在快速更新中
如果有任何改进建议或想法欢迎提交issue或与我联系

[示例网站](https://siornya.github.io)

## 特性

- **导航栏** — 文章页空闲 3 秒自动收缩为「标题 + 阅读进度条」，鼠标移入立即展开。
- **三栏首页** — 左侧个人名片 + 分类，中间文章卡片流，右侧最近更新 + 标签云。
- **随机封面** — 未指定封面的文章自动从 `covers` 目录随机取图，加载失败时回退为渐变色块。
- **特殊页面配置** — `categories` / `tags` / `about` 等页面通过 `_config.yml` 映射到特殊模板。
- **代码块与公式块** — 基于内置 [highlight.js](https://highlightjs.org/) 与 [MathJax 3](https://www.mathjax.org/)。自动给代码块加语言角标，公式块支持 TeX/MML。
- **多语言菜单** — 导航文案支持多语言，跟随站点 `language`。

---

## 安装

将本主题放到 Hexo 站点的 `themes/columbula` 目录下，然后在**站点根目录**的 `_config.yml` 中启用：

```yaml
theme: columbula
```

## 配置

主题会从站点根目录`_config.yml`读取以下站点级字段：

`title``author``description``language`

文字部分可以使用`<br>`换行

默认的主题配置位于`themes/columbula/_config.yml`，根据Hexo推荐的方案，你可以复制一份默认配置到网站根目录并命名为`_config.columbula.yml`

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

## 特殊页面

主题已经配置了 `categories` / `tags` / `about` 这类页面的特殊模板，如果还需要添加特殊页面，可以在配置中的`special_pages`里添加。

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
  Email: mail@example.com
---

# 你好
这是第一张卡片的内容。

# 关于本站
这是第二张卡片的内容。
```

### 分类页

分类页中每个类别对应一张独立卡片，卡片中展示这个类别的简介和几篇最新文章

`source/categories/index.md` 中的front-matter部分中的`desc`对应分类页中的每个类别的介绍

卡片顺序根据`desc`中出现的顺序，如果没有定义，则会根据文章数量排序

---

## 二次修改

本主题允许进行二次修改，以下是一些可能对你有帮助的内容

### 目录结构

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

### 🎨 自定义样式

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
