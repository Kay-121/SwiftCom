// Video Control Functionality
document.addEventListener('DOMContentLoaded', function() {
    const heroVideo = document.getElementById('heroVideo');
    const videoControlBtn = document.getElementById('videoControlBtn');
    const pauseIcon = videoControlBtn.querySelector('.pause-icon');
    const playIcon = videoControlBtn.querySelector('.play-icon');
    
    if (heroVideo && videoControlBtn) {
        videoControlBtn.addEventListener('click', function() {
            if (heroVideo.paused) {
                heroVideo.play();
                pauseIcon.style.display = 'block';
                playIcon.style.display = 'none';
                videoControlBtn.title = 'Pause Video';
            } else {
                heroVideo.pause();
                pauseIcon.style.display = 'none';
                playIcon.style.display = 'block';
                videoControlBtn.title = 'Play Video';
            }
        });
        
        // Update button state when video ends
        heroVideo.addEventListener('ended', function() {
            pauseIcon.style.display = 'none';
            playIcon.style.display = 'block';
            videoControlBtn.title = 'Play Video';
        });
        
        // Handle video load errors
        heroVideo.addEventListener('error', function() {
            videoControlBtn.style.display = 'none';
        });
        
        // Show button when video is loaded
        heroVideo.addEventListener('loadeddata', function() {
            videoControlBtn.style.display = 'flex';
        });
    }
});

// WhatsApp Popup Functionality
document.addEventListener('DOMContentLoaded', function() {
    const whatsappButton = document.getElementById('whatsappButton');
    const whatsappChat = document.getElementById('whatsappChat');
    const whatsappClose = document.getElementById('whatsappClose');
    const whatsappSend = document.getElementById('whatsappSend');
    const whatsappInput = document.getElementById('whatsappInput');
    
    if (whatsappButton && whatsappChat) {
        // Toggle chat window
        whatsappButton.addEventListener('click', function() {
            whatsappChat.classList.toggle('active');
        });
        
        // Close chat window
        if (whatsappClose) {
            whatsappClose.addEventListener('click', function() {
                whatsappChat.classList.remove('active');
            });
        }
        
        // Send message functionality
        if (whatsappSend && whatsappInput) {
            whatsappSend.addEventListener('click', sendMessage);
            whatsappInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    sendMessage();
                }
            });
        }
        
        function sendMessage() {
            const message = whatsappInput.value.trim();
            if (message) {
                // Add user message to chat
                addMessageToChat(message, 'user');
                
                // Clear input
                whatsappInput.value = '';
                
                // Simulate bot response
                setTimeout(() => {
                    const responses = [
                        "Thank you for your message! Our team will get back to you shortly.",
                        "I understand you need assistance. Let me connect you with our support team.",
                        "Your message has been received. Someone will respond within minutes.",
                        "Thanks for reaching out! How can I help you with our services today?"
                    ];
                    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
                    addMessageToChat(randomResponse, 'bot');
                }, 1000);
            }
        }
        
        function addMessageToChat(message, sender) {
            const messagesContainer = whatsappChat.querySelector('.whatsapp-messages');
            const messageDiv = document.createElement('div');
            messageDiv.className = `whatsapp-message ${sender}`;
            messageDiv.innerHTML = `<p>${message}</p>`;
            messagesContainer.appendChild(messageDiv);
            
            // Scroll to bottom
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
        
        // Close chat when clicking outside
        document.addEventListener('click', function(e) {
            if (!whatsappChat.contains(e.target) && !whatsappButton.contains(e.target)) {
                whatsappChat.classList.remove('active');
            }
        });
    }
});

// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
});

// Contact Form Handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                service: formData.get('service'),
                message: formData.get('message'),
                newsletter: formData.get('newsletter')
            };
            
            // Simple validation
            if (!data.name || !data.email || !data.message) {
                showFormMessage('Please fill in all required fields.', 'error');
                return;
            }
            
            if (!isValidEmail(data.email)) {
                showFormMessage('Please enter a valid email address.', 'error');
                return;
            }
            
            // Simulate form submission (in real implementation, this would send to a server)
            simulateFormSubmission(data);
        });
    }
});

function showFormMessage(message, type) {
    const formMessage = document.getElementById('formMessage');
    if (formMessage) {
        formMessage.textContent = message;
        formMessage.className = `form-message ${type}`;
        formMessage.style.display = 'block';
        
        // Hide message after 5 seconds
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function simulateFormSubmission(data) {
    // Show loading state
    const submitButton = document.querySelector('#contactForm button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Reset button
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        
        // Show success message
        showFormMessage('Thank you for your message! We will get back to you within 24 hours.', 'success');
        
        // Reset form
        document.getElementById('contactForm').reset();
        
        // Log the data (in real implementation, this would be sent to a server)
        console.log('Form submitted with data:', data);
    }, 2000);
}

// Smooth Scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
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
});

// Scroll animations
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.feature-card, .service-card, .pricing-card, .faq-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Header scroll effect
document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('.header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = '#fff';
            header.style.backdropFilter = 'none';
        }
        
        lastScroll = currentScroll;
    });
});

// Counter animation for stats
document.addEventListener('DOMContentLoaded', function() {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;
    
    const animateCounter = (counter) => {
        const target = counter.innerText;
        const isPlus = target.includes('+');
        const isTime = target.includes('/');
        const isDecimal = target.includes('.');
        
        let finalValue;
        if (isTime) {
            return; // Skip time-based counters
        }
        
        finalValue = parseInt(target.replace(/\D/g, ''));
        let currentValue = 0;
        
        const increment = finalValue / speed;
        
        const updateCounter = () => {
            currentValue += increment;
            if (currentValue < finalValue) {
                counter.innerText = Math.ceil(currentValue) + (isPlus ? '+' : '');
                requestAnimationFrame(updateCounter);
            } else {
                counter.innerText = target;
            }
        };
        
        updateCounter();
    };
    
    const observerOptions = {
        threshold: 0.5
    };
    
    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
});

// Service card hover effects
document.addEventListener('DOMContentLoaded', function() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Mobile menu styles
document.addEventListener('DOMContentLoaded', function() {
    const style = document.createElement('style');
    style.textContent = `
        .nav-menu.active {
            display: flex !important;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            flex-direction: column;
            padding: 1rem;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        
        .hamburger.active span:nth-child(1) {
            transform: rotate(-45deg) translate(-5px, 6px);
        }
        
        .hamburger.active span:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger.active span:nth-child(3) {
            transform: rotate(45deg) translate(-5px, -6px);
        }
        
        @media (max-width: 768px) {
            .nav-menu {
                display: none;
            }
        }
    `;
    document.head.appendChild(style);
});

// Form field focus effects
document.addEventListener('DOMContentLoaded', function() {
    const formFields = document.querySelectorAll('input, select, textarea');
    
    formFields.forEach(field => {
        field.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        field.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
    });
    
    // Add focus styles
    const focusStyle = document.createElement('style');
    focusStyle.textContent = `
        .form-group.focused label {
            color: #2563eb;
            transform: translateY(-2px);
        }
        
        .form-group label {
            transition: color 0.3s ease, transform 0.3s ease;
        }
    `;
    document.head.appendChild(focusStyle);
});
