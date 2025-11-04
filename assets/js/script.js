// ============================================
// SMOOTH SCROLL BEHAVIOR
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// ============================================
// NAVBAR ACTIVE LINK
// ============================================

const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ============================================
// FORM SUBMISSION
// ============================================

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            service: document.getElementById('service').value,
            message: document.getElementById('message').value
        };

        // Validate form
        if (!formData.name || !formData.email || !formData.phone || !formData.service || !formData.message) {
            showAlert('Por favor, preencha todos os campos!', 'warning');
            return;
        }

        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            showAlert('Por favor, insira um email válido!', 'warning');
            return;
        }

        // Validate phone
        const phoneRegex = /^[\d\s\-\(\)]+$/;
        if (!phoneRegex.test(formData.phone)) {
            showAlert('Por favor, insira um telefone válido!', 'warning');
            return;
        }

        // Simulate form submission
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Enviando...';

        // Simulate API call
        setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
            
            // Show success message
            showAlert('Sua solicitação foi enviada com sucesso! Entraremos em contato em breve.', 'success');
            
            // Reset form
            contactForm.reset();
        }, 1500);
    });
}

// ============================================
// ALERT FUNCTION
// ============================================

function showAlert(message, type = 'info') {
   
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
    alertDiv.setAttribute('role', 'alert');
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;

    const container = document.querySelector('body');
    container.insertBefore(alertDiv, container.firstChild);


    setTimeout(() => {
        alertDiv.remove();
    }, 5000);
}

// ============================================
// SCROLL ANIMATIONS
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.service-card, .portfolio-item, .contact-card, .stat-box').forEach(el => {
    observer.observe(el);
});

// ============================================
// NAVBAR COLLAPSE ON LINK CLICK
// ============================================

const navbarCollapse = document.querySelector('.navbar-collapse');
const navbarToggler = document.querySelector('.navbar-toggler');

document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (navbarCollapse.classList.contains('show')) {
            navbarToggler.click();
        }
    });
});

// ============================================
// PHONE NUMBER FORMATTING
// ============================================

