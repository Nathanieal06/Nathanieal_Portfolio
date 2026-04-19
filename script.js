document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Sticky Frosted-Glass Nav Bar Hide/Show & Hero Fade
    const parallaxContainer = document.getElementById("parallax-container");
    const navBar = document.getElementById("main-nav");
    const heroLayer = document.querySelector(".hero-text-layer");
    const floatingSocials = document.getElementById("floating-socials");
    let lastScrollTop = 0;

    if(parallaxContainer) {
        parallaxContainer.addEventListener("scroll", () => {
            let st = parallaxContainer.scrollTop;
            
            // Fade out hero text as user scrolls down
            if(heroLayer) {
                // Fades out between 0 and 300px of scroll
                let opacity = 1 - (st / 300);
                if(opacity < 0) opacity = 0;
                heroLayer.style.opacity = opacity;
                heroLayer.style.transition = 'opacity 0.1s ease-out'; // Smooth out the JS ticks
            }

            // Sync Nav Bar
            if(navBar) {
                if (st > lastScrollTop && st > 50) {
                    // Scroll Down
                    navBar.classList.remove("visible");
                } else {
                    // Scroll Up
                    navBar.classList.add("visible");
                }
            }

            // Floating Socials Visibility
            if (floatingSocials) {
                if (st > window.innerHeight * 0.5) {
                    floatingSocials.classList.add("visible");
                } else {
                    floatingSocials.classList.remove("visible");
                }
            }

            lastScrollTop = st <= 0 ? 0 : st;
        }, { passive: true });
    }

    // 5. Animated Stat Counters
    const statNumbers = document.querySelectorAll(".stat-number");
    let hasAnimated = false;

    const animateCounters = () => {
        statNumbers.forEach(stat => {
            const target = +stat.getAttribute("data-target");
            let count = 0;
            const inc = target / 100;
            const updateCount = () => {
                count += inc;
                if(count < target) {
                    stat.innerText = Math.ceil(count);
                    setTimeout(updateCount, 20);
                } else {
                    stat.innerText = target + "+";
                }
            };
            updateCount();
        });
    }

    const observer = new IntersectionObserver(entries => {
        if(entries[0].isIntersecting && !hasAnimated) {
            hasAnimated = true;
            animateCounters();
        }
    }, { threshold: 0.5 });
    
    const statsSection = document.querySelector(".stats-section");
    if(statsSection) observer.observe(statsSection);

    // 7. Custom Crosshair Cursor
    const cursor = document.getElementById("custom-crosshair");
    if(cursor) {
        // Only run on desktop/non-touch to prevent UX issues
        if(window.matchMedia("(pointer: fine)").matches) {
            document.body.classList.add("custom-cursor-active");
            document.addEventListener("mousemove", (e) => {
                cursor.style.transform = `translate(${e.clientX - 10}px, ${e.clientY - 10}px)`;
            });
        }
    }

    // Global Scroll Animations for all pages
    const animatedElements = document.querySelectorAll('.animate-on-scroll, .timeline-item');
    
    // We observe with no root to work on standard scroll pages, but since index.html uses parallax-container, 
    // we need to see if the element is scrolling inside parallax or window. 
    // For universal use, using intersecting in viewport works fine either way.
    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // for backward compatibility with timeline items
                entry.target.classList.add('visible'); 
                
                // Unobserver after showing if you want them to animate only once:
                // observer.unobserve(entry.target);
            }
        });
    }, {
        root: typeof parallaxContainer !== 'undefined' && parallaxContainer ? parallaxContainer : null,
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    animatedElements.forEach(el => {
        scrollObserver.observe(el);
    });

    // 9. Firefly Particles
    const particlesContainer = document.getElementById("particles-container");
    if(particlesContainer) {
        for(let i = 0; i < 40; i++) {
            let firefly = document.createElement("div");
            firefly.classList.add("firefly");
            
            // Random properties
            let x = Math.random() * 100;
            let y = Math.random() * 100;
            let delay = Math.random() * 10;
            let duration = 5 + Math.random() * 10;
            let size = 2 + Math.random() * 4;

            firefly.style.left = `${x}%`;
            firefly.style.top = `${y}%`;
            firefly.style.width = `${size}px`;
            firefly.style.height = `${size}px`;
            firefly.style.animationDelay = `${delay}s`;
            firefly.style.animationDuration = `${duration}s`;

            particlesContainer.appendChild(firefly);
        }
    }
});
