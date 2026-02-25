document.addEventListener('DOMContentLoaded', function() {
    // Check if device is touch-enabled
    const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
    
    if (isTouchDevice) {
        const galleryItems = document.querySelectorAll('.gallery-item');
        let activeItem = null;

        // Add click event listener to document to close active item when clicking outside
        document.addEventListener('click', function(e) {
            if (activeItem && !activeItem.contains(e.target)) {
                activeItem.classList.remove('active');
                activeItem = null;
            }
        });

        // Add click handlers to gallery items
        galleryItems.forEach(item => {
            item.addEventListener('click', function(e) {
                e.stopPropagation(); // Prevent document click from immediately closing
                
                // If this item is already active, deactivate it
                if (this === activeItem) {
                    this.classList.remove('active');
                    activeItem = null;
                    return;
                }
                
                // Deactivate previous active item
                if (activeItem) {
                    activeItem.classList.remove('active');
                }
                
                // Activate this item
                this.classList.add('active');
                activeItem = this;
            });
        });
    }

    // Initialize variables
    const filterBtns = document.querySelectorAll('.filter-btn');
    const sketchItems = document.querySelectorAll('.sketch-item');
    const backToTopBtn = document.querySelector('.back-to-top');
    
    // Animate sketch items on load with staggered delay
    sketchItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.animation = `fadeInUp 0.6s ease forwards`;
            item.style.animationDelay = `${index * 0.1}s`;
            item.style.opacity = 1;
        }, 300);
    });
    
    // Filter functionality
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get filter value
            const filterValue = this.getAttribute('data-filter');
            
            // Animate items based on filter
            sketchItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                
                // Reset animations
                item.style.animation = '';
                
                if(filterValue === 'all' || itemCategory === filterValue) {
                    // Show items with matching category
                    item.style.display = 'block';
                    item.style.opacity = '0';
                    
                    // Apply staggered animations
                    setTimeout(() => {
                        item.style.animation = 'flipIn 0.6s ease forwards';
                    }, 100);
                } else {
                    // Hide items that don't match
                    item.style.animation = 'fadeOut 0.3s ease forwards';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Lightbox functionality
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    document.body.appendChild(lightbox);
    

    
    const lightboxImg = lightbox.querySelector('img');
    const lightboxCaption = lightbox.querySelector('.lightbox-caption');
    const lightboxClose = lightbox.querySelector('.lightbox-close');
    
    // Open lightbox on sketch click
    sketchItems.forEach(item => {
        item.addEventListener('click', function() {
            const imgSrc = this.querySelector('img').getAttribute('src');
            const imgTitle = this.querySelector('.sketch-info h3').textContent;
            const imgDesc = this.querySelector('.sketch-info p').textContent;
            
            lightboxImg.setAttribute('src', imgSrc);
            lightboxCaption.textContent = `${imgTitle} - ${imgDesc}`;
            
            lightbox.classList.add('active');
            document.body.classList.add('no-scroll');
        });
    });
    
    // Close lightbox on X button click
    lightboxClose.addEventListener('click', function() {
        lightbox.classList.remove('active');
        document.body.classList.remove('no-scroll');
    });
    
    // Close lightbox on outside click
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
            document.body.classList.remove('no-scroll');
        }
    });
    
    // Back to top button functionality
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Add scroll reveal animations
    const scrollReveal = function() {
        const revealElements = document.querySelectorAll('.reveal');
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('revealed');
            }
        });
    };
    
    // Call on scroll
    window.addEventListener('scroll', scrollReveal);
    
    // Call once on load
    scrollReveal();
    
    // Create hover effects for sketch items
    sketchItems.forEach(item => {
        item.addEventListener('mousemove', function(e) {
            const { left, top, width, height } = this.getBoundingClientRect();
            const x = (e.clientX - left) / width;
            const y = (e.clientY - top) / height;
            
            this.style.transform = `perspective(1000px) rotateX(${(y - 0.5) * 5}deg) rotateY(${(x - 0.5) * 5}deg) scale(1.02)`;
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });
});

// Add back to top button to the page
// document.body.insertAdjacentHTML('beforeend', `
//     <div class="back-to-top">
//         <i class="fa-solid fa-arrow-up"></i>
//     </div>
// `);