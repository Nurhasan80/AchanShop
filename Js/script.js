// Toggle menu
const menuToggle = document.getElementById('menu-toggle');
const menu = document.getElementById('menu');

menuToggle.addEventListener('click', (e) => {
  e.stopPropagation(); // Mencegah event bubbling
  menu.classList.toggle('show');
  menuToggle.classList.toggle('active');
});

// Tutup menu saat klik di luar
document.addEventListener('click', (e) => {
  if (!menu.contains(e.target) && e.target !== menuToggle) {
    menu.classList.remove('show');
    menuToggle.classList.remove('active');
  }
});

// Mencegah menu tertutup saat klik di dalam menu
menu.addEventListener('click', (e) => {
  e.stopPropagation();
});

// Tutup menu otomatis saat klik link (kecuali link bercabang)
const menuLinks = document.querySelectorAll('#menu a');
menuLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    const parentLi = link.parentElement;
    if (parentLi.classList.contains('has-submenu')) {
      e.preventDefault();
      parentLi.classList.toggle('open');
    } else {
      menu.classList.remove('show');
      menuToggle.classList.remove('active');
    }
  });
});

// ================== GALERY LIGHTBOX ==================
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.getElementById('closeBtn');

galleryItems.forEach(item => {
  item.addEventListener('click', () => {
    const imgSrc = item.getAttribute('data-img');
    lightboxImg.src = imgSrc;
    lightbox.classList.add('active');
  });
});

closeBtn.addEventListener('click', () => {
  lightbox.classList.remove('active');
});

// Tutup lightbox jika klik di luar gambar
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox || e.target === lightboxImg) return;
  lightbox.classList.remove('active');
});

// ================== FORM KONTAK ==================
document.getElementById('waForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const nama = document.getElementById('namaKontak').value.trim();
  const telepon = document.getElementById('teleponKontak').value.trim();
  const pesan = document.getElementById('pesanKontak').value.trim();
  const notif = document.getElementById('notif');
  const nomorWA = '6287781935781'; // Ganti dengan nomor admin

  if (!nama || !telepon || !pesan) {
    notif.style.display = 'block';
    notif.style.color = 'red';
    notif.textContent = 'Mohon isi semua kolom!';
    return;
  }

  const url = `https://wa.me/${nomorWA}?text=Halo%20Admin%20Achan%20Computer%2C%0ASaya%20${encodeURIComponent(nama)}%0ATelp%3A%20${encodeURIComponent(telepon)}%0APesan%3A%20${encodeURIComponent(pesan)}`;

  window.open(url, '_blank');

  // Kosongkan input
  document.getElementById('waForm').reset();

  // Tampilkan notifikasi sukses
  notif.style.display = 'block';
  notif.style.color = 'green';
  notif.textContent = 'Pesan berhasil diarahkan ke WhatsApp.';

  setTimeout(() => {
    notif.style.display = 'none';
  }, 6000);
});

// ================== DARK MODE ==================
let isDark = false;
const btn = document.getElementById('themeToggle');
const iconEl = btn.querySelector('i'); // ambil <i> di dalam tombol

function updateIcon() {
  iconEl.setAttribute('data-feather', isDark ? 'sun' : 'moon');
  feather.replace(); // render ulang ikon feather
}

btn.addEventListener('click', () => {
  isDark = !isDark;
  document.body.classList.toggle('dark-mode', isDark);
  updateIcon();

  // 🔥 Tutup menu otomatis setelah toggle dark mode
  menu.classList.remove('show');
  menuToggle.classList.remove('active');
});

// render pertama kali
feather.replace();

// ================== SLIDER ==================
const track = document.getElementById('sliderTrack');
const slides = document.querySelectorAll('.slide');
let index = 0;

function showSlide(i) {
  index = (i + slides.length) % slides.length;
  track.style.transform = `translateX(-${index * 100}%)`;
}

function nextSlide() {
  showSlide(index + 1);
}

function prevSlide() {
  showSlide(index - 1);
}

setInterval(nextSlide, 5000);

// ================== ANIMASI SCROLL ==================
const service = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    } else {
      entry.target.classList.remove('show');
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.service-item').forEach(wrapper => {
  service.observe(wrapper);
});

const hero = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    } else {
      entry.target.classList.remove('show');
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.hero-item').forEach(wrapper => {
  hero.observe(wrapper);
});

const galery = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    } else {
      entry.target.classList.remove('show');
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.gallery-item').forEach(wrapper => {
  galery.observe(wrapper);
});

// ================== POPUP ==================
const popupMode = "session";  
// "always"  = selalu muncul tiap reload
// "session" = muncul sekali per sesi browser

window.addEventListener("load", function () {
  if (popupMode === "always") {
    document.getElementById("popupLightbox").style.display = "flex";
  } 
  else if (popupMode === "session") {
    if (!sessionStorage.getItem("popupShown")) {
      document.getElementById("popupLightbox").style.display = "flex";
      sessionStorage.setItem("popupShown", "true");
    }
  }
});

function closeLightbox() {
  document.getElementById("popupLightbox").style.display = "none";
}
