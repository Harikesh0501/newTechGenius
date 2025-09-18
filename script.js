function initSlider(sliderId) {
  const slider = document.getElementById(sliderId);
  if (!slider) return; // Prevent error if slider doesn't exist
  const slidesContainer = slider.querySelector('.slides');
  const slides = slider.querySelectorAll('.slide');
  const prevBtn = slider.querySelector('.slider-button.prev');
  const nextBtn = slider.querySelector('.slider-button.next');
  const dotsContainer = slider.querySelector('.slider-dots');
  if (!slidesContainer || slides.length === 0) return; // nothing to slide
  if (!dotsContainer) return; // Prevent error if dotsContainer doesn't exist
  dotsContainer.innerHTML = '';

  let currentIndex = 0;
  const totalSlides = slides.length;

  // Create dots
  for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement('span');
    dot.classList.add('slider-dot');
    if (i === 0) dot.classList.add('active');
    dot.dataset.index = i;
    dotsContainer.appendChild(dot);
  }
  const dots = dotsContainer.querySelectorAll('.slider-dot');

  window.onload = function() {
    document.body.classList.add('body-animate');
  };

  function updateSlider(index) {
    currentIndex = index;
    slidesContainer.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach(dot => dot.classList.remove('active'));
    if (dots[index]) dots[index].classList.add('active');
  }

  // Attach button listeners only when the buttons exist
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
      updateSlider(currentIndex);
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % totalSlides;
      updateSlider(currentIndex);
    });
  }

  dots.forEach(dot => {
    dot.addEventListener('click', e => {
      updateSlider(Number(e.target.dataset.index));
    });
  });

  // Auto slide every 7 seconds
  let slideInterval = setInterval(() => {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateSlider(currentIndex);
  }, 7000);

  // Pause auto slide on hover
  slider.addEventListener('mouseenter', () => clearInterval(slideInterval));
  slider.addEventListener('mouseleave', () => {
    slideInterval = setInterval(() => {
      currentIndex = (currentIndex + 1) % totalSlides;
      updateSlider(currentIndex);
    }, 7000);
  });
}

// Initialize all sliders
initSlider('past-slider');
initSlider('achievements-slider');
initSlider('upcoming-slider');

// Mobile sidebar toggle (safe for missing elements)
if (document.getElementById("menu-toggle") && document.getElementById("sidebar")) {
  document.getElementById("menu-toggle").onclick = function () {
    document.getElementById("sidebar").style.width = "250px";
  };
  document.getElementById("close-sidebar").onclick = function () {
    document.getElementById("sidebar").style.width = "0";
  };

  // Close sidebar when link is clicked (optional)
  document.querySelectorAll(".sidebar a").forEach(link => {
    link.addEventListener("click", () => {
      document.getElementById("sidebar").style.width = "0";
    });
  });
}

// Hamburger menu for mobile
document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.getElementById('menu-toggle');
  const sidebar = document.getElementById('sidebar');
  const closeSidebar = document.getElementById('close-sidebar');
  const sidebarLinks = sidebar.querySelectorAll('a');

  menuToggle.addEventListener('click', function() {
    sidebar.classList.add('open');
  });

  closeSidebar.addEventListener('click', function() {
    sidebar.classList.remove('open');
  });

  sidebarLinks.forEach(link => {
    link.addEventListener('click', function() {
      sidebar.classList.remove('open');
    });
  });
});


// --- Past Events Gallery Modal (separate for each event) ---
document.querySelectorAll('.gallery-trigger-cquest').forEach(img => {
  img.addEventListener('click', function() {
    document.getElementById('cquestGalleryModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
  });
});
document.getElementById('closeCQuestGallery').onclick = function() {
  document.getElementById('cquestGalleryModal').style.display = 'none';
  document.body.style.overflow = '';
};
document.getElementById('cquestGalleryModal').addEventListener('click', function(e) {
  if (e.target === this) {
    this.style.display = 'none';
    document.body.style.overflow = '';
  }
});

document.querySelectorAll('.gallery-trigger-research').forEach(img => {
  img.addEventListener('click', function() {
    document.getElementById('researchGalleryModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
  });
});
document.getElementById('closeResearchGallery').onclick = function() {
  document.getElementById('researchGalleryModal').style.display = 'none';
  document.body.style.overflow = '';
};
document.getElementById('researchGalleryModal').addEventListener('click', function(e) {
  if (e.target === this) {
    this.style.display = 'none';
    document.body.style.overflow = '';
  }
});

// Initialize AOS animations with bounce and faster timing
AOS.init({
  duration: 700, // much faster
  once: false,
  easing: 'ease-out-back', // more dynamic
});

function enableTouchSlider(sliderSelector) {
  const slider = document.querySelector(sliderSelector);
  if (!slider) return;
  const slidesContainer = slider.querySelector('.slides');
  if (!slidesContainer) return;
  let startX = 0;
  let currentIndex = 0;
  const slideCount = slidesContainer.children.length;

  function setSlide(index) {
    currentIndex = Math.max(0, Math.min(index, slideCount - 1));
    slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
  }

  slidesContainer.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
  });

  slidesContainer.addEventListener('touchend', (e) => {
    const endX = e.changedTouches[0].clientX;
    if (endX < startX - 40) setSlide(currentIndex + 1); // swipe left
    else if (endX > startX + 40) setSlide(currentIndex - 1); // swipe right
  });

  // Initialize
  setSlide(0);
}

// Enable swipe for all sliders
enableTouchSlider('#upcoming-slider');
enableTouchSlider('#past-slider');
enableTouchSlider('#achievements-slider');
