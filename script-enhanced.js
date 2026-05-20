/* =====================================================
   MODERN VINTAGE DESIGN - INTERACTIVE ENHANCEMENTS
   Smooth animations and cinematic interactions
   ===================================================== */

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    // Hide loading screen with delay for effect
    setTimeout(function() {
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
        }
    }, 2500);
    
    initializeEnvelope();
    initializeCarousel();
    initializeAudio();
    initializeSparkles();
    initializeSurpriseButton();
    initializeScrollAnimations();
    initializeHoverEffects();
});

// ===== ENVELOPE INTERACTION - REFINED =====
function initializeEnvelope() {
    const envelopeOverlay = document.getElementById('envelopeOverlay');
    const envelope = document.querySelector('.envelope');
    
    if (!envelope || !envelopeOverlay) return;
    
    envelope.addEventListener('click', openEnvelope);
    envelopeOverlay.addEventListener('click', function(e) {
        // Only close if clicking on overlay background, not envelope
        if (e.target === envelopeOverlay) {
            openEnvelope();
        }
    });
    
    // Keyboard support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            if (!envelopeOverlay.classList.contains('opened')) {
                openEnvelope();
            }
        }
    });
    
    function openEnvelope() {
        envelopeOverlay.classList.add('opening');
        
        // Subtle delay for cinematic effect
        setTimeout(() => {
            envelopeOverlay.classList.add('opened');
            // Optional: Play a soft sound effect
            playOpenSound();
        }, 450);
    }
    
    function playOpenSound() {
        // Create a subtle "paper rustling" sound effect
        if (window.audioContext) {
            const osc = window.audioContext.createOscillator();
            const gain = window.audioContext.createGain();
            
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(150, window.audioContext.currentTime);
            osc.frequency.exponentialRampToValueAtTime(100, window.audioContext.currentTime + 0.1);
            
            gain.gain.setValueAtTime(0.05, window.audioContext.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, window.audioContext.currentTime + 0.1);
            
            osc.connect(gain);
            gain.connect(window.audioContext.destination);
            
            osc.start();
            osc.stop(window.audioContext.currentTime + 0.1);
        }
    }
}

// ===== CAROUSEL - ENHANCED SWIPE =====
let currentSlide = 0;
let startX = 0;
let isDragging = false;
let dragOffset = 0;

function initializeCarousel() {
    const carouselTrack = document.getElementById('carouselTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dotsContainer = document.getElementById('dotsContainer');
    const slides = document.querySelectorAll('.memory-slide');
    
    if (!carouselTrack) return;
    
    const totalSlides = slides.length;
    
    // Create dots dynamically
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('div');
        dot.className = `dot ${i === 0 ? 'active' : ''}`;
        dot.setAttribute('aria-label', `Memory ${i + 1}`);
        dot.setAttribute('role', 'button');
        dot.setAttribute('tabindex', '0');
        
        dot.addEventListener('click', () => goToSlide(i));
        dot.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                goToSlide(i);
            }
        });
        
        dotsContainer.appendChild(dot);
    }
    
    function updateCarousel() {
        const offset = -currentSlide * 100;
        carouselTrack.style.transform = `translateX(${offset}%)`;
        
        // Update active dot
        const dots = document.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }
    
    function goToSlide(index) {
        currentSlide = ((index % totalSlides) + totalSlides) % totalSlides;
        updateCarousel();
    }
    
    function nextSlide() {
        goToSlide(currentSlide + 1);
    }
    
    function prevSlide() {
        goToSlide(currentSlide - 1);
    }
    
    // Button controls with accessibility
    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
        nextBtn.setAttribute('aria-label', 'Next memory');
    }
    if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
        prevBtn.setAttribute('aria-label', 'Previous memory');
    }
    
    // Touch/Swipe controls
    carouselTrack.addEventListener('touchstart', handleTouchStart, false);
    carouselTrack.addEventListener('touchmove', handleTouchMove, false);
    carouselTrack.addEventListener('touchend', handleTouchEnd, false);
    
    // Mouse drag support
    carouselTrack.addEventListener('mousedown', handleMouseDown, false);
    carouselTrack.addEventListener('mousemove', handleMouseMove, false);
    carouselTrack.addEventListener('mouseup', handleMouseUp, false);
    carouselTrack.addEventListener('mouseleave', handleMouseLeave, false);
    
    function handleTouchStart(e) {
        startX = e.touches[0].clientX;
        isDragging = true;
        dragOffset = 0;
    }
    
    function handleTouchMove(e) {
        if (!isDragging) return;
        dragOffset = e.touches[0].clientX - startX;
    }
    
    function handleTouchEnd(e) {
        isDragging = false;
        if (Math.abs(dragOffset) > 50) {
            if (dragOffset > 0) {
                prevSlide();
            } else {
                nextSlide();
            }
        }
    }
    
    function handleMouseDown(e) {
        startX = e.clientX;
        isDragging = true;
        dragOffset = 0;
        carouselTrack.style.cursor = 'grabbing';
    }
    
    function handleMouseMove(e) {
        if (!isDragging) return;
        dragOffset = e.clientX - startX;
    }
    
    function handleMouseUp(e) {
        isDragging = false;
        carouselTrack.style.cursor = 'grab';
        if (Math.abs(dragOffset) > 50) {
            if (dragOffset > 0) {
                prevSlide();
            } else {
                nextSlide();
            }
        }
    }
    
    function handleMouseLeave() {
        isDragging = false;
        carouselTrack.style.cursor = 'grab';
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
    });
}

