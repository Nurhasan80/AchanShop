
let keranjang = {};
function simpanKeranjang() {
  localStorage.setItem("keranjang", JSON.stringify(keranjang));
}
// Cek apakah ada keranjang tersimpan di localStorage
const keranjangTersimpan = localStorage.getItem("keranjang");
if (keranjangTersimpan) {
  keranjang = JSON.parse(keranjangTersimpan);
}
// 🔥 Update badge saat halaman dimuat
updateBadge();


let dataThumbnail = {
  //apple machbook
  1: [
    { warna: "Putih", gambar: "img/produk/achanComputer1.jpg" },

    { warna: "Hitam", gambar: "img/produk/achanComputer2.jpg" },

    { warna: "Silver", gambar: "img/produk/achanComputer3.jpg" },
  ],

  // samsung galaxy
  2: [
    { warna: "Putih", gambar: "img/produk/achanComputer1.jpg" },

    { warna: "Hitam", gambar: "img/produk/achanComputer2.jpg" },

    { warna: "Silver", gambar: "img/produk/achanComputer3.jpg" },
  ],

  // assus
  3: [
    { warna: "Putih", gambar: "img/produk/achanComputer1.jpg" },
    { warna: "Hitam", gambar: "img/produk/achanComputer2.jpg" },
    { warna: "Silver", gambar: "img/produk/achanComputer3.jpg" },
  ],

  //4,5,6 da 7: tidak ada pilihan warna

  // usb typeC
  8: [
    { warna: "Putih", gambar: "img/produk/usbPutih.jpg" },
    { warna: "Hitam", gambar: "img/produk/usbHitam.jpg" },
    { warna: "Silver", gambar: "img/produk/usbSilver.jpg" },
  ],
};

const dataSpesifikasi = {
  1: [
    {
      judul: "Layar",
      isi: "13.6″ Liquid Retina (sekitar 2560×1664), True Tone",
    },

    {
      judul: "Port",
      isi: "2× Thunderbolt 4, MagSafe 3, headphone jack, HDMI, VGA",
    },

    {
      judul: "Fitur Tambahan",
      isi: "Mode Eye Saver, Flicker Free, VESA Mount",
    },
  ],

  2: [
    {
      judul: "Performa",
      isi: "Intel Core Ultra 7 (Series 2), 16 GB LPDDR5X (opsional 32 GB),1 TB PCIe 4 SSD",
    },

    {
      judul: "Konektifitas",
      isi: "Wi‑Fi 7, Bluetooth 5.4 fingerprint Windows Hello",
    },

    {
      judul: "Layar",
      isi: "16″ Dynamic AMOLED 2880×1800, 120 Hz, HDR, touchscreen",
    },
  ],

  3: [
    {
      judul: "Layar",
      isi: "14″ OLED “Nebula” 2880×1800, 120 Hz, 0.2 ms, G‑SYNC, 100% DCI‑P3, 1‑juta:1 kontras",
    },

    {
      judul: "Fitur khusus",
      isi: "pendingin Tri‑Fan + vapor chamber; audio spatial Dolby Atmos; AI copilot support",
    },

    { judul: "Konektivitas", isi: "HDMI, DisplayPort" },
  ],

  4: [
    { judul: "Ukuran & Resolusi", isi: "24 inci, Full HD (1920x1080)" },

    { judul: "Processor", isi: "intel core-i7, ram 16gb" },

    { judul: "Konektivitas", isi: "HDMI, DisplayPort, usb, LAN" },
  ],

  5: [
    { judul: "Komponen", isi: "Power Supply" },

    { judul: "Model", isi: " Cooler Master MWE Gold 850 V3 " },

    {
      judul: "Spesifikasi",
      isi: "850 W, ATX 3.1 / PCIe 5.1, modular, efisiensi tinggi",
    },
  ],

  6: [
    { judul: "Komponen", isi: "RAM DDR5" },

    { judul: "Model", isi: " Crucial DDR5‑5600 16 GB SO‑DIMM " },

    { judul: "Spesifikasi", isi: "DDR5‑5600MT/s, CL46, 1.1 V, 16 GB" },
  ],

  7: [
    { judul: "Komponen", isi: "SSD NVMe" },

    { judul: "Model", isi: "Samsung 9100 PRO 500 GB " },

    { judul: "Spesifikasi", isi: "PCIe 5.0, hingga 14 800 MB/s, IOPS tinggi" },
  ],

  8: [
    { judul: "Konektor", isi: "usb C dan usb A" },

    { judul: "Kecepatan", isi: "550 MB/s" },

    { judul: "Fitur", isi: "Anti air dan debu" },
  ],
};

// modal QRCode
function tampilkanModalQR(qrURL) {
  document.getElementById('qrCodeImage').src = qrURL;
  document.getElementById('downloadQRBtn').href = qrURL;
  document.getElementById('modalQR').style.display = 'flex';
  
  // Tutup modal keranjang/beli jika terbuka
  document.getElementById('modalCart').style.display = 'none';
  document.getElementById('modalBeli').style.display = 'none';
}

function tutupModalQR() {
  document.getElementById('modalQR').style.display = 'none';
}

// messsagebox
let autoCloseTimeout;

function showMessage(title, text, type = "info") {
  const overlayMsg = document.getElementById("overlayMsg");
  const titleEl = document.getElementById("messageTitle");
  const textEl = document.getElementById("messageText");
  const iconEl = document.getElementById("icon");
  const box = document.getElementById("messageBox");

  // Reset kelas warna lama
  box.classList.remove("success", "error", "warning", "info");

  // Ikon & warna berdasarkan tipe
  const icons = {
    success: "✅",
    error: "❌",
    warning: "⚠️",
    info: "ℹ️",
  };

  iconEl.textContent = icons[type] || "ℹ️";
  box.classList.add(type);
  titleEl.textContent = title;
  textEl.textContent = text;
  overlayMsg.style.display = "flex";
  
  // Auto close setelah 4 detikclearTimeout(autoCloseTimeout);
  autoCloseTimeout = setTimeout(() => {
    hideMessage();
  }, 4000);
}
function hideMessage() {document.getElementById("overlayMsg").style.display = "none";
}


