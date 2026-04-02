// Formspree AJAX
const form = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.innerHTML = 'Надсилаємо...';
    btn.disabled = true;

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });
      if (res.ok) {
        form.style.display = 'none';
        formSuccess.style.display = 'block';
      } else {
        btn.innerHTML = 'Помилка — спробуй ще раз';
        btn.disabled = false;
      }
    } catch {
      btn.innerHTML = 'Помилка — спробуй ще раз';
      btn.disabled = false;
    }
  });
}

// Navbar scroll background toggle
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// Scroll reveal animations
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  let delay = 0;
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), delay);
      delay += 80;
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealEls.forEach(el => observer.observe(el));
