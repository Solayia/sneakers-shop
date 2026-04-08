/* EDITION — Luxury Sneaker Store */

(function () {
    'use strict';

    /* --- Cart counter --- */
    var cartCount = 0;
    var cartEls = document.querySelectorAll('#cart-count');

    function updateCart() {
        cartEls.forEach(function (el) {
            el.textContent = cartCount;
        });
    }

    /* --- Toast notification --- */
    var toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
    var toastTimer = null;

    function showToast(message) {
        toast.textContent = message;
        toast.classList.add('is-visible');
        clearTimeout(toastTimer);
        toastTimer = setTimeout(function () {
            toast.classList.remove('is-visible');
        }, 2200);
    }

    /* --- Add to cart on product card click --- */
    var productCards = document.querySelectorAll('[data-add-cart]');
    productCards.forEach(function (card) {
        card.addEventListener('click', function (e) {
            e.preventDefault();
            cartCount++;
            updateCart();
            var name = card.querySelector('.product-card__name');
            showToast(name ? name.textContent + ' — ajoute au panier' : 'Ajoute au panier');
        });
    });

    /* --- Mobile menu --- */
    var menuToggle = document.getElementById('menu-toggle');
    var mobileMenu = document.getElementById('mobile-menu');

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function () {
            var isOpen = mobileMenu.classList.toggle('is-open');
            menuToggle.classList.toggle('is-active');
            document.body.style.overflow = isOpen ? 'hidden' : '';
        });

        mobileMenu.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                mobileMenu.classList.remove('is-open');
                menuToggle.classList.remove('is-active');
                document.body.style.overflow = '';
            });
        });
    }

    /* --- Navbar hide on scroll down, show on scroll up --- */
    var navbar = document.getElementById('navbar');
    var lastScrollY = window.scrollY;
    var scrollThreshold = 10;

    function onScroll() {
        var currentY = window.scrollY;
        if (currentY < 60) {
            navbar.classList.remove('navbar--hidden');
            lastScrollY = currentY;
            return;
        }
        if (currentY - lastScrollY > scrollThreshold) {
            navbar.classList.add('navbar--hidden');
        } else if (lastScrollY - currentY > scrollThreshold) {
            navbar.classList.remove('navbar--hidden');
        }
        lastScrollY = currentY;
    }

    var ticking = false;
    window.addEventListener('scroll', function () {
        if (!ticking) {
            window.requestAnimationFrame(function () {
                onScroll();
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

    /* --- Newsletter form mock --- */
    var newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function (e) {
            e.preventDefault();
            var input = newsletterForm.querySelector('.newsletter__input');
            if (input && input.value) {
                showToast('Inscription confirmee. Merci.');
                input.value = '';
            }
        });
    }

    /* --- Sort functionality (shop page) --- */
    var sortSelect = document.getElementById('sort-select');
    if (sortSelect) {
        sortSelect.addEventListener('change', function () {
            var grid = document.querySelector('.shop-grid-section .product-grid');
            if (!grid) return;
            var cards = Array.from(grid.querySelectorAll('.product-card'));
            var sorted;

            if (this.value === 'price-asc') {
                sorted = cards.sort(function (a, b) {
                    return getPrice(a) - getPrice(b);
                });
            } else if (this.value === 'price-desc') {
                sorted = cards.sort(function (a, b) {
                    return getPrice(b) - getPrice(a);
                });
            } else {
                sorted = cards;
            }

            sorted.forEach(function (card) {
                grid.appendChild(card);
            });
        });
    }

    function getPrice(card) {
        var attr = card.getAttribute('data-price');
        if (attr) return parseFloat(attr);
        var priceEl = card.querySelector('.product-card__price');
        if (!priceEl) return 0;
        return parseFloat(priceEl.textContent.replace(/[^\d]/g, ''));
    }

})();