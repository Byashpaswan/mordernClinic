// ========================================
// MODERN CLINIC - Main JavaScript
// ========================================

document.addEventListener('DOMContentLoaded', function () {

    // ---------- Sidebar Toggle ----------
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');
    const sidebarClose = document.getElementById('sidebarClose');
    const sidebarOverlay = document.getElementById('sidebarOverlay');

    if (menuToggle) {
        menuToggle.addEventListener('click', function () {
            sidebar.classList.add('open');
            sidebarOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    function closeSidebar() {
        sidebar.classList.remove('open');
        sidebarOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (sidebarClose) sidebarClose.addEventListener('click', closeSidebar);
    if (sidebarOverlay) sidebarOverlay.addEventListener('click', closeSidebar);

    // Close sidebar on nav item click
    document.querySelectorAll('.sidebar-nav .nav-item').forEach(function (item) {
        item.addEventListener('click', closeSidebar);
    });

    // ---------- Header Scroll Effect ----------
    const header = document.getElementById('header');
    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // ---------- Hero Slider ----------
    const heroSlides = document.querySelectorAll('.hero-slide');
    const heroDots = document.querySelectorAll('.hero-dots .dot');
    const heroPrev = document.getElementById('heroPrev');
    const heroNext = document.getElementById('heroNext');
    let currentHeroSlide = 0;
    let heroInterval;

    function showHeroSlide(index) {
        heroSlides.forEach(function (slide) { slide.classList.remove('active'); });
        heroDots.forEach(function (dot) { dot.classList.remove('active'); });
        heroSlides[index].classList.add('active');
        heroDots[index].classList.add('active');
        currentHeroSlide = index;
    }

    function nextHeroSlide() {
        showHeroSlide((currentHeroSlide + 1) % heroSlides.length);
    }

    function prevHeroSlide() {
        showHeroSlide((currentHeroSlide - 1 + heroSlides.length) % heroSlides.length);
    }

    function startHeroInterval() {
        heroInterval = setInterval(nextHeroSlide, 5000);
    }

    function resetHeroInterval() {
        clearInterval(heroInterval);
        startHeroInterval();
    }

    if (heroNext) {
        heroNext.addEventListener('click', function () {
            nextHeroSlide();
            resetHeroInterval();
        });
    }

    if (heroPrev) {
        heroPrev.addEventListener('click', function () {
            prevHeroSlide();
            resetHeroInterval();
        });
    }

    heroDots.forEach(function (dot, index) {
        dot.addEventListener('click', function () {
            showHeroSlide(index);
            resetHeroInterval();
        });
    });

    startHeroInterval();

    // ---------- Testimonial Slider ----------
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const testDots = document.querySelectorAll('.test-dots .dot');
    const testPrev = document.getElementById('testPrev');
    const testNext = document.getElementById('testNext');
    let currentTestimonial = 0;
    let testInterval;

    function showTestimonial(index) {
        testimonialCards.forEach(function (card) { card.classList.remove('active'); });
        testDots.forEach(function (dot) { dot.classList.remove('active'); });
        testimonialCards[index].classList.add('active');
        testDots[index].classList.add('active');
        currentTestimonial = index;
    }

    function nextTestimonial() {
        showTestimonial((currentTestimonial + 1) % testimonialCards.length);
    }

    function prevTestimonial() {
        showTestimonial((currentTestimonial - 1 + testimonialCards.length) % testimonialCards.length);
    }

    function startTestInterval() {
        testInterval = setInterval(nextTestimonial, 6000);
    }

    function resetTestInterval() {
        clearInterval(testInterval);
        startTestInterval();
    }

    if (testNext) {
        testNext.addEventListener('click', function () {
            nextTestimonial();
            resetTestInterval();
        });
    }

    if (testPrev) {
        testPrev.addEventListener('click', function () {
            prevTestimonial();
            resetTestInterval();
        });
    }

    testDots.forEach(function (dot, index) {
        dot.addEventListener('click', function () {
            showTestimonial(index);
            resetTestInterval();
        });
    });

    startTestInterval();

    // ---------- Counter Animation ----------
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number[data-target]');
        counters.forEach(function (counter) {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;

            function updateCounter() {
                current += step;
                if (current < target) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target.toLocaleString();
                }
            }

            updateCounter();
        });
    }

    // Start counter animation when hero is visible
    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        observer.observe(heroStats);
    }

    // ---------- Back to Top ----------
    const backToTop = document.getElementById('backToTop');
    window.addEventListener('scroll', function () {
        if (window.scrollY > 400) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    if (backToTop) {
        backToTop.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ---------- Newsletter Form ----------
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function (e) {
            e.preventDefault();
            var email = this.querySelector('input').value;
            if (email) {
                alert('Thank you for subscribing! We will send updates to: ' + email);
                this.querySelector('input').value = '';
            }
        });
    }

    // ---------- Appointment Form (Email + WhatsApp) ----------
    var CLINIC_EMAIL = 'byas.paswan99@gmail.com';
    var CLINIC_WHATSAPP = '918417054866';

    var appointmentForm = document.getElementById('appointmentForm');
    var sendEmailBtn = document.getElementById('sendEmailBtn');
    var sendWhatsAppBtn = document.getElementById('sendWhatsAppBtn');

    function getAppointmentData() {
        return {
            name: document.getElementById('fullName').value.trim(),
            email: document.getElementById('email').value.trim(),
            phone: document.getElementById('phone').value.trim(),
            date: document.getElementById('date').value,
            time: document.getElementById('time').value,
            department: document.getElementById('department').value,
            doctor: document.getElementById('doctor').value,
            message: document.getElementById('message').value.trim()
        };
    }

    function validateAppointmentForm() {
        var d = getAppointmentData();
        if (!d.name) { alert('Please enter your full name.'); return false; }
        if (!d.email) { alert('Please enter your email.'); return false; }
        if (!d.phone) { alert('Please enter your phone number.'); return false; }
        if (!d.date) { alert('Please select a date.'); return false; }
        if (!d.time) { alert('Please select a time.'); return false; }
        if (!d.department) { alert('Please select a department.'); return false; }
        if (!d.doctor) { alert('Please select a doctor.'); return false; }
        return true;
    }

    function buildEmailBody(d) {
        return 'New Appointment Request\n\n' +
            '--- Patient Details ---\n' +
            'Name: ' + d.name + '\n' +
            'Email: ' + d.email + '\n' +
            'Phone: ' + d.phone + '\n\n' +
            '--- Appointment Details ---\n' +
            'Date: ' + d.date + '\n' +
            'Time: ' + d.time + '\n' +
            'Department: ' + d.department + '\n' +
            'Doctor: ' + d.doctor + '\n\n' +
            'Message: ' + (d.message || 'N/A') + '\n\n' +
            '--- Sent from Modern Clinic Website ---';
    }

    function buildWhatsAppMessage(d) {
        return '*New Appointment Request*\n\n' +
            '*Patient Details:*\n' +
            'Name: ' + d.name + '\n' +
            'Email: ' + d.email + '\n' +
            'Phone: ' + d.phone + '\n\n' +
            '*Appointment Details:*\n' +
            'Date: ' + d.date + '\n' +
            'Time: ' + d.time + '\n' +
            'Department: ' + d.department + '\n' +
            'Doctor: ' + d.doctor + '\n\n' +
            'Message: ' + (d.message || 'N/A');
    }

    if (sendEmailBtn) {
        sendEmailBtn.addEventListener('click', function (e) {
            e.preventDefault();
            if (!validateAppointmentForm()) return;
            var d = getAppointmentData();
            var subject = encodeURIComponent('Appointment Request - ' + d.name + ' (' + d.department + ')');
            var body = encodeURIComponent(buildEmailBody(d));
            window.location.href = 'mailto:' + CLINIC_EMAIL + '?subject=' + subject + '&body=' + body;
            alert('Your email client will open with the appointment details pre-filled.\n\nPlease click SEND in your email to complete the booking.\n\nClinic Email: ' + CLINIC_EMAIL);
        });
    }

    if (sendWhatsAppBtn) {
        sendWhatsAppBtn.addEventListener('click', function (e) {
            e.preventDefault();
            if (!validateAppointmentForm()) return;
            var d = getAppointmentData();
            var msg = encodeURIComponent(buildWhatsAppMessage(d));
            window.open('https://wa.me/' + CLINIC_WHATSAPP + '?text=' + msg, '_blank');
            alert('WhatsApp will open with your appointment details pre-filled.\n\nPlease tap SEND to complete the booking.');
        });
    }

    // Also handle form submit (Enter key) as email
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', function (e) {
            e.preventDefault();
            if (sendEmailBtn) sendEmailBtn.click();
        });
    }

    // ---------- Contact Form (Email) ----------
    var contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            var name = document.getElementById('fullName') ? document.getElementById('fullName').value.trim() : '';
            var email = document.getElementById('email') ? document.getElementById('email').value.trim() : '';
            var phone = document.getElementById('phone') ? document.getElementById('phone').value.trim() : '';
            var subject = document.getElementById('subject') ? document.getElementById('subject').value.trim() : '';
            var message = document.getElementById('message') ? document.getElementById('message').value.trim() : '';

            if (!name || !email || !message) {
                alert('Please fill in all required fields.');
                return;
            }

            var mailSubject = encodeURIComponent(subject || 'Contact Form - ' + name);
            var mailBody = encodeURIComponent(
                'Name: ' + name + '\n' +
                'Email: ' + email + '\n' +
                'Phone: ' + phone + '\n\n' +
                'Message:\n' + message + '\n\n--- Sent from Modern Clinic Website ---'
            );
            window.location.href = 'mailto:' + CLINIC_EMAIL + '?subject=' + mailSubject + '&body=' + mailBody;
            alert('Your email client will open with the message pre-filled.\n\nPlease click SEND in your email.\n\nClinic Email: ' + CLINIC_EMAIL);
        });
    }

    // ---------- Scroll Reveal Animation ----------
    function revealOnScroll() {
        var elements = document.querySelectorAll('[data-aos]');
        elements.forEach(function (el) {
            var rect = el.getBoundingClientRect();
            var windowHeight = window.innerHeight;
            if (rect.top < windowHeight - 100) {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }
        });
    }

    // Initialize AOS elements
    document.querySelectorAll('[data-aos]').forEach(function (el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        if (el.getAttribute('data-aos-delay')) {
            el.style.transitionDelay = el.getAttribute('data-aos-delay') + 'ms';
        }
    });

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();

    // ---------- Smooth Scroll for Anchor Links ----------
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // ---------- Service Filter (Services Page) ----------
    const filterBtns = document.querySelectorAll('.filter-btn');
    const serviceItems = document.querySelectorAll('.service-detail-card');

    filterBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
            filterBtns.forEach(function (b) { b.classList.remove('active'); });
            this.classList.add('active');

            var filter = this.getAttribute('data-filter');

            serviceItems.forEach(function (item) {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = '';
                    item.style.animation = 'fadeInUp 0.5s ease forwards';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // ---------- Gallery Filter ----------
    const galleryFilterBtns = document.querySelectorAll('.gallery-filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryFilterBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
            galleryFilterBtns.forEach(function (b) { b.classList.remove('active'); });
            this.classList.add('active');

            var filter = this.getAttribute('data-filter');

            galleryItems.forEach(function (item) {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = '';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // ---------- Active Nav Item Highlighting ----------
    var currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.sidebar-nav .nav-item').forEach(function (item) {
        var href = item.getAttribute('href').split('/').pop();
        if (href === currentPage) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });

});