function hapusAkun() {
  const email = localStorage.getItem("loginUser");
  if (!email) return;

  if (
    confirm(
      "Apakah Anda yakin ingin menghapus akun? Aksi ini tidak dapat dibatalkan!"
    )
  ) {
    // Hapus data pengguna
    const users = JSON.parse(localStorage.getItem("users") || "{}");
    delete users[email];
    localStorage.setItem("users", JSON.stringify(users));

    // Logout pengguna
    localStorage.removeItem("loginUser");

    // Kosongkan keranjang
    keranjang = {};
    updateBadge();

    // Tutup modal profil
    document.getElementById("modalProfil").style.display = "none";

    // Update tampilan
    updateAuthStatus();

    showMessage("Sukses", "Akun berhasil di hapus!", "success");
  }
}

// lupa password
function tampilkanLupaPassword() {
  document.getElementById("modalLogin").style.display = "none";
  document.getElementById("modalLupaPassword").style.display = "flex";
}

function kembaliKeLogin() {
  document.getElementById("modalLupaPassword").style.display = "none";
  document.getElementById("modalLogin").style.display = "flex";
}

function resetPassword() {
  const username = document.getElementById("resetUsername").value.trim();
  const newPass = document.getElementById("newPassword").value.trim();
  const confirmPass = document
    .getElementById("confirmNewPassword")
    .value.trim();

  if (!username || !newPass || !confirmPass) {
    showMessage("Info", "Harap lengkapi semua field.", "info");
    return;
  }

  if (newPass !== confirmPass) {
    showMessage("Kesalahan", "Konfirmasi password tidak cocok", "error");
    return;
  }

  const users = JSON.parse(localStorage.getItem("users") || "{}");

  if (!users[username]) {
    showMessage("Info", "Username tidak ditemukan.", "info");
    return;
  }

  if (typeof users[username] === 'object') {
  users[username].password = newPass;
} else {
  // format lama, ubah ke format baru tanpa nomor WA
  users[username] = { password: newPass, whatsapp: '-' };
}

  localStorage.setItem("users", JSON.stringify(users));
  showMessage(
    "Sukses",
    "Password berhasil di resset!, silahkan login password baru Anda",
    "success"
  );

  kembaliKeLogin();
}

function togglePassword(id, icon) {
  const input = document.getElementById(id);
  if (input.type === "password") {
    input.type = "text";
    icon.classList.remove("fa-eye");
    icon.classList.add("fa-eye-slash");
  } else {
    input.type = "password";
    icon.classList.remove("fa-eye-slash");
    icon.classList.add("fa-eye");
  }
}

function switchToDaftar() {
  document.getElementById("modalLogin").style.display = "none";
  document.getElementById("modalDaftar").style.display = "flex";
}

function switchToLogin() {
  document.getElementById("modalDaftar").style.display = "none";
  document.getElementById("modalLogin").style.display = "flex";
}

function tampilkanDaftar() {
  document.getElementById("modalDaftar").style.display = "flex";
}

function validasiNomorWA(wa) {
  // hapus karakter non-digit
  wa = wa.replace(/\D/g, "");

  // format Indonesia: 08xx atau 62xx, panjang minimal 10 digit, maksimal 15 digit
  const regex = /^(?:62|0)[2-9][0-9]{7,12}$/;

  return regex.test(wa);
}


let otpTerkirim = null;
let otpExpire = null;
let userDaftarSementara = {};
let waNumberSementara = '';
let timerInterval = null;

function daftar() {
  const user = document.getElementById('regUsername').value.trim();
  const pass = document.getElementById('regPassword').value.trim();
  const confirm = document.getElementById('regConfirm').value.trim();
  const waNumber = document.getElementById('regWhatsApp').value.trim();

  if (!user || !pass || !confirm || !waNumber) {
    showMessage("Info", "Lengkapi semua data!", "info");
    return;
  }
  if (pass !== confirm) {
    showMessage("Info", "Konfirmasi password tidak cocok!", "info");
    
    return;
  }

  const users = JSON.parse(localStorage.getItem('users') || '{}');
  if (users[user]) {
    showMessage("Info", "Username sudah terdaftar!", "info");
    return;
  }
  

  // 🔥 Validasi nomor WhatsApp
  if (!validasiNomorWA(waNumber)) {
    showMessage("Error", "Nomor WhatsApp tidak valid! Masukkan nomor yang benar.", "error");
    return;
  }
  
  // 🔥 Cek apakah nomor WA sudah ada
  for (let username in users) {
    if (users[username].whatsapp === waNumber) {
      showMessage("Error", "Nomor WhatsApp sudah terdaftar, silakan gunakan nomor lain!", "error");
      return;
    }
  }

  // Kalau aman → simpan sementara data pendaftar
  userDaftarSementara = { username: user, password: pass };
  waNumberSementara = waNumber;

  // Kirim OTP pertama kali
  kirimOTP();
}


function kirimOTP() {
  otpTerkirim = Math.floor(100000 + Math.random() * 900000);
  otpExpire = Date.now() + 60000; // 1 menit

  // Format nomor WA (tambah 62 jika belum ada)
  let waFormat = waNumberSementara;
  if (!waFormat.startsWith('62')) {
    waFormat = '62' + waFormat.replace(/^0/, '');
  }

  // Kirim ke WhatsApp via link
  const pesan = `Kode OTP pendaftaran Anda adalah: ${otpTerkirim}. Berlaku 1 menit.`;
  const waLink = `https://wa.me/${waFormat}?text=${encodeURIComponent(pesan)}`;
  window.open(waLink, '_blank');

  // Tampilkan modal OTP
  document.getElementById('modalDaftar').style.display = 'none';
  document.getElementById('modalOTP').style.display = 'flex';

  // Reset dan mulai timer
  mulaiTimerOTP();
}

function kirimUlangOTP() {
  kirimOTP(); // Generate ulang & kirim
}

