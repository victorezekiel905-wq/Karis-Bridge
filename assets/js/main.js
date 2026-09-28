/* Karisbridge Schools — site behaviour */
(function () {
  'use strict';

  var SCHOOL_WHATSAPP = '2349040118747';
  var SCHOOL_EMAIL = 'info@karisbridgeschool.com';
  var SCHOOL_EMAIL_CC = 'admin@karisbridgeschool.com,karisbridgeschool@gmail.com';
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Header: solid after scrolling, hides on the way down, returns on the way up */
  var header = document.querySelector('.header');
  var lastY = window.scrollY;
  function onScroll() {
    var y = window.scrollY;
    header.classList.toggle('is-solid', y > 40);
    if (!document.body.classList.contains('is-locked')) {
      header.classList.toggle('is-hidden', y > 400 && y > lastY + 4);
      if (y < lastY - 4) header.classList.remove('is-hidden');
    }
    lastY = y;
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* Mobile menu */
  var burger = document.querySelector('.burger');
  var menu = document.getElementById('menu');
  function setMenu(open) {
    burger.setAttribute('aria-expanded', String(open));
    burger.querySelector('.label-text').textContent = open ? 'Close' : 'Menu';
    menu.classList.toggle('is-open', open);
    header.classList.toggle('menu-active', open);
    document.body.classList.toggle('is-locked', open);
    if (open) menu.removeAttribute('inert');
    else menu.setAttribute('inert', '');
  }
  if (burger && menu) {
    burger.addEventListener('click', function () {
      setMenu(burger.getAttribute('aria-expanded') !== 'true');
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menu.classList.contains('is-open')) {
        setMenu(false);
        burger.focus();
      }
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth > 1080 && menu.classList.contains('is-open')) setMenu(false);
    });
  }

  /* Reveal on scroll */
  var revealEls = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.12 }
    );
    revealEls.forEach(function (el) {
      io.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add('is-in');
    });
  }

  /* Rotating word in the hero */
  document.querySelectorAll('.rotator').forEach(function (rotator) {
    var words = rotator.querySelectorAll('span');
    var i = 0;
    words[0].classList.add('is-in');
    if (reduceMotion || words.length < 2) return;
    setInterval(function () {
      var current = words[i];
      i = (i + 1) % words.length;
      current.classList.remove('is-in');
      current.classList.add('is-out');
      words[i].classList.remove('is-out');
      words[i].classList.add('is-in');
      setTimeout(function () {
        current.classList.remove('is-out');
      }, 900);
    }, 2600);
  });

  function tryPlay(v) {
    var p = v.play();
    if (p && p.catch) p.catch(function () {});
  }

  /* Hero sequence: each video plays through, then photos slide in, then the next video */
  var heroEl = document.querySelector('.hero');
  var track = document.querySelector('[data-hero]');
  if (heroEl && track) {
    var slides = Array.prototype.slice.call(track.querySelectorAll('.slide'));
    var bars = Array.prototype.slice.call(heroEl.querySelectorAll('.hero-progress i'));
    var caption = heroEl.querySelector('.hero-caption');
    var toggle = heroEl.querySelector('.video-toggle');
    var idx = 0;
    var started = 0;
    var spent = 0;
    var userPaused = reduceMotion;
    var offscreen = false;

    var videoOf = function (slide) {
      return slide.querySelector('video');
    };
    var halted = function () {
      return userPaused || offscreen;
    };
    var photoDuration = function (slide) {
      return Number(slide.getAttribute('data-duration')) || 4800;
    };
    var preloadNextVideo = function (from) {
      for (var k = 1; k < slides.length; k++) {
        var v = videoOf(slides[(from + k) % slides.length]);
        if (v) {
          if (v.getAttribute('preload') !== 'auto') {
            v.setAttribute('preload', 'auto');
            v.load();
          }
          return;
        }
      }
    };

    var go = function (next) {
      var prev = slides[idx];
      var incoming = slides[next];
      if (prev !== incoming) {
        prev.classList.remove('is-active');
        prev.classList.add('is-leaving');
        setTimeout(function () {
          prev.classList.remove('is-leaving');
          var pv = videoOf(prev);
          if (pv) pv.pause();
        }, 1300);
        caption.classList.add('is-changing');
        setTimeout(function () {
          caption.textContent = incoming.getAttribute('data-caption');
          caption.classList.remove('is-changing');
        }, 400);
      }
      incoming.classList.remove('is-leaving');
      incoming.classList.add('is-active');
      idx = next;
      bars.forEach(function (bar, k) {
        bar.style.transform = 'scaleX(' + (k < next ? 1 : 0) + ')';
      });
      started = performance.now();
      spent = 0;
      var v = videoOf(incoming);
      if (v) {
        v.currentTime = 0;
        if (!halted()) tryPlay(v);
      }
      preloadNextVideo(next);
    };

    var tick = function (now) {
      if (!halted()) {
        var slide = slides[idx];
        var v = videoOf(slide);
        var progress;
        if (v) {
          if (v.ended) progress = 1;
          else if (!v.paused && v.duration) progress = v.currentTime / v.duration;
          else progress = (spent + now - started) / 11000; /* fallback if the video cannot play */
        } else {
          progress = (spent + now - started) / photoDuration(slide);
        }
        bars[idx].style.transform = 'scaleX(' + Math.min(1, progress) + ')';
        if (progress >= 1) go((idx + 1) % slides.length);
      }
      requestAnimationFrame(tick);
    };

    var halt = function () {
      spent += performance.now() - started;
      var v = videoOf(slides[idx]);
      if (v) v.pause();
      heroEl.classList.add('is-paused');
    };
    var resume = function () {
      started = performance.now();
      var v = videoOf(slides[idx]);
      if (v) tryPlay(v);
      heroEl.classList.remove('is-paused');
    };

    if (toggle) {
      if (userPaused) {
        toggle.setAttribute('aria-pressed', 'true');
        toggle.querySelector('.toggle-text').textContent = 'Play';
        heroEl.classList.add('is-paused');
      }
      toggle.addEventListener('click', function () {
        var wasHalted = halted();
        userPaused = !userPaused;
        toggle.setAttribute('aria-pressed', String(userPaused));
        toggle.querySelector('.toggle-text').textContent = userPaused ? 'Play' : 'Pause';
        if (!wasHalted && halted()) halt();
        if (wasHalted && !halted()) resume();
      });
    }

    if ('IntersectionObserver' in window) {
      new IntersectionObserver(
        function (entries) {
          var wasHalted = halted();
          offscreen = !entries[0].isIntersecting;
          if (!wasHalted && halted()) halt();
          if (wasHalted && !halted()) resume();
        },
        { threshold: 0.05 }
      ).observe(heroEl);
    }

    var first = videoOf(slides[0]);
    if (first && !userPaused) tryPlay(first);
    started = performance.now();
    preloadNextVideo(0);
    requestAnimationFrame(tick);
  }

  /* Other videos: play only while visible */
  var videos = Array.prototype.slice.call(document.querySelectorAll('video[data-auto]'));
  if (!reduceMotion && 'IntersectionObserver' in window) {
    var vo = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) tryPlay(entry.target);
          else entry.target.pause();
        });
      },
      { threshold: 0.2 }
    );
    videos.forEach(function (v) {
      v.muted = true;
      vo.observe(v);
    });
  }

  /* Gentle parallax on full-bleed bands */
  var bands = document.querySelectorAll('.band > img');
  if (bands.length && !reduceMotion) {
    var ticking = false;
    function parallax() {
      bands.forEach(function (img) {
        var rect = img.parentElement.getBoundingClientRect();
        var progress = (rect.top + rect.height / 2 - window.innerHeight / 2) / window.innerHeight;
        img.style.transform = 'translate3d(0,' + (progress * -60).toFixed(1) + 'px,0)';
      });
      ticking = false;
    }
    window.addEventListener(
      'scroll',
      function () {
        if (!ticking) {
          requestAnimationFrame(parallax);
          ticking = true;
        }
      },
      { passive: true }
    );
    parallax();
  }

  /* Enquiry forms: compose a message and open WhatsApp or email */
  document.querySelectorAll('.enquiry').forEach(function (form) {
    var status = form.querySelector('.form-status');
    var rules = {
      parent: function (v) {
        return v.length < 2 ? 'Please enter your name.' : '';
      },
      phone: function (v) {
        return v.replace(/\D/g, '').length < 7 ? 'Please enter a phone number we can reach you on.' : '';
      },
      email: function (v) {
        return v && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? 'Please check the email address.' : '';
      },
      programme: function (v) {
        return v ? '' : 'Please choose a class.';
      }
    };
    function showError(field, msg) {
      var wrap = field.closest('.field');
      var old = wrap.querySelector('.field-error');
      if (old) old.remove();
      wrap.classList.toggle('has-error', !!msg);
      field.setAttribute('aria-invalid', msg ? 'true' : 'false');
      if (msg) {
        var note = document.createElement('span');
        note.className = 'field-error';
        note.id = field.id + '-error';
        note.textContent = msg;
        wrap.appendChild(note);
        field.setAttribute('aria-describedby', note.id);
      } else {
        field.removeAttribute('aria-describedby');
      }
    }
    function validate() {
      var first = null;
      Object.keys(rules).forEach(function (name) {
        var field = form.elements[name];
        if (!field) return;
        var msg = rules[name](field.value.trim());
        showError(field, msg);
        if (msg && !first) first = field;
      });
      return first;
    }
    form.addEventListener('input', function (e) {
      if (e.target.closest('.has-error')) validate();
    });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var invalid = validate();
      if (invalid) {
        invalid.focus();
        return;
      }
      function get(n) {
        return form.elements[n] ? form.elements[n].value.trim() : '';
      }
      var visit = get('visit');
      if (visit) {
        visit = new Date(visit + 'T00:00:00').toLocaleDateString('en-GB', {
          weekday: 'long',
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        });
      }
      var lines = ['Parent/guardian: ' + get('parent'), 'Phone: ' + get('phone')];
      if (get('email')) lines.push('Email: ' + get('email'));
      lines.push('Class of interest: ' + get('programme'));
      if (get('child')) lines.push("Child's name: " + get('child'));
      if (get('age')) lines.push("Child's age: " + get('age'));
      if (visit) lines.push('Preferred visit date: ' + visit);
      var text = 'Hello Karisbridge Schools, I would like to make an enquiry.\n\n' + lines.join('\n');
      if (get('message')) text += '\n\n' + get('message');

      if (e.submitter && e.submitter.value === 'email') {
        window.location.href =
          'mailto:' + SCHOOL_EMAIL + '?cc=' + encodeURIComponent(SCHOOL_EMAIL_CC) + '&subject=' + encodeURIComponent('Enquiry: ' + get('programme')) + '&body=' + encodeURIComponent(text);
        status.textContent = 'Your email app should now be open with the message ready to send.';
      } else {
        window.open('https://wa.me/' + SCHOOL_WHATSAPP + '?text=' + encodeURIComponent(text), '_blank', 'noopener');
        status.textContent = 'WhatsApp has opened with your message ready to send. Thank you, we look forward to meeting you.';
      }
      status.classList.add('is-visible');
    });
  });

  /* Gallery filter and lightbox */
  var gallery = document.querySelector('.gallery');
  if (gallery) {
    var items = Array.prototype.slice.call(gallery.querySelectorAll('li'));
    var buttons = document.querySelectorAll('.filters button');
    buttons.forEach(function (b) {
      b.addEventListener('click', function () {
        var f = b.getAttribute('data-filter');
        buttons.forEach(function (x) {
          x.setAttribute('aria-pressed', String(x === b));
        });
        items.forEach(function (item) {
          item.hidden = !(f === 'all' || item.getAttribute('data-cat') === f);
        });
      });
    });

    var lb = document.querySelector('.lightbox');
    var lbImg = lb.querySelector('img');
    var lbCap = lb.querySelector('.lb-cap');
    var lbCount = lb.querySelector('.lb-count');
    var current = 0;
    function visible() {
      return items.filter(function (i) {
        return !i.hidden;
      });
    }
    function show(n) {
      var list = visible();
      if (!list.length) return;
      current = (n + list.length) % list.length;
      var img = list[current].querySelector('img');
      lbImg.src = img.getAttribute('data-full') || img.src;
      lbImg.alt = img.alt;
      lbCap.textContent = list[current].getAttribute('data-caption');
      lbCount.textContent = current + 1 + ' of ' + list.length;
    }
    items.forEach(function (item) {
      item.querySelector('button').addEventListener('click', function () {
        show(visible().indexOf(item));
        lb.showModal();
        document.body.classList.add('is-locked');
      });
    });
    lb.addEventListener('close', function () {
      document.body.classList.remove('is-locked');
    });
    lb.querySelector('.lb-close').addEventListener('click', function () {
      lb.close();
    });
    lb.querySelector('.lb-prev').addEventListener('click', function () {
      show(current - 1);
    });
    lb.querySelector('.lb-next').addEventListener('click', function () {
      show(current + 1);
    });
    lb.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') show(current - 1);
      if (e.key === 'ArrowRight') show(current + 1);
    });
    lb.addEventListener('click', function (e) {
      if (e.target === lb || e.target.classList.contains('lb-inner')) lb.close();
    });
    var sx = 0;
    lb.addEventListener('touchstart', function (e) {
      sx = e.touches[0].clientX;
    }, { passive: true });
    lb.addEventListener('touchend', function (e) {
      var dx = e.changedTouches[0].clientX - sx;
      if (Math.abs(dx) > 50) show(current + (dx < 0 ? 1 : -1));
    });
  }

  var year = document.querySelector('[data-year]');
  if (year) year.textContent = new Date().getFullYear();
})();