// ===== AUDIO - PLAY ACTUAL SONG =====
let audioElement;
let isPlaying = false;

function initializeAudio() {
    const soundToggle = document.getElementById('soundToggle');
    
    if (!soundToggle) return;
    
    // Create or get audio element
    if (!audioElement) {
        audioElement = new Audio();
        // Path to Ahla Wahda song - you can update this path to match your file location
        audioElement.src = 'audio/ahla-wahda.mp3'; // or .wav, .m4a depending on your file
        audioElement.loop = true; // Loop the song
        audioElement.volume = 0.5; // Set volume to 50%
    }
    
    soundToggle.addEventListener('click', function() {
        if (isPlaying) {
            pauseMusic();
            soundToggle.textContent = '🔇';
            soundToggle.classList.remove('active');
            isPlaying = false;
        } else {
            playMusic();
            soundToggle.textContent = '🔊';
            soundToggle.classList.add('active');
            isPlaying = true;
        }
    });
}

function playMusic() {
    if (audioElement) {
        audioElement.play().catch(err => {
            console.log('Audio playback error:', err);
            // Fallback: show user message if audio file not found
            alert('Audio file not found. Please ensure "ahla-wahda.mp3" is in the audio folder.');
        });
    }
}

function pauseMusic() {
    if (audioElement) {
        audioElement.pause();
    }
}

// ===== SPARKLES & CURSOR EFFECTS =====
let lastSparkleTime = 0;
const sparkleThrottle = 30; // ms between sparkles

function initializeSparkles() {
    document.addEventListener('mousemove', createSparkleThrottled);
    document.addEventListener('touchmove', createSparkleFromTouch);
}

function createSparkleThrottled(e) {
    const now = Date.now();
    if (now - lastSparkleTime > sparkleThrottle) {
        createSparkle(e.clientX, e.clientY);
        lastSparkleTime = now;
    }
}

function createSparkleFromTouch(e) {
    const now = Date.now();
    if (now - lastSparkleTime > sparkleThrottle && e.touches.length > 0) {
        createSparkle(e.touches[0].clientX, e.touches[0].clientY);
        lastSparkleTime = now;
    }
}

function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    
    const sparkles = ['✨', '💫', '⭐', '💕', '✨'];
    const randomSparkle = sparkles[Math.floor(Math.random() * sparkles.length)];
    sparkle.textContent = randomSparkle;
    
    sparkle.style.left = x + 'px';
    sparkle.style.top = y + 'px';
    
    // Random movement offset
    const offsetX = (Math.random() - 0.5) * 100;
    const offsetY = (Math.random() - 0.5) * 150 - 50;
    sparkle.style.setProperty('--tx', offsetX + 'px');
    sparkle.style.setProperty('--ty', offsetY + 'px');
    
    document.body.appendChild(sparkle);
    
    // Remove after animation
    setTimeout(() => sparkle.remove(), 900);
}

