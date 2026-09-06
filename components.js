// components.js
// ============================================
// এই ফাইলটি সব পেজে কমন এলিমেন্ট (নেভবার, ফুটার, ফ্লোটিং বাটন) 
// ডাইনামিকভাবে লোড করে।
// ============================================

console.log('✅ components.js লোড হয়েছে!');

/**
 * ===== নেভবার লোড (UPGRADED) =====
 * @param {string} currentPage - বর্তমান পেজের নাম
 */
export function loadNavbar(currentPage = 'index') {
  console.log('✅ loadNavbar চলছে, currentPage:', currentPage);
  
  const navbarHTML = `
    <nav class="bg-white shadow-lg sticky top-0 z-50">
      <div class="container mx-auto px-4 sm:px-6 py-4 flex justify-between items-center flex-wrap gap-3">
        <a href="index.html" class="flex items-center gap-2 sm:gap-3">
          <img src="https://res.cloudinary.com/zmoyykj7/image/upload/v1788432073/v2am9blsmmmcul9nycyz.png" alt="ইজি নামজারি" class="h-9 sm:h-11" />
          <span class="text-xl sm:text-3xl font-bold text-[#0b2b4a]">Easy <span class="text-[#1e40af]">Namjari</span></span>
        </a>

        <!-- Desktop Menu -->
        <div class="hidden md:flex items-center gap-3 sm:gap-6 text-sm sm:text-lg">
          <a href="index.html" class="nav-link text-gray-700 font-medium ${currentPage === 'index' ? 'text-[#1e40af]' : ''}">হোম</a>
          <a href="profile.html" class="nav-link text-gray-700 font-medium ${currentPage === 'profile' ? 'text-[#1e40af]' : ''}">প্রোফাইল</a>
          <a href="contact.html" class="nav-link text-gray-700 font-medium ${currentPage === 'contact' ? 'text-[#1e40af]' : ''}">যোগাযোগ</a>
        </div>

        <div class="flex items-center gap-3">
          <a href="auth.html" id="authLink" 
             class="bg-[#0b2b4a] text-white px-4 sm:px-7 py-2 sm:py-3 rounded-2xl font-semibold flex items-center gap-1 sm:gap-2 hover:bg-[#1e40af] transition text-sm sm:text-base">
            <i class="fas fa-sign-in-alt"></i> <span id="authText" class="hidden sm:inline">লগইন</span>
          </a>
          
          <a href="admin.html" id="adminLink" 
             class="hidden bg-[#1e40af] text-white px-4 sm:px-6 py-2 rounded-2xl font-semibold flex items-center gap-1 hover:bg-[#0f172a] transition">
            <i class="fas fa-cog"></i> অ্যাডমিন প্যানেল
          </a>
        </div>
      </div>

      <!-- Mobile Menu -->
      <div class="md:hidden bg-white border-t">
        <div class="px-4 py-3 flex flex-col gap-3 text-base">
          <a href="index.html" class="py-2">হোম</a>
          <a href="profile.html" class="py-2">প্রোফাইল</a>
          <a href="contact.html" class="py-2">যোগাযোগ</a>
          <a href="auth.html" id="mobileAuth" class="py-2">লগইন</a>
        </div>
      </div>
    </nav>
  `;

  // Remove old navbar and add new one
  const existingNav = document.querySelector('nav.bg-white.shadow-lg');
  if (existingNav) {
    existingNav.outerHTML = navbarHTML;
  } else {
    document.body.insertAdjacentHTML('afterbegin', navbarHTML);
  }

  // Add style if not exists
  if (!document.getElementById('nav-style')) {
    const style = document.createElement('style');
    style.id = 'nav-style';
    style.textContent = `
      .nav-link { transition: all 0.3s ease; position: relative; }
      .nav-link::after { content: ''; position: absolute; bottom: -4px; left: 0; width: 0; height: 2px; background: #1e40af; transition: width 0.3s ease; }
      .nav-link:hover::after { width: 100%; }
      .nav-link:hover { color: #1e40af; }
    `;
    document.head.appendChild(style);
  }

  // Update auth button text based on login status
  const checkAuth = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const authLink = document.getElementById('authLink');
    const authText = document.getElementById('authText');
    const adminLink = document.getElementById('adminLink');

    if (user) {
      authText.textContent = 'প্রোফাইল';
      authLink.href = 'profile.html';
      authLink.innerHTML = `<i class="fas fa-user-circle"></i> <span class="hidden sm:inline">প্রোফাইল</span>`;
      
      // Show admin link if user is admin
      if (user.userType === 'admin') {
        adminLink.classList.remove('hidden');
        adminLink.href = 'admin.html';
      } else {
        adminLink.classList.add('hidden');
      }
    } else {
      authText.textContent = 'লগইন';
      authLink.href = 'auth.html';
      authLink.innerHTML = `<i class="fas fa-sign-in-alt"></i> <span class="hidden sm:inline">লগইন</span>`;
      adminLink.classList.add('hidden');
    }
  };

  checkAuth();
  // Listen for storage change (for logout)
  window.addEventListener('storage', checkAuth);
}

/**
 * ===== ফুটার লোড =====
 */
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

  const existingFooter = document.querySelector('footer.bg-\\#0b2b4a');
  if (existingFooter) {
    existingFooter.outerHTML = footerHTML;
  } else {
    document.body.insertAdjacentHTML('beforeend', footerHTML);
  }
}

/**
 * ===== ফ্লোটিং কন্টাক্ট বাটন =====
 */
export function loadFloatingButtons() {
  console.log('✅ loadFloatingButtons চলছে');
  
  const floatingHTML = `
    <div class="fixed bottom-6 sm-bottom-8 right-4 sm:right-8 flex flex-col gap-3 sm:gap-4 z-50" id="floatingButtons">
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

/**
 * ===== সব কম্পোনেন্ট লোড =====
 */
export function loadAllComponents(currentPage = 'index') {
  console.log('✅ loadAllComponents চলছে, currentPage:', currentPage);
  loadNavbar(currentPage);
  loadFooter();
  loadFloatingButtons();
  console.log('✅ সব কম্পোনেন্ট লোড সম্পন্ন!');
}