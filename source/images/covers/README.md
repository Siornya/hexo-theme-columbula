# 封面图目录

将你的封面图片放在这里。

## 命名规则

默认命名格式为：

  cover-01.jpg
  cover-02.jpg
  cover-03.jpg
  ...（最多 cover-10.jpg）

如需更多图片，请同步修改 source/js/main.js 中的 COVERS 数组。

## 支持格式

jpg、png、webp 均可，建议尺寸 1200×630px 以上，横向比例。

## 使用说明

- 文章 frontmatter 中设置了 `cover: /path/to/img` 则优先使用该图片
- 未设置 cover 的文章，主题会从本目录随机选取一张作为封面