const phoneInput = document.getElementById('phone');
if (phoneInput) {
    phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        
        if (value.length > 0) {
            if (value.length <= 2) {
                value = value;
            } else if (value.length <= 6) {
                value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
            } else if (value.length <= 10) {
                value = `(${value.slice(0, 2)}) ${value.slice(2, 6)}-${value.slice(6)}`;
            } else {
                value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7, 11)}`;
            }
        }
        
        e.target.value = value;
    });
}

// ============================================
// SCROLL TO TOP BUTTON
// ============================================

const whatsappBtn = document.createElement('a');
whatsappBtn.href = 'https://wa.me/554599480689'; 
whatsappBtn.target = '_blank';
whatsappBtn.setAttribute('aria-label', 'Abrir conversa no WhatsApp');

whatsappBtn.className = 'btn-whatsapp';
whatsappBtn.innerHTML = '<i class="fab fa-whatsapp"></i>';

whatsappBtn.style.cssText = `
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #25D366;
  color: white;
  font-size: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  z-index: 999;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
`;


document.body.appendChild(whatsappBtn);


whatsappBtn.addEventListener('mouseenter', () => {
  whatsappBtn.style.transform = 'scale(1.1)';
  whatsappBtn.style.boxShadow = '0 6px 20px rgba(37, 211, 102, 0.4)';
});

whatsappBtn.addEventListener('mouseleave', () => {
  whatsappBtn.style.transform = 'scale(1)';
  whatsappBtn.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
});

// ============================================
// LAZY LOADING IMAGES
// ============================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img.lazy').forEach(img => imageObserver.observe(img));
}

// ============================================
// COUNTER ANIMATION
// ============================================

function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 16);
}

const statBoxes = document.querySelectorAll('.stat-box h4');
let countersStarted = false;

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !countersStarted) {
            countersStarted = true;
            statBoxes.forEach(box => {
                const target = parseInt(box.textContent);
                animateCounter(box, target);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

if (statBoxes.length > 0) {
    statsObserver.observe(statBoxes[0].closest('.stat-box'));
}

// ============================================
// ACTIVE LINK STYLING
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
});

// ============================================
// PARALLAX EFFECT
// ============================================

window.addEventListener('scroll', () => {
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        const scrollPosition = window.pageYOffset;
        heroSection.style.backgroundPosition = `0 ${scrollPosition * 0.5}px`;
    }
});

// ============================================
// FORM INPUT FOCUS EFFECTS
// ============================================

const formInputs = document.querySelectorAll('.form-control, .form-select');

formInputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.style.borderColor = '#667eea';
        this.style.boxShadow = '0 0 0 0.2rem rgba(102, 126, 234, 0.25)';
    });

    input.addEventListener('blur', function() {
        this.style.borderColor = '#e0e0e0';
        this.style.boxShadow = 'none';
    });
});

// ============================================
// LIGHTBOX GALLERY FUNCTIONALITY
// ============================================

let currentLightboxIndex = 0;
const galleryImages = [];

document.addEventListener('DOMContentLoaded', () => {
    
    const images = document.querySelectorAll('.gallery-image');
    images.forEach((img, index) => {
        galleryImages.push({
            src: img.src,
            title: img.getAttribute('data-title'),
            alt: img.getAttribute('alt')
        });

       
        img.addEventListener('click', () => {
            currentLightboxIndex = index;
            openLightbox(index);
        });
    });

  
    const closeBtn = document.querySelector('.lightbox-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeLightbox);
    }

    
    const modal = document.getElementById('lightboxModal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeLightbox();
            }
        });
    }

   
    document.addEventListener('keydown', (e) => {
        const modal = document.getElementById('lightboxModal');
        if (modal && modal.classList.contains('active')) {
            if (e.key === 'ArrowLeft') {
                changeLightboxImage(-1);
            } else if (e.key === 'ArrowRight') {
                changeLightboxImage(1);
            } else if (e.key === 'Escape') {
                closeLightbox();
            }
        }
    });
});

function openLightbox(index) {
    const modal = document.getElementById('lightboxModal');
    const image = document.getElementById('lightboxImage');
    const caption = document.getElementById('lightboxCaption');

    if (galleryImages[index]) {
        image.src = galleryImages[index].src;
        caption.textContent = galleryImages[index].title;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeLightbox() {
    const modal = document.getElementById('lightboxModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function changeLightboxImage(direction) {
    currentLightboxIndex += direction;

    // Wrap around
    if (currentLightboxIndex >= galleryImages.length) {
        currentLightboxIndex = 0;
    } else if (currentLightboxIndex < 0) {
        currentLightboxIndex = galleryImages.length - 1;
    }

    openLightbox(currentLightboxIndex);
}


let touchStartX = 0;
let touchEndX = 0;

const modal = document.getElementById('lightboxModal');
if (modal) {
    modal.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, false);

    modal.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);
}

function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
       
        changeLightboxImage(1);
    }
    if (touchEndX > touchStartX + 50) {
       
        changeLightboxImage(-1);
    }
}


// ============================================
// TESTIMONIALS CAROUSEL FUNCTIONALITY
// ============================================

let currentCarouselIndex = 0;
const carouselItemsPerView = 3;
let totalTestimonials = 0;

document.addEventListener('DOMContentLoaded', () => {
    // Initialize carousel
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    totalTestimonials = testimonialItems.length;

    // Create dots
    const dotsContainer = document.getElementById('carouselDots');
    if (dotsContainer) {
        for (let i = 0; i < totalTestimonials; i++) {
            const dot = document.createElement('div');
            dot.className = 'dot';
            if (i === 0) dot.classList.add('active');
            dot.onclick = () => goToCarouselSlide(i);
            dotsContainer.appendChild(dot);
        }
    }

    // Auto-scroll carousel every 5 seconds
    setInterval(() => {
        moveCarousel(1);
    }, 5000);

    // Touch support for carousel
    let touchStartX = 0;
    let touchEndX = 0;
    const wrapper = document.querySelector('.testimonials-wrapper');

    if (wrapper) {
        wrapper.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, false);

        wrapper.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleCarouselSwipe();
        }, false);
    }
});

function moveCarousel(direction) {
    currentCarouselIndex += direction;

    // Wrap around
    if (currentCarouselIndex >= totalTestimonials) {
        currentCarouselIndex = 0;
    } else if (currentCarouselIndex < 0) {
        currentCarouselIndex = totalTestimonials - 1;
    }

    updateCarouselPosition();
}

function goToCarouselSlide(index) {
    currentCarouselIndex = index;
    updateCarouselPosition();
}

function updateCarouselPosition() {
    const wrapper = document.querySelector('.testimonials-wrapper');
    if (!wrapper) return;

    // Calculate the translation based on item width and gap
    const itemWidth = wrapper.querySelector('.testimonial-item').offsetWidth;
    const gap = 32; // 2rem = 32px
    const translateX = -(currentCarouselIndex * (itemWidth + gap));

    wrapper.style.transform = `translateX(${translateX}px)`;

    // Update dots
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        dot.classList.remove('active');
        if (index === currentCarouselIndex) {
            dot.classList.add('active');
        }
    });
}

function handleCarouselSwipe() {
    if (touchEndX < touchStartX - 50) {
        // Swiped left
        moveCarousel(1);
    }
    if (touchEndX > touchStartX + 50) {
        // Swiped right
        moveCarousel(-1);
    }
}

// Recalculate carousel on window resize
window.addEventListener('resize', () => {
    updateCarouselPosition();
});

(function () {
  const track = document.getElementById('testiTrack');
  const dotsBox = document.getElementById('testiDots');
  const prev = document.querySelector('.testi-nav.prev');
  const next = document.querySelector('.testi-nav.next');

  function cardsPerView(){
    const w = track.clientWidth;
    // Usa os mesmos breakpoints do CSS
    if (window.matchMedia('(max-width: 576px)').matches) return 1;
    if (window.matchMedia('(max-width: 992px)').matches) return 2;
    return 3;
  }

  function pageCount(){
    const total = track.children.length;
    const per = cardsPerView();
    return Math.max(1, Math.ceil(total / per));
  }

  function pageWidth(){
    const card = track.querySelector('.testi-card');
    const gap = parseInt(getComputedStyle(track).gap) || 0;
    const per = cardsPerView();
    return (card.clientWidth + gap) * per;
  }

  let page = 0;

  function renderDots(){
    dotsBox.innerHTML = '';
    for(let i=0;i<pageCount();i++){
      const b = document.createElement('button');
      if(i===page) b.classList.add('active');
      b.addEventListener('click', ()=> goTo(i));
      dotsBox.appendChild(b);
    }
  }

  function goTo(p){
    const max = pageCount()-1;
    page = Math.max(0, Math.min(p, max));
    track.scrollTo({ left: page * pageWidth(), behavior: 'smooth' });
    renderDots();
  }

  prev.addEventListener('click', ()=> goTo(page-1));
  next.addEventListener('click', ()=> goTo(page+1));
  window.addEventListener('resize', ()=> goTo(page)); // recalcula

  // init
  renderDots();
})();


document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const service = document.getElementById('service').value;
    const message = document.getElementById('message').value.trim();

    const serviceLabel = {
      eletrica: 'Elétrica',
      hidraulica: 'Hidráulica',
      geral: 'Serviços Gerais'
    }[service] || service;

    const whatsappNumber = '554599480689'; // 55 + DDD + número (sem espaços)

    const text = `Olá! Quero solicitar um orçamento.

*Nome:* ${name}
*Serviço:* ${serviceLabel}

*Descrição:*
${message}`;

    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  });
});