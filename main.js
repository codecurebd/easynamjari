// main.js
// ============================================
// এই ফাইলটি সাইটের সব পেজে ব্যবহারযোগ্য সাধারণ ফাংশন, 
// ইউটিলিটি, ভ্যালিডেশন, নোটিফিকেশন ইত্যাদি ধারণ করে।
// ব্যবহার: প্রতিটি HTML পেজে <script type="module"> এর ভেতর 
// import { ... } from './main.js';
// ============================================

/**
 * ===== ইউটিলিটি ফাংশন =====
 */

// মোবাইল নম্বর ভ্যালিডেশন (বাংলাদেশ)
export function isValidPhone(phone) {
  const cleaned = phone.replace(/[^0-9]/g, '');
  // ১১ ডিজিট, ০১ দিয়ে শুরু
  return /^01[3-9]\d{8}$/.test(cleaned);
}

// ইমেইল ভ্যালিডেশন
export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// নাম ভ্যালিডেশন (২ অক্ষরের বেশি)
export function isValidName(name) {
  return name && name.trim().length >= 2;
}

// পাসওয়ার্ড ভ্যালিডেশন (৮+ অক্ষর)
export function isValidPassword(password) {
  return password && password.length >= 8;
}

// ফোন নম্বর ফরম্যাট করা (ক্লিন)
export function formatPhone(phone) {
  return phone.replace(/[^0-9]/g, '');
}

