"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const BrandMark = () => (
  <svg viewBox="0 0 40 40" fill="none" aria-hidden="true" width="24" height="24">
    <g fill="#cc785c">
      <rect x="18.4" y="3"   width="3.2" height="34" rx="1.6" />
      <rect x="3"    y="18.4" width="34" height="3.2" rx="1.6" />
      <rect x="18.4" y="3"   width="3.2" height="34" rx="1.6" transform="rotate(45 20 20)" />
      <rect x="18.4" y="3"   width="3.2" height="34" rx="1.6" transform="rotate(-45 20 20)" />
    </g>
  </svg>
);

export default function Nav() {
  const pathname = usePathname();

  useEffect(() => {
    const nav    = document.getElementById("main-nav");
    const toggle = document.querySelector<HTMLElement>(".nav-toggle");

    const onToggle = () => nav?.classList.toggle("open");
    toggle?.addEventListener("click", onToggle);
    document.querySelectorAll(".nav-links a").forEach((a) =>
      a.addEventListener("click", () => nav?.classList.remove("open"))
    );

    const onScroll = () => {
      if (!nav) return;
      nav.style.boxShadow =
        window.scrollY > 50 ? "0 2px 24px rgba(20,20,19,.09)" : "none";
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      toggle?.removeEventListener("click", onToggle);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const link = (href: string, label: string) => (
    <a href={href} className={pathname === href ? "active" : ""}>
      {label}
    </a>
  );

  return (
    <nav className="nav" id="main-nav">
      <div className="wrap nav-inner">
        <a href="/" className="brand">
          <BrandMark />
          Cardinal
        </a>
        <div className="nav-links">
          {link("/",             "Home")}
          {link("/services",     "Services")}
          {link("/about",        "About")}
          {link("/case-studies", "Case studies")}
        </div>
        <div className="nav-right">
          <a href="#" className="nav-signin">Sign in</a>
          <a href="#start" className="btn btn-primary btn-sm">Start a project</a>
          <button className="nav-toggle" aria-label="Menu">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
              <path d="M3 6h18M3 12h18M3 18h18" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}
