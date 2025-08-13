document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href').slice(1);
    const target = document.getElementById(targetId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
      history.pushState(null, null, '#' + targetId);
    }
  });
});

const searchBox = document.querySelector('.search-box');
if (searchBox) {
  searchBox.addEventListener('input', function() {
    const query = this.value.toLowerCase();
    document.querySelectorAll('.card').forEach(card => {
      const title = card.querySelector('.card-title').textContent.toLowerCase();
      const content = card.querySelector('.card-content').textContent.toLowerCase();
      if (title.includes(query) || content.includes(query)) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
}

const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });
}

document.addEventListener('click', (e) => {
  const target = e.target;
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (!navLinks.contains(target) && !menuToggle.contains(target)) {
    navLinks.classList.remove('active');
  }
});

const form = document.querySelector('form');
if (form) {
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    let isValid = true;
    this.querySelectorAll('input, textarea').forEach(input => {
      if (!input.value.trim()) {
        isValid = false;
        input.classList.add('error');
      } else {
        input.classList.remove('error');
      }
    });
    if (isValid) {
      console.log('Form submitted!');
      this.reset();
    }
  });
}

const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.querySelector('.lightbox');
const lightboxImg = document.querySelector('.lightbox img');
if (galleryItems.length && lightbox) {
  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const imgSrc = item.querySelector('img').getAttribute('src');
      lightboxImg.setAttribute('src', imgSrc);
      lightbox.classList.add('active');
    });
  });
  lightbox.addEventListener('click', () => {
    lightbox.classList.remove('active');
  });
}

const revealElements = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
revealElements.forEach(element => {
  observer.observe(element);
});

const backToTopBtn = document.querySelector('.back-to-top');
if (backToTopBtn) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add('active');
    } else {
      backToTopBtn.classList.remove('active');
    }
  });
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

const heroText = document.querySelector('.hero-text');
if (heroText) {
  const text = heroText.textContent;
  heroText.textContent = '';
  let index = 0;
  const typingInterval = setInterval(() => {
    heroText.textContent += text.charAt(index);
    index++;
    if (index === text.length) {
      clearInterval(typingInterval);
    }
  }, 100);
}

fetch('https://jsonplaceholder.typicode.com/posts')
  .then(response => response.json())
  .then(data => {
    const postsContainer = document.querySelector('.posts');
    if (postsContainer) {
      data.forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('post');
        postElement.innerHTML = `
          <h3 class="post-title">${post.title}</h3>
          <p class="post-body">${post.body}</p>
        `;
        postsContainer.appendChild(postElement);
      });
    }
  })
  .catch(error => console.error('Error fetching data:', error));

const themeToggle = document.querySelector('.theme-toggle');
const currentTheme = localStorage.getItem('theme') || 'light';
document.body.classList.add(currentTheme);
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const isDarkTheme = document.body.classList.toggle('dark');
    localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light');
  });
}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('Service Worker registered with scope:', registration.scope);
      })
      .catch(error => {
        console.error('Service Worker registration failed:', error);
      });
  });
}