/* ===== SNKRS STORE — Luxury Edition Script ===== */

(function () {
  'use strict';

  // ---- Cart state ----
  var cartCount = 0;

  function updateCartBadge() {
    document.querySelectorAll('.cart-badge').forEach(function (badge) {
      badge.textContent = cartCount;
      badge.style.display = cartCount > 0 ? 'flex' : 'none';
    });
  }

  // ---- Mobile menu ----
  function initMobileMenu() {
    var hamburger = document.querySelector('.hamburger');
    var mobileMenu = document.querySelector('.mobile-menu');
    var closeBtn = document.querySelector('.mobile-menu__close');

    if (!hamburger || !mobileMenu) return;

    hamburger.addEventListener('click', function () {
      mobileMenu.classList.add('active');
      document.body.style.overflow = 'hidden';
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', function () {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
      });
    }

    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // ---- Add to cart with luxury feedback ----
  function initAddToCart() {
    document.addEventListener('click', function (e) {
      var btn = e.target.closest('.js-add-to-cart');
      if (!btn) return;

      cartCount++;
      updateCartBadge();

      // Animate cart badge
      var badges = document.querySelectorAll('.cart-badge');
      badges.forEach(function (badge) {
        badge.style.transform = 'scale(1.4)';
        setTimeout(function () {
          badge.style.transform = 'scale(1)';
        }, 200);
      });

      // Button feedback
      var originalText = btn.textContent;
      btn.textContent = 'Ajout\u00e9 !';
      btn.classList.remove('btn--gold-outline');
      btn.classList.add('btn--gold');
      btn.disabled = true;

      setTimeout(function () {
        btn.textContent = originalText;
        btn.classList.remove('btn--gold');
        btn.classList.add('btn--gold-outline');
        btn.disabled = false;
      }, 1500);
    });
  }

  // ---- Filter selects (shop page) ----
  function initFilters() {
    document.querySelectorAll('.filter-select').forEach(function (select) {
      select.addEventListener('change', function () {
        console.log('[Filter] ' + this.name + ': ' + this.value);
      });
    });
  }

  // ---- Newsletter form ----
  function initNewsletter() {
    var form = document.querySelector('.newsletter__form');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var input = form.querySelector('input[type="email"]');
      if (!input || !input.value) return;

      console.log('[Newsletter] Subscribed:', input.value);
      input.value = '';

      var success = document.querySelector('.newsletter__success');
      if (success) {
        success.classList.add('show');
        setTimeout(function () {
          success.classList.remove('show');
        }, 3000);
      }
    });
  }

  // ---- Smooth scroll for anchor links ----
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        var href = this.getAttribute('href');
        if (href === '#') return;
        var target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  // ---- Navbar style on scroll ----
  function initNavbarScroll() {
    var navbar = document.querySelector('.navbar');
    if (!navbar) return;

    function onScroll() {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ---- Scroll reveal animations (IntersectionObserver) ----
  function initScrollReveal() {
    var revealElements = document.querySelectorAll('.reveal');
    if (!revealElements.length) return;

    // Stagger delay for grid items
    var grids = document.querySelectorAll('.products-grid, .categories-grid, .reassurance-grid');
    grids.forEach(function (grid) {
      var items = grid.querySelectorAll('.reveal');
      items.forEach(function (item, index) {
        item.style.transitionDelay = (index * 0.08) + 's';
      });
    });

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -60px 0px'
    });

    revealElements.forEach(function (el) {
      observer.observe(el);
    });
  }

  // ---- Hero parallax effect ----
  function initHeroParallax() {
    var heroBg = document.querySelector('.hero__bg');
    if (!heroBg) return;

    var ticking = false;

    function updateParallax() {
      var scrollY = window.scrollY;
      var heroHeight = heroBg.parentElement.offsetHeight;

      if (scrollY < heroHeight) {
        var translate = scrollY * 0.3;
        var scale = 1.1 + (scrollY * 0.0002);
        heroBg.style.transform = 'scale(' + scale + ') translateY(' + translate + 'px)';
      }
      ticking = false;
    }

    window.addEventListener('scroll', function () {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    }, { passive: true });
  }

  // ---- Init ----
  document.addEventListener('DOMContentLoaded', function () {
    updateCartBadge();
    initMobileMenu();
    initAddToCart();
    initFilters();
    initNewsletter();
    initSmoothScroll();
    initNavbarScroll();
    initScrollReveal();
    initHeroParallax();
  });
})();