function mulaiTimerOTP() {
  clearInterval(timerInterval);
  const timerEl = document.getElementById('timerOTP');
  const btnVerifikasi = document.querySelector('#modalOTP .btnCartDaftar');
  const btnKirimUlang = document.getElementById('btnKirimUlang');

  btnVerifikasi.disabled = false;
  btnKirimUlang.disabled = true;

  timerInterval = setInterval(() => {
    const sisa = Math.floor((otpExpire - Date.now()) / 1000);
    if (sisa > 0) {
      timerEl.textContent = `Waktu tersisa: ${sisa} detik`;
    } else {
      clearInterval(timerInterval);
      timerEl.textContent = 'OTP sudah kadaluarsa';
      otpTerkirim = null;
      btnVerifikasi.disabled = true;
      btnKirimUlang.disabled = false; // aktifkan kirim ulang setelah habis
    }
  }, 1000);
}

function verifikasiOTP() {
  const input = document.getElementById('inputOTP').value.trim();
  const btnVerifikasi = document.querySelector('#modalOTP .btnCartDaftar');

  if (!otpTerkirim) {
    showMessage("Info", "OTP sudah kadaluarsa, silahkan kirim ulang!", "info");
    return;
  }
  if (parseInt(input) === otpTerkirim && Date.now() < otpExpire) {
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    users[userDaftarSementara.username] = {
    password: userDaftarSementara.password,
    whatsapp: waNumberSementara
};

    localStorage.setItem('users', JSON.stringify(users));
    
    showMessage("Sukses", "Pendaftaran berhasil.!", "success");
    document.getElementById('modalOTP').style.display = 'none';
    btnVerifikasi.disabled = true;
    switchToLogin();
  } else {
    showMessage("Error", "OTP sudah terdfatar", "error");
    
  }
}
function tampilkanLogin() {
  document.getElementById("modalLogin").style.display = "flex";
}


function hitungAkunDenganWA(waNumber) {
  const users = JSON.parse(localStorage.getItem("users") || "{}");
  let count = 0;
  for (let username in users) {
    if (users[username].whatsapp === waNumber) {
      count++;
    }
  }
  return count;
}



function login() {
  const user = document.getElementById('loginUsername').value.trim();
  const pass = document.getElementById('loginPassword').value.trim();
  const users = JSON.parse(localStorage.getItem('users') || '{}');

  if (users[user]) {
    // Format baru (object)
    if (typeof users[user] === 'object' && users[user].password === pass) {
      localStorage.setItem("loginUser", user);

      updateAuthStatus();
      document.getElementById('modalLogin').style.display = 'none';
      showMessage("Sukses", "Login berhasil!, Selamat Datang, "+ user, "success");
      return;
    }
    // Format lama (string)
    if (typeof users[user] === 'string' && users[user] === pass) {
      localStorage.setItem('loginUser', user);
      updateAuthStatus();
      document.getElementById('modalLogin').style.display = 'none';
      showMessage("Sukses", "Login berhasil, Selamat Datang, " + user, "success");
      
    }
  }
  showMessage("Error", "Login gagal", "error");
}




function logout() {
  if (confirm("Apakah Anda yakin ingin keluar dari akun Anda?")) {
    localStorage.removeItem("loginUser");
    // keranjang = {}; // Kosongkan keranjang
    updateBadge();

    // Tutup panel user
    document.getElementById("userPanel").classList.remove("open");
    document.getElementById("userPanelOverlay").classList.remove("open");

    updateAuthStatus();
    showMessage("Sukses", "Anda berhasil logout!", "success");

    // Tutup modal keranjang jika terbuka
    document.getElementById("modalCart").style.display = "none";
  }
}

function toggleUserPanel() {
  const panel = document.getElementById("userPanel");
  const overlay = document.getElementById("userPanelOverlay");
  panel.classList.toggle("open");
  overlay.classList.toggle("open");
}

// Migrasi akun lama ke format baru (password + whatsapp)
(function migrateOldUsers() {
  let users = JSON.parse(localStorage.getItem('users') || '{}');
  let changed = false;

  for (let username in users) {
    if (typeof users[username] === 'string') {
      // Ubah ke format baru
      users[username] = {
        password: users[username],
        whatsapp: '-'
      };
      changed = true;
    }
  }

  if (changed) {
    localStorage.setItem('users', JSON.stringify(users));
    console.log('✅ Migrasi akun lama selesai.');
  }
})();



