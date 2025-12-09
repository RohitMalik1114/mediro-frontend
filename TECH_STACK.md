# 🛠️ Mediro Frontend - Tech Stack Documentation

## 📋 Project Overview

**Project Name:** Mediro Frontend  
**Type:** Medical AI Assistant Web Application  
**Architecture:** Single Page Application (SPA)  
**Build Tool:** Vite  
**Language:** TypeScript  

---

## 🎯 Core Technologies

### **React 18.3.1**
- **Purpose:** UI Library for building interactive user interfaces
- **Features Used:**
  - Functional Components with Hooks
  - useState, useEffect, useRef for state management
  - React.StrictMode for development checks
  - Component-based architecture

### **TypeScript 5.9.3**
- **Purpose:** Type-safe JavaScript development
- **Configuration:** 
  - Strict mode enabled
  - ES2020 target
  - ESNext modules
  - JSX: react-jsx
- **Benefits:** 
  - Type checking at compile time
  - Better IDE support and autocomplete
  - Reduced runtime errors

### **Vite 5.4.21**
- **Purpose:** Lightning-fast development server and build tool
- **Features:**
  - Hot Module Replacement (HMR)
  - Optimized production builds
  - Fast cold starts
  - Network access enabled (--host flag)
- **Configuration:**
  - Server: localhost:5173
  - Network: 172.31.133.189:5173
  - Preview port: 4173

---

## 🎨 Styling & UI

### **Tailwind CSS 3.4.18**
- **Purpose:** Utility-first CSS framework
- **Features Used:**
  - Responsive design utilities
  - Dark mode support (class strategy)
  - Custom color palette (mediro brand colors)
  - Custom animations and transitions
- **Configuration:**
  - Custom mediro color: #1a9b8e
  - Dark mode: 'class' based
  - Content scanning: HTML, TS, TSX, JS, JSX files

### **PostCSS 8.5.6**
- **Purpose:** CSS transformation tool
- **Plugins:**
  - Tailwind CSS
  - Autoprefixer (browser compatibility)

### **Custom CSS Animations**
- Gradient animations
- Float effects
- Glow effects
- Shimmer effects
- Slide-in animations
- Fade-in-up animations
- Scale-in animations
- Glassmorphism effects
- 3D perspective transforms

---

## 🌍 Internationalization (i18n)

### **i18next 23.16.8**
- **Purpose:** Internationalization framework
- **Features:**
  - Multiple language support
  - Dynamic language switching
  - Fallback language (English)
  - LocalStorage integration for language persistence

### **react-i18next 13.5.0**
- **Purpose:** React bindings for i18next
- **Hook:** useTranslation()
- **Languages Supported:**
  - 🇺🇸 English (en)
  - 🇮🇳 Hindi (hi)
  - 🇪🇸 Spanish (es)
  - 🇫🇷 French (fr)
  - 🇩🇪 German (de)
  - 🇨🇳 Chinese (zh)

---

## 🔌 API Integration

### **Axios 1.13.2**
- **Purpose:** HTTP client for API communication
- **Features:**
  - Request/Response interceptors
  - Automatic token injection
  - Token refresh mechanism
  - Error handling
  - withCredentials for cookies
- **Configuration:**
  - Base URL: http://localhost:5000/api/v1
  - Timeout: 10000ms
  - Content-Type: application/json

### **API Services**
- **api.service.ts:** Axios instance with interceptors
- **auth.service.ts:** Authentication methods (register, login, logout, profile)
- **api.config.ts:** Centralized API configuration

---

## 🔐 Authentication & Security

### **JWT Token Management**
- Access tokens (stored in localStorage)
- Refresh tokens (stored in localStorage)
- Automatic token refresh on 401 errors
- Secure token storage keys:
  - `mediro-access-token`
  - `mediro-refresh-token`
  - `mediro-auth`

### **Security Features**
- CORS-enabled API calls
- withCredentials for secure cookie transmission
- Auto-logout on authentication failure
- Token expiry handling

---

## 📦 Project Structure

