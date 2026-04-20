// parents.js - لوحة تحكم الأهل (محدث لإصلاح الديناميكية)

document.addEventListener('DOMContentLoaded', () => {
    // 1️⃣ التحقق من جلسة ولي الأمر
    const session = getParentSession();
    
    if (!session || !session.isAuthenticated) {
        console.warn('⚠️ No parent session found, redirecting to login...');
        window.location.href = 'index.html';
        return;
    }
    
    // 2️⃣ عرض بريد ولي الأمر
    const emailEl = document.getElementById('parentEmailDisplay');
    if (emailEl) {
        emailEl.textContent = session.email || 'parent@sit.edu';
    }
    
    // 3️⃣ ✅ عرض بيانات الطفل ديناميكياً (من الجلسة أو من التخزين المباشر)
    const childData = session.child || getChildData();
    
    if (childData) {
        console.log('📦 Loading child data:', childData);
        displayChildProfile(childData);
    } else {
        console.warn('⚠️ No child data found');
        // عرض رسالة مؤقتة
        const nameEl = document.getElementById('childNameDisplay');
        if (nameEl) nameEl.textContent = 'لم يتم إضافة بيانات الطفل بعد';
    }
    
    // 4️⃣ تحميل الإحصائيات (محاكاة)
    loadAnalytics();
    
    // 5️⃣ معالجة نموذج التعديل
    const updateForm = document.getElementById('updateChildForm');
    if (updateForm) {
        updateForm.addEventListener('submit', saveChildUpdates);
    }
});

// ================= عرض ملف الطفل ديناميكياً =================
function displayChildProfile(child) {
    console.log('🎨 Rendering profile for:', child.name);
    
    // ✅ تحديث الاسم (ديناميكي 100%)
    const nameEl = document.getElementById('childNameDisplay');
    if (nameEl && child.name) {
        nameEl.textContent = child.name;
    }
    
    // ✅ تحديث العمر
    const ageEl = document.getElementById('childAgeDisplay');
    if (ageEl && child.age) {
        ageEl.textContent = child.age;
    }
    
    // ✅ تحديث الجنس
    const genderEl = document.getElementById('childGenderDisplay');
    if (genderEl && child.gender) {
        genderEl.textContent = child.gender === 'boy' ? 'ولد' : 'بنت';
    }
    
    // ✅ تحديث تاريخ التسجيل
    const joinEl = document.getElementById('childJoinDate');
    if (joinEl) {
        joinEl.textContent = child.joinDate || new Date().toLocaleDateString('ar-EG');
    }
    
    // ✅ تحديث الأفاتار واللون حسب الجنس
    const avatar = document.getElementById('childAvatar');
    if (avatar) {
        if (child.gender === 'girl') {
            avatar.innerHTML = '<i class="fas fa-girl"></i>';
            avatar.style.background = 'linear-gradient(135deg, #E84393, #FD79A8)';
        } else if (child.gender === 'boy') {
            avatar.innerHTML = '<i class="fas fa-boy"></i>';
            avatar.style.background = 'linear-gradient(135deg, #3498db, #00CEC9)';
        } else {
            avatar.innerHTML = '<i class="fas fa-child"></i>';
            avatar.style.background = 'linear-gradient(135deg, #A29BFE, #6C5CE7)';
        }
    }
    
    // ✅ ملء نموذج التعديل بالقيم الحالية (للتعديل لاحقاً)
    fillEditForm(child);
}

// ملء نموذج التعديل بالبيانات الحالية
function fillEditForm(child) {
    const nameInput = document.getElementById('editName');
    const ageSelect = document.getElementById('editAge');
    
    if (nameInput && child.name) nameInput.value = child.name;
    if (ageSelect && child.age) ageSelect.value = child.age;
    
    if (child.gender) {
        const genderRadio = document.querySelector(`input[name="gender"][value="${child.gender}"]`);
        if (genderRadio) genderRadio.checked = true;
    }
}

// ================= إظهار/إخفاء نموذج التعديل =================
function toggleEditMode() {
    const form = document.getElementById('editForm');
    const card = document.getElementById('profileCard');
    
    if (!form || !card) return;
    
    if (form.style.display === 'none' || !form.style.display) {
        form.style.display = 'block';
        card.style.display = 'none';
    } else {
        form.style.display = 'none';
        card.style.display = 'flex';
    }
}