function saveEditedUsername() {
  const newUsername = document.getElementById("editUsernameInput").value.trim();
  const oldUsername = localStorage.getItem("loginUser");

  if (!newUsername) {
    showMessage("Info", "Username tidak boleh kosong!", "info");
    return;
  }

  if (newUsername === oldUsername) {
    showMessage("Info", "Username tidak berubah.", "info");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users") || "{}");

  if (users[newUsername]) {
    showMessage("Error", "Username sudah terdaftar!", "error");
    return;
  }

  if (!users[oldUsername]) {
    showMessage("Error", "Data user lama tidak ditemukan!", "error");
    return;
  }

  // 🔥 Pindahkan data sesuai tipe aslinya
  if (typeof users[oldUsername] === "string") {
    // format lama: hanya password string
    users[newUsername] = users[oldUsername];
  } else if (typeof users[oldUsername] === "object") {
    // format baru: object lengkap
    users[newUsername] = { ...users[oldUsername] };
  }

  // hapus user lama
  delete users[oldUsername];
  localStorage.setItem("users", JSON.stringify(users));



  // pindahkan userData juga (avatar, dll)
  let userData = JSON.parse(localStorage.getItem("userData") || "{}");
  if (userData[oldUsername]) {
    userData[newUsername] = { ...userData[oldUsername] };
    delete userData[oldUsername];
    localStorage.setItem("userData", JSON.stringify(userData));
  }
  localStorage.setItem("loginUser", newUsername);

  // refresh tampilan
  updateAuthStatus();
  displayAvatar();

  showMessage("Sukses", "Username berhasil diperbarui!", "success");

  // reset tombol
  document.getElementById("editUsernameInput").disabled = true;
  document.getElementById("btnEditUsername").style.display = "inline-block";
  document.getElementById("btnSaveUsername").style.display = "none";
}

function enableEditUsername() {
  const input = document.getElementById("editUsernameInput");
  input.disabled = false;
  input.focus();
  document.getElementById("btnEditUsername").style.display = "none";
  document.getElementById("btnSaveUsername").style.display = "inline-block";
}

function saveEditedUsername() {
  const newUsername = document.getElementById("editUsernameInput").value.trim();
  const oldUsername = localStorage.getItem("loginUser");

  if (!newUsername) {
    showMessage("Info", "Username tidak boleh kosong!", "info");
    return;
  }

  if (newUsername === oldUsername) {
    showMessage("Info", "Username tidak berubah!", "info");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users") || "{}");

  if (users[newUsername]) {
    showMessage("Info", "Username sudah terdaftar!", "info")
    return;
  }

  if (users[oldUsername]) {
    if (typeof users[oldUsername] === "string") {
      users[newUsername] = users[oldUsername];
    } else if (typeof users[oldUsername] === "object") {
      users[newUsername] = { ...users[oldUsername] };
    }
    delete users[oldUsername];
    localStorage.setItem("users", JSON.stringify(users));
  }

  localStorage.setItem("loginUser", newUsername);

  let userData = JSON.parse(localStorage.getItem("userData") || "{}");
  if (userData[oldUsername]) {
    userData[newUsername] = { ...userData[oldUsername] };
    delete userData[oldUsername];
    localStorage.setItem("userData", JSON.stringify(userData));
  }

  updateAuthStatus();
  showMessage("Info", "Username berhasil di perbaharui!", "info");
  document.getElementById("editUsernameInput").disabled = true;
  document.getElementById("btnEditUsername").style.display = "inline-block";
  document.getElementById("btnSaveUsername").style.display = "none";
}

function enableEditAlamat() {
  const input = document.getElementById("editAlamatInput");
  input.disabled = false;
  input.focus();
  document.getElementById("btnEditAlamat").style.display = "none";
  document.getElementById("btnSaveAlamat").style.display = "inline-block";
}

function saveEditedAlamat() {
  const newAlamat = document.getElementById("editAlamatInput").value.trim();
  const username = localStorage.getItem("loginUser");
  if (!username) return;

  if (!newAlamat) {
    showMessage("Info", "Alamat tidak boleh kosong!", "info");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users") || "{}");
  if (users[username]) {
    if (typeof users[username] === "object") {
      users[username].alamat = newAlamat;
    } else {
      // format lama
      users[username] = { password: users[username], whatsapp: "-", alamat: newAlamat };
    }
    localStorage.setItem("users", JSON.stringify(users));
  }

  showMessage("Sukses", "Alamat berhasil diperbarui!", "success");

  document.getElementById("editAlamatInput").disabled = true;
  document.getElementById("btnEditAlamat").style.display = "inline-block";
  document.getElementById("btnSaveAlamat").style.display = "none";
}



function updateAuthStatus() {
  let user = localStorage.getItem("loginUser");
  let users = JSON.parse(localStorage.getItem("users") || "{}");

  // Jika loginUser tidak ada di daftar users → logout paksa
  if (user && !users[user]) {
    localStorage.removeItem("loginUser");
    user = null;
  }

  document.getElementById("welcomeText").innerText = user
    ? `Halo, ${user} !`
    : "";
  document.getElementById("btnLogout").style.display = user
    ? "inline-block"
    : "none";
  document.getElementById("keranjang").style.display = user
    ? "inline-block"
    : "none";
  document.getElementById("profileIcon").style.display = user
    ? "inline-block"
    : "none";
  document.getElementById("authBarAvatar").style.display = user
    ? "inline-block"
    : "none";

    if (user) {
      const panelUsername = document.getElementById("panelUsername");
      const panelUsernameDetail = document.getElementById("panelUsernameDetail");

      const editInput = document.getElementById("editUsernameInput");
      if (editInput) editInput.value = user;
      
    
      if (panelUsername) panelUsername.innerText = user;
      if (panelUsernameDetail) panelUsernameDetail.innerText = user;
      if (editInput) editInput.value = user;
    
      if (users[user] && users[user].whatsapp) {
        const wa = document.getElementById("panelWhatsApp");
        if (wa) wa.innerText = users[user].whatsapp;
      } else {
        const wa = document.getElementById("panelWhatsApp");
        if (wa) wa.innerText = "-";
      }

          if (users[user] && users[user].alamat) {
      const alamatInput = document.getElementById("editAlamatInput");
      if (alamatInput) alamatInput.value = users[user].alamat;
    } else {
      const alamatInput = document.getElementById("editAlamatInput");
      if (alamatInput) alamatInput.value = "";
    }

    
      displayAvatar();
    }
    

  // sembunyikan/ tampilkan tombol login & daftar
  document.getElementById("btnLogin").style.display = user
    ? "none"
    : "inline-block";
  document.getElementById("btnDaftar").style.display = user
    ? "none"
    : "inline-block";

  if (!user) {
    document.getElementById("modalCart").style.display = "none";
  }

  

  // tutup panel kalau logout
  document.getElementById("userPanel").classList.remove("open");
  document.getElementById("userPanelOverlay").classList.remove("open");
}



updateAuthStatus();

// Fungsi untuk upload avatar
function uploadAvatar(event) {
  const file = event.target.files[0];
  if (!file) return;

  // Validasi ukuran file (max 2MB)
  if (file.size > 2 * 1024 * 1024) {
    showMessage("Info", "Ukuran foto maksimal 2 MB.", "info");

    return;
  }

  const reader = new FileReader();
  reader.onload = function (e) {
    const avatarData = e.target.result;

    // Simpan ke localStorage
    const username = localStorage.getItem("loginUser");
    if (username) {
      let userData = JSON.parse(localStorage.getItem("userData") || "{}");

      if (!userData[username]) {
        userData[username] = {};
      }

      userData[username].avatar = avatarData;
      localStorage.setItem("userData", JSON.stringify(userData));
    }

    // Tampilkan avatar
    displayAvatar();
  };
  reader.readAsDataURL(file);
}

// Fungsi untuk menampilkan avatar
function displayAvatar() {
  const username = localStorage.getItem("loginUser");
  if (!username) return;

  const userData = JSON.parse(localStorage.getItem("userData") || "{}");
  const avatarData = userData[username]?.avatar;

  // Update avatar di panel profil
  const panelAvatarElement = document.getElementById("userAvatar");
  panelAvatarElement.innerHTML = ""; // Clear previous content

  if (avatarData) {
    // Tampilkan foto yang sudah diupload
    panelAvatarElement.innerHTML = `<img src="${avatarData}" alt="Profile Photo">`;
  } else {
    // Tampilkan icon default jika belum ada foto
    panelAvatarElement.innerHTML = `<i class="fas fa-user-circle" id="avatarIcon"></i>`;
  }

  // Tambahkan icon kamera untuk upload
  panelAvatarElement.innerHTML += `
    <div class="avatar-upload-icon">
      <i class="fas fa-camera"></i>
    </div>
  `;

  // Update avatar di authbar
  const authBarAvatarElement = document.getElementById("authBarAvatar");
  if (avatarData) {
    authBarAvatarElement.innerHTML = `<img src="${avatarData}" alt="Profile Photo">`;
  } else {
    authBarAvatarElement.innerHTML = `<i class="fas fa-user-circle" id="authBarAvatarIcon"></i>`;
  }

  // Set event listener untuk upload
  panelAvatarElement.onclick = function () {
    document.getElementById("avatarInput").click();
  };
}

// Fungsi untuk menghapus avatar
function hapusAvatar() {
  const username = localStorage.getItem("loginUser");
  if (!username) return;

  if (confirm("Apakah Anda yakin ingin menghapus foto profil?")) {
    let userData = JSON.parse(localStorage.getItem("userData") || "{}");

    if (userData[username]) {
      delete userData[username].avatar;
      localStorage.setItem("userData", JSON.stringify(userData));
    }

    displayAvatar();
    showMessage("Sukses", "Foto berhasil di hapus!", "success");
  }
}

// Tambahkan fungsi ini dan panggil saat halaman dimuat
function updateStokProduk() {
  document.querySelectorAll(".produk-item").forEach((produk) => {
    const stok = parseInt(produk.dataset.stok);
    if (stok <= 0) {
      produk.classList.add("stok-habis");

      // Nonaktifkan tombol
      const btnCart = produk.querySelector(".btn-cart");
      const btnBeli = produk.querySelector(".btn-beli");
      if (btnCart) btnCart.disabled = true;
      if (btnBeli) btnBeli.disabled = true;
    }
  });
}

// Panggil fungsi saat halaman dimuat
document.addEventListener("DOMContentLoaded", function () {
  updateStokProduk();
  cekStatusToko();
  updateAuthStatus();
});

function tampilkanSpesifikasi(id) {
  const data = dataSpesifikasi[id];
  const konten = document.getElementById("kontenSpesifikasi");
  if (!data) {
    konten.innerHTML = "Spesifikasi tidak tersedia.";
    return;
  }

  let html = "";
  data.forEach((item, i) => {
    html += `
      <button class="accordion">${item.judul}</button>
      <div class="panel"><p>${item.isi}</p></div>
    `;
  });

  konten.innerHTML = html;
  document.getElementById("modalSpesifikasi").style.display = "flex";
  aktifkanAccordion();
}

function aktifkanAccordion() {
  const acc = document.querySelectorAll(".accordion");
  acc.forEach((btn) => {
    btn.addEventListener("click", function () {
      this.classList.toggle("active");
      const panel = this.nextElementSibling;
      if (panel.style.display === "block") {
        panel.style.display = "none";
      } else {
        panel.style.display = "block";
      }
    });
  });
}

function tutupSpesifikasi() {
  document.getElementById("modalSpesifikasi").style.display = "none";
}

// Tutup modal spesifikasi saat klik di luar kotak
document
  .getElementById("modalSpesifikasi")
  .addEventListener("click", function (e) {
    if (e.target === this) {
      this.style.display = "none";
    }
  });

function tambahKeKeranjang(btn) {
  if (!localStorage.getItem("loginUser")) {
    showMessage("Info", "Silahkan login terlebih dahulu.", "info");
    return;
  }
  const produk = btn.closest(".produk-item");
  const id = produk.dataset.id;
  const nama = produk.dataset.nama;
  const harga = parseInt(produk.dataset.harga);
  const stok = parseInt(produk.dataset.stok);
  const gambar = produk.querySelector("img").src;

  if (!keranjang[id]) {
    let warnaDefault = "";
    let gambarDefault = gambar;
    if (dataThumbnail[id]) {
      const warnaPutih = dataThumbnail[id].find((th) => th.warna === "Putih");
      if (warnaPutih) {
        warnaDefault = "Putih";
        gambarDefault = warnaPutih.gambar;
      }
    }
    keranjang[id] = {
      nama,
      harga,
      jumlah: 0,
      gambar: gambarDefault,
      warna: warnaDefault,
      stok,
      dipilih: false,
    };
  }

  function tampilkanNotifikasi() {
    const notif = document.getElementById("notifikasi");
    notif.classList.add("tampil");
    setTimeout(() => {
      notif.classList.remove("tampil");
    }, 2500); // Hilang setelah 2.5 detik
  }

  if (keranjang[id].jumlah < stok) {
    keranjang[id].jumlah++;
    tampilkanNotifikasi();
    simpanKeranjang(); // 🔥 simpan setelah update
  } else {
    showMessage("Peringatan", "Jumlah melebihi stok!", "warning");
  }
  updateBadge();
  
}

function updateBadge() {
  const badge = document.getElementById("badge");
  const total = Object.values(keranjang).reduce(
    (sum, item) => sum + item.jumlah,
    0
  );
  badge.innerText = total;
  badge.style.display = total > 0 ? "inline-block" : "none";
}

function tampilkanModal() {
  const daftar = document.getElementById("daftarKeranjang");
  daftar.innerHTML = "";
  let adaItem = false;
  for (const id in keranjang) {
    adaItem = true;
    const item = keranjang[id];
    const subtotal = item.jumlah * item.harga;

    const thumbnailHTML =
      dataThumbnail[id]
        ?.map((th) => {
          const selected = th.warna === item.warna ? "selected-thumbnail" : "";
          return `
    <div onclick="gantiThumbnail('${id}', '${th.gambar}', '${th.warna}')" class="${selected}">
      <img src="${th.gambar}" />
      <div>${th.warna}</div>
    </div>
  `;
        })
        .join("") || "";

    const warnaHTML = item.warna
      ? `<p class="textThumbnail" id="warna-${id}" style="margin-top:8px;">Keterangan: ${item.warna}</p>`
      : "";
    daftar.innerHTML += `
      <label style="display: flex; align-items: center; gap: 4px;">
  <input type="checkbox" onchange="togglePilih('${id}', this.checked)" ${
      item.dipilih ? "checked" : ""
    } />
  Pilih
</label>

 <div class="gambarBeli" style="text-align:center;"> 
   
          <img class="gambarBeli" id="gambarUtama-${id}" src="${
      item.gambar
    }" />  
   <div class="thumbnail">

          <div class="thumbnail-wrapper">${thumbnailHTML}</div></div>
   
   <div class="warna" style="text-align:center">
          ${warnaHTML}
        </div>
 <button class="lihatDetilCart" a href="javascript:void(0)" onclick="tampilkanSpesifikasi('${id}')" style="color:#007bff; text-decoration:none; padding:2px; margin:10px; padding:5px 10px;">Lihat Detil</button>  
    
        <div class="produkCart" style="text-align:center;">
          <p><strong>${item.nama}</strong></p>

          <p style="font-weight:bold; margin:10px;">Harga : Rp ${item.harga.toLocaleString()}</p>
          <div>
   
   
            <button style="padding:5px 10px;" onclick="ubahJumlah('${id}', -1)">-</button>

            <span>${item.jumlah}</span>

            <button style="padding:5px 10px;" onclick="ubahJumlah('${id}', 1)">+</button>
    
   </div>
          <p class="total-merah">Subtotal: Rp ${subtotal.toLocaleString()}</p>
        </div>
      </div>
 
    `;
  }

  // Tampilkan checkbox "Pilih Semua" hanya jika ada item
  const wrapper = document.getElementById("pilihSemuaWrapper");
  wrapper.style.display = adaItem ? "block" : "none";

  // Update status centang jika semua item sudah dipilih
  if (adaItem) {
    const semuaDipilih = Object.values(keranjang).every((item) => item.dipilih);
    document.getElementById("checkboxPilihSemua").checked = semuaDipilih;
  }
  document.getElementById("keranjangKosong").style.display = adaItem
    ? "none"
    : "block";
  document.getElementById("formCheckout").style.display = adaItem
    ? "block"
    : "none";
  document.getElementById("formCheckout").style.display = adaItem
    ? "block"
    : "none";
  updateTotalTerpilih();
  document.getElementById("modalCart").style.display = "flex";
}

function togglePilih(id, status) {
  if (keranjang[id]) {
    keranjang[id].dipilih = status;
  }
  updateTotalTerpilih();
}

function toggleSemuaPilihan(checkbox) {
  const status = checkbox.checked;
  for (const id in keranjang) {
    keranjang[id].dipilih = status;
  }
  tampilkanModal(); // Refresh isi modal supaya semua checkbox produk ikut berubah
  const semuaDipilih =
    Object.keys(keranjang).length > 0 &&
    Object.values(keranjang).every((item) => item.dipilih);
  document.getElementById("checkboxPilihSemua").checked = semuaDipilih;
}

function updateTotalTerpilih() {
  let total = 0;
  for (const id in keranjang) {
    if (keranjang[id].dipilih) {
      total += keranjang[id].harga * keranjang[id].jumlah;
    }
  }
  document.getElementById("totalTerpilih").innerText =
    total > 0 ? `Total Bayar Dipilih: Rp ${total.toLocaleString()}` : "";
}

function ubahJumlah(id, delta) {
  const item = keranjang[id];
  item.jumlah += delta;
  if (item.jumlah <= 0) delete keranjang[id];
  else if (item.jumlah > item.stok) {
    item.jumlah = item.stok;
    showMessage("Peringatan", "Jumlah melebihi stok!", "warning");
  }
  tampilkanModal();
  updateBadge();
  simpanKeranjang(); // 🔥 simpan setelah perubahan
}


function gantiThumbnail(id, gambar, warna) {
  document.getElementById(`gambarUtama-${id}`).src = gambar;
  keranjang[id].gambar = gambar;
  keranjang[id].warna = warna;
  document.getElementById(`warna-${id}`).innerText = `Keterangan: ${warna}`;

  // Hapus semua highlight thumbnail
  const thumbnailDivs = document.querySelectorAll(
    `#daftarKeranjang [onclick*="gantiThumbnail('${id}'"]`
  );
  thumbnailDivs.forEach((div) => div.classList.remove("selected-thumbnail"));

  // Tambahkan highlight ke yang dipilih
  thumbnailDivs.forEach((div) => {
    if (div.innerText.trim() === warna) {
      div.classList.add("selected-thumbnail");
    }
  });
}

function checkout() {
  const nama = document.getElementById("nama").value.trim();
  const telepon = document.getElementById("telepon").value.trim();
  const alamat = document.getElementById("alamat").value.trim();

  if (!nama || !telepon || !alamat) {
    showMessage("Info", "Lengkapi semua data terlebih dahulu.", "info");
    return;
  }

  let pesan = `Halo! Saya ingin memesan:\nNama: ${nama}\nTelepon: ${telepon}\nAlamat: ${alamat}\n\nPesanan:\n`;
  let total = 0;
  let adaProduk = false;

  // Buat array dari item yang dipilih untuk dihapus nanti
  const itemsToRemove = [];

  for (const id in keranjang) {
    const item = keranjang[id];
    if (item.dipilih) {
      const subtotal = item.harga * item.jumlah;
      pesan += `- ${item.nama} (${
        item.jumlah
      }x Rp ${item.harga.toLocaleString()}) = Rp ${subtotal.toLocaleString()}`;
      if (item.warna) pesan += ` (Warna: ${item.warna})`;
      pesan += "\n";
      total += subtotal;
      adaProduk = true;
      itemsToRemove.push(id);
    }
  }

  if (!adaProduk) {
    showMessage(
      "Info",
      "Pilih atau cetang produk yang di akan checkout.",
      "info"
    );
    return;
  }

  pesan += `\nTotal Bayar: Rp${total.toLocaleString()}`;
  const url = `https://wa.me/6287781935781?text=${encodeURIComponent(pesan)}`;
  window.open(url, "_blank");

// Hapus item yang sudah dipilih dari keranjang
itemsToRemove.forEach((id) => {
  delete keranjang[id];
});
simpanKeranjang(); // 🔥 simpan setelah checkout


  // Kosongkan formulir
  document.getElementById("nama").value = "";
  document.getElementById("telepon").value = "";
  document.getElementById("alamat").value = "";

  // Perbarui tampilan keranjang
  updateBadge();
  tampilkanModal();

  // Tampilkan notifikasi
  const notif = document.getElementById("notifikasi");
  notif.innerText = "Pesanan berhasil diproses!";
  notif.classList.add("tampil");
  setTimeout(() => {
    notif.classList.remove("tampil");
  }, 3000);
}

let produkBeli = null;

function beliSekarang(btn) {
  if (!localStorage.getItem("loginUser")) {
    showMessage("Info", "Silahkan login terlebih dahulu.", "info");
    return;
  }

  const produk = btn.closest(".produk-item");
  const id = produk.dataset.id;
  const nama = produk.dataset.nama;
  const harga = parseInt(produk.dataset.harga);
  const stok = parseInt(produk.dataset.stok);
  const gambar = produk.querySelector("img").src;

  if (stok <= 0) {
    showMessage("Info", "Stok habis.", "info");
    return;
  }

  produkBeli = { id, nama, harga, jumlah: 1, gambar, warna: "", stok };

  // Tetapkan warna default jika tersedia
  if (dataThumbnail[id]) {
    const warnaPutih = dataThumbnail[id].find((th) => th.warna === "Putih");
    if (warnaPutih) {
      produkBeli.warna = "Putih";
      produkBeli.gambar = warnaPutih.gambar;
    }
  }

  const thumbnailHTML =
    dataThumbnail[id]
      ?.map((th) => {
        const selectedClass =
          th.warna === produkBeli.warna ? "selected-thumbnail" : "";
        return `
    <div onclick="pilihWarnaBeli('${th.gambar}', '${th.warna}')" class="${selectedClass}" style="text-align:center; cursor:pointer;">
      <img class="thumbnailBeli" src="${th.gambar}" style="width:30px; height:30px; border-radius:4px; border:2px solid #ccc;" />
      <div >${th.warna}</div>
    </div>
  `;
      })
      .join("") || "";

  const detailDiv = document.getElementById("detailBeli");
  detailDiv.innerHTML = `
  <div style="text-align:center;">
    <img id="gambarBeli" src="${
      produkBeli.gambar
    }" style="object-fit:cover; border-radius:8px; margin-bottom:5px; width:150px;" />
  </div>

  <div class="thumbnail-wrapper" style="justify-content:center; margin-bottom:5px;">
    ${thumbnailHTML}
  </div>

  <p class="textThumbnail" id="infoWarnaBeli" style="text-align:center; margin: 5px 0;">
    ${produkBeli.warna ? `Keterangan: ${produkBeli.warna}` : ""}
  </p>

  <div class="produkBeli" style="text-align:center;">
    <p><strong>${nama}</strong></p>

    <button class="lihatDetil" onclick="tampilkanSpesifikasi('${id}')" style="color:#007bff; text-decoration:none; padding:5px; margin:10px;">
      Lihat Detil
    </button>

    <p style="margin:5px;"><strong>Harga : Rp ${harga.toLocaleString()}</strong></p>
     
    <div>
      <button style="padding:5px 10px;" onclick="ubahJumlahBeli(-1)">−</button>

      <span id="jumlahBeli">${produkBeli.jumlah}</span>

      <button style="padding:5px 10px;" onclick="ubahJumlahBeli(1)">+</button>
    </div>
   
    <p class="total-merah" >Total: <span id="totalBeli">Rp ${harga.toLocaleString()}</span></p>
   
  </div>
`;

  document.getElementById("modalBeli").style.display = "flex";
}

function pilihWarnaBeli(gambar, warna) {
  document.getElementById("gambarBeli").src = gambar;
  produkBeli.gambar = gambar;
  produkBeli.warna = warna;
  document.getElementById("infoWarnaBeli").innerText = `Keterangan: ${warna}`;

  // Hapus semua highlight
  document
    .querySelectorAll("#detailBeli .thumbnail-wrapper div")
    .forEach((div) => {
      div.classList.remove("selected-thumbnail");
      if (div.innerText.trim() === warna)
        div.classList.add("selected-thumbnail");
    });
}

function ubahJumlahBeli(delta) {
  const max = produkBeli.stok;
  produkBeli.jumlah += delta;

  if (produkBeli.jumlah < 1) produkBeli.jumlah = 1;
  if (produkBeli.jumlah > max) {
    produkBeli.jumlah = max;
    showMessage("Peringatan", "Jumlah melebihi stok!", "warning");
  }
  document.getElementById("jumlahBeli").innerText = produkBeli.jumlah;
  const total = produkBeli.harga * produkBeli.jumlah;
  document.getElementById(
    "totalBeli"
  ).innerText = `Rp ${total.toLocaleString()}`;
}

function prosesBeli() {
  const nama = document.getElementById("namaBeli").value.trim();
  const telepon = document.getElementById("teleponBeli").value.trim();
  const alamat = document.getElementById("alamatBeli").value.trim();

  if (!nama || !telepon || !alamat) {
    showMessage("Info", "Lengkapi semua data terlebih dahulu.", "info");
    return;
  }

  const item = produkBeli;
  const subtotal = item.harga * item.jumlah;

  let pesan = `Halo! Saya ingin memesan:\nNama: ${nama}\nTelepon: ${telepon}\nAlamat: ${alamat}\n\n`;
  pesan += `Pesanan:\n- ${item.nama} (${
    item.jumlah
  }x Rp ${item.harga.toLocaleString()}) = Rp ${subtotal.toLocaleString()}`;
  if (item.warna) pesan += ` (Warna: ${item.warna})`;
  pesan += `\n\nTotal Bayar: Rp${subtotal.toLocaleString()}`;

  const url = `https://wa.me/6287781935781?text=${encodeURIComponent(pesan)}`;
  window.open(url, "_blank");

  // Kosongkan formulir beli sekarang
  document.getElementById("namaBeli").value = "";
  document.getElementById("teleponBeli").value = "";
  document.getElementById("alamatBeli").value = "";

  // Tutup modal beli sekarang
  document.getElementById("modalBeli").style.display = "none";

  // Tampilkan notifikasi
  const notif = document.getElementById("notifikasi");
  notif.innerText = "Pesanan berhasil diproses!";
  notif.classList.add("tampil");
  setTimeout(() => {
    notif.classList.remove("tampil");
  }, 3000);
}

const bukaNonStop = false; // Ganti true jika ingin buka 24 jam
const jamBuka = 12; // 07.00
const jamTutup = 21; // 21.00

function cekJamToko() {
  const sekarang = new Date();
  const jam = sekarang.getHours();

  const buka = bukaNonStop || (jam >= jamBuka && jam < jamTutup);

  const notifikasi = document.getElementById("notifikasiToko");
  const tombolBeli = document.querySelectorAll(".btn-beli");
  const tombolKeranjang = document.querySelectorAll(".btn-cart");
  const tombolCheckout = document.getElementById("btnCart");

  if (buka) {
    if (notifikasi) notifikasi.style.display = "none";
    tombolBeli.forEach((btn) => (btn.disabled = false));
    tombolKeranjang.forEach((btn) => (btn.disabled = false));
    if (tombolCheckout) tombolCheckout.disabled = false;
  } else {
    if (notifikasi) notifikasi.style.display = "block";
    tombolBeli.forEach((btn) => (btn.disabled = true));
    tombolKeranjang.forEach((btn) => (btn.disabled = true));
    if (tombolCheckout) tombolCheckout.disabled = true;
  }
}
window.onload = cekJamToko;
setInterval(cekJamToko, 60000); // cek setiap 60 detik

                       
function checkoutQR() {
  const nama = document.getElementById('nama').value.trim();
  const telepon = document.getElementById('telepon').value.trim();
  const alamat = document.getElementById('alamat').value.trim();
  
  if (!nama || !telepon || !alamat) {
    showMessage("Info", "Lengkapi semua data terlebih dahulu.", "info");
    return;
  }

  let pesan = `Halo! Saya ingin memesan:\nNama: ${nama}\nTelepon: ${telepon}\nAlamat: ${alamat}\n\nPesanan:\n`;
  let total = 0;
  let adaProduk = false;
  const itemsToRemove = [];

  for (const id in keranjang) {
    const item = keranjang[id];
    if (item.dipilih) {
      const subtotal = item.harga * item.jumlah;
      pesan += `- ${item.nama} (${item.jumlah}x Rp ${item.harga.toLocaleString()}) = Rp ${subtotal.toLocaleString()}`;
      if (item.warna) pesan += ` (Warna: ${item.warna})`;
      pesan += '\n';
      total += subtotal;
      adaProduk = true;
      itemsToRemove.push(id);
    }
  }

  if (!adaProduk) {
    showMessage("Info", "Pilih atau centang produk yang akan di checkout.", "info");
    return;
  }

  pesan += `\nTotal Bayar: Rp${total.toLocaleString()}`;
  const urlEncoded = encodeURIComponent(`https://wa.me/6287781935781?text=${pesan}`);
  const qrURL = `https://api.qrserver.com/v1/create-qr-code/?data=${urlEncoded}&size=250x250`;

  // Hapus item yang sudah dipilih dari keranjang
  itemsToRemove.forEach(id => {
    delete keranjang[id];
  });

  // Kosongkan formulir
  document.getElementById('nama').value = '';
  document.getElementById('telepon').value = '';
  document.getElementById('alamat').value = '';

  // Perbarui tampilan
  updateBadge();
  
  // Tampilkan modal QR
  tampilkanModalQR(qrURL);
}

function checkoutBeliQR() {
  const nama = document.getElementById('namaBeli').value.trim();
  const telepon = document.getElementById('teleponBeli').value.trim();
  const alamat = document.getElementById('alamatBeli').value.trim();
  
  if (!nama || !telepon || !alamat) {
    showMessage("Info", "Lengkapi semua data terlebih dahulu.", "info");
    return;
  }

  const item = produkBeli;
  const subtotal = item.harga * item.jumlah;
  
  let pesan = `Halo! Saya ingin memesan:\nNama: ${nama}\nTelepon: ${telepon}\nAlamat: ${alamat}\n\n`;
  pesan += `Pesanan:\n- ${item.nama} (${item.jumlah}x Rp ${item.harga.toLocaleString()}) = Rp ${subtotal.toLocaleString()}`;
  if (item.warna) pesan += ` (Warna: ${item.warna})`;
  pesan += `\n\nTotal Bayar: Rp${subtotal.toLocaleString()}`;

  const urlEncoded = encodeURIComponent(`https://wa.me/6287781935781?text=${pesan}`);
  const qrURL = `https://api.qrserver.com/v1/create-qr-code/?data=${urlEncoded}&size=250x250`;

  // Kosongkan formulir
  document.getElementById('namaBeli').value = '';
  document.getElementById('teleponBeli').value = '';
  document.getElementById('alamatBeli').value = '';

  // Tampilkan modal QR
  tampilkanModalQR(qrURL);
}

















