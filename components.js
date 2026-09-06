// components.js
// ============================================
// সব পেজে নেভবার + ফুটার + ফ্লোটিং বাটন ১০০% কাজ করবে + লগইন বাটন সঠিক দেখাবে
// ============================================

console.log('✅ components.js লোড হয়েছে!');

// ====================== NAVBAR ======================
export function loadNavbar(currentPage = 'index') {
  console.log('✅ loadNavbar চলছে, currentPage:', currentPage);
  
  const navbarHTML = `
    <nav class="bg-white shadow-lg sticky top-0 z-50">
      <div class="container mx-auto px-4 sm:px-6 py-4 flex justify-between items-center flex-wrap gap-3">
        <a href="index.html" class="flex items-center gap-2 sm:gap-3">
          <img src="https://res.cloudinary.com/zmoyykj7/image/upload/v1788432073/v2am9blsmmmcul9nycyz.png" alt="ইজি নামজারি" class="h-9 sm:h-11" />
          <span class="text-xl sm:text-3xl font-bold text-[#0b2b4a]">Easy <span class="text-[#1e40af]">Namjari</span></span>
        </a>
        <div class="flex items-center gap-3 sm:gap-6 text-sm sm:text-lg flex-wrap">
          <a href="index.html" class="nav-link text-gray-700 font-medium ${currentPage === 'index' ? 'text-[#1e40af]' : ''}">হোম</a>
          <a href="profile.html" class="nav-link text-gray-700 font-medium ${currentPage === 'profile' ? 'text-[#1e40af]' : ''}">প্রোফাইল</a>
          <a href="contact.html" class="nav-link text-gray-700 font-medium ${currentPage === 'contact' ? 'text-[#1e40af]' : ''}">যোগাযোগ</a>
          
          <a href="#" id="authBtn" class="bg-[#0b2b4a] text-white px-4 sm:px-7 py-2 sm:py-3 rounded-2xl font-semibold flex items-center gap-1 sm:gap-2 hover:bg-[#1e40af] transition text-sm sm:text-base">
            <i class="fas fa-sign-in-alt"></i> <span class="hidden xs:inline">লগইন</span>
          </a>
        </div>
      </div>
    </nav>
  `;

  const existingNav = document.querySelector('nav.bg-white.shadow-lg');
  if (existingNav) {
    existingNav.outerHTML = navbarHTML;
  } else {
    document.body.insertAdjacentHTML('afterbegin', navbarHTML);
  }

  // ====================== লগইন বাটন আপডেট (সবচেয়ে গুরুত্বপূর্ণ) ======================
  window.updateAuthUI = function(user = null) {
    const btn = document.getElementById('authBtn');
    if (!btn) return;

    if (user) {
      btn.innerHTML = `<i class="fas fa-user-circle"></i> <span class="hidden xs:inline">প্রোফাইল</span>`;
      btn.href = 'profile.html';
    } else {
      btn.innerHTML = `<i class="fas fa-sign-in-alt"></i> <span class="hidden xs:inline">লগইন</span>`;
      btn.href = 'auth.html';
    }
  };

  // প্রথমবার চালু করা (আগে থেকে লগইন থাকলেও কাজ করবে)
  window.updateAuthUI();
}

