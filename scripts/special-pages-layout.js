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

  Page.toArray().forEach((page) => {
    const layout = TYPE_TO_LAYOUT[page.type];
    if (layout && page.layout !== layout) {
      page.layout = layout;
      page.save();
    }
  });
});
