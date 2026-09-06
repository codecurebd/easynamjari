// main.js
// ============================================
// এই ফাইলটি সাইটের সব পেজে ব্যবহারযোগ্য সাধারণ ফাংশন,
// ইউটিলিটি, ভ্যালিডেশন, নোটিফিকেশন, রাউটিং ইত্যাদি ধারণ করে।
// ============================================

/**
 * ===== ইউটিলিটি ফাংশন =====
 */

// মোবাইল নম্বর ভ্যালিডেশন (বাংলাদেশ)
export function isValidPhone(phone) {
  const cleaned = phone.replace(/[^0-9]/g, '');
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

// র‍্যান্ডম আইডি জেনারেটর
export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
}

/**
 * ===== UI ফাংশন =====
 */

// টোস্ট নোটিফিকেশন দেখানো
export function showToast(message, type = 'success', duration = 4000) {
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

  requestAnimationFrame(() => {
    toast.classList.remove('opacity-0', 'translate-y-[-20px]');
    toast.classList.add('opacity-100', 'translate-y-0');
  });

  setTimeout(() => {
    toast.classList.remove('opacity-100', 'translate-y-0');
    toast.classList.add('opacity-0', 'translate-y-[-20px]');
    setTimeout(() => toast.remove(), 500);
  }, duration);
}

/**
 * ===== অথেনটিকেশন ফাংশন =====
 */

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

export async function requireAdmin(auth, onAuthStateChanged) {
  return new Promise((resolve) => {
    onAuthStateChanged(auth, async (user) => {
      if (!user) {
        window.location.href = 'auth.html';
        resolve(false);
        return;
      }

      const isAdmin = await isUserAdmin(user);
      if (!isAdmin) {
        window.location.href = 'profile.html';
        resolve(false);
      } else {
        resolve(user);
      }
    });
  });
}

/**
 * ===== ফর্ম ভ্যালিডেশন হেলপার =====
 */

export function showFieldError(inputId, errorId) {
  const input = document.getElementById(inputId);
  const error = document.getElementById(errorId);
  if (input) {
    input.classList.add('border-red-500', 'focus:border-red-500');
    input.classList.remove('border-gray-300');
  }
  if (error) {
    error.classList.add('show');
  }
}

export function hideFieldError(inputId, errorId) {
  const input = document.getElementById(inputId);
  const error = document.getElementById(errorId);
  if (input) {
    input.classList.remove('border-red-500', 'focus:border-red-500');
    input.classList.add('border-gray-300');
  }
  if (error) {
    error.classList.remove('show');
  }
}

export function clearForm(formId) {
  const form = document.getElementById(formId);
  if (!form) return;
  form.reset();
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
 */

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

export async function getApplications(db, getDocs, collection) {
  try {
    const querySnapshot = await getDocs(collection(db, 'applications'));
    const applications = [];
    querySnapshot.forEach((doc) => {
      applications.push({ id: doc.id, ...doc.data() });
    });
    applications.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return { success: true, data: applications };
  } catch (error) {
    console.error('Error fetching applications:', error);
    return { success: false, error: error.message };
  }
}

// ===== অথেনটিকেশন UI আপডেট (গ্লোবাল) =====
export function updateAuthUI(user = null) {
  const btn = document.getElementById('authBtn');
  if (!btn) return;

  if (user) {
    btn.innerHTML = `<i class="fas fa-user-circle"></i> <span class="hidden xs:inline">প্রোফাইল</span>`;
    btn.href = 'profile.html';
  } else {
    btn.innerHTML = `<i class="fas fa-sign-in-alt"></i> <span class="hidden xs:inline">লগইন</span>`;
    btn.href = 'auth.html';
  }
}