"use client";

import { useEffect, useRef, useState } from "react";

type Project = {
  slug: string;
  index: string;
  title: string;
  kicker: string;
  summary: string;
  role: string;
  year: string;
  cover: string;
  pages: string[];
  accent: string;
  size: "hero" | "standard";
};

const projects: Project[] = [
  {
    slug: "wlfi-app",
    index: "01",
    title: "WLFI APP",
    kicker: "Wallet · Trading · Earn · Design System",
    summary: "从 0 到 1 定义一款面向全球用户的金融产品，把复杂资产体验变得清晰、可信且有力量。",
    role: "Lead Product Designer",
    year: "2026",
    cover: "/assets/projects/wlfi-case/cover.webp",
    pages: Array.from({ length: 18 }, (_, index) =>
      `/assets/projects/wlfi-case/page-${String(index + 1).padStart(2, "0")}.webp`,
    ),
    accent: "acid",
    size: "hero",
  },
  {
    slug: "gate-community",
    index: "02",
    title: "GATE.IO COMMUNITY",
    kicker: "Global Community · Social · Growth",
    summary: "为全球化交易平台构建从内容发现、互动到转化的社区生态。",
    role: "UI Owner",
    year: "2024",
    cover: "/assets/projects/gate-community-case/cover.webp",
    pages: Array.from({ length: 14 }, (_, index) =>
      `/assets/projects/gate-community-case/page-${String(index + 1).padStart(2, "0")}.webp`,
    ),
    accent: "violet",
    size: "standard",
  },
  {
    slug: "web3-wallet",
    index: "03",
    title: "WEB3 WALLET",
    kicker: "Mobile Wallet · Asset · Swap",
    summary: "重新组织链上资产、交易与身份体验，让每一次操作都有明确反馈。",
    role: "Product Designer",
    year: "2025",
    cover: "/assets/projects/web3-wallet/page-01.webp",
    pages: Array.from({ length: 16 }, (_, index) =>
      `/assets/projects/web3-wallet/page-${String(index + 1).padStart(2, "0")}.webp`,
    ),
    accent: "blue",
    size: "standard",
  },
  {
    slug: "worldclaw",
    index: "04",
    title: "WORLDCLAW",
    kicker: "Web3 Security · Brand · Product",
    summary: "以更锐利的品牌语言讲清资产保护，为安全产品建立专业感与辨识度。",
    role: "Brand & Product",
    year: "2025",
    cover: "/assets/projects/worldclaw/page-1.webp",
    pages: Array.from({ length: 7 }, (_, index) =>
      `/assets/projects/worldclaw/page-${index + 1}.webp`,
    ),
    accent: "orange",
    size: "standard",
  },
  {
    slug: "newsbreak",
    index: "05",
    title: "NEWSBREAK",
    kicker: "Local News · Community · Multi-platform",
    summary: "服务北美本地用户的资讯产品，在高密度信息中创造顺畅的阅读节奏。",
    role: "UI/UX Designer",
    year: "2022",
    cover: "/assets/projects/newsbreak-case/cover.webp",
    pages: Array.from({ length: 32 }, (_, index) =>
      `/assets/projects/newsbreak-case/page-${String(index + 1).padStart(2, "0")}.webp`,
    ),
    accent: "pink",
    size: "standard",
  },
];

const experiences = [
  ["2024—2026", "TOMO / WEB3", "资深 UI/UX 设计师", "WLFI APP、AB 与 Tomo 钱包的 0—1 产品体验及视觉系统。"],
  ["2022—2024", "GATE.IO", "高级 UI 设计师", "交易所社区业务 UI Owner，覆盖 App / Web 全球化产品。"],
  ["2019—2022", "NEWSBREAK", "UI/UX 设计师", "北美本地新闻资讯产品的多端体验设计。"],
  ["2017—2019", "TENCENT / CISCO", "设计实习生", "腾讯视频、企业数据系统与 Webex 协作体验。"],
];

const capabilities = [
  "PRODUCT STRATEGY",
  "DESIGN SYSTEMS",
  "INTERACTION DESIGN",
  "ART DIRECTION",
  "PROTOTYPING",
  "AI × DESIGN",
];

