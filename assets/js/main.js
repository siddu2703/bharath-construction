/*!
 * Sri Bharath Construction - Main JavaScript
 * Version: 1.0.0
 * Modern ES6+ Implementation
 */

import { HeaderController } from './modules/header.js';
import { AnimationController } from './modules/animations.js';
import { InteractiveController } from './modules/interactive.js';
import { PerformanceOptimizer } from './modules/performance.js';
import { ThemeController } from './modules/theme.js';
import { SearchController } from './modules/search.js';

/**
 * Main Application Class
 * Orchestrates all website functionality
 */
class SriBharathConstruction {
    constructor() {
        this.controllers = new Map();
        this.isInitialized = false;

        this.bindEvents();
        this.init();
    }

    /**
     * Initialize all controllers
     */
    async init() {
        try {
            // Initialize AOS (Animate On Scroll)
            if (typeof AOS !== 'undefined') {
                AOS.init({
                    duration: 1200,
                    easing: 'ease-out-cubic',
                    once: true,
                    offset: 50,
                    delay: 100
                });
            }

            // Initialize all controllers
            await this.initializeControllers();

            // Setup page fade-in effect
            this.setupPageTransition();

            this.isInitialized = true;

            // Emit initialization complete event
            this.emit('initialized');

            console.log('🏗️ Sri Bharath Construction website initialized successfully');

        } catch (error) {
            console.error('❌ Initialization failed:', error);
        }
    }

    /**
     * Initialize all controllers
     */
    async initializeControllers() {
        const controllerConfigs = [
            { name: 'header', Controller: HeaderController },
            { name: 'animations', Controller: AnimationController },
            { name: 'interactive', Controller: InteractiveController },
            { name: 'performance', Controller: PerformanceOptimizer },
            { name: 'theme', Controller: ThemeController },
            { name: 'search', Controller: SearchController }
        ];

        for (const { name, Controller } of controllerConfigs) {
            try {
                this.controllers.set(name, new Controller());
                console.log(`✅ ${name} controller initialized`);
            } catch (error) {
                console.warn(`⚠️ Failed to initialize ${name} controller:`, error);
            }
        }
    }

    /**
     * Setup page transition effects
     */
    setupPageTransition() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.8s ease-out';

        requestAnimationFrame(() => {
            document.body.style.opacity = '1';
        });
    }

    /**
     * Bind global event listeners
     */
    bindEvents() {
        // Handle page visibility changes
        document.addEventListener('visibilitychange', this.handleVisibilityChange.bind(this));

        // Handle resize events with debouncing
        window.addEventListener('resize', this.debounce(this.handleResize.bind(this), 250));

        // Handle scroll events (delegated to performance optimizer)
        window.addEventListener('scroll', this.handleScroll.bind(this), { passive: true });
    }

    /**
     * Handle page visibility changes
     */
    handleVisibilityChange() {
        if (document.hidden) {
            // Page is hidden - pause animations, reduce activity
            this.emit('pageHidden');
        } else {
            // Page is visible - resume animations
            this.emit('pageVisible');
        }
    }

    /**
     * Handle window resize
     */
    handleResize() {
        this.emit('resize', {
            width: window.innerWidth,
            height: window.innerHeight
        });
    }

    /**
     * Handle scroll events
     */
    handleScroll() {
        this.emit('scroll', {
            scrollY: window.pageYOffset,
            scrollX: window.pageXOffset
        });
    }

    /**
     * Get controller instance
     * @param {string} name - Controller name
     * @returns {Object|null} Controller instance
     */
    getController(name) {
        return this.controllers.get(name) || null;
    }

    /**
     * Simple event emitter
     * @param {string} event - Event name
     * @param {*} data - Event data
     */
    emit(event, data = null) {
        const customEvent = new CustomEvent(`sbc:${event}`, { detail: data });
        document.dispatchEvent(customEvent);
    }

    /**
     * Utility: Debounce function
     * @param {Function} func - Function to debounce
     * @param {number} wait - Wait time in milliseconds
     * @returns {Function} Debounced function
     */
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    /**
     * Utility: Throttle function
     * @param {Function} func - Function to throttle
     * @param {number} limit - Limit in milliseconds
     * @returns {Function} Throttled function
     */
    throttle(func, limit) {
        let inThrottle;
        return function executedFunction(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
}

/**
 * Initialize application when DOM is ready
 */
document.addEventListener('DOMContentLoaded', () => {
    // Create global app instance
    window.SBC = new SriBharathConstruction();
});

/**
 * Export for module usage
 */
export default SriBharathConstruction;