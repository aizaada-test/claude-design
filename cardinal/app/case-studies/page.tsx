"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Arrow = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

const FILTERS = ["All work", "Brand", "Social", "Paid media", "Content & SEO", "Web"] as const;
type Filter = (typeof FILTERS)[number];

const cases = [
  { img: "dark",  tags: ["Social · Content"],  title: "Glowsphere — from quiet launch to a real community",      stat: "38k engaged followers · 6× branded search",  filter: "Social"       },
  { img: "cream", tags: ["Paid · CRO"],         title: "PinSpace — scaling paid without burning the budget",       stat: "2.4× ROAS · +63% pipeline",                  filter: "Paid media"   },
  { img: "coral", tags: ["Brand · Web"],        title: "Visionix — a brand and site built for a Series B story",  stat: "+48% conversion · 9-day build",               filter: "Brand"        },
  { img: "cream", tags: ["Content & SEO"],      title: "Switch — owning the category conversation",               stat: "#1 for 40+ terms · 3× organic traffic",       filter: "Content & SEO"},
  { img: "dark",  tags: ["Brand · Social"],     title: "Northwind — a refresh that made an old brand feel new",   stat: "+27% recall · 4.1M reached",                  filter: "Brand"        },
  { img: "cream", tags: ["Paid · Web"],         title: "Lumen Health — turning sign-ups into paying members",     stat: "+88% activation · -22% CAC",                  filter: "Paid media"   },
];

export default function CaseStudies() {
  const [active, setActive] = useState<Filter>("All work");

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    document.querySelectorAll<HTMLElement>(".reveal").forEach((el) => {
      const delay = parseInt(el.getAttribute("data-delay") ?? "0") / 1000;
      gsap.fromTo(el, { opacity: 0, y: 26 }, {
        opacity: 1, y: 0, duration: 0.9, delay, ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
      });
    });

    /* featured case metrics count up */
    [
      { id: "#metric-1", end: 112 },
      { id: "#metric-2", end: 34  },
      { id: "#metric-3", end: 6   },
    ].forEach(({ id, end }) => {
      const el = document.querySelector<HTMLElement>(id);
      if (!el) return;
      const obj = { val: 0 };
      ScrollTrigger.create({
        trigger: el, start: "top 85%", once: true,
        onEnter: () =>
          gsap.to(obj, {
            val: end, duration: 1.8, ease: "power2.out",
            onUpdate: () => { el.textContent = String(Math.round(obj.val)); },
          }),
      });
    });

    return () => { ScrollTrigger.getAll().forEach((t) => t.kill()); };
  }, []);

  const visible = cases.filter((c) => active === "All work" || c.filter === active);

  return (
    <>
      {/* PAGE HEADER */}
      <header className="pagehead">
        <div className="wrap">
          <div className="breadcrumb reveal"><span className="accent">Cardinal</span> / Case studies</div>
          <div className="reveal" style={{ maxWidth: 760 }}>
            <span className="eyebrow">Selected work</span>
            <h1 className="h-xl">Proof, not promises.</h1>
            <p className="lead" style={{ marginTop: 22 }}>
              A look at what happens when senior marketers run the work end to end. Real brands, real numbers,
              no rounding up.
            </p>
          </div>
        </div>
      </header>

      {/* FEATURED CASE */}
      <section className="band-tight">
        <div className="wrap">
          <div className="feature-case reveal">
            <div className="feature-img">Case hero image</div>
            <div>
              <div className="case-meta">
                <span className="tag">Brand</span><span className="tag">Paid media</span>
              </div>
              <h2 className="h-md" style={{ marginBottom: 14 }}>
                Dreamure — a rebrand that doubled demo requests
              </h2>
              <p className="body-md" style={{ margin: 0, maxWidth: "50ch" }}>
                A maturing product stuck behind a startup-y brand. We repositioned around the buyer&apos;s real
                problem, rebuilt the identity and site, and relaunched paid against the new story.
              </p>
              <div className="case-metrics">
                <div className="case-metric">
                  <div className="m-num">+<span id="metric-1">0</span><span className="accent">%</span></div>
                  <div className="m-cap">Qualified demo requests in one quarter</div>
                </div>
                <div className="case-metric">
                  <div className="m-num">-<span id="metric-2">0</span><span className="accent">%</span></div>
                  <div className="m-cap">Cost per acquisition</div>
                </div>
                <div className="case-metric">
                  <div className="m-num"><span id="metric-3">0</span><span className="accent">wk</span></div>
                  <div className="m-cap">From kickoff to relaunch</div>
                </div>
              </div>
              <a href="#" className="arrow-link" style={{ marginTop: 24 }}>
                Read the full story <Arrow />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FILTER + GRID */}
      <section className="band-tight">
        <div className="wrap">
          <div className="filter-row reveal">
            {FILTERS.map((f) => (
              <button
                key={f}
                className={`filter-btn${active === f ? " is-active" : ""}`}
                onClick={() => setActive(f)}
              >
                {f}
              </button>
            ))}
          </div>
          <div className="grid-3">
            {visible.map((c, i) => (
              <a key={c.title} href="#" className="case-card reveal" data-delay={String((i % 3) * 80)}>
                <div className={`ci ${c.img}`}>Project image</div>
                <div className="case-meta">
                  {c.tags.map((t) => <span key={t} className="tag">{t}</span>)}
                </div>
                <h3 className="h-sm">{c.title}</h3>
                <div className="cstat">{c.stat}</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIAL (dark) */}
      <section className="band band-dark">
        <div className="wrap" style={{ maxWidth: 900 }}>
          <div className="reveal">
            <div className="testimonial-line" style={{ width: 48, height: 2, background: "var(--primary)", marginBottom: 40 }} />
            <p className="quote">
              They moved faster in eight weeks than our last agency did in a year — and the numbers actually
              held up afterward.
            </p>
            <div className="quote-attr">
              <span className="avatar coral" style={{ position: "relative", transform: "none", flexShrink: 0 }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                  <circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" />
                </svg>
              </span>
              <div>
                <div className="who">Sofia Marenco</div>
                <div className="role">CMO, Dreamure</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CALLOUT */}
      <section className="band-tight" id="start">
        <div className="wrap">
          <div className="callout reveal">
            <div className="callout-text">
              <h2 className="h-md">Your brand could be next.</h2>
              <p>Tell us where you&apos;re stuck. We&apos;ll come back with a plan and the team to run it — usually within two days.</p>
            </div>
            <a href="#" className="btn btn-light btn-arrow">
              Start a project
              <span className="btn-arrow-icon" style={{ display: "inline-flex" }}><Arrow /></span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
