"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Arrow = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

const PersonSilhouette = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" />
  </svg>
);

const team = [
  { name: "Maya Chen",      role: "Founder · Strategy"  },
  { name: "Daniel Okafor",  role: "Partner · Paid media" },
  { name: "Sofia Marenco",  role: "Creative director"    },
  { name: "Theo Almeida",   role: "Head of content"      },
  { name: "Priya Nair",     role: "Social lead"          },
  { name: "Lukas Berg",     role: "Design & web"         },
  { name: "Amara Diallo",   role: "Analytics"            },
  { name: "James Whitfield",role: "Client partner"       },
];

const values = [
  {
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>,
    title: "Outcomes over output",
    body: "We don't sell hours or deliverables. We're here to move the numbers that matter to your business.",
  },
  {
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>,
    title: "Plain talk",
    body: "No jargon, no theatre, no 80-slide decks. We tell you what we'd do and why, in language you can act on.",
  },
  {
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>,
    title: "Craft, every time",
    body: "The work goes out with our name on it. If it isn't something we'd be proud to show, it isn't done.",
  },
];

export default function About() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    document.querySelectorAll<HTMLElement>(".reveal").forEach((el) => {
      const delay = parseInt(el.getAttribute("data-delay") ?? "0") / 1000;
      gsap.fromTo(el, { opacity: 0, y: 26 }, {
        opacity: 1, y: 0, duration: 0.9, delay, ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
      });
    });

    /* team grid stagger */
    gsap.from(".team-card", {
      y: 40, opacity: 0, duration: 0.7, stagger: 0.08, ease: "power3.out",
      scrollTrigger: { trigger: ".team-grid", start: "top 82%", once: true },
    });

    return () => { ScrollTrigger.getAll().forEach((t) => t.kill()); };
  }, []);

  return (
    <>
      {/* PAGE HEADER */}
      <header className="pagehead">
        <div className="wrap">
          <div className="breadcrumb reveal"><span className="accent">Cardinal</span> / About</div>
          <div className="reveal" style={{ maxWidth: 760 }}>
            <span className="eyebrow">Who we are</span>
            <h1 className="h-xl">We&apos;re the marketing team you&apos;d hire if you could.</h1>
            <p className="lead" style={{ marginTop: 22 }}>
              Cardinal is a small studio of senior marketers who got tired of watching good brands settle for
              junior work and bloated agencies. So we built the alternative.
            </p>
          </div>
        </div>
      </header>

      {/* STORY */}
      <section className="band-tight">
        <div className="wrap">
          <div className="story-grid">
            <div className="story-img reveal">Studio photo</div>
            <div className="reveal" data-delay="100">
              <span className="eyebrow">Our story</span>
              <h2 className="h-md" style={{ marginBottom: 18 }}>Senior by default. Small on purpose.</h2>
              <p className="body-md" style={{ margin: "0 0 16px" }}>
                We started Cardinal after years inside agencies and in-house teams, frustrated by the same pattern:
                you&apos;d sign with the people in the pitch, then get handed to someone three years out of school.
              </p>
              <p className="body-md" style={{ margin: "0 0 16px" }}>
                We do the opposite. Every engagement is run by people who&apos;ve actually built brands — and we stay
                small enough that the person who plans your work is the person who does it.
              </p>
              <p className="body-md" style={{ margin: 0 }}>
                Twelve years in, that hasn&apos;t changed. It&apos;s still the whole point.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="band">
        <div className="wrap">
          <div className="reveal" style={{ maxWidth: 620, marginBottom: 48 }}>
            <span className="eyebrow">What we believe</span>
            <h2 className="h-lg">A few things we won&apos;t compromise on.</h2>
          </div>
          <div className="grid-3">
            {values.map((v, i) => (
              <div key={v.title} className="card reveal" data-delay={String(i * 80)}>
                <div className="icon-badge">{v.icon}</div>
                <h3 className="title-card">{v.title}</h3>
                <p className="body-text">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="band band-soft">
        <div className="wrap">
          <div className="reveal" style={{ maxWidth: 620, marginBottom: 44 }}>
            <span className="eyebrow">The team</span>
            <h2 className="h-lg">The people who&apos;ll actually do the work.</h2>
          </div>
          <div className="grid-4 team-grid">
            {team.map((member) => (
              <div key={member.name} className="team-card">
                <div className="team-photo"><PersonSilhouette /></div>
                <div className="team-name">{member.name}</div>
                <div className="team-role">{member.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS (dark) */}
      <section className="band band-dark">
        <div className="wrap">
          <div className="stat-grid">
            {[
              { num: "12", suffix: "yrs", cap: "In the business of building brands." },
              { num: "8",  suffix: "",    cap: "Senior operators. No bench of juniors." },
              { num: "150", suffix: "+",  cap: "Brands we've helped grow." },
              { num: "4.9", suffix: "/5", cap: "Average client rating." },
            ].map((s, i) => (
              <div key={s.cap} className="stat-item reveal" data-delay={String(i * 80)}>
                <div className="stat-num">
                  {s.num}<span className="accent">{s.suffix}</span>
                </div>
                <div className="stat-cap">{s.cap}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CALLOUT */}
      <section className="band-tight" id="start">
        <div className="wrap">
          <div className="callout reveal">
            <div className="callout-text">
              <h2 className="h-md">Want to see if we&apos;re a fit?</h2>
              <p>The best way to find out is a short call. No pitch deck — just a real conversation about where you&apos;re headed.</p>
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
