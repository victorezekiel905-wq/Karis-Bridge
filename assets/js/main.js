/*
  Karisbridge Schools
  Site behaviour: header, mobile menu, scroll fades, enquiry forms, gallery.
*/

(function () {
  'use strict';

  var SCHOOL_WHATSAPP = '2349040118747';
  var SCHOOL_EMAIL = 'karisbridgeschool@gmail.com';

  /* Header shadow once the page scrolls */
  var header = document.querySelector('.site-header');
  if (header) {
    var onScroll = function () {
      header.classList.toggle('is-scrolled', window.scrollY > 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* Mobile menu */
  var menuButton = document.querySelector('.menu-button');
  var mobileNav = document.getElementById('mobile-nav');

  if (menuButton && mobileNav) {
    var setMenu = function (open) {
      menuButton.setAttribute('aria-expanded', String(open));
      menuButton.querySelector('.menu-label').textContent = open ? 'Close' : 'Menu';
      mobileNav.classList.toggle('is-open', open);
      document.body.classList.toggle('menu-open', open);
      if (open) {
        mobileNav.removeAttribute('inert');
      } else {
        mobileNav.setAttribute('inert', '');
      }
    };

    menuButton.addEventListener('click', function () {
      setMenu(menuButton.getAttribute('aria-expanded') !== 'true');
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && mobileNav.classList.contains('is-open')) {
        setMenu(false);
        menuButton.focus();
      }
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 1040) setMenu(false);
    });
  }

  /* Gentle fade-in as sections come into view */
  var animated = document.querySelectorAll('[data-animate]');
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.1 }
    );
    animated.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    animated.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  /* Enquiry forms: compose a message and hand it to WhatsApp or email */
  document.querySelectorAll('.enquiry-form').forEach(function (form) {
    var status = form.querySelector('.form-status');

    var showError = function (field, message) {
      var wrapper = field.closest('.field');
      var existing = wrapper.querySelector('.field-error');
      if (existing) existing.remove();
      wrapper.classList.toggle('has-error', Boolean(message));
      field.setAttribute('aria-invalid', message ? 'true' : 'false');
      if (message) {
        var note = document.createElement('span');
        note.className = 'field-error';
        note.id = field.id + '-error';
        note.textContent = message;
        wrapper.appendChild(note);
        field.setAttribute('aria-describedby', note.id);
      } else {
        field.removeAttribute('aria-describedby');
      }
    };

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

    var validate = function () {
      var firstInvalid = null;
      Object.keys(rules).forEach(function (name) {
        var field = form.elements[name];
        if (!field) return;
        var message = rules[name](field.value.trim());
        showError(field, message);
        if (message && !firstInvalid) firstInvalid = field;
      });
      return firstInvalid;
    };

    form.addEventListener('input', function (event) {
      if (event.target.closest('.has-error')) validate();
    });

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      var invalid = validate();
      if (invalid) {
        invalid.focus();
        return;
      }

      var get = function (name) {
        var field = form.elements[name];
        return field ? field.value.trim() : '';
      };

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

      var message = 'Hello Karisbridge Schools, I would like to make an enquiry.\n\n' + lines.join('\n');
      if (get('message')) message += '\n\n' + get('message');

      var via = event.submitter && event.submitter.value === 'email' ? 'email' : 'whatsapp';

      if (via === 'email') {
        var subject = 'Enquiry: ' + get('programme');
        window.location.href =
          'mailto:' + SCHOOL_EMAIL + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(message);
        status.textContent = 'Your email app should now be open with the message ready to send.';
      } else {
        window.open('https://wa.me/' + SCHOOL_WHATSAPP + '?text=' + encodeURIComponent(message), '_blank', 'noopener');
        status.textContent = 'WhatsApp has opened in a new tab with your message ready to send. Thank you.';
      }
      status.classList.add('is-visible');
    });
  });

  /* Gallery: filters and lightbox */
  var gallery = document.querySelector('.gallery');
  if (gallery) {
    var items = Array.prototype.slice.call(gallery.querySelectorAll('li'));
    var filterButtons = document.querySelectorAll('.filters button');

    filterButtons.forEach(function (button) {
      button.addEventListener('click', function () {
        var filter = button.getAttribute('data-filter');
        filterButtons.forEach(function (b) {
          b.setAttribute('aria-pressed', String(b === button));
        });
        items.forEach(function (item) {
          item.hidden = !(filter === 'all' || item.getAttribute('data-category') === filter);
        });
      });
    });

    var lightbox = document.querySelector('.lightbox');
    var lbImage = lightbox.querySelector('img');
    var lbCaption = lightbox.querySelector('.lightbox-caption');
    var lbCount = lightbox.querySelector('.lightbox-count');
    var current = 0;

    var visibleItems = function () {
      return items.filter(function (item) {
        return !item.hidden;
      });
    };

    var show = function (index) {
      var list = visibleItems();
      if (!list.length) return;
      current = (index + list.length) % list.length;
      var img = list[current].querySelector('img');
      var full = list[current].querySelector('button').getAttribute('data-full');
      lightbox.classList.toggle('is-small', list[current].getAttribute('data-size') === 'small');
      lbImage.src = full;
      lbImage.alt = img.alt;
      lbCaption.textContent = list[current].getAttribute('data-caption');
      lbCount.textContent = current + 1 + ' of ' + list.length;
    };

    items.forEach(function (item) {
      item.querySelector('button').addEventListener('click', function () {
        show(visibleItems().indexOf(item));
        lightbox.showModal();
      });
    });

    lightbox.querySelector('.lightbox-close').addEventListener('click', function () {
      lightbox.close();
    });
    lightbox.querySelector('.lightbox-prev').addEventListener('click', function () {
      show(current - 1);
    });
    lightbox.querySelector('.lightbox-next').addEventListener('click', function () {
      show(current + 1);
    });
    lightbox.addEventListener('keydown', function (event) {
      if (event.key === 'ArrowLeft') show(current - 1);
      if (event.key === 'ArrowRight') show(current + 1);
    });
    lightbox.addEventListener('click', function (event) {
      if (event.target === lightbox || event.target.classList.contains('lightbox-inner')) lightbox.close();
    });

    var touchStart = 0;
    lightbox.addEventListener('touchstart', function (event) {
      touchStart = event.touches[0].clientX;
    }, { passive: true });
    lightbox.addEventListener('touchend', function (event) {
      var distance = event.changedTouches[0].clientX - touchStart;
      if (Math.abs(distance) > 50) show(current + (distance < 0 ? 1 : -1));
    });
  }

  /* Footer year */
  var year = document.querySelector('[data-year]');
  if (year) year.textContent = new Date().getFullYear();
})();
