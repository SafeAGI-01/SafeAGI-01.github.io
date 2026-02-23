/* ============================================
   SafeAGI - Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {

  // ---- Theme Management ----
  const THEME_KEY = 'safeagi-theme';

  function getSystemTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function getStoredTheme() {
    return localStorage.getItem(THEME_KEY);
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
  }

  function initTheme() {
    const stored = getStoredTheme();
    if (stored) {
      applyTheme(stored);
    } else {
      applyTheme(getSystemTheme());
    }
  }

  // Apply theme immediately (also called before DOMContentLoaded via inline script)
  initTheme();

  // Listen for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
    if (!getStoredTheme()) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });

  // Theme toggle buttons
  document.querySelectorAll('.theme-toggle').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var current = document.documentElement.getAttribute('data-theme') || getSystemTheme();
      var next = current === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      localStorage.setItem(THEME_KEY, next);
    });
  });

  // ---- Page Loading Animation ----
  var pageLoading = document.querySelector('.page-loading');
  if (pageLoading) {
    window.addEventListener('load', function() {
      pageLoading.classList.add('fade-out');
      setTimeout(function() { pageLoading.remove(); }, 500);
    });
  }

  // ---- Back to Top Button ----
  var backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 300) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    });

    backToTop.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ---- BibTeX Copy Button ----
  document.querySelectorAll('.copy-button').forEach(function(button) {
    button.addEventListener('click', function() {
      var bibtexCode = this.closest('.bibtex-container').querySelector('code').textContent;
      var btn = this;

      navigator.clipboard.writeText(bibtexCode).then(function() {
        btn.innerHTML = '<i class="fas fa-check"></i> Copied!';
        btn.classList.add('copied');
        setTimeout(function() {
          btn.innerHTML = '<i class="fas fa-copy"></i> Copy';
          btn.classList.remove('copied');
        }, 2000);
      }).catch(function() {
        var textarea = document.createElement('textarea');
        textarea.value = bibtexCode;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        btn.innerHTML = '<i class="fas fa-check"></i> Copied!';
        btn.classList.add('copied');
        setTimeout(function() {
          btn.innerHTML = '<i class="fas fa-copy"></i> Copy';
          btn.classList.remove('copied');
        }, 2000);
      });
    });
  });

  // ---- Navbar Burger Toggle (mobile) ----
  document.querySelectorAll('.navbar-burger').forEach(function(burger) {
    burger.addEventListener('click', function() {
      var targetId = this.dataset.target;
      var target = document.getElementById(targetId);
      this.classList.toggle('is-active');
      target.classList.toggle('is-active');
    });
  });

  // ---- Smooth Scroll for Anchor Links ----
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ---- Navbar scroll effect ----
  var navbar = document.querySelector('.navbar.is-fixed-top');
  if (navbar) {
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

});
