/* ═══════════════════════════════════════════════════
   根据页面 type 自动套用特殊模板
═══════════════════════════════════════════════════ */

const fs = require('fs');
const path = require('path');

hexo.extend.filter.register('before_generate', function () {
  // 映射表来自主题配置 _config.yml 的 special_pages 字段
  const TYPE_TO_LAYOUT = this.theme.config.special_pages || {};

  // ── 校验：配置的 layout 是否存在对应模板文件，缺失则告警 ──
  const layoutDir = path.join(this.theme_dir, 'layout');
  let layoutFiles = [];
  try {
    layoutFiles = fs.readdirSync(layoutDir);
  } catch (e) {
    /* 读取失败就跳过校验，不影响生成 */
  }
  const hasTemplate = (layout) =>
    layoutFiles.some((f) => f.replace(/\.[^.]+$/, '') === layout);

  for (const [type, layout] of Object.entries(TYPE_TO_LAYOUT)) {
    if (!hasTemplate(layout)) {
      this.log.warn(
        `[special_pages] type "${type}" 指定的 layout "${layout}" 缺少模板 ` +
        `layout/${layout}.ejs，该页面将回退到默认 layout。`
      );
    }
  }

  const Page = this.model('Page');

  // 收集所有写入操作并返回 Promise，确保生成器在 layout 更新完成后才运行
  const tasks = Page.toArray().map((page) => {
    // 优先用 front-matter 的 type，缺失时回退到页面所在的顶层目录名
    // 例如 source/about/index.md → 'about'，无需手写 type
    const dir = page.source ? page.source.split(/[\\/]/)[0] : '';
    const key = page.type || dir;
    const layout = TYPE_TO_LAYOUT[key];
    if (layout && page.layout !== layout) {
      page.layout = layout;
      return page.save();
    }
    return null;
  });

  return Promise.all(tasks);
});
