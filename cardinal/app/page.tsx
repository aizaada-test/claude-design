"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/* ------------------------------------------------------------------ */
/* SVG helpers                                                          */
/* ------------------------------------------------------------------ */

const Arrow = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

const PersonIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" />
  </svg>
);

/* ------------------------------------------------------------------ */
/* Page                                                                 */
/* ------------------------------------------------------------------ */

export default function Home() {
  const orbitStatRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    /* scroll progress bar */
    gsap.to("#scroll-progress", {
      scaleX: 1, ease: "none",
      scrollTrigger: { trigger: document.documentElement, start: "top top", end: "bottom bottom", scrub: 0 },
    });

    /* ── hero load timeline ── */
    const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
    tl
      .from("#main-nav",      { y: -90, opacity: 0, duration: 1.0, ease: "power3.out" })
      .from("#hero-eyebrow",  { y: 20, opacity: 0, duration: 0.7 }, "-=0.55")
      .from("#hero-headline", { clipPath: "inset(0 0 100% 0)", y: 36, opacity: 0, duration: 1.2, ease: "expo.out" }, "-=0.4")
      .from("#hero-lead",     { y: 22, opacity: 0, duration: 0.85 }, "-=0.7")
      .from("#hero-actions",  { y: 18, opacity: 0, duration: 0.7 }, "-=0.55")
      .from("#hero-note",     { opacity: 0, duration: 0.6 }, "-=0.25")
      .from(".hero-orb",      { opacity: 0, scale: 0.5, duration: 2.5, stagger: 0.35, ease: "power2.out" }, "-=2.0")
      .from("#orbital-wrap",  { scale: 0.84, opacity: 0, duration: 1.4, ease: "expo.out" }, "-=2.4")
      .from(".ring",          { scale: 0, opacity: 0, duration: 1.0, stagger: 0.22, ease: "expo.out", transformOrigin: "center center" }, "-=1.1")
      .call(() => {
        const el  = orbitStatRef.current;
        const obj = { val: 0 };
        if (el) {
          gsap.to(obj, {
            val: 150, duration: 2.2, ease: "power2.out",
            onUpdate: () => { el.textContent = String(Math.round(obj.val)); },
          });
        }
      }, undefined, "-=0.6")
      .from(".name-tag", { opacity: 0, scale: 0.72, y: 16, duration: 0.85, ease: "back.out(1.7)" }, "-=1.8");

    /* ambient orb float */
    document.querySelectorAll<HTMLElement>(".hero-orb").forEach((orb, i) => {
      gsap.to(orb, {
        x: gsap.utils.random(-40, 40),
        y: gsap.utils.random(-40, 40),
        duration: 7 + i * 2, repeat: -1, yoyo: true, ease: "sine.inOut", delay: i * 1.4,
      });
    });

    /* ── generic scroll reveals ── */
    document.querySelectorAll<HTMLElement>(".reveal").forEach((el) => {
      const delay = parseInt(el.getAttribute("data-delay") ?? "0") / 1000;
      gsap.fromTo(
        el,
        { opacity: 0, y: 26 },
        { opacity: 1, y: 0, duration: 0.9, delay, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 90%", once: true } }
      );
    });

    /* ── stat counters ── */
    document.querySelectorAll<HTMLElement>(".num-counter[data-end]").forEach((el) => {
      const end      = parseFloat(el.getAttribute("data-end") ?? "0");
      const decimals = parseInt(el.getAttribute("data-decimals") ?? "0");
      const obj      = { val: 0 };
      ScrollTrigger.create({
        trigger: el, start: "top 90%", once: true,
        onEnter: () =>
          gsap.to(obj, {
            val: end, duration: 2.4, ease: "power2.out",
            onUpdate: () => { el.textContent = obj.val.toFixed(decimals); },
          }),
      });
    });

    /* ── services grid stagger ── */
    gsap.from("#services-grid .card", {
      y: 50, opacity: 0, rotation: 1.5, scale: 0.97,
      duration: 0.85, stagger: 0.09, ease: "power3.out",
      scrollTrigger: { trigger: "#services-grid", start: "top 82%", once: true },
    });

    /* ── work items slide from sides ── */
    gsap.from("#work-left",  { x: -65, opacity: 0, duration: 1.1, ease: "power3.out", scrollTrigger: { trigger: "#work-grid", start: "top 84%", once: true } });
    gsap.from("#work-right", { x:  65, opacity: 0, duration: 1.1, ease: "power3.out", scrollTrigger: { trigger: "#work-grid", start: "top 84%", once: true } });

    /* ── testimonial ── */
    const tSt = { trigger: "#testimonial-section", start: "top 80%", once: true } as const;
    gsap.from("#testimonial-line", { scaleX: 0, opacity: 0, duration: 0.8, ease: "expo.out", transformOrigin: "left center", scrollTrigger: tSt });
    gsap.from("#quote-text",  { opacity: 0, y: 38, filter: "blur(5px)", duration: 1.3, ease: "power3.out", delay: 0.15, scrollTrigger: tSt });
    gsap.from("#quote-attr",  { opacity: 0, y: 22, duration: 0.9, ease: "power3.out", delay: 0.5, scrollTrigger: tSt });

    /* ── callout ── */
    gsap.from("#main-callout", {
      scale: 0.93, opacity: 0, y: 32, duration: 1.05, ease: "power3.out",
      scrollTrigger: { trigger: "#main-callout", start: "top 86%", once: true },
    });
    ScrollTrigger.create({
      trigger: "#main-callout", start: "top 86%", once: true,
      onEnter: () =>
        gsap.to("#main-callout", {
          boxShadow: "0 28px 70px rgba(204,120,92,.30)",
          duration: 2.2, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 1.1,
        }),
    });

    /* ── orbital parallax ── */
    gsap.to("#orbital-wrap", {
      y: -75, ease: "none",
      scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 1.8 },
    });

    /* ── 3-D card tilt ── */
    document.querySelectorAll<HTMLElement>(".card.hoverable").forEach((card) => {
      const onMove = (e: MouseEvent) => {
        const r = card.getBoundingClientRect();
        gsap.to(card, {
          rotationY: ((e.clientX - r.left) / r.width - 0.5) * 10,
          rotationX: -(((e.clientY - r.top) / r.height) - 0.5) * 10,
          scale: 1.03, duration: 0.35, ease: "power2.out", transformPerspective: 900,
        });
      };
      const onLeave = () =>
        gsap.to(card, { rotationY: 0, rotationX: 0, scale: 1, duration: 0.55, ease: "power3.out" });
      card.addEventListener("mousemove", onMove);
      card.addEventListener("mouseleave", onLeave);
    });

    /* ── button press ── */
    document.querySelectorAll<HTMLElement>(".btn").forEach((btn) => {
      const dn = () => gsap.to(btn, { scale: 0.96, duration: 0.1, ease: "power2.in" });
      const up = () => gsap.to(btn, { scale: 1,    duration: 0.3, ease: "back.out(2)" });
      btn.addEventListener("mousedown",  dn);
      btn.addEventListener("mouseup",    up);
      btn.addEventListener("mouseleave", up);
    });

    /* ── logo hover lift ── */
    document.querySelectorAll<HTMLElement>(".logo-item").forEach((logo) => {
      logo.addEventListener("mouseenter", () => gsap.to(logo, { y: -4, duration: 0.25, ease: "power2.out" }));
      logo.addEventListener("mouseleave", () => gsap.to(logo, { y:  0, duration: 0.35, ease: "power2.out" }));
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  /* ---------------------------------------------------------------- */
  /* JSX                                                               */
  /* ---------------------------------------------------------------- */
  return (
    <>
      {/* scroll progress */}
      <div id="scroll-progress" />

      {/* ═══════════ HERO ═══════════ */}
      <header className="hero">
        <div className="hero-bg-orbs" aria-hidden="true">
          <span className="hero-orb" style={{ width: 380, height: 380, left: "6%",  top: "15%" }} />
          <span className="hero-orb" style={{ width: 240, height: 240, left: "80%", top: "8%"  }} />
          <span className="hero-orb" style={{ width: 300, height: 300, left: "58%", top: "68%" }} />
        </div>

        <div className="wrap hero-grid">
          {/* copy */}
          <div>
            <span className="eyebrow" id="hero-eyebrow">Full-service marketing studio</span>
            <h1 className="h-xl" id="hero-headline">
              Unlock the marketing talent you thought was{" "}
              <span className="accent">out of reach.</span>
            </h1>
            <p className="lead" id="hero-lead">
              Cardinal pairs your brand with a senior team across strategy, social, and paid — the kind of
              people who usually only work in-house. Now they&apos;re one conversation away.
            </p>
            <div className="hero-actions" id="hero-actions">
              <a href="#start" className="btn btn-primary btn-arrow">
                Start a project
                <span className="btn-arrow-icon" style={{ display: "inline-flex" }}><Arrow /></span>
              </a>
              <a href="/case-studies" className="btn btn-secondary">See our work</a>
            </div>
            <p className="hero-note" id="hero-note">Trusted by ambitious teams from seed to Series C.</p>
          </div>

          {/* orbital */}
          <div id="orbital-wrap">
            <div className="orbital">
              <div className="orbit-rings" aria-hidden="true">
                <span className="ring r1" /><span className="ring r2" /><span className="ring r3" />
              </div>
              <div className="orbit-spin" aria-hidden="true">
                <span className="node" style={{ top: "13%", left: "70%" }}><span className="avatar coral"><PersonIcon /></span></span>
                <span className="node" style={{ top: "39%", left: "15%" }}><span className="avatar teal"><PersonIcon /></span></span>
                <span className="node" style={{ top: "42%", left: "87%" }}><span className="avatar amber"><PersonIcon /></span></span>
                <span className="node" style={{ top: "85%", left: "60%" }}><span className="avatar"><PersonIcon /></span></span>
                <span className="node" style={{ top: "66%", left: "20%" }}><span className="avatar"><PersonIcon /></span></span>
                <span className="node" style={{ top: "25%", left: "40%" }}>
                  <span className="chip-tile coral">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 11v2a1 1 0 0 0 1 1h2l5 4V6L6 10H4a1 1 0 0 0-1 1z" />
                      <path d="M15.5 8a4 4 0 0 1 0 8" />
                    </svg>
                  </span>
                </span>
                <span className="node" style={{ top: "60%", left: "80%" }}>
                  <span className="chip-tile teal">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 3v18h18" /><path d="M7 14l3-3 3 3 4-5" />
                    </svg>
                  </span>
                </span>
                <span className="node" style={{ top: "80%", left: "36%" }}>
                  <span className="chip-tile">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="6" cy="12" r="2.4" /><circle cx="18" cy="6" r="2.4" /><circle cx="18" cy="18" r="2.4" />
                      <path d="M8.1 10.9l7.8-3.7M8.1 13.1l7.8 3.7" />
                    </svg>
                  </span>
                </span>
                <span className="node" style={{ top: "20%", left: "88%" }}>
                  <span className="chip-tile">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 12a8 8 0 0 1-11.6 7.1L4 21l1.9-5.4A8 8 0 1 1 21 12z" />
                    </svg>
                  </span>
                </span>
              </div>
              <div className="orbit-core-glow" aria-hidden="true" />
              <div className="orbit-core">
                <div className="stat"><span ref={orbitStatRef}>0</span>+</div>
                <div className="stat-label">brands grown</div>
              </div>
              <span className="name-tag" style={{ left: "34%", top: "72%" }}>Maya · Strategy</span>
            </div>
          </div>
        </div>
      </header>

      {/* ═══════════ LOGO BAR ═══════════ */}
      <section className="logobar">
        <div className="wrap logobar-row">
          <span className="logobar-label reveal">Trusted by ambitious teams</span>
          <div className="logos">
            {(
              [
                { name: "Dreamure",   icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><path d="M12 3l8 5v8l-8 5-8-5V8z"/></svg> },
                { name: "Switch",     icon: <svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="9"/></svg> },
                { name: "Glowsphere", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><rect x="4" y="4" width="16" height="16" rx="4"/><circle cx="12" cy="12" r="3"/></svg> },
                { name: "PinSpace",   icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><path d="M12 21s-7-5.2-7-10a7 7 0 0 1 14 0c0 4.8-7 10-7 10z"/></svg> },
                { name: "Visionix",   icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="2.5"/></svg> },
              ] as const
            ).map(({ name, icon }, i) => (
              <span key={name} className="logo-item reveal" data-delay={String(i * 80)}>
                {icon}{name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ SERVICES ═══════════ */}
      <section className="band">
        <div className="wrap">
          <div className="reveal" style={{ maxWidth: 680, marginBottom: 48 }}>
            <span className="eyebrow">What we do</span>
            <h2 className="h-lg">Which problem are you up against?</h2>
            <p className="lead" style={{ marginTop: 18 }}>
              Pick the channel that&apos;s holding you back, or hand us the whole picture. Either way you get one
              senior team, accountable end to end.
            </p>
          </div>
          <div className="grid-3" id="services-grid">
            {(
              [
                { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l1.9 5.8H20l-4.9 3.6 1.9 5.8L12 14.6 7 18.2l1.9-5.8L4 8.8h6.1z"/></svg>, title: "Brand strategy",     body: "Positioning, messaging, and identity that make people remember you — and choose you." },
                { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8a3 3 0 1 0-2.8-4H9a5 5 0 0 0 0 10h6.2A3 3 0 1 0 18 8z"/><path d="M6 14v6"/></svg>, title: "Social & community", body: "Always-on content and community management that turns followers into a real audience." },
                { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M3 11l18-8-8 18-2-7z"/></svg>, title: "Paid media",          body: "Performance campaigns across search, social, and programmatic — measured to the dollar." },
                { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>, title: "Content & SEO",      body: "Editorial that earns rankings and trust, built around the questions your buyers actually ask." },
                { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>, title: "Web & design",       body: "Sites and landing pages that look the part and convert — designed, built, and shipped fast." },
                { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="M7 15l4-4 3 3 5-6"/></svg>, title: "Analytics & insight", body: "Dashboards and experiments that tell you what's working, so the next decision is the right one." },
              ] as const
            ).map(({ icon, title, body }, i) => (
              <a key={title} className="card hoverable" href="/services" data-delay={String((i % 3) * 80)}>
                <div className="icon-badge">{icon}</div>
                <h3 className="title-card">{title}</h3>
                <p className="body-text">{body}</p>
                <span className="arrow-link">Explore <Arrow /></span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ STATS (dark) ═══════════ */}
      <section className="band band-dark">
        <div className="wrap">
          <div className="reveal" style={{ maxWidth: 620, marginBottom: 54 }}>
            <span className="eyebrow on-dark">The work, by the numbers</span>
            <h2 className="h-md">
              Senior people. Measurable outcomes. No hand-offs to a junior the week after you sign.
            </h2>
          </div>
          <div className="stat-grid">
            <div className="stat-item reveal">
              <div className="stat-num"><span className="num-counter" data-end="12" data-decimals="0">0</span><span className="accent">yrs</span></div>
              <div className="stat-cap">Building brands across B2B and consumer.</div>
            </div>
            <div className="stat-item reveal" data-delay="80">
              <div className="stat-num"><span className="num-counter" data-end="150" data-decimals="0">0</span><span className="accent">+</span></div>
              <div className="stat-cap">Brands grown, from seed startups to public companies.</div>
            </div>
            <div className="stat-item reveal" data-delay="160">
              <div className="stat-num">+<span className="num-counter" data-end="180" data-decimals="0">0</span><span className="accent">%</span></div>
              <div className="stat-cap">Average pipeline lift in the first two quarters.</div>
            </div>
            <div className="stat-item reveal" data-delay="240">
              <div className="stat-num"><span className="num-counter" data-end="4.9" data-decimals="1">0.0</span><span className="accent">/5</span></div>
              <div className="stat-cap">Average client rating across engagements.</div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ SELECTED WORK ═══════════ */}
      <section className="band">
        <div className="wrap">
          <div
            className="reveal"
            style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 24, marginBottom: 44, flexWrap: "wrap" }}
          >
            <div style={{ maxWidth: 520 }}>
              <span className="eyebrow">Selected work</span>
              <h2 className="h-lg">Proof, not promises.</h2>
            </div>
            <a href="/case-studies" className="btn btn-secondary">View all case studies</a>
          </div>
          <div className="grid-2" id="work-grid">
            <a id="work-left" href="/case-studies" style={{ display: "block" }}>
              <div style={{ aspectRatio: "16/10", borderRadius: "var(--radius-lg)", background: "linear-gradient(140deg,#efe9de,#e8e0d2)", display: "grid", placeItems: "center", color: "var(--muted-soft)", fontSize: 13, border: "1px solid var(--hairline)" }}>
                Project image
              </div>
              <div style={{ marginTop: 18 }}>
                <div style={{ display: "flex", gap: 8, marginBottom: 10 }}><span className="tag">Brand · Paid</span></div>
                <h3 className="h-sm">Dreamure — a rebrand that doubled demo requests</h3>
                <p className="body-text" style={{ marginTop: 8 }}>+112% qualified demos in one quarter after a full repositioning and paid relaunch.</p>
                <span className="arrow-link">Read the case study <Arrow /></span>
              </div>
            </a>
            <a id="work-right" href="/case-studies" style={{ display: "block" }}>
              <div style={{ aspectRatio: "16/10", borderRadius: "var(--radius-lg)", background: "linear-gradient(140deg,#252320,#181715)", display: "grid", placeItems: "center", color: "var(--on-dark-soft)", fontSize: 13, border: "1px solid #252320" }}>
                Project image
              </div>
              <div style={{ marginTop: 18 }}>
                <div style={{ display: "flex", gap: 8, marginBottom: 10 }}><span className="tag">Social · Content</span></div>
                <h3 className="h-sm">Glowsphere — from quiet launch to a real community</h3>
                <p className="body-text" style={{ marginTop: 8 }}>38k engaged followers and a 6× lift in branded search in eight months.</p>
                <span className="arrow-link">Read the case study <Arrow /></span>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════ TESTIMONIAL (dark) ═══════════ */}
      <section className="band band-dark" id="testimonial-section">
        <div className="wrap" style={{ maxWidth: 900 }}>
          <div className="testimonial-line" id="testimonial-line" />
          <p className="quote" id="quote-text">
            Cardinal felt less like an agency and more like the marketing team we&apos;d been trying to hire for
            two years — only faster, and already in motion.
          </p>
          <div className="quote-attr" id="quote-attr">
            <span className="avatar teal" style={{ position: "relative", transform: "none", flexShrink: 0 }}>
              <PersonIcon />
            </span>
            <div>
              <div className="who">Daniel Okafor</div>
              <div className="role">VP Marketing, PinSpace</div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ CALLOUT ═══════════ */}
      <section className="band-tight" id="start">
        <div className="wrap">
          <div className="callout" id="main-callout">
            <div className="callout-text">
              <h2 className="h-md">Let&apos;s build your next chapter.</h2>
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
