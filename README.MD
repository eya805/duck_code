alexandria_django/          <-- المجلد الرئيسي (Root)
│
├── manage.py
├── config/                 <-- ده الفولدر اللي فيه settings.py (غيرت اسمه للتنظيم)
│
├── static/                 <-- (مركزي) ملفات CSS, JS, وصور اللوجو
├── media/                  <-- (مركزي) صور الفنادق والأماكن اللي هتترفع
├── templates/              <-- (مركزي) كل ملفات الـ HTML
│   ├── base.html           <-- الأب
│   ├── pages/              <-- ملفات app الـ pages
│   └── places/             <-- ملفات app الـ places
│
├── pages/                  <-- (App) الصفحات العامة (Home, About, Search)
├── places/                 <-- (App) البيانات (Attractions, Hotels, Restaurants)
├── booking/                <-- (App) منطق الحجز
└── ai_assistant/           <-- (App) محرك الذكاء الاصطناعي