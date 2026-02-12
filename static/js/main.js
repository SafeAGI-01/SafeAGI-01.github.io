/* ============================================
   SafeAGI-01 - Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {

  // Page Loading Animation
  const pageLoading = document.querySelector('.page-loading');
  if (pageLoading) {
    window.addEventListener('load', function() {
      pageLoading.classList.add('fade-out');
      setTimeout(() => pageLoading.remove(), 500);
    });
  }

  // Back to Top Button
  const backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 300) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    });

    backToTop.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // BibTeX Copy Button
  const copyButtons = document.querySelectorAll('.copy-button');
  copyButtons.forEach(button => {
    button.addEventListener('click', function() {
      const bibtexCode = this.closest('.bibtex-container').querySelector('code').textContent;

      navigator.clipboard.writeText(bibtexCode).then(() => {
        const originalText = this.innerHTML;
        this.innerHTML = '<i class="fas fa-check"></i> Copied!';
        this.classList.add('copied');

        setTimeout(() => {
          this.innerHTML = originalText;
          this.classList.remove('copied');
        }, 2000);
      }).catch(err => {
        console.error('Failed to copy:', err);
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = bibtexCode;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);

        this.innerHTML = '<i class="fas fa-check"></i> Copied!';
        this.classList.add('copied');
        setTimeout(() => {
          this.innerHTML = '<i class="fas fa-copy"></i> Copy';
          this.classList.remove('copied');
        }, 2000);
      });
    });
  });

  // Navbar Burger Toggle (for mobile)
  const navbarBurgers = document.querySelectorAll('.navbar-burger');
  navbarBurgers.forEach(burger => {
    burger.addEventListener('click', function() {
      const targetId = this.dataset.target;
      const target = document.getElementById(targetId);
      this.classList.toggle('is-active');
      target.classList.toggle('is-active');
    });
  });

  // Smooth Scroll for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Navbar Background on Scroll
  const navbar = document.querySelector('.navbar.is-fixed-top');
  if (navbar) {
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 50) {
        navbar.classList.add('has-shadow');
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
      } else {
        navbar.classList.remove('has-shadow');
        navbar.style.background = '';
      }
    });
  }

});
