# Ivento - Marketplace Website

Website marketplace modern dengan fitur dark mode dan light mode yang sempurna.

## 🌟 Fitur Utama

### 🎨 Dark Mode & Light Mode
- **Toggle Button**: Tombol toggle yang elegan dengan animasi smooth
- **Auto-detect**: Otomatis mendeteksi preferensi sistem (dark/light mode)
- **Persistent**: Menyimpan preferensi user di localStorage
- **Smooth Transitions**: Transisi halus antar tema dengan efek visual
- **Responsive**: Toggle button yang responsif di semua device

### 📱 Responsive Design
- **Mobile First**: Optimized untuk mobile, tablet, dan desktop
- **Touch Friendly**: Tombol dan elemen yang mudah disentuh
- **Adaptive Layout**: Layout yang menyesuaikan ukuran layar
- **Performance**: Optimized untuk performa di semua device

### 🎯 User Experience
- **Glass Morphism**: Efek visual modern dengan blur dan transparansi
- **3D Cards**: Kartu produk dengan efek 3D dan flip animation
- **Floating Elements**: Elemen mengambang dengan animasi
- **Smooth Scrolling**: Navigasi halus antar section
- **Loading States**: Indikator loading yang informatif

## 🛠️ Teknologi yang Digunakan

- **HTML5**: Semantic markup yang bersih
- **CSS3**: 
  - CSS Variables untuk theme management
  - Flexbox dan Grid untuk layout
  - Animations dan Transitions
  - Media Queries untuk responsive design
- **JavaScript (ES6+)**:
  - Class-based Theme Manager
  - LocalStorage untuk persistence
  - Intersection Observer API
  - Event handling yang optimized

## 🎨 Sistem Theme

### Light Mode
- Background: Clean white dan light gray
- Text: Dark gray untuk readability
- Accent: Sky blue (#0ea5e9)
- Cards: White dengan subtle shadows

### Dark Mode
- Background: Deep navy (#0f172a) dan slate gray
- Text: Light gray dan white
- Accent: Sky blue (#0ea5e9) - konsisten
- Cards: Dark slate dengan enhanced shadows

### CSS Variables
```css
:root {
    --bg-primary: #f9fafb;
    --bg-secondary: #ffffff;
    --text-primary: #111827;
    --accent-primary: #0ea5e9;
    /* ... dan banyak lagi */
}
```

## 🚀 Cara Menggunakan

### Toggle Theme
1. Klik tombol toggle (☀️/🌙) di navigation bar
2. Theme akan berubah dengan animasi smooth
3. Preferensi akan disimpan otomatis

### Responsive Navigation
- **Desktop**: Menu horizontal dengan semua link
- **Mobile**: Hamburger menu dengan slide animation
- **Touch**: Optimized untuk touch gestures

### Product Cards
- **Hover**: Efek 3D dan scale
- **Click**: Flip animation untuk detail
- **Touch**: Simplified effects di mobile

## 📱 Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## ♿ Accessibility

- **Keyboard Navigation**: Full keyboard support
- **Screen Reader**: ARIA labels dan semantic HTML
- **Focus Management**: Visible focus indicators
- **Reduced Motion**: Respects user preferences
- **High Contrast**: Support untuk high contrast mode

## 🎯 Performance Optimizations

- **Throttled Events**: Scroll events di-throttle untuk performa
- **Lazy Loading**: Images dan animations
- **CSS Optimization**: Efficient selectors dan minimal reflows
- **JavaScript**: Event delegation dan efficient DOM manipulation

## 🔧 Customization

### Mengubah Colors
Edit CSS variables di `styles.css`:
```css
:root {
    --accent-primary: #your-color;
    --bg-primary: #your-bg-color;
}
```

### Menambah Theme Baru
1. Tambahkan CSS variables untuk theme baru
2. Update JavaScript ThemeManager class
3. Tambahkan toggle logic

## 📄 File Structure

```
marketivento.id/
├── index.html          # Main HTML file
├── styles.css          # CSS dengan theme system
├── script.js           # JavaScript dengan ThemeManager
└── README.md           # Documentation
```

## 🌟 Fitur Khusus

### Theme Manager Class
```javascript
class ThemeManager {
    constructor() {
        this.theme = localStorage.getItem('theme') || 'light';
        this.init();
    }
    
    toggleTheme() {
        // Smooth theme switching dengan animations
    }
}
```

### Smooth Transitions
- Semua elemen memiliki transisi 0.3s ease
- Theme toggle dengan ripple effect
- Page transitions dengan overlay effect

### Mobile Optimizations
- Touch-friendly buttons (44px minimum)
- Simplified animations di mobile
- Optimized performance untuk mobile devices

## 🎨 Design System

### Colors
- **Primary**: Sky Blue (#0ea5e9)
- **Secondary**: Blue (#1e40af)
- **Success**: Green (#10b981)
- **Warning**: Yellow (#f59e0b)
- **Danger**: Red (#ef4444)

### Typography
- **Font**: Poppins (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700, 800
- **Responsive**: Font sizes menyesuaikan screen size

### Spacing
- **Consistent**: 8px grid system
- **Responsive**: Spacing menyesuaikan device
- **Accessible**: Adequate touch targets

## 🔮 Future Enhancements

- [ ] Multiple color themes
- [ ] Theme scheduling (auto-switch)
- [ ] Advanced animations
- [ ] PWA capabilities
- [ ] Offline support
- [ ] Advanced analytics

## 📞 Support

Untuk pertanyaan atau feedback, silakan hubungi:
- Email: info@ivento.id
- WhatsApp: +62 xxx-xxxx-xxxx
- Instagram: @ivento.id

---

**Ivento** - Marketplace terdepan dengan pengalaman user yang luar biasa! 🚀 