// ====================== FOOTER ======================
export function loadFooter() {
  console.log('✅ loadFooter চলছে');
  
  const footerHTML = `
    <footer class="bg-[#0b2b4a] text-white py-10 sm:py-12">
      <div class="container mx-auto px-4 sm:px-6">
        <div class="grid sm:grid-cols-3 gap-8 text-center sm:text-left">
          <div>
            <div class="text-2xl sm:text-3xl font-bold">ইজি <span class="text-[#60a5fa]">নামজারি</span></div>
            <p class="text-gray-400 text-sm sm:text-base mt-2"><i class="fas fa-map-marker-alt mr-2"></i> সাভার উপজেলা ভূমি অফিসের পাশে</p>
            <p class="text-gray-400 text-sm sm:text-base"><i class="fas fa-phone mr-2"></i> ০১৩৫০১৪১৭৬২</p>
            <p class="text-gray-400 text-sm sm:text-base"><i class="fas fa-envelope mr-2"></i> nopqrshov337@gmail.com</p>
          </div>
          <div>
            <h4 class="text-lg sm:text-xl font-bold mb-3 sm:mb-4">দ্রুত লিংক</h4>
            <ul class="space-y-2 text-sm sm:text-base">
              <li><a href="index.html" class="text-gray-400 hover:text-white transition">হোম</a></li>
              <li><a href="profile.html" class="text-gray-400 hover:text-white transition">প্রোফাইল</a></li>
              <li><a href="contact.html" class="text-gray-400 hover:text-white transition">যোগাযোগ</a></li>
            </ul>
          </div>
          <div>
            <h4 class="text-lg sm:text-xl font-bold mb-3 sm:mb-4">সেবাসমূহ</h4>
            <ul class="space-y-2 text-sm sm:text-base">
              <li><a href="#" class="text-gray-400 hover:text-white transition">ভূমি মিউটেশন</a></li>
              <li><a href="#" class="text-gray-400 hover:text-white transition">নামজারি আবেদন</a></li>
              <li><a href="#" class="text-gray-400 hover:text-white transition">DCR প্রাপ্তি</a></li>
            </ul>
          </div>
        </div>
        <div class="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 text-sm sm:text-base">
          © 2026 Easy Namjari | Managed by: <a href="https://codecurebd.vercel.app" target="_blank" class="text-[#60a5fa] hover:underline font-semibold">CodeCureBD</a> | All Rights Reserved.
        </div>
      </div>
    </footer>
  `;

  const existingFooter = document.querySelector('footer.bg-[#0b2b4a]');
  if (existingFooter) {
    existingFooter.outerHTML = footerHTML;
  } else {
    document.body.insertAdjacentHTML('beforeend', footerHTML);
  }
}

// ====================== FLOATING BUTTONS ======================
export function loadFloatingButtons() {
  console.log('✅ loadFloatingButtons চলছে');
  
  const floatingHTML = `
    <div class="fixed bottom-6 sm:bottom-8 right-4 sm:right-8 flex flex-col gap-3 sm:gap-4 z-50" id="floatingButtons">
      <a href="tel:01350141762" class="floating-btn bg-[#0b2b4a] text-white p-3 sm:p-4 rounded-full shadow-2xl hover:bg-[#1e40af] transition flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16">
        <i class="fas fa-phone text-2xl sm:text-3xl"></i>
      </a>
      <a href="https://wa.me/8801350141762" class="floating-btn bg-green-500 text-white p-3 sm:p-4 rounded-full shadow-2xl hover:bg-green-600 transition flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16">
        <i class="fab fa-whatsapp text-2xl sm:text-3xl"></i>
      </a>
    </div>
  `;

  if (!document.getElementById('floating-style')) {
    const style = document.createElement('style');
    style.id = 'floating-style';
    style.textContent = `
      .floating-btn { transition: all 0.3s ease; box-shadow: 0 8px 32px rgba(0,0,0,0.2); }
      .floating-btn:hover { transform: scale(1.1); }
    `;
    document.head.appendChild(style);
  }

  const existing = document.getElementById('floatingButtons');
  if (existing) {
    existing.outerHTML = floatingHTML;
  } else {
    document.body.insertAdjacentHTML('beforeend', floatingHTML);
  }
}

// ====================== সব কম্পোনেন্ট লোড ======================
export function loadAllComponents(currentPage = 'index') {
  console.log('✅ loadAllComponents চলছে, currentPage:', currentPage);
  loadNavbar(currentPage);
  loadFooter();
  loadFloatingButtons();
  console.log('✅ সব কম্পোনেন্ট লোড সম্পন্ন!');
}