export default function Home() {
  const [selected, setSelected] = useState<Project | null>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const moveCursor = (event: PointerEvent) => {
      if (!cursorRef.current) return;
      cursorRef.current.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
    };

    window.addEventListener("pointermove", moveCursor, { passive: true });
    return () => window.removeEventListener("pointermove", moveCursor);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("modal-open", Boolean(selected));

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelected(null);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.classList.remove("modal-open");
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [selected]);

  return (
    <>
      <div className="intro" aria-hidden="true">
        <span>IRIS<span className="intro-dot">.</span></span>
      </div>
      <div className="cursor-orb" ref={cursorRef} aria-hidden="true" />

      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="回到首页">
          IRIS<span>®</span>
        </a>
        <nav className="main-nav" aria-label="主要导航">
          <a href="#work">WORK</a>
          <a href="#about">ABOUT</a>
          <a href="#contact">CONTACT</a>
        </nav>
        <div className="availability"><i /> OPEN TO WORK</div>
      </header>

      <main id="top">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-grid" aria-hidden="true" />
          <div className="hero-meta hero-meta-left">
            <span>BASED IN CHINA</span>
            <span>AVAILABLE WORLDWIDE</span>
          </div>
          <div className="hero-meta hero-meta-right">
            <span>PRODUCT DESIGNER</span>
            <span>EST. 2017</span>
          </div>

          <div className="hero-copy">
            <p className="eyebrow"><span>✦</span> DESIGNING THE UNSEEN</p>
            <h1 id="hero-title">
              <span className="hero-line line-digital">DIGITAL</span>
              <span className="hero-line line-worlds">
                W<span className="portrait-letter"><img src="/assets/iris-photo.webp" alt="Iris" /></span>RLDS
              </span>
            </h1>
            <div className="hero-bottom">
              <p className="hero-intro">
                我是 Iris，一名专注于 <b>Web3、金融科技与社区产品</b>的 UI/UX Designer。
                我把复杂系统，变成清晰、有趣、值得信任的数字体验。
              </p>
              <a className="round-cta" href="#work" aria-label="查看精选作品">
                <span>EXPLORE<br />MY WORK</span>
                <b>↘</b>
              </a>
            </div>
          </div>

          <div className="hero-sticker sticker-one" aria-hidden="true">7 YEARS<br />OF CRAFT</div>
          <div className="hero-sticker sticker-two" aria-hidden="true">01—26<br />SELECTED</div>
        </section>

        <div className="marquee" aria-hidden="true">
          <div>
            <span>PRODUCT THINKING</span><i>✦</i><span>VISUAL SYSTEMS</span><i>✦</i>
            <span>DIGITAL EXPERIENCES</span><i>✦</i><span>PRODUCT THINKING</span><i>✦</i>
            <span>VISUAL SYSTEMS</span><i>✦</i><span>DIGITAL EXPERIENCES</span><i>✦</i>
          </div>
        </div>

        <section className="work-section" id="work">
          <div className="section-head">
            <div>
              <span className="section-number">/01</span>
              <h2>SELECTED<br /><em>WORK</em></h2>
            </div>
            <p>不同的业务，相同的目标：<br />让复杂世界变得更好用。</p>
          </div>

          <div className="project-grid">
            {projects.map((project) => (
              <article
                className={`project-card project-${project.size} accent-${project.accent}`}
                key={project.slug}
              >
                <button onClick={() => setSelected(project)} aria-label={`查看 ${project.title} 项目案例`}>
                  <span className="project-visual">
                    <img src={project.cover} alt={`${project.title} 项目封面`} loading="lazy" />
                    <span className="project-index">{project.index}</span>
                    <span className="view-pill">VIEW CASE <b>↗</b></span>
                  </span>
                  <span className="project-info">
                    <span>
                      <small>{project.kicker}</small>
                      <strong>{project.title}</strong>
                    </span>
                    <span className="project-summary">{project.summary}</span>
                    <span className="project-role"><small>{project.role}</small><b>{project.year}</b></span>
                  </span>
                </button>
              </article>
            ))}
          </div>
        </section>

        <section className="about-section" id="about">
          <div className="section-head light-head">
            <div>
              <span className="section-number">/02</span>
              <h2>DESIGN WITH<br /><em>INTENT</em></h2>
            </div>
          </div>

          <div className="about-layout">
            <div className="about-statement">
              <p>
                好设计不只是让界面更漂亮。它需要在<strong>用户、商业与技术</strong>之间，找到那个最清晰的答案。
              </p>
              <p className="about-caption">从策略、交互到视觉落地，我持续追问「为什么」，再把答案变成真实、可用、可扩展的产品。</p>
            </div>
            <figure className="about-photo">
              <img src="/assets/iris-photo.webp" alt="Iris 的个人照片" loading="lazy" />
              <figcaption><span>IRIS ZHENG</span><span>UI/UX DESIGNER</span></figcaption>
            </figure>
          </div>

          <div className="capability-row" aria-label="专业能力">
            {capabilities.map((item, index) => (
              <span key={item}><i>{String(index + 1).padStart(2, "0")}</i>{item}</span>
            ))}
          </div>
        </section>

        <section className="experience-section">
          <div className="experience-title">
            <span className="section-number">/03</span>
            <h2>7 YEARS.<br />STILL <em>CURIOUS.</em></h2>
            <p>在金融、Web3、内容与协作产品中积累深度，也始终对下一种可能保持好奇。</p>
          </div>
          <div className="timeline">
            {experiences.map(([years, company, role, description], index) => (
              <article key={company}>
                <span className="timeline-dot" />
                <span className="timeline-index">0{index + 1}</span>
                <time>{years}</time>
                <div><h3>{company}</h3><strong>{role}</strong></div>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="contact-orbit" aria-hidden="true"><span>LET’S TALK · LET’S CREATE · </span></div>
          <span className="section-number">/04</span>
          <p>HAVE A PROJECT IN MIND?</p>
          <h2>LET’S MAKE<br /><em>SOMETHING</em><br />IMPOSSIBLE.</h2>
          <a className="email-link" href="mailto:Iriszheng066@gmail.com">
            <span>Iriszheng066@gmail.com</span><b>↗</b>
          </a>
          <div className="contact-links">
            <span>WECHAT · 15631591197</span>
            <a href="/assets/iris-resume-2026.pdf" target="_blank" rel="noreferrer">DOWNLOAD RESUME ↗</a>
          </div>
        </section>
      </main>

      <footer>
        <span>© 2026 IRIS DESIGN</span>
        <span>MADE WITH CURIOSITY + CAFFEINE</span>
        <a href="#top">BACK TO TOP ↑</a>
      </footer>

      {selected && (
        <div className="case-overlay" role="dialog" aria-modal="true" aria-labelledby="case-title">
          <button className="case-backdrop" aria-label="关闭案例" onClick={() => setSelected(null)} />
          <div className="case-shell">
            <header className="case-header">
              <div>
                <span>{selected.index} / SELECTED WORK</span>
                <h2 id="case-title">{selected.title}</h2>
              </div>
              <button className="case-close" onClick={() => setSelected(null)} aria-label="关闭案例">
                <span>CLOSE</span><b>×</b>
              </button>
            </header>
            <div className="case-intro">
              <p>{selected.summary}</p>
              <dl>
                <div><dt>ROLE</dt><dd>{selected.role}</dd></div>
                <div><dt>YEAR</dt><dd>{selected.year}</dd></div>
                <div><dt>SCOPE</dt><dd>{selected.kicker}</dd></div>
              </dl>
            </div>
            <div className="case-pages">
              {selected.pages.map((page, index) => (
                <figure key={page}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <img src={page} alt={`${selected.title} 案例第 ${index + 1} 页`} loading={index < 2 ? "eager" : "lazy"} />
                </figure>
              ))}
            </div>
            <div className="case-end">
              <span>END OF CASE</span>
              <button onClick={() => setSelected(null)}>BACK TO PROJECTS ↑</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