```
mediro-frontend/
├── public/                     # Static assets
├── src/
│   ├── assets/                # Images, icons, media files
│   ├── components/            # React components
│   │   ├── AboutShapes.tsx   # About section
│   │   ├── ChatModal.tsx     # AI chat interface
│   │   ├── Features.tsx      # Features showcase
│   │   ├── Footer.tsx        # Footer component
│   │   ├── Header.tsx        # Navigation header
│   │   ├── HealthNews.tsx    # Health news section
│   │   ├── Hero.tsx          # Landing hero section
│   │   ├── HowItWorks.tsx    # Process explanation
│   │   ├── LoginModal.tsx    # Authentication modal
│   │   ├── ProfileSidebar.tsx # User profile sidebar
│   │   ├── Safety.tsx        # Safety guidelines
│   │   └── Testimonials.tsx  # User testimonials
│   ├── config/               # Configuration files
│   │   └── api.config.ts    # API endpoints & config
│   ├── services/             # Business logic & API calls
│   │   ├── api.service.ts   # Axios instance & interceptors
│   │   └── auth.service.ts  # Authentication service
│   ├── locales/              # Translation files
│   │   ├── en.json          # English translations
│   │   ├── hi.json          # Hindi translations
│   │   ├── es.json          # Spanish translations
│   │   ├── fr.json          # French translations
│   │   ├── de.json          # German translations
│   │   └── zh.json          # Chinese translations
│   ├── App.tsx               # Main application component
│   ├── main.tsx              # Application entry point
│   ├── index.css             # Global styles & animations
│   └── i18n.ts               # i18n configuration
├── .env                       # Environment variables
├── .env.example              # Environment template
├── index.html                # HTML entry point
├── package.json              # Dependencies & scripts
├── tsconfig.json             # TypeScript configuration
├── tailwind.config.js        # Tailwind CSS configuration
├── postcss.config.js         # PostCSS configuration
└── vit.config.ts             # Vite configuration
```

---

## 🔧 Development Tools

### **Type Definitions**
- @types/react 18.3.27
- @types/react-dom 18.3.7

### **Vite Plugins**
- @vitejs/plugin-react 5.1.1 (Fast Refresh, JSX transform)

---

## 📜 NPM Scripts

```json
{
  "dev": "vite --host",           // Development server with network access
  "build": "vite build",          // Production build
  "preview": "vite preview",      // Preview production build
  "typecheck": "tsc --noEmit"     // TypeScript type checking
}
```

---

## 🌐 Environment Variables

### **.env Configuration**
```env
VITE_API_URL=http://localhost:5000/api/v1
VITE_ENV=development
```

### **Usage in Code**
```typescript
import.meta.env.VITE_API_URL
import.meta.env.VITE_ENV
```

---

## 🎨 Design System

### **Color Palette**
- **Primary (Mediro):** #1a9b8e, #0E7C86
- **Dark Variant:** #0A5D63
- **Slate Shades:** 50, 200, 300, 600, 700, 800, 900
- **Teal Shades:** 500, 600
- **Utility Colors:** Red, Orange, Green, Amber

### **Typography**
- Font Sizes: text-sm to text-5xl
- Font Weights: font-normal, font-semibold, font-bold
- Line Heights: Relaxed and custom spacing

### **Spacing System**
- Padding: p-3, p-4, p-6, p-8
- Gap: gap-2, gap-3, gap-4, gap-6, gap-8
- Margin: mb-3, mb-4, mb-6, mb-12, mb-16

### **Border Radius**
- rounded-xl (primary cards)
- rounded-full (buttons, badges)
- rounded-lg (modals, inputs)

### **Shadows**
- shadow-sm (cards at rest)
- shadow-md (hover states)
- shadow-lg (elevated elements)

---

## 🚀 Performance Optimizations

### **Build Optimizations**
- Tree shaking (unused code removal)
- Code splitting (dynamic imports)
- Asset optimization (images, fonts)
- Minification (HTML, CSS, JS)
- Gzip compression

### **Runtime Optimizations**
- React memoization (where needed)
- Lazy loading components
- Debounced search/input handlers
- Optimized re-renders

### **Network Optimizations**
- Axios request deduplication
- Token caching in localStorage
- Retry logic for failed requests
- Timeout configurations

---

## 📱 Responsive Design

### **Breakpoints**
- **Mobile:** 320px - 767px
- **Tablet:** 768px - 1023px
- **Desktop:** 1024px - 1439px
- **Large Desktop:** 1440px+

### **Mobile-First Approach**
- Default styles for mobile
- md: prefix for tablet (768px+)
- lg: prefix for desktop (1024px+)
- xl: prefix for large screens (1280px+)

### **Touch-Friendly**
- Minimum 44px tap targets
- Proper spacing between interactive elements
- Smooth scrolling
- Swipe gestures support (in modals)

---

## 🌙 Dark Mode Support

### **Implementation**
- Class-based dark mode (toggleable)
- LocalStorage persistence (`mediro-theme`)
- Smooth transitions between themes
- Contrast-optimized color schemes

