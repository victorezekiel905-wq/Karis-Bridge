# Karisbridge Schools

Website for Karisbridge Schools, a creche, nursery and primary school at 1st Avenue, Kajola Estate Phase 1, Ibeju-Lekki, Lagos.

It is a plain HTML, CSS and JavaScript site with no build step. `index.html` is the home page. Open it in a browser to view the site locally.

## Pages

| File | Page |
| --- | --- |
| `index.html` | Home |
| `about.html` | About, values, careers |
| `academics.html` | Creche, nursery, primary, enrichment, Summer School |
| `admissions.html` | How to join, registration documents, enquiry form, questions |
| `school-life.html` | Films and highlights |
| `gallery.html` | Films and photos, sorted by occasion |
| `contact.html` | Contact details, map, message form |
| `404.html` | Page not found |

## Folders

```
assets/css/style.css   all styles
assets/js/main.js      menu, enquiry forms, gallery
assets/fonts/          Instrument Serif and Instrument Sans (self-hosted)
assets/video/          short silent loops from the school’s Instagram reels
assets/images/         photographs and logos (WebP)
```

## Editing

- **Text** is written directly in each HTML file.
- **Phone numbers and email** appear in the header, footer and contact sections of each page. The WhatsApp number and email address the forms send to are set at the top of `assets/js/main.js`.
- **Photos**: add a WebP image to `assets/images/` and reference it from the page.

The enquiry forms need no server. When a parent presses send, the message opens in WhatsApp or their email app, addressed to the school, ready to send.

## Publishing

Upload the whole folder to any web host, or connect this repository to GitHub Pages, Netlify or Vercel (no build command, publish directory is the repository root).

Once the domain is known, change the `og:image` tag in each page to the full address (for example `https://karisbridgeschools.com/assets/images/og-image.jpg`) so the preview image shows when the link is shared on WhatsApp and Facebook.