// ===== SURPRISE BUTTON & CELEBRATION =====
function initializeSurpriseButton() {
    const surpriseBtn = document.getElementById('surpriseBtn');
    const reminderModal = document.getElementById('reminderModal');
    const modalClose = document.getElementById('modalClose');
    
    if (!surpriseBtn) return;
    
    // Array of encouraging and heartwarming messages
    const reminderMessages = [
        "You are braver than you believe, stronger than you seem, and smarter than you think. 💫",
        "Your kindness has touched more lives than you'll ever know. Thank you for being you.",
        "Don't give up on your dreams. You've already come so far. Keep shining! ✨",
        "You deserve all the good things coming your way. Believe it.",
        "Someone out there is grateful for you and all you do. That someone is me. 💕",
        "You're doing better than you think you are. Trust yourself.",
        "Your presence makes the world brighter. Never forget that.",
        "Every challenge you've overcome makes you stronger. You've got this!",
        "The world needs your light. Keep glowing, beautiful soul.",
        "You are enough. You are worthy. You are loved. 🤍",
        "Your potential is limitless. Believe in yourself like I believe in you.",
        "Be gentle with yourself. You're doing an amazing job.",
        "Your dreams matter. Your voice matters. You matter.",
        "On the hard days, remember: you're stronger than you think.",
        "You inspire me every single day with your strength and grace.",
        "Life is better with you in it. Never forget that.",
        "Your heart is pure gold. Protect it, but keep loving.",
        "You've survived 100% of your worst days. You're incredible.",
        "Keep going. Your breakthrough is coming. I can feel it.",
        "You are a work of art in progress. Be patient with yourself. 🎨"
    ];
    
    const emojis = ['💕', '✨', '🌟', '💫', '🤍', '💎', '🌸', '🎀', '💐', '🦋', '🌙', '⭐'];
    
    surpriseBtn.addEventListener('click', () => {
        showReminderMessage(reminderMessages, emojis);
    });
    
    // Close modal when X button is clicked
    if (modalClose) {
        modalClose.addEventListener('click', closeReminderModal);
    }
    
    // Close modal when clicking outside the card
    if (reminderModal) {
        reminderModal.addEventListener('click', (e) => {
            if (e.target === reminderModal) {
                closeReminderModal();
            }
        });
        
        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && reminderModal.classList.contains('active')) {
                closeReminderModal();
            }
        });
    }
}

function showReminderMessage(messages, emojis) {
    const reminderModal = document.getElementById('reminderModal');
    const reminderMessage = document.getElementById('reminderMessage');
    const reminderEmoji = document.getElementById('reminderEmoji');
    
    if (!reminderModal || !reminderMessage) return;
    
    // Select a random message and emoji
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
    
    // Update modal content
    reminderMessage.innerHTML = `<span class="reminder-message-text">${randomMessage}</span>`;
    reminderEmoji.textContent = randomEmoji;
    
    // Show modal with animation
    reminderModal.classList.add('active');
    
    // Create subtle sparkles around the modal
    createSparklesAroundModal();
}

function closeReminderModal() {
    const reminderModal = document.getElementById('reminderModal');
    if (reminderModal) {
        reminderModal.classList.remove('active');
    }
}

function createSparklesAroundModal() {
    const sparkleCount = 8;
    const card = document.querySelector('.reminder-card');
    
    if (!card) return;
    
    for (let i = 0; i < sparkleCount; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            sparkle.textContent = '✨';
            
            // Random angle around the card
            const angle = (i / sparkleCount) * Math.PI * 2;
            const distance = 150;
            const x = window.innerWidth / 2 + Math.cos(angle) * distance;
            const y = window.innerHeight / 2 + Math.sin(angle) * distance;
            
            sparkle.style.left = x + 'px';
            sparkle.style.top = y + 'px';
            sparkle.style.setProperty('--tx', -Math.cos(angle) * 80 + 'px');
            sparkle.style.setProperty('--ty', -Math.sin(angle) * 80 + 'px');
            
            document.body.appendChild(sparkle);
            
            setTimeout(() => sparkle.remove(), 900);
        }, i * 50);
    }
}

