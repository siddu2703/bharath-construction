/*!
 * Header Controller - Navigation and Header Functionality
 */

export class HeaderController {
    constructor() {
        this.header = document.querySelector('.header');
        this.mobileToggle = document.querySelector('.mobile-toggle');
        this.mobileMenu = document.querySelector('.mobile-menu');
        this.navLinks = document.querySelectorAll('.nav-menu a, .mobile-nav a');

        this.isScrolled = false;
        this.isMobileMenuOpen = false;

        this.init();
    }

    init() {
        if (!this.header) return;

        this.bindEvents();
        this.setupSmoothScrolling();
        this.animateHeaderEntrance();
    }

    bindEvents() {
        // Scroll handling
        document.addEventListener('sbc:scroll', this.handleScroll.bind(this));

        // Mobile menu toggle
        if (this.mobileToggle && this.mobileMenu) {
            this.mobileToggle.addEventListener('click', this.toggleMobileMenu.bind(this));

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!this.header.contains(e.target) && this.isMobileMenuOpen) {
                    this.closeMobileMenu();
                }
            });
        }

        // Close mobile menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isMobileMenuOpen) {
                this.closeMobileMenu();
            }
        });
    }

    handleScroll(event) {
        const { scrollY } = event.detail;
        const shouldBeScrolled = scrollY > 100;

        if (shouldBeScrolled !== this.isScrolled) {
            this.isScrolled = shouldBeScrolled;
            this.header.classList.toggle('scrolled', this.isScrolled);
        }
    }

    toggleMobileMenu() {
        if (this.isMobileMenuOpen) {
            this.closeMobileMenu();
        } else {
            this.openMobileMenu();
        }
    }

    openMobileMenu() {
        this.isMobileMenuOpen = true;
        this.mobileToggle.classList.add('active');
        this.mobileMenu.classList.add('open');
        document.body.style.overflow = 'hidden';

        // Accessibility
        this.mobileToggle.setAttribute('aria-expanded', 'true');
        this.mobileMenu.setAttribute('aria-hidden', 'false');
    }

    closeMobileMenu() {
        this.isMobileMenuOpen = false;
        this.mobileToggle.classList.remove('active');
        this.mobileMenu.classList.remove('open');
        document.body.style.overflow = '';

        // Accessibility
        this.mobileToggle.setAttribute('aria-expanded', 'false');
        this.mobileMenu.setAttribute('aria-hidden', 'true');
    }

    setupSmoothScrolling() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');

                if (href && href.startsWith('#')) {
                    e.preventDefault();
                    this.scrollToSection(href);

                    // Close mobile menu if open
                    if (this.isMobileMenuOpen) {
                        this.closeMobileMenu();
                    }
                }
            });
        });
    }

    scrollToSection(target) {
        const targetId = target.substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            const headerHeight = this.header.offsetHeight + 20;
            const targetPosition = targetElement.offsetTop - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });

            // Update active navigation state
            this.updateActiveNavigation(targetId);
        }
    }

    updateActiveNavigation(activeId) {
        this.navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === `#${activeId}`) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    animateHeaderEntrance() {
        if (this.header) {
            this.header.style.transform = 'translateY(-100%)';
            this.header.style.opacity = '0';

            requestAnimationFrame(() => {
                this.header.style.transition = 'transform 0.6s ease-out, opacity 0.6s ease-out';
                this.header.style.transform = 'translateY(0)';
                this.header.style.opacity = '1';
            });
        }
    }

    // Public methods
    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    isMenuOpen() {
        return this.isMobileMenuOpen;
    }

    setHeaderTheme(theme) {
        this.header.setAttribute('data-theme', theme);
    }
}