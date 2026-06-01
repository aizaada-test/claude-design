import Link from "next/link";

const BrandMarkDark = () => (
  <svg viewBox="0 0 40 40" fill="none" aria-hidden="true" width="24" height="24">
    <g fill="#faf9f5">
      <rect x="18.4" y="3"    width="3.2" height="34" rx="1.6" />
      <rect x="3"    y="18.4" width="34"  height="3.2" rx="1.6" />
      <rect x="18.4" y="3"    width="3.2" height="34" rx="1.6" transform="rotate(45 20 20)" />
      <rect x="18.4" y="3"    width="3.2" height="34" rx="1.6" transform="rotate(-45 20 20)" />
    </g>
  </svg>
);

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-top">
          <div>
            <Link href="/" className="brand">
              <BrandMarkDark />
              Cardinal
            </Link>
            <p className="footer-blurb">
              A full-service marketing studio for teams who want senior work without the in-house headcount.
            </p>
          </div>
          <div className="footer-col">
            <h4>Studio</h4>
            <Link href="/about">About</Link>
            <Link href="/services">Services</Link>
            <Link href="/case-studies">Case studies</Link>
            <a href="#">Careers</a>
          </div>
          <div className="footer-col">
            <h4>Services</h4>
            <Link href="/services">Brand strategy</Link>
            <Link href="/services">Social &amp; community</Link>
            <Link href="/services">Paid media</Link>
            <Link href="/services">Content &amp; SEO</Link>
          </div>
          <div className="footer-col">
            <h4>Get in touch</h4>
            <a href="#">hello@cardinal.studio</a>
            <a href="#">Book a call</a>
            <a href="#">Newsletter</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span className="small">© 2026 Cardinal Studio. All rights reserved.</span>
          <div className="footer-social">
            <a href="#" aria-label="X">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
                <path d="M4 4l16 16M20 4L4 20" />
              </svg>
            </a>
            <a href="#" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="M7 10v7M7 7v.01M11 17v-4a2 2 0 0 1 4 0v4" />
              </svg>
            </a>
            <a href="#" aria-label="Instagram">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <path d="M17.5 6.5v.01" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
