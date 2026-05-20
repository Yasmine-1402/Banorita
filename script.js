// ===================================
// PAGE INITIALIZATION
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    initializeAudio();
    initializeSparkles();
    initializeSurpriseButton();
    initializeScrollAnimations();
});

// ===================================
// AUDIO HANDLING
// ===================================
let audioContext;
let isPlaying = false;

function initializeAudio() {
    const soundToggle = document.getElementById('soundToggle');
    const bgMusic = document.getElementById('bgMusic');
    
    // Create simple dreamy background music using Web Audio API
    createDreamyMusic();
    
    soundToggle.addEventListener('click', function() {
        if (isPlaying) {
            pauseMusic();
            soundToggle.classList.remove('active');
            isPlaying = false;
        } else {
            playMusic();
            soundToggle.classList.add('active');
            isPlaying = true;
        }
    });
}

function createDreamyMusic() {
    // Create Web Audio API context
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    // Create oscillators for dreamy ambient sound
    const createDreamyTone = (frequency, duration = 5) => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(frequency * 0.8, audioContext.currentTime + duration);
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.start();
        oscillator.stop(audioContext.currentTime + duration);
    };
    
    // Store reference for later use
    window.audioContext = audioContext;
    window.createDreamyTone = createDreamyTone;
}

function playMusic() {
    // Play dreamy ambient tones
    if (window.audioContext && window.createDreamyTone) {
        const notes = [261.63, 329.63, 392.00, 440.00]; // C, E, G, A
        let delay = 0;
        
        const playLoop = () => {
            const note = notes[Math.floor(Math.random() * notes.length)];
            window.createDreamyTone(note, 2);
            delay = setTimeout(playLoop, 3000);
        };
        
        window.musicLoop = delay;
        playLoop();
    }
}

function pauseMusic() {
    if (window.musicLoop) {
        clearTimeout(window.musicLoop);
        window.musicLoop = null;
    }
}

// ===================================
// CURSOR SPARKLES
// ===================================
function initializeSparkles() {
    document.addEventListener('mousemove', function(e) {
        createSparkle(e.clientX, e.clientY);
    });
    
    document.addEventListener('touchmove', function(e) {
        const touch = e.touches[0];
        createSparkle(touch.clientX, touch.clientY);
    });
}

function createSparkle(x, y) {
    const sparklesContainer = document.getElementById('sparklesContainer');
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    
    const sparkles = ['✨', '💫', '⭐', '💕', '✨'];
    const randomSparkle = sparkles[Math.floor(Math.random() * sparkles.length)];
    sparkle.textContent = randomSparkle;
    
    sparkle.style.left = x + 'px';
    sparkle.style.top = y + 'px';
    
    // Random offset for sparkle movement
    const offsetX = (Math.random() - 0.5) * 100;
    const offsetY = (Math.random() - 0.5) * 100;
    sparkle.style.setProperty('--tx', offsetX + 'px');
    
    sparklesContainer.appendChild(sparkle);
    
    // Remove after animation
    setTimeout(() => {
        sparkle.remove();
    }, 1000);
}

// ===================================
// SURPRISE BUTTON & CELEBRATION
// ===================================
function initializeSurpriseButton() {
    const surpriseBtn = document.getElementById('surpriseBtn');
    
    surpriseBtn.addEventListener('click', function() {
        triggerCelebration();
    });
}

function triggerCelebration() {
    // Add glow effect to body
    document.body.classList.add('celebration-mode');
    
    // Show cake and final message
    const cakeContainer = document.getElementById('cakeContainer');
    const finalMessage = document.getElementById('finalMessage');
    
    cakeContainer.style.opacity = '1';
    cakeContainer.style.visibility = 'visible';
    finalMessage.style.opacity = '1';
    finalMessage.style.visibility = 'visible';
    
    // Create confetti
    createConfetti();
    
    // Play celebration sound
    playMusicCelebration();
    
    // Remove glow effect after animation
    setTimeout(() => {
        document.body.classList.remove('celebration-mode');
    }, 500);
}

