# Project Specs — Cardinal Marketing Site

## What it does
A single-page marketing homepage for **Cardinal**, a full-service marketing agency.
Displays hero, services, stats, selected work, testimonial, callout, and footer.

## Who uses it
Prospective clients landing on the site from ads, referrals, or search.

## Tech stack
- **Framework:** Next.js (App Router, latest)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + CSS custom properties (design tokens)
- **Animations:** GSAP + ScrollTrigger (client-side via `useEffect`)
- **Fonts:** Google Fonts — Cormorant Garamond + Inter
- **Hosting:** Vercel (future)

## Pages / routes
| Route | File | Notes |
|---|---|---|
| `/` | `app/page.tsx` | The homepage — this task |

## Data
No database. All content is static / hardcoded in the component.

## What "done" looks like
- `npm run dev` starts without errors
- `http://localhost:3000` shows the Cardinal homepage
- All GSAP animations fire (hero load sequence, scroll reveals, stat counters, card tilt)
- No TypeScript or build errors
