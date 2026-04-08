/* ===== SNKRS STORE — Main Script ===== */

(function () {
  'use strict';

  // ---- Cart state ----
  let cartCount = 0;

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

    // Close on link click
    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // ---- Add to cart ----
  function initAddToCart() {
    document.addEventListener('click', function (e) {
      var btn = e.target.closest('.js-add-to-cart');
      if (!btn) return;

      cartCount++;
      updateCartBadge();

      // Button feedback
      var originalText = btn.textContent;
      btn.textContent = 'Ajout\u00e9 !';
      btn.classList.remove('btn--dark');
      btn.classList.add('btn--accent');
      btn.disabled = true;

      setTimeout(function () {
        btn.textContent = originalText;
        btn.classList.remove('btn--accent');
        btn.classList.add('btn--dark');
        btn.disabled = false;
      }, 1200);
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
        var target = document.querySelector(this.getAttribute('href'));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  // ---- Navbar shadow on scroll ----
  function initScrollShadow() {
    var navbar = document.querySelector('.navbar');
    if (!navbar) return;

    window.addEventListener('scroll', function () {
      if (window.scrollY > 10) {
        navbar.style.boxShadow = '0 1px 8px rgba(0,0,0,0.06)';
      } else {
        navbar.style.boxShadow = 'none';
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
    initScrollShadow();
  });
})();
