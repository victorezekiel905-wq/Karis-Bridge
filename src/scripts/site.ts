/* Site-wide behaviour: sticky header, mobile menu, split headlines, scroll reveals. */

const header = document.querySelector<HTMLElement>('[data-header]');
const menu = document.querySelector<HTMLElement>('[data-menu]');
const toggle = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
const toggleLabel = document.querySelector<HTMLElement>('[data-menu-label]');

/* ---------- Header state ---------- */
if (header) {
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 24);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

/* ---------- Mobile menu ---------- */
if (menu && toggle) {
  const setOpen = (open: boolean) => {
    toggle.setAttribute('aria-expanded', String(open));
    if (toggleLabel) toggleLabel.textContent = open ? 'Close' : 'Menu';
    menu.classList.toggle('is-open', open);
    header?.classList.toggle('menu-open', open);
    document.body.classList.toggle('is-locked', open);
    if (open) {
      menu.removeAttribute('inert');
    } else {
      menu.setAttribute('inert', '');
    }
  };

  toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menu.classList.contains('is-open')) {
      setOpen(false);
      toggle.focus();
    }
  });

  menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setOpen(false)));

  window.matchMedia('(min-width: 1081px)').addEventListener('change', (event) => {
    if (event.matches) setOpen(false);
  });
}

/* ---------- Split headlines into words ---------- */
let wordIndex = 0;

function wrapWord(word: string): HTMLSpanElement {
  const outer = document.createElement('span');
  outer.className = 'w';
  const inner = document.createElement('span');
  inner.textContent = word;
  inner.style.setProperty('--wi', String(wordIndex++));
  outer.append(inner);
  return outer;
}

function splitNode(node: Node, lastWord: { el: HTMLSpanElement | null }) {
  const children = Array.from(node.childNodes);
  for (const child of children) {
    if (child.nodeType === Node.TEXT_NODE) {
      const text = child.textContent ?? '';
      if (!text.trim()) {
        if (text.length) lastWord.el = null;
        continue;
      }
      const fragment = document.createDocumentFragment();
      const parts = text.split(/(\s+)/);
      parts.forEach((part, index) => {
        if (!part) return;
        // Punctuation directly after an inline element (e.g. "</em>,") joins the previous word.
        if (index === 0 && lastWord.el && !/^\s/.test(part)) {
          lastWord.el.append(document.createTextNode(part));
          return;
        }
        if (/^\s+$/.test(part)) {
          fragment.append(document.createTextNode(' '));
          lastWord.el = null;
        } else {
          const word = wrapWord(part);
          fragment.append(word);
          lastWord.el = word.firstElementChild as HTMLSpanElement;
        }
      });
      child.replaceWith(fragment);
    } else if (child instanceof HTMLElement) {
      if (child.tagName === 'BR') {
        lastWord.el = null;
        continue;
      }
      // Punctuation glued to the previous word (e.g. the red full stop) stays with it.
      if (child.classList.contains('full-stop') && lastWord.el) {
        lastWord.el.append(child);
        continue;
      }
      splitNode(child, lastWord);
    }
  }
}

document.querySelectorAll<HTMLElement>('[data-split]').forEach((el) => {
  wordIndex = 0;
  el.setAttribute('aria-label', el.textContent?.replace(/\s+/g, ' ').trim() ?? '');
  splitNode(el, { el: null });
  el.querySelectorAll('.w').forEach((w) => w.setAttribute('aria-hidden', 'true'));
});

/* ---------- Reveal on scroll ---------- */
const revealables = document.querySelectorAll<HTMLElement>('[data-reveal], [data-split]');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14, rootMargin: '0px 0px -6% 0px' },
  );
  revealables.forEach((el) => observer.observe(el));
} else {
  revealables.forEach((el) => el.classList.add('is-in'));
}
