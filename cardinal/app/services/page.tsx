"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Arrow = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

const services = [
  {
    num: "01", title: "Brand strategy",
    body: "We get clear on who you are, who you're for, and why it matters — then turn that into positioning, messaging, and an identity your whole company can rally behind.",
    tags: ["Positioning", "Messaging", "Naming", "Visual identity"],
  },
  {
    num: "02", title: "Social & community",
    body: "Always-on content, a clear point of view, and real conversation. We run the channels day to day and turn passive followers into a community that shows up for you.",
    tags: ["Content calendars", "Community", "Short-form video", "Influencer"],
  },
  {
    num: "03", title: "Paid media",
    body: "Performance campaigns across search, social, and programmatic — built on a clear funnel, measured to the dollar, and tuned every week toward the numbers that matter.",
    tags: ["Paid search", "Paid social", "Programmatic", "Creative testing"],
  },
  {
    num: "04", title: "Content & SEO",
    body: "Editorial that earns rankings and trust. We build content around the questions your buyers actually ask, then make sure search engines and humans both find it.",
    tags: ["Editorial", "Technical SEO", "Thought leadership"],
  },
  {
    num: "05", title: "Web & design",
    body: "Sites and landing pages that look the part and convert. Designed, built, and shipped fast — then improved continuously based on what real visitors do.",
    tags: ["Landing pages", "Webflow", "Design systems", "CRO"],
  },
  {
    num: "06", title: "Analytics & insight",
    body: "Dashboards and experiments that tell you what's working. We turn scattered data into a clear read on performance, so the next decision is the right one.",
    tags: ["Attribution", "Dashboards", "Experimentation"],
  },
];

