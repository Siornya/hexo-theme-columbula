/* ═══════════════════════════════════════════════════
   navbar.js — 灵动岛导航栏交互
   - 文章页：鼠标离开 3 秒后收缩为标题+进度条
   - 鼠标移回导航栏立刻展开
   - 滚动时实时更新进度条
═══════════════════════════════════════════════════ */

(function () {
  const wrap      = document.getElementById('navbar-wrap');
  const expanded  = document.getElementById('navbar-expanded');
  const collapsed = document.getElementById('navbar-collapsed');
  const progress  = document.getElementById('navbar-progress-bar');

  /* 非文章页不处理 */
  if (!window.__IS_POST__ || !wrap || !expanded || !collapsed) return;

  /* ── 阅读进度条 ──────────────────────────────── */
  function updateProgress() {
    const doc    = document.documentElement;
    const total  = doc.scrollHeight - doc.clientHeight;
    const pct    = total > 0 ? (window.scrollY / total) * 100 : 0;
    progress.style.width = pct.toFixed(2) + '%';
  }

  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();

  /* ── 展开 / 收缩 ─────────────────────────────── */
  let idleTimer = null;
  let isCollapsed = false;
  const IDLE_DELAY = 3000; // ms

  function collapse() {
    if (isCollapsed) return;
    isCollapsed = true;
    expanded.classList.add('hiding');
    /* 等展开态淡出后再显示收缩态，避免重叠闪烁 */
    setTimeout(function () {
      collapsed.classList.add('visible');
    }, 200);
  }

  function expand() {
    if (!isCollapsed) return;
    isCollapsed = false;
    collapsed.classList.remove('visible');
    setTimeout(function () {
      expanded.classList.remove('hiding');
    }, 80);
  }

  /* 鼠标移入导航栏区域 → 立刻展开并暂停计时 */
  wrap.addEventListener('mouseenter', function () {
    clearTimeout(idleTimer);
    expand();
  });

  /* 鼠标离开导航栏 → 重新开始倒计时 */
  wrap.addEventListener('mouseleave', function () {
    idleTimer = setTimeout(collapse, IDLE_DELAY);
  });

  /* 页面初始启动计时 */
  idleTimer = setTimeout(collapse, IDLE_DELAY);

})();