function createConfetti() {
    const confettiContainer = document.getElementById('confettiContainer');
    const confettiCount = 100;
    const colors = ['#ffc9e3', '#e6d9f5', '#d4e8f7', '#ffd700', '#ff69b4', '#9370db'];
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        
        const color = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.setProperty('--confetti-color', color);
        
        const startX = Math.random() * window.innerWidth;
        confetti.style.left = startX + 'px';
        confetti.style.top = '-10px';
        
        const duration = 2 + Math.random() * 1.5;
        confetti.style.animationDuration = duration + 's';
        confetti.style.animationDelay = Math.random() * 0.5 + 's';
        
        confettiContainer.appendChild(confetti);
        
        // Remove confetti after animation
        setTimeout(() => {
            confetti.remove();
        }, (duration + 0.5) * 1000);
    }
}

function playMusicCelebration() {
    if (window.audioContext && window.createDreamyTone) {
        // Play celebratory chord sequence
        const celebrationNotes = [
            { freq: 261.63, time: 0 },    // C
            { freq: 329.63, time: 0.1 },  // E
            { freq: 392.00, time: 0.2 },  // G
            { freq: 261.63, time: 0.5 },  // C (higher)
        ];
        
        celebrationNotes.forEach(note => {
            setTimeout(() => {
                window.createDreamyTone(note.freq, 0.5);
            }, note.time * 1000);
        });
    }
}

// ===================================
// SCROLL ANIMATIONS
// ===================================
function initializeScrollAnimations() {
    // Observe elements for scroll animation
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
    
    // Observe memory cards and special cards
    document.querySelectorAll('.memory-card, .special-card').forEach(card => {
        observer.observe(card);
    });
}

// ===================================
// SMOOTH SCROLL FOR NAVIGATION
// ===================================
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

// ===================================
// MOBILE TOUCH EVENTS
// ===================================
let lastTouchEnd = 0;
document.addEventListener('touchend', function(event) {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, false);

// ===================================
// RESPONSIVE ADJUSTMENTS
// ===================================
function handleResize() {
    // Adjust layout on resize
    const width = window.innerWidth;
    
    if (width < 768) {
        // Mobile adjustments
        document.body.style.fontSize = '14px';
    } else if (width < 1024) {
        // Tablet adjustments
        document.body.style.fontSize = '16px';
    } else {
        // Desktop
        document.body.style.fontSize = '18px';
    }
}

window.addEventListener('resize', handleResize);
handleResize();

// ===================================
// PARALLAX EFFECT (Subtle)
// ===================================
window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY;
    
    // Subtle parallax on hero section
    const hero = document.getElementById('hero');
    if (hero) {
        const heroBottom = hero.offsetTop + hero.offsetHeight;
        if (scrollPosition < heroBottom) {
            hero.style.backgroundPosition = `0px ${scrollPosition * 0.5}px`;
        }
    }
});

// ===================================
// INTERACTIVE CARD HOVER EFFECTS
// ===================================
document.querySelectorAll('.memory-card').forEach(card => {
    card.addEventListener('mouseover', function() {
        this.style.transform = 'translateY(-15px) rotateX(5deg)';
    });
    
    card.addEventListener('mouseout', function() {
        this.style.transform = 'translateY(0) rotateX(0deg)';
    });
});

// ===================================
// ADD HEART ANIMATION TO SPECIFIC ELEMENTS
// ===================================
document.querySelectorAll('.letter-text').forEach((element, index) => {
    element.style.animationDelay = `${index * 0.1}s`;
});

// ===================================
// INIT MESSAGE
// ===================================
console.log('%c🤍 Welcome to Nour\'s Birthday Website 🤍', 'font-size: 20px; color: #ff69b4; font-weight: bold;');
console.log('%cMade with love and sparkles ✨', 'font-size: 16px; color: #9370db;');
