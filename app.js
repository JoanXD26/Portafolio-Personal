document.addEventListener('DOMContentLoaded', () => {
    /* ============================================
       1. MENÚ MÓVIL
       ============================================ */
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
  
    if (navToggle && navMenu) {
      navToggle.addEventListener('click', () => {
        const isActive = navMenu.classList.toggle('is-active');
        navToggle.setAttribute('aria-expanded', String(isActive));
      });
  
      navMenu.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
          navMenu.classList.remove('is-active');
          navToggle.setAttribute('aria-expanded', 'false');
        });
      });
    }
  
    /* ============================================
       2. TEMA CLARO / OSCURO CON PERSISTENCIA
       ============================================ */
    const THEME_KEY = 'theme';
    const themeToggle = document.getElementById('theme-toggle');
    const root = document.documentElement;
  
    const applyTheme = (theme) => {
      if (theme === 'dark') {
        root.setAttribute('data-theme', 'dark');
      } else {
        root.removeAttribute('data-theme');
      }
    };
  
    const getPreferredTheme = () => {
      const stored = localStorage.getItem(THEME_KEY);
      if (stored === 'dark' || stored === 'light') {
        return stored;
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    };
  
    applyTheme(getPreferredTheme());
  
    if (themeToggle) {
      themeToggle.addEventListener('click', () => {
        const isDark = root.getAttribute('data-theme') === 'dark';
        const nextTheme = isDark ? 'light' : 'dark';
        applyTheme(nextTheme);
        localStorage.setItem(THEME_KEY, nextTheme);
      });
    }
  
    /* ============================================
       3. BOTÓN VOLVER ARRIBA
       ============================================ */
    const scrollTopBtn = document.getElementById('btn-scroll-top');
    const SCROLL_THRESHOLD = 300;
  
    if (scrollTopBtn) {
      window.addEventListener('scroll', () => {
        if (window.scrollY > SCROLL_THRESHOLD) {
          scrollTopBtn.classList.add('is-visible');
        } else {
          scrollTopBtn.classList.remove('is-visible');
        }
      });
  
      scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  });