function createConfetti() {
    const confettiColors = ['#C9A961', '#C97C5C', '#7A8C6F', '#B8888D', '#D4AF8F', '#EBE3D6'];
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        
        const color = confettiColors[Math.floor(Math.random() * confettiColors.length)];
        confetti.style.backgroundColor = color;
        
        const startX = Math.random() * window.innerWidth;
        confetti.style.left = startX + 'px';
        confetti.style.top = '-10px';
        
        const duration = 2 + Math.random() * 1.5;
        confetti.style.setProperty('--duration', duration + 's');
        confetti.style.animationDelay = Math.random() * 0.3 + 's';
        
        document.body.appendChild(confetti);
        
        // Remove after animation
        setTimeout(() => confetti.remove(), (duration + 0.5) * 1000);
    }
}

function playCelebrationSound() {
    if (!audioContext) return;
    
    // Play celebratory chord progression
    const celebrationNotes = [
        { freq: 261.63, time: 0 },    // C
        { freq: 329.63, time: 0.1 },  // E
        { freq: 392.00, time: 0.2 },  // G
        { freq: 523.25, time: 0.35 }, // C (higher)
    ];
    
    celebrationNotes.forEach(note => {
        setTimeout(() => {
            const osc = audioContext.createOscillator();
            const gain = audioContext.createGain();
            
            osc.type = 'sine';
            osc.frequency.value = note.freq;
            
            gain.gain.setValueAtTime(0.1, audioContext.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4);
            
            osc.connect(gain);
            gain.connect(audioContext.destination);
            
            osc.start();
            osc.stop(audioContext.currentTime + 0.4);
        }, note.time * 1000);
    });
}

// ===== SCROLL ANIMATIONS =====
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe sections and cards
    document.querySelectorAll('section, .memory-card, .special-card').forEach(el => {
        observer.observe(el);
    });
}

// ===== HOVER EFFECTS - FOR NON-TOUCH DEVICES =====
function initializeHoverEffects() {
    const supportsHover = !window.matchMedia("(hover: none)").matches;
    
    if (!supportsHover) return;
    
    // Card hover lift effect
    document.querySelectorAll('.memory-card, .special-card, .letter-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'var(--transition-smooth)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transition = 'var(--transition-smooth)';
        });
    });
    
    // Button hover effects
    document.querySelectorAll('button, .carousel-btn, .surprise-btn').forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transition = 'var(--transition-fast)';
        });
    });
}

// ===== SMOOTH SCROLL ANCHOR LINKS =====
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

// ===== CONFETTI ANIMATION STYLES (added via JS) =====
const style = document.createElement('style');
style.textContent = `
    .confetti {
        position: fixed;
        width: 8px;
        height: 8px;
        pointer-events: none;
        animation: confetti-fall 3s ease-in forwards;
    }
    
    @keyframes confetti-fall {
        to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
        }
    }
    
    .animate-in {
        animation: fade-in-up 0.8s ease-out !important;
    }
`;
document.head.appendChild(style);

// ===== RESPONSIVE ADJUSTMENTS =====
function handleResize() {
    const width = window.innerWidth;
    const carousel = document.getElementById('carouselTrack');
    
    if (carousel && width < 768) {
        // Mobile optimizations
        carousel.style.gap = '4px';
    }
}

window.addEventListener('resize', handleResize);
handleResize();

// ===== PARALLAX ON HERO SECTION =====
window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY;
    const hero = document.querySelector('.hero');
    
    if (hero) {
        const heroBottom = hero.offsetTop + hero.offsetHeight;
        if (scrollPosition < heroBottom) {
            // Subtle parallax effect on decorative elements
            const bgElements = hero.querySelectorAll('[class*="::before"], [class*="::after"]');
            if (bgElements.length > 0) {
                hero.style.setProperty('--scroll', scrollPosition * 0.5 + 'px');
            }
        }
    }
});

// ===== ACCESSIBILITY - FOCUS MANAGEMENT =====
document.addEventListener('keydown', function(e) {
    // Trap focus in modals if needed
    if (e.key === 'Tab') {
        // Allow normal tab behavior
    }
});

// ===== PREVENT DOUBLE TAP ZOOM ON MOBILE =====
let lastTouchEnd = 0;
document.addEventListener('touchend', function(event) {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, false);

// ===== PERFORMANCE OPTIMIZATION =====
// Debounce scroll events
let scrollTimeout;
window.addEventListener('scroll', function() {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(function() {
        // Any scroll-dependent calculations here
    }, 150);
}, { passive: true });

// ===== INITIALIZE EVERYTHING =====
console.log('🎉 Modern Vintage Birthday Website - Initialized');
