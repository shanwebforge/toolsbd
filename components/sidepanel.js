// js/sidepanel.js
/**
 * SidePanel Loader Module
 * Loads the left panel dynamically on all pages
 */

class SidePanel {
    constructor() {
        this.panelContainerId = 'sidepanel-container';
        this.panelPath = '/components/sidepanel.html';
        this.currentTheme = this.getSavedTheme() || 'system';
    }

    /**
     * Initialize the side panel
     */
    init() {
        this.loadSidePanel();
    }

    /**
     * Load side panel HTML
     */
    async loadSidePanel() {
        try {
            // Check if we're on desktop
            if (!this.isDesktop()) {
                return;
            }

            // Check if panel container exists
            const container = document.getElementById(this.panelContainerId);
            if (!container) {
                console.warn(`SidePanel: Container with id "${this.panelContainerId}" not found.`);
                return;
            }

            // Load the panel HTML
            const response = await fetch(this.panelPath);
            if (!response.ok) {
                throw new Error(`Failed to load side panel: ${response.status}`);
            }

            const html = await response.text();
            container.innerHTML = html;

            // Initialize panel functionality
            this.initializePanel();

        } catch (error) {
            console.error('SidePanel Error:', error);
        }
    }

    /**
     * Initialize panel functionality after loading
     */
    initializePanel() {
        this.setActiveNavLink();
        this.setupThemeSwitcher();
        this.setupNavInteractions();
        this.applyCurrentTheme();
    }

    /**
     * Set active navigation link based on current page
     */
    setActiveNavLink() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav-link');

        navLinks.forEach(link => {
            link.classList.remove('active');
            
            // Extract filename from href
            const href = link.getAttribute('href');
            if (href === currentPage) {
                link.classList.add('active');
            }
            
            // Handle root/index
            if (currentPage === '' && href === 'index.html') {
                link.classList.add('active');
            }
        });
    }

    /**
     * Setup theme switcher functionality
     */
    setupThemeSwitcher() {
        const themeButtons = document.querySelectorAll('.theme-option');
        const themeDisplay = document.getElementById('leftPanelCurrentTheme');

        // Update display
        if (themeDisplay) {
            themeDisplay.textContent = this.capitalizeFirst(this.currentTheme);
        }

        // Add click handlers
        themeButtons.forEach(button => {
            button.addEventListener('click', () => {
                const theme = button.getAttribute('data-theme');
                this.setTheme(theme);
            });

            // Highlight current theme button
            if (button.getAttribute('data-theme') === this.currentTheme) {
                button.classList.add('active-theme');
            }
        });
    }

    /**
     * Set theme and save preference
     * @param {string} theme - Theme name
     */
    setTheme(theme) {
        this.currentTheme = theme;
        
        // Save to localStorage
        localStorage.setItem('preferred-theme', theme);
        
        // Apply theme to document
        this.applyCurrentTheme();
        
        // Update display
        const themeDisplay = document.getElementById('leftPanelCurrentTheme');
        if (themeDisplay) {
            themeDisplay.textContent = this.capitalizeFirst(theme);
        }
        
        // Update active button
        document.querySelectorAll('.theme-option').forEach(btn => {
            btn.classList.remove('active-theme');
            if (btn.getAttribute('data-theme') === theme) {
                btn.classList.add('active-theme');
            }
        });
        
        // Dispatch custom event
        document.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme } }));
    }

    /**
     * Apply current theme to document
     */
    applyCurrentTheme() {
        const html = document.documentElement;
        
        // Remove existing theme classes
        html.classList.remove('dark-mode', 'light-mode');
        
        // Apply based on theme preference
        if (this.currentTheme === 'dark') {
            html.classList.add('dark-mode');
        } else if (this.currentTheme === 'light') {
            html.classList.add('light-mode');
        } else {
            // System theme - use prefers-color-scheme
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                html.classList.add('dark-mode');
            }
        }
    }

    /**
     * Setup navigation interactions
     */
    setupNavInteractions() {
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                // If it's an internal link, update active state
                const href = link.getAttribute('href');
                if (href && !href.startsWith('http') && !href.startsWith('#')) {
                    // Remove active class from all links
                    navLinks.forEach(l => l.classList.remove('active'));
                    // Add active class to clicked link
                    link.classList.add('active');
                }
            });
        });
    }

    /**
     * Get saved theme from localStorage
     * @returns {string|null} Saved theme or null
     */
    getSavedTheme() {
        return localStorage.getItem('preferred-theme');
    }

    /**
     * Check if device is desktop
     * @returns {boolean} True if desktop
     */
    isDesktop() {
        return window.matchMedia('(min-width: 992px)').matches;
    }

    /**
     * Capitalize first letter
     * @param {string} string - String to capitalize
     * @returns {string} Capitalized string
     */
    capitalizeFirst(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    /**
     * Update panel for window resize
     */
    handleResize() {
        if (this.isDesktop()) {
            // If panel not loaded yet, load it
            const container = document.getElementById(this.panelContainerId);
            if (container && container.children.length === 0) {
                this.loadSidePanel();
            }
        } else {
            // Remove panel on mobile
            const container = document.getElementById(this.panelContainerId);
            if (container) {
                container.innerHTML = '';
            }
        }
    }
}

// Create and export side panel instance
const sidePanel = new SidePanel();

// Auto-initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        sidePanel.init();
        
        // Listen for resize events
        window.addEventListener('resize', () => {
            sidePanel.handleResize();
        });
    });
} else {
    sidePanel.init();
    window.addEventListener('resize', () => {
        sidePanel.handleResize();
    });
}

// Listen for system theme changes
if (window.matchMedia) {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', () => {
        if (sidePanel.currentTheme === 'system') {
            sidePanel.applyCurrentTheme();
        }
    });
}