// ================= حفظ تحديثات الطفل =================
function saveChildUpdates(e) {
    e.preventDefault();
    
    const updatedData = {
        name: document.getElementById('editName').value.trim(),
        age: document.getElementById('editAge').value,
        gender: document.querySelector('input[name="gender"]:checked')?.value,
        joinDate: new Date().toLocaleDateString('ar-EG')
    };
    
    // تحديث parentSession
    const session = getParentSession();
    if (session) {
        session.child = { ...session.child, ...updatedData };
        localStorage.setItem('parentSession', JSON.stringify(session));
    }
    
    // تحديث childData المباشر
    localStorage.setItem('childData', JSON.stringify(updatedData));
    
    // إعادة عرض البيانات المحدثة
    displayChildProfile(updatedData);
    toggleEditMode();
    
    // رسالة نجاح
    alert(`✅ تم تحديث بيانات ${updatedData.name} بنجاح!`);
}

// ================= زر وضع الطفل (جديد) =================
function enterChildMode() {
    // التحقق من وجود بيانات الطفل
    const session = getParentSession();
    const childData = session?.child || getChildData();
    
    if (!childData || !childData.name) {
        alert('⚠️ يرجى إضافة بيانات الطفل أولاً من قسم "ملف الطفل"');
        toggleEditMode(); // إظهار نموذج الإضافة إذا لم توجد بيانات
        return;
    }
    
    // وضع علامة للدخول كطفل + حفظ البيانات للوحة الطفل
    localStorage.setItem('activeChildMode', 'true');
    localStorage.setItem('childData', JSON.stringify(childData));
    
    // تأثير بصري للزر (اختياري)
    const btn = document.querySelector('.child-mode-btn');
    if (btn) {
        const originalHTML = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        btn.disabled = true;
        
        setTimeout(() => {
            btn.innerHTML = originalHTML;
            btn.disabled = false;
            window.location.href = 'dashboard.html';
        }, 500);
    } else {
        window.location.href = 'dashboard.html';
    }
}

// ================= تسجيل الخروج =================
function logout() {
    if (confirm('هل تريد الخروج والعودة لصفحة التسجيل؟')) {
        localStorage.removeItem('parentSession');
        localStorage.removeItem('childData');
        localStorage.removeItem('activeChildMode');
        window.location.href = 'index.html';
    }
}

// ================= دوال مساعدة =================

// جلب جلسة ولي الأمر
function getParentSession() {
    try {
        const session = localStorage.getItem('parentSession');
        return session ? JSON.parse(session) : null;
    } catch (e) {
        console.error('Error parsing parentSession:', e);
        return null;
    }
}

// جلب بيانات الطفل المباشرة
function getChildData() {
    try {
        const data = localStorage.getItem('childData');
        return data ? JSON.parse(data) : null;
    } catch (e) {
        console.error('Error parsing childData:', e);
        return null;
    }
}

// تحميل الإحصائيات (محاكاة - لاحقاً من API)
function loadAnalytics() {
    // بيانات عشوائية للتجربة
    const stats = {
        totalTime: Math.floor(Math.random() * 120) + 30, // 30-150 دقيقة
        favoriteActivity: ['الحروف العربية', 'الأرقام', 'الرسم', 'القصص', 'الألعاب'][Math.floor(Math.random() * 5)],
        progress: Math.floor(Math.random() * 60) + 20, // 20-80%
        focusTime: Math.floor(Math.random() * 20) + 10 // 10-30 دقيقة
    };
    
    // تحديث العناصر في الصفحة
    const timeEl = document.getElementById('totalTimeStat');
    const favEl = document.getElementById('favoriteActivityStat');
    const progEl = document.getElementById('progressStat');
    const focusEl = document.getElementById('focusTimeStat');
    
    if (timeEl) timeEl.textContent = stats.totalTime;
    if (favEl) favEl.textContent = stats.favoriteActivity;
    if (progEl) progEl.textContent = stats.progress + '%';
    if (focusEl) focusEl.textContent = stats.focusTime;
}