// তারিখ ফরম্যাট করা (DD-MM-YYYY)
export function formatDate(date) {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}-${month}-${year}`;
}

// কারেন্ট তারিখ ফেরত (DD-MM-YYYY)
export function getCurrentDate() {
  return formatDate(new Date());
}

// ট্রিম ও খালি চেক
export function isEmpty(str) {
  return !str || str.trim() === '';
}

// র‍্যান্ডম আইডি জেনারেটর (শুধু ক্লায়েন্ট সাইডের জন্য)
export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
}


/**
 * ===== UI ফাংশন =====
 */

// টোস্ট নোটিফিকেশন দেখানো
export function showToast(message, type = 'success', duration = 4000) {
  // আগের টোস্ট সরান
  const existing = document.querySelector('.custom-toast');
  if (existing) existing.remove();

  const colors = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    warning: 'bg-yellow-500',
    info: 'bg-blue-500'
  };

  const icons = {
    success: 'fa-check-circle',
    error: 'fa-exclamation-circle',
    warning: 'fa-exclamation-triangle',
    info: 'fa-info-circle'
  };

  const toast = document.createElement('div');
  toast.className = `custom-toast fixed top-6 left-1/2 -translate-x-1/2 z-[9999] ${colors[type] || 'bg-blue-500'} text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 text-base sm:text-lg font-semibold transition-all duration-500 opacity-0 translate-y-[-20px]`;
  toast.innerHTML = `
    <i class="fas ${icons[type] || 'fa-info-circle'} text-xl"></i>
    <span>${message}</span>
  `;
  document.body.appendChild(toast);

  // অ্যানিমেশন শো
  requestAnimationFrame(() => {
    toast.classList.remove('opacity-0', 'translate-y-[-20px]');
    toast.classList.add('opacity-100', 'translate-y-0');
  });

  // অটো হাইড
  setTimeout(() => {
    toast.classList.remove('opacity-100', 'translate-y-0');
    toast.classList.add('opacity-0', 'translate-y-[-20px]');
    setTimeout(() => toast.remove(), 500);
  }, duration);
}

// লোডিং স্পিনার দেখানো/লুকানো
export function showLoading(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  
  // আগের স্পিনার সরান
  const existing = container.querySelector('.custom-spinner');
  if (existing) existing.remove();

  const spinner = document.createElement('div');
  spinner.className = 'custom-spinner flex justify-center items-center py-8';
  spinner.innerHTML = `
    <div class="w-10 h-10 border-4 border-[#1e40af] border-t-transparent rounded-full animate-spin"></div>
    <span class="ml-3 text-gray-600 font-medium">লোড হচ্ছে...</span>
  `;
  container.appendChild(spinner);
}

export function hideLoading(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const spinner = container.querySelector('.custom-spinner');
  if (spinner) spinner.remove();
}

// পেজ রিডাইরেক্ট
export function redirectTo(url) {
  window.location.href = url;
}

// স্ক্রল টু টপ
export function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}


/**
 * ===== ফর্ম ভ্যালিডেশন হেলপার =====
 */

// ফর্ম ফিল্ড এরর দেখানো
export function showFieldError(inputId, errorId) {
  const input = document.getElementById(inputId);
  const error = document.getElementById(errorId);
  if (input) {
    input.classList.add('border-red-500', 'focus:border-red-500');
    input.classList.remove('border-gray-300');
  }
  if (error) {
    error.classList.remove('hidden');
    error.classList.add('show');
  }
}

// ফর্ম ফিল্ড এরর হাইড করা
export function hideFieldError(inputId, errorId) {
  const input = document.getElementById(inputId);
  const error = document.getElementById(errorId);
  if (input) {
    input.classList.remove('border-red-500', 'focus:border-red-500');
    input.classList.add('border-gray-300');
  }
  if (error) {
    error.classList.add('hidden');
    error.classList.remove('show');
  }
}

// সব ফর্ম ফিল্ড ক্লিয়ার
export function clearForm(formId) {
  const form = document.getElementById(formId);
  if (!form) return;
  form.reset();
  // সব এরর মুছে ফেলা
  form.querySelectorAll('.error-msg').forEach(el => {
    el.classList.add('hidden');
    el.classList.remove('show');
  });
  form.querySelectorAll('.form-input').forEach(el => {
    el.classList.remove('border-red-500', 'focus:border-red-500');
    el.classList.add('border-gray-300');
  });
}


/**
 * ===== ডেটাবেস / API ফাংশন (Firestore) =====
 * 
 * নিচের ফাংশনগুলো Firestore-এ ডেটা পাঠানোর জন্য।
 * এগুলো ব্যবহার করতে হলে firebase-config.js ইম্পোর্ট করতে হবে।
 */

// কনট্যাক্ট ফর্ম ডেটা Firestore-এ সেভ করা
export async function saveContactMessage(db, addDoc, collection, data) {
  try {
    const docRef = await addDoc(collection(db, 'contacts'), {
      ...data,
      createdAt: new Date().toISOString(),
      status: 'pending'
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error saving contact:', error);
    return { success: false, error: error.message };
  }
}

// আবেদন ডেটা Firestore-এ সেভ করা
export async function saveApplication(db, addDoc, collection, data) {
  try {
    const docRef = await addDoc(collection(db, 'applications'), {
      ...data,
      createdAt: new Date().toISOString(),
      status: 'pending'
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error saving application:', error);
    return { success: false, error: error.message };
  }
}

// সব আবেদন পাওয়া (অ্যাডমিন প্যানেলের জন্য)
export async function getApplications(db, getDocs, collection) {
  try {
    const querySnapshot = await getDocs(collection(db, 'applications'));
    const applications = [];
    querySnapshot.forEach((doc) => {
      applications.push({ id: doc.id, ...doc.data() });
    });
    // তারিখ অনুযায়ী সাজানো (নতুন প্রথমে)
    applications.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return { success: true, data: applications };
  } catch (error) {
    console.error('Error fetching applications:', error);
    return { success: false, error: error.message };
  }
}


/**
 * ===== অথেনটিকেশন ফাংশন =====
 */

// ইউজার অ্যাডমিন কিনা চেক করা (Custom Claims)
export async function isUserAdmin(user) {
  if (!user) return false;
  try {
    const tokenResult = await user.getIdTokenResult();
    return tokenResult.claims.admin === true;
  } catch (error) {
    console.error('Error checking admin:', error);
    return false;
  }
}

// লগইন চেক – লগইন না থাকলে রিডাইরেক্ট
export function requireAuth(auth, onAuthStateChanged, redirectUrl = 'auth.html') {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      if (!user) {
        window.location.href = redirectUrl;
      } else {
        resolve(user);
      }
    });
  });
}

// অ্যাডমিন চেক – অ্যাডমিন না হলে রিডাইরেক্ট
export async function requireAdmin(auth, onAuthStateChanged, user) {
  if (!user) {
    window.location.href = 'auth.html';
    return false;
  }
  const isAdmin = await isUserAdmin(user);
  if (!isAdmin) {
    window.location.href = 'index.html';
    return false;
  }
  return true;
}


/**
 * ===== কনট্যাক্ট ফর্ম হ্যান্ডলার (সাধারণ ব্যবহারের জন্য) =====
 */

// কনট্যাক্ট ফর্ম সাবমিট হ্যান্ডলার
export function setupContactForm(
  formId,
  nameId,
  phoneId,
  emailId,
  messageId,
  methodName,
  successMsgId,
  db,
  addDoc,
  collection
) {
  const form = document.getElementById(formId);
  if (!form) return;

  form.addEventListener('submit', async function(e) {
    e.preventDefault();

    const name = document.getElementById(nameId).value.trim();
    const phone = document.getElementById(phoneId).value.trim();
    const email = document.getElementById(emailId).value.trim();
    const message = document.getElementById(messageId).value.trim();
    const method = document.querySelector(`input[name="${methodName}"]:checked`)?.value || 'whatsapp';

    // ভ্যালিডেশন
    let valid = true;
    if (!isValidName(name)) {
      showFieldError(nameId, nameId + 'Error');
      valid = false;
    } else {
      hideFieldError(nameId, nameId + 'Error');
    }

    if (!isValidPhone(phone)) {
      showFieldError(phoneId, phoneId + 'Error');
      valid = false;
    } else {
      hideFieldError(phoneId, phoneId + 'Error');
    }

    if (!isEmpty(message) && message.length < 5) {
      showFieldError(messageId, messageId + 'Error');
      valid = false;
    } else {
      hideFieldError(messageId, messageId + 'Error');
    }

    if (!valid) return;

    // ডেটা তৈরি
    const data = {
      name,
      phone: formatPhone(phone),
      email: email || '',
      message,
      preferredMethod: method
    };

    // লোডিং দেখান
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> পাঠানো হচ্ছে...';
    submitBtn.disabled = true;

    // Firestore-এ সেভ
    const result = await saveContactMessage(db, addDoc, collection, data);

    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;

    if (result.success) {
      showToast('আপনার বার্তা সফলভাবে পাঠানো হয়েছে।', 'success');
      clearForm(formId);
      const successMsg = document.getElementById(successMsgId);
      if (successMsg) {
        successMsg.classList.remove('hidden');
        setTimeout(() => successMsg.classList.add('hidden'), 5000);
      }
    } else {
      showToast('বার্তা পাঠাতে ব্যর্থ হয়েছে। আবার চেষ্টা করুন।', 'error');
    }
  });

  // Real-time validation on blur
  document.getElementById(nameId)?.addEventListener('blur', function() {
    if (isValidName(this.value)) hideFieldError(nameId, nameId + 'Error');
  });
  document.getElementById(phoneId)?.addEventListener('blur', function() {
    if (isValidPhone(this.value)) hideFieldError(phoneId, phoneId + 'Error');
  });
}


/**
 * ===== এক্সপোর্ট ডিফল্ট =====
 */

// সব ফাংশন একসাথে এক্সপোর্ট
export default {
  // Utilities
  isValidPhone,
  isValidEmail,
  isValidName,
  isValidPassword,
  formatPhone,
  formatDate,
  getCurrentDate,
  isEmpty,
  generateId,

  // UI
  showToast,
  showLoading,
  hideLoading,
  redirectTo,
  scrollToTop,

  // Form
  showFieldError,
  hideFieldError,
  clearForm,

  // Database
  saveContactMessage,
  saveApplication,
  getApplications,

  // Auth
  isUserAdmin,
  requireAuth,
  requireAdmin,

  // Contact Form Setup
  setupContactForm
};