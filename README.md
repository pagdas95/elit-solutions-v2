# ElIT Solutions — website

"Software, built in layers." Marketing site for ElIT Solutions: Home, Services, Lab and Contact,
built from the approved v3 designs (palette **Ion**).

**Live:** https://elit-solutions.netlify.app (Netlify project `elit-solutions`, private to the team for now)

**Stack:** Next.js 16 (App Router, Cache Components) · Tailwind CSS 4 · Motion · Netlify.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
```

## Where things live

| Path | What |
| --- | --- |
| `src/app/globals.css` | Design tokens (`@theme`), breakpoints (641 / 861 / 1081), shared motion classes (`el-*`) |
| `src/app/fonts.ts` + `src/app/fonts/` | Self-hosted fonts: Barlow Condensed (display), Inter (text), Geist Mono (labels), Sora (logo only) |
| `src/components/Logo.tsx` | **The only place the logo is drawn.** Swap this file to change the logo. |
| `src/components/SiteHeader.tsx` | Nav pill, Services dropdown, mobile menu; switches colours over `data-nav="light"` sections |
| `src/components/home/LayeredE.ts` | The 3D layered E, drawn on a 2D canvas (no video, no 3D files) |
| `src/components/home/*` | Hero demo panel, pinned hero, scroll-filled statement, loop, stack |
| `src/components/lab/projects.tsx` | Lab projects and case files: edit here to add work |
| `src/lib/site.ts` | Contact details and other placeholders waiting on the owner |
| `public/__forms.html` | Netlify Forms skeleton (field names must match `src/lib/enquiry.ts`) |

### Conventions

- Every full-width section carries `data-nav="dark"` or `data-nav="light"` so the nav can adapt.
- One easing curve everywhere: `cubic-bezier(0.22, 1, 0.36, 1)` (`--ease`, Tailwind `ease-brand`).
- Layer colours (cyan, blue, violet) only inside the services stack and the logo.
- Lab labels are honest: Concept, In development, Pilot, Live, Client. No invented clients or results.
- `prefers-reduced-motion` is respected: demo and loop start paused, and the E shows assembled.

## Deploys (Netlify)

- `main` → production. Every pull request → a **Deploy Preview** link; other branches → branch deploys.
- Previews and production are `noindex` until `ALLOW_INDEXING=true` is set for the production context.
- **Forms:** enable *Form detection* once in Netlify (Site → Forms). Submissions are named `enquiry`;
  set up an email notification there. Locally the form shows its error state, because only Netlify accepts the POST.

## Open items (from the brief)

- Real email, WhatsApp, call-booking link, city and hours → `src/lib/site.ts`
- Business name and address for Privacy and Terms; code ownership terms (Services FAQ)
- Wordmark decision (parked): change `src/components/Logo.tsx` only
- Deferred motion: Lenis smooth scroll, stack tabs replaying micro-demos, real product footage