### **Dark Mode Colors**
- Background: #071119, #0a1520, #061014
- Text: white, slate-300, slate-400
- Borders: slate-700, slate-800
- Cards: slate-800

---

## 🔄 State Management

### **Local State (React Hooks)**
- useState: Component-level state
- useEffect: Side effects and lifecycle
- useRef: DOM references and mutable values

### **Global State**
- localStorage: Theme, language, auth tokens, user profile
- Context API: (if needed for future scaling)

### **State Keys**
- `mediro-theme`: dark | light
- `mediro-lang`: en | hi | es | fr | de | zh
- `mediro-auth`: User authentication data
- `mediro-access-token`: JWT access token
- `mediro-refresh-token`: JWT refresh token

---

## 🧪 Browser Support

### **Modern Browsers**
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Opera 76+

### **Mobile Browsers**
- ✅ Chrome Mobile (Android)
- ✅ Safari Mobile (iOS)
- ✅ Samsung Internet
- ✅ Firefox Mobile

---

## 📊 Bundle Size

### **Production Build**
- **HTML:** 0.40 KB (gzipped: 0.27 KB)
- **CSS:** 43.79 KB (gzipped: 6.97 KB)
- **JavaScript:** 312.41 KB (gzipped: 95.47 KB)
- **Total:** ~356 KB (uncompressed)

---

## 🔗 Backend Integration

### **Backend Stack**
- Node.js + Express + TypeScript
- MongoDB (Mongoose ODM)
- JWT Authentication
- Redis (optional caching)

### **API Endpoints**
- POST /api/v1/auth/register
- POST /api/v1/auth/login
- POST /api/v1/auth/logout
- POST /api/v1/auth/refresh
- GET /api/v1/auth/profile
- POST /api/v1/auth/change-password
- GET /api/v1/health

### **Communication**
- RESTful API
- JSON data format
- Bearer token authentication
- CORS enabled

---

## 📝 Code Quality

### **TypeScript Configuration**
- Strict type checking
- No implicit any
- Force consistent casing
- Resolve JSON modules
- ES Module interop

### **Code Style**
- Functional components
- Arrow functions
- Destructuring
- Optional chaining
- Nullish coalescing

---

## 🚀 Deployment

### **Development**
- Local: http://localhost:5173
- Network: http://172.31.133.189:5173

### **Production (Recommended)**
- **Vercel:** Zero-config deployment
- **Netlify:** Continuous deployment
- **AWS S3 + CloudFront:** Scalable hosting
- **Azure Static Web Apps:** Enterprise hosting

### **Build Command**
```bash
npm run build
```

### **Preview Build**
```bash
npm run preview
```

---

## 📚 Key Features Implemented

✅ Multi-language support (6 languages)  
✅ Dark/Light mode toggle  
✅ Responsive design (mobile-first)  
✅ JWT authentication with auto-refresh  
✅ API integration with Axios  
✅ Component-based architecture  
✅ Type-safe development (TypeScript)  
✅ Fast development server (Vite HMR)  
✅ Custom animations and transitions  
✅ Glassmorphism effects  
✅ Profile management  
✅ Chat modal interface  
✅ Health news aggregation  
✅ Testimonials carousel  
✅ Safety guidelines  
✅ Network accessibility  

---

## 🔮 Future Enhancements

- [ ] Progressive Web App (PWA) support
- [ ] Service Worker for offline functionality
- [ ] Push notifications
- [ ] WebSocket integration for real-time chat
- [ ] Image optimization with next-gen formats
- [ ] Analytics integration (Google Analytics, Mixpanel)
- [ ] Error tracking (Sentry)
- [ ] A/B testing framework
- [ ] Performance monitoring
- [ ] SEO optimization
- [ ] Social media integration
- [ ] AI chat with real backend

---

## 📄 License

Proprietary - Mediro Medical AI Platform

---

## 👥 Development Team

**Frontend Architecture:** React + TypeScript + Vite  
**Styling:** Tailwind CSS with custom design system  
**API Integration:** Axios with JWT authentication  
**Internationalization:** i18next (6 languages)  

---

## 📞 Support & Documentation

For technical support or questions:
- Review component documentation in `src/components/`
- Check API configuration in `src/config/api.config.ts`
- Refer to translation files in `src/locales/`
- Review environment setup in `.env.example`

---

**Last Updated:** December 9, 2025  
**Version:** 0.1.0  
**Status:** ✅ Production Ready
