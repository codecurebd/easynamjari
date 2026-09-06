// components.js
// ============================================
// এই ফাইলটি সব পেজে কমন এলিমেন্ট (নেভবার, ফুটার, ফ্লোটিং বাটন) 
// ডাইনামিকভাবে লোড করে এবং SPA-র মতো নেভিগেশন সাপোর্ট করে।
// ব্যবহার: প্রতিটি HTML পেজে <script type="module"> এর ভেতর 
// import { loadAllComponents, navigateTo, initRouter } from './components.js';
// ============================================

/**
 * ===== SPA রাউটিং ফাংশন =====
 */

// কন্টেন্ট কন্টেইনার আইডি (প্রতিটি পেজে এই আইডি থাকতে হবে)
const CONTENT_ID = 'page-content';

// বর্তমান পেজের নাম (URL থেকে বের করা)
function getCurrentPage() {
  const path = window.location.pathname;
  const page = path.split('/').pop().replace('.html', '') || 'index';
  return page;
}

// পেজ কন্টেন্ট লোড করা (AJAX)
export async function loadPage(page) {
  try {
    const response = await fetch(page + '.html');
    if (!response.ok) throw new Error('Page not found');
    const html = await response.text();
    
    // HTML থেকে শুধু #page-content অংশ বের করা
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const content = doc.getElementById(CONTENT_ID);
    
    if (!content) {
      // যদি #page-content না থাকে, পুরো body নাও (backup)
      const bodyContent = doc.body.innerHTML;
      document.getElementById(CONTENT_ID).innerHTML = bodyContent;
    } else {
      document.getElementById(CONTENT_ID).innerHTML = content.innerHTML;
    }

    // পেজ লোড হওয়ার পর স্ক্রল টু টপ
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // অ্যাক্টিভ লিংক আপডেট করা
    updateActiveLink(page);

    return true;
  } catch (error) {
    console.error('Error loading page:', error);
    // 404 পেজ দেখানো (ঐচ্ছিক)
    document.getElementById(CONTENT_ID).innerHTML = `
      <div class="container mx-auto px-4 py-20 text-center">
        <i class="fas fa-exclamation-triangle text-6xl text-red-500 mb-4"></i>
        <h2 class="text-3xl font-bold text-[#0b2b4a]">পেজ খুঁজে পাওয়া যায়নি</h2>
        <p class="text-gray-600 mt-2">আপনি যে পেজটি খুঁজছেন তা নেই।</p>
        <a href="index.html" class="inline-block mt-6 bg-[#0b2b4a] text-white px-6 py-3 rounded-xl hover:bg-[#1e40af] transition">হোমে যান</a>
      </div>
    `;
    return false;
  }
}

// নেভিগেট করা (URL আপডেট + কন্টেন্ট লোড)
export function navigateTo(page) {
  // যদি একই পেজে থাকি, কিছু করো না
  if (page === getCurrentPage()) return;

  // URL আপডেট (history push)
  const url = page + '.html';
  history.pushState({ page }, '', url);

  // কন্টেন্ট লোড
  loadPage(page);
}

// অ্যাক্টিভ লিংক আপডেট করা
function updateActiveLink(page) {
  document.querySelectorAll('.nav-link').forEach(link => {
    const linkPage = link.getAttribute('data-page');
    if (linkPage === page) {
      link.classList.add('text-[#1e40af]');
      link.classList.remove('text-gray-700');
    } else {
      link.classList.remove('text-[#1e40af]');
      link.classList.add('text-gray-700');
    }
  });
}

// ব্রাউজারের ব্যাক/ফরওয়ার্ড বাটন হ্যান্ডেল করা
export function initRouter() {
  window.addEventListener('popstate', (event) => {
    const page = event.state?.page || getCurrentPage();
    loadPage(page);
  });

  // পেজ লোডের সময় বর্তমান URL অনুযায়ী কন্টেন্ট লোড (যদি index না হয়)
  const currentPage = getCurrentPage();
  if (currentPage !== 'index') {
    // index পেজে ডিফল্ট কন্টেন্ট থাকবে, অন্য পেজে লোড করতে হবে
    loadPage(currentPage);
  }

  // নেভবারের লিংকগুলোতে ক্লিক হ্যান্ডলার যোগ করা (ডেলিগেশন)
  document.addEventListener('click', (e) => {
    const link = e.target.closest('.nav-link[data-page]');
    if (link) {
      e.preventDefault();
      const page = link.getAttribute('data-page');
      navigateTo(page);
    }
  });
}

/**
 * ===== নেভবার লোড =====
 * @param {string} currentPage - বর্তমান পেজের নাম
 */
export function loadNavbar(currentPage = 'index') {
  const navbarHTML = `
    <nav class="bg-white shadow-lg sticky top-0 z-50">
      <div class="container mx-auto px-4 sm:px-6 py-4 flex justify-between items-center flex-wrap gap-3">
        <a href="index.html" class="flex items-center gap-2 sm:gap-3">
          <img src="https://res.cloudinary.com/zmoyykj7/image/upload/v1788432073/v2am9blsmmmcul9nycyz.png" alt="ইজি নামজারি" class="h-9 sm:h-11" />
          <span class="text-xl sm:text-3xl font-bold text-[#0b2b4a]">Easy <span class="text-[#1e40af]">Namjari</span></span>
        </a>
        <div class="flex items-center gap-3 sm:gap-6 text-sm sm:text-lg flex-wrap">
          <a href="index.html" data-page="index" class="nav-link text-gray-700 font-medium ${currentPage === 'index' ? 'text-[#1e40af]' : ''}">হোম</a>
          <a href="profile.html" data-page="profile" class="nav-link text-gray-700 font-medium ${currentPage === 'profile' ? 'text-[#1e40af]' : ''}">প্রোফাইল</a>
          <a href="contact.html" data-page="contact" class="nav-link text-gray-700 font-medium ${currentPage === 'contact' ? 'text-[#1e40af]' : ''}">যোগাযোগ</a>
          <a href="auth.html" data-page="auth" class="bg-[#0b2b4a] text-white px-4 sm:px-7 py-2 sm:py-3 rounded-2xl font-semibold flex items-center gap-1 sm:gap-2 hover:bg-[#1e40af] transition text-sm sm:text-base">
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

  // নেভবার লিংক অ্যানিমেশন স্টাইল (যদি না থাকে)
  if (!document.getElementById('nav-style')) {
    const style = document.createElement('style');
    style.id = 'nav-style';
    style.textContent = `
      .nav-link { transition: all 0.3s ease; position: relative; }
      .nav-link::after { content: ''; position: absolute; bottom: -4px; left: 0; width: 0; height: 2px; background: #1e40af; transition: width 0.3s ease; }
      .nav-link:hover::after { width: 100%; }
      .nav-link:hover { color: #1e40af; }
      .nav-link.text-\\[\\#1e40af\\]::after { width: 100%; }
    `;
    document.head.appendChild(style);
  }
}

/**
 * ===== ফুটার লোড =====
 */
export function loadFooter() {
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

  const existingFooter = document.querySelector('footer.bg-\\[\\#0b2b4a\\]');
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

/**
 * ===== সব কম্পোনেন্ট লোড + রাউটার ইনিশিয়ালাইজ =====
 * @param {string} currentPage - বর্তমান পেজের নাম
 */
export function loadAllComponents(currentPage = 'index') {
  loadNavbar(currentPage);
  loadFooter();
  loadFloatingButtons();
  initRouter(); // SPA রাউটার চালু
}