/* ÉDITION — Luxury Sneaker Store */

(function () {
    'use strict';

    /* ===================== PRODUCT DATA ===================== */
    const products = [
        {
            id: 1, brand: "NIKE", name: "Free RN Flyknit", price: 149, img: "img/sneaker-1.jpg",
            desc: "Le Free RN Flyknit incarne la philosophie de la course naturelle. Son upper en Flyknit épouse le pied comme une seconde peau, offrant légèreté et respirabilité à chaque foulée.",
            story: "Née en 2012, la gamme Free a révolutionné le running en proposant une semelle flexible qui imite la course pieds nus. Le Flyknit, introduit la même année, a marqué un tournant dans l'industrie avec son tissage haute précision."
        },
        {
            id: 2, brand: "NIKE", name: "Air Force 1 Corduroy", price: 139, img: "img/sneaker-2.jpg",
            desc: "L'Air Force 1 se réinvente dans une version velours côtelé chaleureuse. Le corduroy marron apporte une touche automnale raffinée à cette silhouette iconique.",
            story: "Créée en 1982 par Bruce Kilgore, l'Air Force 1 fut la première chaussure de basketball à intégrer la technologie Air. Quarante ans plus tard, elle reste la sneaker la plus vendue au monde."
        },
        {
            id: 3, brand: "NIKE", name: "AF1 Shadow Pastel", price: 129, img: "img/sneaker-3.jpg",
            desc: "La AF1 Shadow revisite le classique avec des couches superposées et une palette pastel audacieuse. Un design déconstructé qui célèbre la créativité et l'individualité.",
            story: "La collection Shadow est née d'un programme interne Nike qui encourage les designers à déconstruire les classiques. Chaque couche dédoublée symbolise le fait de toujours se surpasser."
        },
        {
            id: 4, brand: "NIKE", name: "Air Max 1 Ultra", price: 159, img: "img/sneaker-4.jpg",
            desc: "L'Air Max 1 Ultra allège la silhouette originale tout en conservant la fenêtre Air visible qui a changé l'histoire de la sneaker. Un confort modernisé, un design intemporel.",
            story: "En 1987, Tinker Hatfield s'inspire du Centre Pompidou à Paris pour créer la première fenêtre Air visible. L'Air Max 1 est née, révolutionnant à jamais le design de chaussures."
        },
        {
            id: 5, brand: "ADIDAS", name: "Ultraboost 23", price: 189, img: "img/sneaker-5.jpg",
            desc: "L'Ultraboost 23 repousse les limites du confort avec sa semelle Boost intégrale et son upper Primeknit adaptatif. La référence absolue en matière de running premium.",
            story: "Lancée en 2015, l'Ultraboost a été qualifiée de \u00ab meilleure chaussure de running jamais créée \u00bb par Kanye West, propulsant le modèle au rang d'icône lifestyle mondiale."
        },
        {
            id: 6, brand: "NEW BALANCE", name: "550", price: 129, img: "img/sneaker-6.jpg",
            desc: "La New Balance 550 ressuscite un modèle de basketball des années 80. Son design rétro épuré et sa silhouette basse en font la sneaker lifestyle parfaite.",
            story: "Originellement sortie en 1989 comme chaussure de basketball, la 550 a été redécouverte en 2020 grâce à une collaboration avec Aimé Leon Dore, devenant instantanément l'une des sneakers les plus désirées."
        },
        {
            id: 7, brand: "PUMA", name: "Suede Classic", price: 89, img: "img/sneaker-7.jpg",
            desc: "La Puma Suede Classic est l'essence même du style streetwear. Son daim premium et sa semelle vulcanisée offrent un look authentique qui traverse les décennies.",
            story: "Née en 1968 comme chaussure de compétition, la Suede est devenue un symbole de la culture hip-hop dans les années 80 quand les B-Boys de New York l'ont adoptée pour danser le breakdance."
        },
        {
            id: 8, brand: "CONVERSE", name: "Chuck 70", price: 94, img: "img/sneaker-8.jpg",
            desc: "La Chuck 70 revisite la Chuck Taylor All Star originale avec des matériaux premium : toile plus épaisse, semelle en mousse rembourrée, et finitions soignées.",
            story: "La Chuck Taylor originale date de 1917. La version 70 s'inspire fidèlement du modèle des années 1970, considéré par les puristes comme l'âge d'or de la silhouette."
        }
    ];

    // Make products accessible globally
    window.editionProducts = products;

    /* ===================== CART ===================== */
    function getCart() {
        try {
            return JSON.parse(localStorage.getItem('edition_cart')) || [];
        } catch (e) {
            return [];
        }
    }

    function saveCart(cart) {
        localStorage.setItem('edition_cart', JSON.stringify(cart));
        updateCartBadge();
    }

    function addToCart(id, size) {
        const cart = getCart();
        const existing = cart.find(item => item.id === id && item.size === size);
        if (existing) {
            existing.qty += 1;
        } else {
            cart.push({ id: id, size: size, qty: 1 });
        }
        saveCart(cart);
    }

    function getCartCount() {
        return getCart().reduce((sum, item) => sum + item.qty, 0);
    }

    function updateCartBadge() {
        const badges = document.querySelectorAll('.cart-badge');
        const count = getCartCount();
        badges.forEach(badge => {
            badge.textContent = count;
            badge.style.display = count > 0 ? 'flex' : 'none';
        });
    }

    /* ===================== PRODUCT CARD RENDERING ===================== */
    function createProductCard(product) {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <a href="product.html?id=${product.id}" class="product-card-link">
                <div class="product-card-image">
                    <img src="${product.img}" alt="${product.name}" loading="lazy">
                </div>
                <div class="product-card-info">
                    <span class="product-card-brand">${product.brand}</span>
                    <h3 class="product-card-name">${product.name}</h3>
                    <span class="product-card-price">${product.price}\u00A0\u20AC</span>
                </div>
            </a>
            <button class="btn-add-to-cart" data-id="${product.id}">EN SAVOIR PLUS</button>
        `;
        // Click on entire card or button → go to product page to select size
        card.querySelector('.btn-add-to-cart').addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            window.location.href = 'product.html?id=' + product.id;
        });
        return card;
    }

    window.renderProductGrid = function (containerId, ids) {
        const container = document.getElementById(containerId);
        if (!container) return;
        container.innerHTML = '';
        ids.forEach(id => {
            const product = products.find(p => p.id === id);
            if (product) {
                container.appendChild(createProductCard(product));
            }
        });
    };

    /* ===================== CART PANEL ===================== */
    function createCartPanel() {
        const overlay = document.createElement('div');
        overlay.className = 'cart-overlay';
        overlay.id = 'cartOverlay';

        const panel = document.createElement('div');
        panel.className = 'cart-panel';
        panel.id = 'cartPanel';
        panel.innerHTML = `
            <div class="cart-panel-header">
                <h3>PANIER</h3>
                <button class="cart-panel-close" id="cartClose">&times;</button>
            </div>
            <div class="cart-panel-body" id="cartBody"></div>
            <div class="cart-panel-footer" id="cartFooter"></div>
        `;

        document.body.appendChild(overlay);
        document.body.appendChild(panel);

        overlay.addEventListener('click', closeCartPanel);
        document.getElementById('cartClose').addEventListener('click', closeCartPanel);
    }

    function openCartPanel() {
        const overlay = document.getElementById('cartOverlay');
        const panel = document.getElementById('cartPanel');
        if (!overlay || !panel) return;
        renderCartPanel();
        overlay.classList.add('open');
        panel.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closeCartPanel() {
        const overlay = document.getElementById('cartOverlay');
        const panel = document.getElementById('cartPanel');
        if (!overlay || !panel) return;
        overlay.classList.remove('open');
        panel.classList.remove('open');
        document.body.style.overflow = '';
    }

    function renderCartPanel() {
        const cart = getCart();
        const body = document.getElementById('cartBody');
        const footer = document.getElementById('cartFooter');
        if (!body || !footer) return;

        if (cart.length === 0) {
            body.innerHTML = '<p class="cart-empty">Votre panier est vide.</p>';
            footer.innerHTML = '';
            return;
        }

        let html = '';
        let total = 0;

        cart.forEach((item, index) => {
            const product = products.find(p => p.id === item.id);
            if (!product) return;
            const itemTotal = product.price * item.qty;
            total += itemTotal;

            html += `
                <div class="cart-item">
                    <img src="${product.img}" alt="${product.name}" class="cart-item-img">
                    <div class="cart-item-info">
                        <span class="cart-item-brand">${product.brand}</span>
                        <span class="cart-item-name">${product.name}</span>
                        <span class="cart-item-size">Taille ${item.size}</span>
                        <span class="cart-item-price">${product.price}\u00A0\u20AC</span>
                    </div>
                    <div class="cart-item-actions">
                        <div class="cart-item-qty">
                            <button class="qty-btn" data-index="${index}" data-action="minus">&minus;</button>
                            <span>${item.qty}</span>
                            <button class="qty-btn" data-index="${index}" data-action="plus">&plus;</button>
                        </div>
                        <button class="cart-item-remove" data-index="${index}">&times; Retirer</button>
                    </div>
                </div>
            `;
        });

        body.innerHTML = html;
        footer.innerHTML = `
            <div class="cart-total">
                <span>Total</span>
                <span>${total}\u00A0\u20AC</span>
            </div>
            <button class="btn btn-primary cart-checkout-btn">VALIDER LA COMMANDE</button>
            <p class="cart-footer-note">Livraison offerte dès 100\u00A0\u20AC d'achat</p>
        `;

        // Qty buttons
        body.querySelectorAll('.qty-btn').forEach(btn => {
            btn.addEventListener('click', function () {
                const cart = getCart();
                const idx = parseInt(this.dataset.index);
                if (this.dataset.action === 'plus') {
                    cart[idx].qty += 1;
                } else if (this.dataset.action === 'minus') {
                    cart[idx].qty -= 1;
                    if (cart[idx].qty <= 0) cart.splice(idx, 1);
                }
                saveCart(cart);
                renderCartPanel();
            });
        });

        // Remove buttons
        body.querySelectorAll('.cart-item-remove').forEach(btn => {
            btn.addEventListener('click', function () {
                const cart = getCart();
                const idx = parseInt(this.dataset.index);
                cart.splice(idx, 1);
                saveCart(cart);
                renderCartPanel();
            });
        });

        // Checkout
        footer.querySelector('.cart-checkout-btn').addEventListener('click', () => {
            showNotification('Merci ! Commande en cours de traitement.');
            saveCart([]);
            renderCartPanel();
        });
    }

    // Init cart panel
    createCartPanel();

    // Cart button click
    document.querySelectorAll('.cart-btn').forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            openCartPanel();
        });
    });

    /* ===================== NOTIFICATION ===================== */
    function showNotification(message) {
        let notif = document.querySelector('.notification');
        if (!notif) {
            notif = document.createElement('div');
            notif.className = 'notification';
            document.body.appendChild(notif);
        }
        notif.textContent = message;
        notif.classList.add('show');
        setTimeout(() => notif.classList.remove('show'), 2000);
    }

    /* ===================== PRODUCT PAGE ===================== */
    window.initProductPage = function () {
        const params = new URLSearchParams(window.location.search);
        const id = parseInt(params.get('id'));
        const product = products.find(p => p.id === id);

        if (!product) {
            window.location.href = 'shop.html';
            return;
        }

        document.title = product.name + ' — ÉDITION';

        // Breadcrumb
        document.getElementById('breadcrumb').innerHTML = `
            <a href="shop.html">Collection</a>
            <span class="breadcrumb-sep">/</span>
            <a href="shop.html">${product.brand}</a>
            <span class="breadcrumb-sep">/</span>
            <span>${product.name}</span>
        `;

        // Product info
        document.getElementById('productImage').src = product.img;
        document.getElementById('productImage').alt = product.name;
        document.getElementById('productBrand').textContent = product.brand;
        document.getElementById('productName').textContent = product.name;
        document.getElementById('productPrice').textContent = product.price + '\u00A0\u20AC';
        document.getElementById('productDesc').textContent = product.desc;
        document.getElementById('productStory').textContent = product.story;

        // Size selector
        let selectedSize = null;
        const sizeButtons = document.querySelectorAll('.size-btn');
        sizeButtons.forEach(btn => {
            btn.addEventListener('click', function () {
                sizeButtons.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                selectedSize = parseInt(this.dataset.size);
            });
        });

        // Add to cart
        document.getElementById('addToCartDetail').addEventListener('click', function () {
            // Remove previous error
            const prevError = document.querySelector('.size-error');
            if (prevError) prevError.remove();

            if (!selectedSize) {
                // Show visible error message under sizes
                const errorMsg = document.createElement('p');
                errorMsg.className = 'size-error';
                errorMsg.textContent = 'Veuillez sélectionner une taille avant d\'ajouter au panier.';
                document.querySelector('.size-selector').appendChild(errorMsg);
                document.querySelector('.size-selector').classList.add('shake');
                setTimeout(() => document.querySelector('.size-selector').classList.remove('shake'), 600);
                return;
            }
            addToCart(product.id, selectedSize);
            showNotification(product.name + ' ajouté au panier');
            setTimeout(() => openCartPanel(), 300);
        });

        // Related products
        const relatedIds = products.filter(p => p.id !== product.id).sort(() => 0.5 - Math.random()).slice(0, 4).map(p => p.id);
        renderProductGrid('relatedGrid', relatedIds);
    };

    /* ===================== SHOP SORT ===================== */
    window.initShopSort = function () {
        const select = document.getElementById('sortSelect');
        if (!select) return;

        select.addEventListener('change', function () {
            const container = document.getElementById('shopGrid');
            let sorted = [...products];

            switch (this.value) {
                case 'price-asc':
                    sorted.sort((a, b) => a.price - b.price);
                    break;
                case 'price-desc':
                    sorted.sort((a, b) => b.price - a.price);
                    break;
                case 'name-asc':
                    sorted.sort((a, b) => a.name.localeCompare(b.name));
                    break;
                case 'name-desc':
                    sorted.sort((a, b) => b.name.localeCompare(a.name));
                    break;
                default:
                    sorted.sort((a, b) => a.id - b.id);
            }

            renderProductGrid('shopGrid', sorted.map(p => p.id));
        });
    };

    /* ===================== MOBILE MENU ===================== */
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function () {
            this.classList.toggle('active');
            navLinks.classList.toggle('open');
            document.body.classList.toggle('menu-open');
        });
        // Close on link click
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('open');
                document.body.classList.remove('menu-open');
            });
        });
    }

    /* ===================== NAVBAR SCROLL (transparent → olive) ===================== */
    let lastScrollY = 0;
    const navbar = document.getElementById('navbar');
    const scrollIndicator = document.getElementById('scrollIndicator');
    if (navbar) {
        window.addEventListener('scroll', function () {
            const currentScrollY = window.scrollY;
            // Hide/show navbar on scroll direction
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                navbar.classList.add('navbar-hidden');
            } else {
                navbar.classList.remove('navbar-hidden');
            }
            // Transparent → olive background
            if (currentScrollY > 50) {
                navbar.classList.add('navbar-scrolled');
            } else {
                navbar.classList.remove('navbar-scrolled');
            }
            // Hide scroll indicator
            if (scrollIndicator) {
                if (currentScrollY > 80) {
                    scrollIndicator.classList.add('hidden');
                } else {
                    scrollIndicator.classList.remove('hidden');
                }
            }
            lastScrollY = currentScrollY;
        }, { passive: true });
    }

    /* ===================== SCROLL REVEAL (IntersectionObserver) ===================== */
    const revealElements = document.querySelectorAll('.reveal');
    if (revealElements.length > 0 && 'IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -40px 0px'
        });
        revealElements.forEach(function (el) {
            revealObserver.observe(el);
        });
    } else {
        // Fallback: reveal everything immediately
        revealElements.forEach(function (el) {
            el.classList.add('revealed');
        });
    }

    /* ===================== NEWSLETTER ===================== */
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const input = this.querySelector('input[type="email"]');
            if (input.value) {
                showNotification('Merci pour votre inscription !');
                input.value = '';
            }
        });
    }

    /* ===================== INIT ===================== */
    updateCartBadge();

})();
