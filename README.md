# Karisbridge Schools — Website

The official website of **Karisbridge Schools**, a Creche, Nursery and Primary school at 1st Avenue, Kajola Estate Phase 1, Ibeju-Lekki, Lagos.

> *Holistic Education & Excellent Character — Show forth your light.*

Built with [Astro](https://astro.build) as a fast, fully static site: no server or database is needed, and every photo is automatically resized and converted to modern formats at build time.

## Pages

| Page | Path | What it covers |
| --- | --- | --- |
| Home | `/` | Hero, welcome, promises, programmes, enrichment, graduation highlights, motto, campus, admissions steps |
| About | `/about` | The meaning of the name, vision and mission, values, approach, parents as partners, careers |
| Academics | `/academics` | Creche, Nursery and Primary in detail, teaching principles, enrichment, Summer School |
| Admissions | `/admissions` | Five-step journey, documents to prepare, enquiry form, FAQs |
| Life at KBS | `/life` | Highlights and a filterable photo gallery with a full-screen viewer |
| Contact | `/contact` | Contact cards, Google map, message form, social links |

## Getting started

Requires **Node.js 22.12 or newer**.

```bash
npm install
npm run dev       # local development at http://localhost:4321
npm run build     # production build into ./dist
npm run preview   # preview the production build
```

## Updating content

- **Contact details** (phone numbers, WhatsApp, emails, address, social links) all live in one file: [`src/data/site.ts`](src/data/site.ts). Change them there and every page updates.
- **Photos** live in `src/assets/images/`. Captions, alt text and gallery categories are in [`src/data/media.ts`](src/data/media.ts). To add a photo, drop the file in `src/assets/images/`, import it in `media.ts`, and add its key to `galleryOrder`.
- **Page text** is written directly in each page under `src/pages/`.

### Enquiry forms

The admissions and contact forms need no server. When a parent submits, the form composes a tidy message and opens **WhatsApp** (or their **email app**) addressed to the school, ready to send. The WhatsApp number is `site.whatsapp` in `src/data/site.ts`.

## Deployment

The site builds to plain static files in `dist/`, so it can be hosted almost anywhere.

- **Vercel / Netlify / Cloudflare Pages:** import this repository. Build command `npm run build`, output directory `dist`.
- Set the environment variable **`SITE_URL`** to the final domain (for example `https://karisbridgeschools.com`) so canonical links and social-share previews use absolute URLs.

## Before launch — please confirm

1. **Phone numbers.** The Facebook page lists `+234 904 011 8747` and `+234 913 699 1147`. One reading of the Instagram bio showed `0901 140 8747`. Confirm the correct numbers (and which one is on WhatsApp) in `src/data/site.ts`.
2. **Copy review.** The descriptions of each programme, the values and the FAQs were written from the school's public posts and photos. Review them with the school leadership, especially the documents list and FAQ answers on the Admissions page.
3. **Photos.** Most Instagram photos available were small (206 × 206 px), so the design shows them only in small frames. Higher-resolution originals from the school would let them be used larger.

## Project structure

```
src/
  assets/brand/    logo (transparent + reversed), share image
  assets/images/   school photography
  components/      Header, Footer, PageHero, EnquiryForm, Photo, Icon…
  data/            site details and media library
  layouts/         base layout with SEO and structured data
  pages/           one file per page (+ 404)
  scripts/         site-wide interactions (menu, reveals)
  styles/          global design system
public/            favicon, touch icon, manifest, robots.txt
```
