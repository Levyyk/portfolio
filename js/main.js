document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Форма Formspree AJAX
    const form = document.getElementById('contact-form');
    const formSuccess = document.getElementById('form-success');

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = form.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            
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
                    throw new Error();
                }
            } catch (err) {
                btn.innerHTML = 'Помилка. Спробуйте ще раз';
                btn.disabled = false;
                setTimeout(() => { btn.innerHTML = originalText; }, 3000);
            }
        });
    }

    // 2. Зміна фону навігації при скролі
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }, { passive: true });

    // 3. Анімація появи елементів (Reveal)
    const revealEls = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        let delay = 0;
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);
                delay += 100; // Створює ефект черги
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    revealEls.forEach(el => observer.observe(el));

});
