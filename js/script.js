document.getElementById('year').textContent = new Date().getFullYear();

// Scroll progress bar + compact header
const scrollProgress = document.getElementById('scrollProgress');
const siteHeader = document.querySelector('.site-header');

function onScroll() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  scrollProgress.style.width = pct + '%';
  siteHeader.classList.toggle('scrolled', scrollTop > 40);
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

const navToggle = document.getElementById('navToggle');
const mainNav = document.querySelector('.main-nav');

navToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

mainNav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// Contact form — submits to Formspree (see README.md for setup)
const form = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const name = form.name.value.trim();
  if (!name) return;

  const submitBtn = form.querySelector('button[type="submit"]');
  submitBtn.disabled = true;
  formNote.textContent = 'Sending...';

  try {
    const response = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' },
    });

    if (response.ok) {
      formNote.textContent = `Thanks, ${name}. We'll be in touch soon.`;
      form.reset();
    } else {
      formNote.textContent = 'Something went wrong. Please call or email us directly.';
    }
  } catch (err) {
    formNote.textContent = 'Something went wrong. Please call or email us directly.';
  } finally {
    submitBtn.disabled = false;
  }
});
