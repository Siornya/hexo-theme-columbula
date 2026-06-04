/* ═══════════════════════════════════════════════════
   根据页面 type 自动套用特殊模板
   让 categories / tags 这类页面无需在 front-matter 写 layout
   （否则会回退到站点的 default_layout）
═══════════════════════════════════════════════════ */

const TYPE_TO_LAYOUT = {
  categories: 'categories',
  tags: 'tags',
};

hexo.extend.filter.register('before_generate', function () {
  const Page = this.model('Page');

  // 收集所有写入操作并返回 Promise，确保生成器在 layout 更新完成后才运行
  const tasks = Page.toArray().map((page) => {
    const layout = TYPE_TO_LAYOUT[page.type];
    if (layout && page.layout !== layout) {
      page.layout = layout;
      return page.save();
    }
    return null;
  });

  return Promise.all(tasks);
});
