     (function() {
      const themeToggle = document.getElementById('themeToggle');
      const body = document.body;
      const icon = themeToggle.querySelector('i');

      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'dark') {
        body.classList.add('dark');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
      }

      themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark');
        if (body.classList.contains('dark')) {
          icon.classList.remove('fa-moon');
          icon.classList.add('fa-sun');
          localStorage.setItem('theme', 'dark');
        } else {
          icon.classList.remove('fa-sun');
          icon.classList.add('fa-moon');
          localStorage.setItem('theme', 'light');
        }
      });

      // ---------- Mobile Menu ----------
      const menuToggle = document.getElementById('menuToggle');
      const navLinks = document.getElementById('navLinks');
      const overlay = document.getElementById('menuOverlay');

      function closeMenu() {
        menuToggle.classList.remove('open');
        navLinks.classList.remove('open');
        overlay.classList.remove('show');
        menuToggle.setAttribute('aria-expanded', 'false');
        body.classList.remove('menu-open');
      }

      function openMenu() {
        menuToggle.classList.add('open');
        navLinks.classList.add('open');
        overlay.classList.add('show');
        menuToggle.setAttribute('aria-expanded', 'true');
        body.classList.add('menu-open');
      }

      menuToggle.addEventListener('click', () => {
        if (navLinks.classList.contains('open')) {
          closeMenu();
        } else {
          openMenu();
        }
      });

      overlay.addEventListener('click', closeMenu);

      navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMenu);
      });

      window.addEventListener('resize', () => {
        if (window.innerWidth > 750) closeMenu();
      });

      // ---------- Scroll progress ----------
      window.addEventListener('scroll', () => {
        const winScroll = document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        document.getElementById('progress').style.width = scrolled + '%';
      });

      // ---------- Fade-in on scroll ----------
      const fadeElements = document.querySelectorAll('.fade-in');
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });
      fadeElements.forEach(el => observer.observe(el));

      window.addEventListener('load', () => {
        document.querySelectorAll('.fade-in').forEach(el => {
          const rect = el.getBoundingClientRect();
          if (rect.top < window.innerHeight * 0.85) el.classList.add('visible');
        });
      });

      // ---------- Smooth scroll ----------
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
          const targetId = this.getAttribute('href');
          if (targetId === '#') return;
          const target = document.querySelector(targetId);
          if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            history.pushState(null, null, targetId);
          }
        });
      });

      // ---------- Avatar 3D tilt ----------
      const avatar = document.querySelector('.avatar-photo');
      if (avatar) {
        const wrapper = avatar.closest('.avatar-wrapper');
        if (wrapper) {
          wrapper.addEventListener('mousemove', (e) => {
            const rect = wrapper.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateY = ((x - centerX) / centerX) * 7;
            const rotateX = ((centerY - y) / centerY) * 7;
            avatar.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
          });
          wrapper.addEventListener('mouseleave', () => {
            avatar.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)';
          });
        }
      }
    })();
  