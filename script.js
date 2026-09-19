/**
 * Mahmoud Araby Portfolio - Interactions & UI Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const openConsultationBtn = document.getElementById('openConsultationBtn');
  const closeConsultationBtn = document.getElementById('closeConsultationBtn');
  const consultationModal = document.getElementById('consultationModal');
  const consultationForm = document.getElementById('consultationForm');

  const openMenuBtn = document.getElementById('openMenuBtn');
  const closeMenuBtn = document.getElementById('closeMenuBtn');
  const menuDrawer = document.getElementById('menuDrawer');
  const drawerNavLinks = document.querySelectorAll('.drawer-nav-link, .fullscreen-nav-link');
  const toastContainer = document.getElementById('toastContainer');

  // Ambient glow element for subtle mouse tracking
  const purpleGlow = document.querySelector('.purple-glow');

  /* --------------------------------------------------------------------------
     1. Consultation Modal Logic
     -------------------------------------------------------------------------- */
  function openModal() {
    consultationModal.classList.add('active');
    consultationModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    const firstInput = consultationModal.querySelector('input');
    if (firstInput) firstInput.focus();
  }

  function closeModal() {
    consultationModal.classList.remove('active');
    consultationModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (openConsultationBtn) {
    openConsultationBtn.addEventListener('click', openModal);
  }

  if (closeConsultationBtn) {
    closeConsultationBtn.addEventListener('click', closeModal);
  }

  if (consultationModal) {
    consultationModal.addEventListener('click', (e) => {
      if (e.target === consultationModal) {
        closeModal();
      }
    });
  }

  /* --------------------------------------------------------------------------
     2. Specializations Modal Logic (مجالات التخصص)
     -------------------------------------------------------------------------- */
  const openSpecializationsBtn = document.getElementById('openSpecializationsBtn');
  const closeSpecializationsBtn = document.getElementById('closeSpecializationsBtn');
  const specializationsModal = document.getElementById('specializationsModal');

  function openSpecializations() {
    if (!specializationsModal) return;
    specializationsModal.classList.add('active');
    specializationsModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeSpecializations() {
    if (!specializationsModal) return;
    specializationsModal.classList.remove('active');
    specializationsModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (openSpecializationsBtn) {
    openSpecializationsBtn.addEventListener('click', openSpecializations);
  }

  if (closeSpecializationsBtn) {
    closeSpecializationsBtn.addEventListener('click', closeSpecializations);
  }

  if (specializationsModal) {
    specializationsModal.addEventListener('click', (e) => {
      if (e.target === specializationsModal) {
        closeSpecializations();
      }
    });
  }

  /* --------------------------------------------------------------------------
     3. Menu Drawer Logic
     -------------------------------------------------------------------------- */
  function openMenu() {
    menuDrawer.classList.add('active');
    menuDrawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    menuDrawer.classList.remove('active');
    menuDrawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (openMenuBtn) {
    openMenuBtn.addEventListener('click', openMenu);
  }

  if (closeMenuBtn) {
    closeMenuBtn.addEventListener('click', closeMenu);
  }

  if (menuDrawer) {
    menuDrawer.addEventListener('click', (e) => {
      if (e.target === menuDrawer) {
        closeMenu();
      }
    });
  }

  drawerNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      drawerNavLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      closeMenu();
    });
  });

  /* --------------------------------------------------------------------------
     4. Global Keyboard Shortcuts (Escape Key)
     -------------------------------------------------------------------------- */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (consultationModal && consultationModal.classList.contains('active')) {
        closeModal();
      }
      if (specializationsModal && specializationsModal.classList.contains('active')) {
        closeSpecializations();
      }
      if (menuDrawer && menuDrawer.classList.contains('active')) {
        closeMenu();
      }
    }
  });

  /* --------------------------------------------------------------------------
     5. Consultation Form Submission & Toast
     -------------------------------------------------------------------------- */
  if (consultationForm) {
    consultationForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('clientName').value.trim();
      const submitBtn = consultationForm.querySelector('.submit-btn');
      const originalText = submitBtn.innerHTML;

      // Loading state
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>جاري الإرسال...</span>`;

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        consultationForm.reset();
        closeModal();

        showToast(`شكراً لك ${name}! تم استلام طلبك بنجاح وسأتواصل معك قريباً.`);
      }, 900);
    });
  }

  function showToast(message) {
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#66E299" stroke-width="2.5">
        <path d="M20 6L9 17l-5-5"/>
      </svg>
      <span>${message}</span>
    `;

    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(15px) scale(0.95)';
      toast.style.transition = 'all 0.4s ease';
      setTimeout(() => {
        toast.remove();
      }, 400);
    }, 4500);
  }

  /* --------------------------------------------------------------------------
     5. Subtle Mouse Light / Parallax Movement
     -------------------------------------------------------------------------- */
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let currentX = mouseX;
  let currentY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  /* --------------------------------------------------------------------------
     6. Floating Scroll to Top Action
     -------------------------------------------------------------------------- */
  const scrollTopBtn = document.getElementById('scrollTopBtn');

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });

    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    }, { passive: true });
  }

  /* --------------------------------------------------------------------------
     7. Services Interactive Cards (Hover & Touch Support)
     -------------------------------------------------------------------------- */
  const serviceCards = document.querySelectorAll('.service-card');
  serviceCards.forEach(card => {
    card.addEventListener('click', () => {
      serviceCards.forEach(c => {
        if (c !== card) c.classList.remove('active');
      });
      card.classList.toggle('active');
    });
  });

  /* --------------------------------------------------------------------------
     8. Hero Title Typewriter Animation
     -------------------------------------------------------------------------- */
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) {
    const parts = [
      { text: 'أصمّم', isPurple: true },
      { text: ' تجارب رقمية تجمع', isPurple: false, isGreen: false },
      { isBreak: true },
      { text: 'بين البساطة، الوظيفة، ', isPurple: false, isGreen: false },
      { text: 'والتأثير.', isGreen: true }
    ];

    heroTitle.innerHTML = '<span class="typing-cursor"></span>';
    const cursor = heroTitle.querySelector('.typing-cursor');

    let currentPartIndex = 0;
    let currentCharIndex = 0;
    let currentContainer = null;

    function typeNextChar() {
      if (currentPartIndex >= parts.length) {
        setTimeout(() => {
          if (cursor) cursor.classList.add('finished');
        }, 2200);
        return;
      }

      const part = parts[currentPartIndex];

      if (part.isBreak) {
        const br = document.createElement('br');
        br.className = 'title-break';
        heroTitle.insertBefore(br, cursor);
        currentPartIndex++;
        setTimeout(typeNextChar, 110);
        return;
      }

      if (currentCharIndex === 0) {
        if (part.isPurple) {
          currentContainer = document.createElement('span');
          currentContainer.className = 'purple-highlight';
          heroTitle.insertBefore(currentContainer, cursor);
        } else if (part.isGreen) {
          currentContainer = document.createElement('span');
          currentContainer.className = 'green-highlight';
          heroTitle.insertBefore(currentContainer, cursor);
        } else {
          currentContainer = document.createTextNode('');
          heroTitle.insertBefore(currentContainer, cursor);
        }
      }

      const char = part.text.charAt(currentCharIndex);
      if (currentContainer.nodeType === Node.TEXT_NODE) {
        currentContainer.nodeValue += char;
      } else {
        currentContainer.textContent += char;
      }

      currentCharIndex++;

      if (currentCharIndex >= part.text.length) {
        currentPartIndex++;
        currentCharIndex = 0;
        currentContainer = null;
        setTimeout(typeNextChar, part.text.endsWith('،') || part.text.endsWith('تجمع') ? 140 : 45);
      } else {
        setTimeout(typeNextChar, 42);
      }
    }

    setTimeout(typeNextChar, 350);
  }
});