const steps = [
  { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>, label: "01 — Listen",  body: "We start with your goals, your numbers, and what's actually getting in the way." },
  { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l1.9 5.8H20l-4.9 3.6 1.9 5.8L12 14.6 7 18.2l1.9-5.8L4 8.8h6.1z"/></svg>,  label: "02 — Plan",   body: "A focused strategy and a roadmap you can actually read — no 80-slide decks." },
  { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M3 11l18-8-8 18-2-7z"/></svg>,                                                                                                                    label: "03 — Ship",   body: "The team runs the work in motion, in your channels, week after week." },
  { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="M7 14l3-3 3 3 4-5"/></svg>,                                                                                              label: "04 — Improve", body: "We measure, learn, and compound — every cycle should beat the last." },
];

export default function Services() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    document.querySelectorAll<HTMLElement>(".reveal").forEach((el) => {
      const delay = parseInt(el.getAttribute("data-delay") ?? "0") / 1000;
      gsap.fromTo(el, { opacity: 0, y: 26 }, {
        opacity: 1, y: 0, duration: 0.9, delay, ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
      });
    });
    return () => { ScrollTrigger.getAll().forEach((t) => t.kill()); };
  }, []);

  return (
    <>
      {/* PAGE HEADER */}
      <header className="pagehead">
        <div className="wrap">
          <div className="breadcrumb reveal">
            <span className="accent">Cardinal</span> / Services
          </div>
          <div className="reveal" style={{ maxWidth: 760 }}>
            <span className="eyebrow">What we do</span>
            <h1 className="h-xl">Everything your brand needs, under one roof.</h1>
            <p className="lead" style={{ marginTop: 22 }}>
              Six disciplines, one senior team. Engage us for a single channel or hand over the whole marketing
              function — the work connects either way.
            </p>
          </div>
        </div>
      </header>

      {/* SERVICE LIST */}
      <section className="band-tight">
        <div className="wrap">
          {services.map((s) => (
            <div key={s.num} className="svc-row reveal">
              <div className="svc-num">{s.num}</div>
              <div>
                <h2 className="h-sm">{s.title}</h2>
                <p className="body-md" style={{ margin: "10px 0 0", maxWidth: "56ch" }}>{s.body}</p>
                <div className="svc-tags">
                  {s.tags.map((t) => <span key={t} className="tag">{t}</span>)}
                </div>
              </div>
              <a href="#start" className="btn btn-secondary">Start here</a>
            </div>
          ))}
        </div>
      </section>

      {/* PROCESS (dark) */}
      <section className="band band-dark">
        <div className="wrap">
          <div className="reveal" style={{ maxWidth: 620, marginBottom: 48 }}>
            <span className="eyebrow on-dark">How we work</span>
            <h2 className="h-lg">A simple way in, and senior people the whole way through.</h2>
          </div>
          <div className="grid-4">
            {steps.map((step, i) => (
              <div key={step.label} className="card-dark reveal" data-delay={String(i * 80)}>
                <div className="icon-badge">{step.icon}</div>
                <h3 className="title-card" style={{ color: "var(--on-dark)" }}>{step.label}</h3>
                <p className="body-text">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ENGAGEMENT MODELS */}
      <section className="band">
        <div className="wrap">
          <div className="reveal" style={{ maxWidth: 620, marginBottom: 48 }}>
            <span className="eyebrow">Ways to work together</span>
            <h2 className="h-lg">Pick the shape that fits.</h2>
          </div>
          <div className="grid-3">
            <div className="card reveal">
              <span className="caption-uppercase">Project</span>
              <h3 className="h-sm" style={{ margin: "14px 0 10px" }}>A defined piece of work</h3>
              <p className="body-text">A rebrand, a launch, a new site. Fixed scope, clear deliverables, a firm timeline.</p>
              <ul style={{ margin: "20px 0 0", padding: 0, listStyle: "none", color: "var(--body)", fontSize: 14.5, lineHeight: 2 }}>
                <li>Single discipline or bundle</li>
                <li>4–12 week engagements</li>
                <li>Senior lead + specialists</li>
              </ul>
              <a href="#start" className="arrow-link">Scope a project <Arrow /></a>
            </div>
            <div className="card-dark reveal" data-delay="80" style={{ position: "relative" }}>
              <span className="caption-uppercase" style={{ color: "var(--accent-amber)" }}>Retainer · Most popular</span>
              <h3 className="h-sm" style={{ margin: "14px 0 10px", color: "var(--on-dark)" }}>An ongoing partner</h3>
              <p className="body-text">A dedicated team running one or more channels month to month, fully accountable for outcomes.</p>
              <ul style={{ margin: "20px 0 0", padding: 0, listStyle: "none", color: "var(--on-dark-soft)", fontSize: 14.5, lineHeight: 2 }}>
                <li>Multi-channel, integrated</li>
                <li>Monthly rolling commitment</li>
                <li>Shared dashboard &amp; reviews</li>
              </ul>
              <a href="#start" className="arrow-link" style={{ color: "var(--primary)" }}>Talk retainer <Arrow /></a>
            </div>
            <div className="card reveal" data-delay="160">
              <span className="caption-uppercase">Embedded</span>
              <h3 className="h-sm" style={{ margin: "14px 0 10px" }}>Your team, on demand</h3>
              <p className="body-text">We slot in alongside your in-house team as senior operators when you need to scale fast.</p>
              <ul style={{ margin: "20px 0 0", padding: 0, listStyle: "none", color: "var(--body)", fontSize: 14.5, lineHeight: 2 }}>
                <li>Fractional leadership</li>
                <li>Flexible capacity</li>
                <li>Works in your tools</li>
              </ul>
              <a href="#start" className="arrow-link">Explore embedding <Arrow /></a>
            </div>
          </div>
        </div>
      </section>

      {/* CALLOUT */}
      <section className="band-tight" id="start">
        <div className="wrap">
          <div className="callout reveal">
            <div className="callout-text">
              <h2 className="h-md">Not sure which you need?</h2>
              <p>Tell us the problem. We&apos;ll recommend the smallest engagement that gets you a real result.</p>
            </div>
            <a href="#" className="btn btn-light btn-arrow">
              Book a call
              <span className="btn-arrow-icon" style={{ display: "inline-flex" }}><Arrow /></span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
