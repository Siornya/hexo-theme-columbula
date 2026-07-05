/* ═══════════════════════════════════════════════════
   Columbula — main.js
═══════════════════════════════════════════════════ */

(function () {
  /* ── 1. 随机封面图 ──────────────────────────────
     对所有 data-random-cover="true" 的 img，
     从 data-covers-dir 目录扫描列表（通过约定文件名）。
     实际使用时，请在 source/images/covers/ 放入图片，
     并保证文件名为 cover-01.jpg, cover-02.jpg ... 格式，
     或修改下方 COVERS 数组为你的实际文件名列表。
  ─────────────────────────────────────────────── */
  const COVERS = [
    "cover-01.jpg",
    "cover-02.jpg",
    "cover-03.jpg",
    "cover-04.jpg",
    "cover-05.jpg",
    "cover-06.jpg",
    "cover-07.jpg",
    "cover-08.jpg",
    "cover-09.jpg",
    "cover-10.jpg",
  ];

  document
    .querySelectorAll('img[data-random-cover="true"]')
    .forEach(function (img) {
      const dir = img.dataset.coversDir || "/images/covers";
      const file = COVERS[Math.floor(Math.random() * COVERS.length)];
      img.src = dir.replace(/\/$/, "") + "/" + file;
      img.onerror = function () {
        /* 封面图加载失败时，用渐变占位 */
        img.style.display = "none";
        const wrap = img.parentElement;
        if (wrap) {
          wrap.style.background = randomGradient();
        }
      };
    });

  function randomGradient() {
    const gradients = [
      "linear-gradient(135deg,#b8ccf5,#8aaae8)",
      "linear-gradient(135deg,#c5d8f0,#9ab8e5)",
      "linear-gradient(135deg,#d0c8f5,#a898e8)",
      "linear-gradient(135deg,#b8dff5,#7abde8)",
      "linear-gradient(135deg,#d5e8f5,#a0c5e8)",
    ];
    return gradients[Math.floor(Math.random() * gradients.length)];
  }

  /* ── 2. 目录自动生成（正文页） ──────────────────
     从 #article-body 内的 h2/h3 生成目录，
     渲染到 #toc。
  ─────────────────────────────────────────────── */
  const articleBody = document.getElementById("article-body");
  const tocNav = document.getElementById("toc");

  if (articleBody && tocNav) {
    const headings = articleBody.querySelectorAll("h1, h2, h3, h4");

    const tocWrap = document.getElementById("post-toc-wrap");
    const tocFab = document.getElementById("toc-fab");
    const tocBackdrop = document.getElementById("toc-backdrop");

    if (headings.length === 0) {
      /* 无目录：隐藏目录卡片与浮动按钮 */
      if (tocWrap) tocWrap.style.display = "none";
      if (tocFab) tocFab.style.display = "none";
    } else {
      headings.forEach(function (h, i) {
        /* 给标题加锚点 id */
        if (!h.id) h.id = "heading-" + i;

        const a = document.createElement("a");
        const indent = { H1: " toc-h1", H2: "", H3: " toc-h3", H4: " toc-h4" };
        a.href = "#" + h.id;
        a.className = "toc-link" + (indent[h.tagName] || "");
        a.textContent = h.textContent;
        a.dataset.target = h.id;

        a.addEventListener("click", function (e) {
          e.preventDefault();
          document.getElementById(h.id).scrollIntoView({ behavior: "smooth" });
          closeToc(); /* 移动端点击目录项后关闭抽屉 */
        });

        tocNav.appendChild(a);
      });

      /* ── 移动端目录抽屉开关 ─────────────────────── */
      function setToc(open) {
        if (tocWrap) tocWrap.classList.toggle("toc-open", open);
        if (tocBackdrop) tocBackdrop.classList.toggle("toc-open", open);
        if (tocFab) {
          tocFab.classList.toggle("toc-open", open);
          tocFab.setAttribute("aria-expanded", open ? "true" : "false");
        }
      }
      function closeToc() {
        setToc(false);
      }

      if (tocFab) {
        tocFab.addEventListener("click", function () {
          setToc(!tocWrap.classList.contains("toc-open"));
        });
      }
      if (tocBackdrop) {
        tocBackdrop.addEventListener("click", closeToc);
      }

      /* ── 3. 目录高亮跟随滚动 ─────────────────── */
      const tocLinks = tocNav.querySelectorAll(".toc-link");

      const observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              tocLinks.forEach(function (link) {
                link.classList.toggle(
                  "active",
                  link.dataset.target === entry.target.id,
                );
              });
            }
          });
        },
        {
          rootMargin: "-60px 0px -70% 0px",
          threshold: 0,
        },
      );

      headings.forEach(function (h) {
        observer.observe(h);
      });
    }
  }

  /* ── 4. 代码块语言标记 ──────────────────────────
     在 highlight.js 处理后，给每个 pre 加上语言角标。
  ─────────────────────────────────────────────── */
  document.querySelectorAll("pre code").forEach(function (code) {
    const pre = code.parentElement;
    const lang = (code.className.match(/language-(\w+)/) || [])[1];
    if (lang) {
      pre.style.position = "relative";
      const label = document.createElement("span");
      label.className = "hljs-code-lang";
      label.textContent = lang;
      pre.appendChild(label);
    }
  });

  /* 5. 代码块复制 */
  function getCodeText(block) {
    const codePre = block.matches("figure.highlight")
      ? block.querySelector(".code pre")
      : block.querySelector("code");

    if (!codePre) return "";

    /* Hexo 的行号代码块使用 <br> 分行，textContent 不会保留这些换行。 */
    const lines = Array.prototype.filter.call(codePre.children, function (child) {
      return child.classList.contains("line");
    });

    return lines.length
      ? lines.map(function (line) {
          return line.textContent;
        }).join("\n")
      : codePre.textContent;
  }

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    }

    return new Promise(function (resolve, reject) {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();

      try {
        if (!document.execCommand("copy")) throw new Error("copy failed");
        resolve();
      } catch (error) {
        reject(error);
      } finally {
        textarea.remove();
      }
    });
  }

  const codeBlocks = Array.prototype.slice.call(
    document.querySelectorAll(".post-article-content figure.highlight"),
  );

  document
    .querySelectorAll(".post-article-content pre > code")
    .forEach(function (code) {
      const pre = code.parentElement;
      if (!pre.closest("figure.highlight")) codeBlocks.push(pre);
    });

  codeBlocks.forEach(function (block) {
    if (block.querySelector(":scope > .code-copy-button")) return;

    block.classList.add("has-code-copy");

    const button = document.createElement("button");
    button.className = "code-copy-button";
    button.type = "button";
    button.textContent = "复制";
    button.title = "复制代码";
    button.setAttribute("aria-label", "复制代码");

    button.addEventListener("click", function () {
      copyText(getCodeText(block)).then(
        function () {
          button.textContent = "已复制";
          button.classList.add("copied");
          window.setTimeout(function () {
            button.textContent = "复制";
            button.classList.remove("copied");
          }, 1600);
        },
        function () {
          button.textContent = "复制失败";
          window.setTimeout(function () {
            button.textContent = "复制";
          }, 1600);
        },
      );
    });

    block.appendChild(button);
  });
})();
