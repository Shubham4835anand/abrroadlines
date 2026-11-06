# ABR Roadlines Pvt. Ltd. — Web Platform

> **Modern, High-Performance, Production-Ready Web Platform & API for ABR Roadlines Pvt. Ltd.**  
> *Headquartered at NH-1, Near Ambala Haveli Mohra, G.T. Road, Ambala Cantt, Haryana 133001, India.*  
> **Tagline:** *Advanced, predictive, tech-enabled, connected logistics infrastructure across all of India.*

---

## 🚀 Key Highlights & Capabilities

- **Pan-India Transport & Fleet Management:** 500+ GPS-enabled vehicles, 150+ connected cities, 20+ years track record, 99.4% on-time delivery SLA.
- **Three Core Offerings:**
  1. **Attached Basis Transport** (Dedicated Contract Fleets)
  2. **Time-Definite Delivery** (Guaranteed SLA Highway Linehaul)
  3. **Hub to Hub Linehaul** (Central Warehouse Arterial Distribution)
- **Interactive Shipment Tracking UI:** Real-time milestone stepper, live speed, GPS coordinates, and e-POD verification.
- **Enterprise Rate Estimator ("Get Quote"):** Dynamic multi-field form for origin, destination, vehicle category, and tonnage.
- **Validated Contact System:** Saves inquiries to MongoDB, logs telemetry, and dispatches automated email notifications to `info@abrroadlines.com`.
- **Floating WhatsApp Desk:** Quick contact button directly linked to `+91 93150 01977`.
- **Admin Management Portal:** Simple JWT-protected portal to review contact leads, manage quote requests, and publish blog insights.
- **SEO & Core Web Vitals:** Per-page meta tags with `react-helmet-async`, `LocalBusiness` & `Service` JSON-LD schemas, sitemap, robots.txt, and code splitting.

---

## 🛠️ Tech Stack

### Frontend (`/client`)
- **Core:** React 18 + Vite
- **Routing:** React Router v6
- **Styling:** Tailwind CSS + Custom Corporate Logistics Design Tokens (Deep Navy `#0B192C` + Safety Orange `#FF6500`)
- **Animations:** Framer Motion (subtle, high-performance transitions)
- **Icons:** Lucide React
- **Forms & Validation:** React Hook Form + Zod
- **SEO & Structured Data:** React Helmet Async + Schema.org JSON-LD

### Backend (`/server`)
- **Runtime:** Node.js (ES Modules)
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose (with in-memory fallback for offline/local evaluation)
- **Authentication:** JSON Web Tokens (JWT) + Bcrypt password hashing
- **Security:** Helmet, CORS, Express Rate Limit, Input Sanitization
- **Logging:** Winston + Morgan
- **Email:** Nodemailer (with Ethereal/mock fallback)

---

## 📁 Repository Structure

```text
abrroadlines/
├── client/                           # React 18 + Vite Frontend
│   ├── public/
│   │   ├── images/                   # Optimized SVG/WebP assets
│   │   │   ├── hero/                 # Modern highway logistics graphics
│   │   │   ├── fleet/                # 32ft MX, flatbeds, express liners
│   │   │   ├── services/             # Attached, Time-Definite, Hub to Hub
│   │   │   ├── about/                # Ambala HQ, 24/7 Control Tower
│   │   │   ├── team/                 # Smooth circular leadership portraits
│   │   │   ├── clients/              # Enterprise client logos
│   │   │   └── gallery/              # Depot, loading docks, telemetry
│   │   ├── logo.svg                  # Corporate horizontal brandmark
│   │   ├── logo-mark.svg             # Favicon & mobile brand icon
│   │   ├── robots.txt                # Search crawler instructions
│   │   └── sitemap.xml               # Canonical XML sitemap
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/               # Button, Card, SectionHeading, Lightbox, etc.
│   │   │   ├── layout/               # TopBar, Navbar, Footer, SharedLayout
│   │   │   ├── home/                 # Hero, StatsBar, ServicesOverview, WhyChooseUs, etc.
│   │   │   └── seo/                  # SEO.jsx, SchemaOrg.jsx
│   │   ├── context/                  # AuthContext, ToastContext
│   │   ├── data/                     # servicesData, companyData, sampleBlogs, galleryData
│   │   ├── hooks/                    # useToast, useScrollToTop
│   │   ├── pages/                    # Home, About, Services, Gallery, Blogs, Contact, Quote, Tracking, Admin
│   │   ├── services/                 # api.js fetch client
│   │   ├── utils/                    # constants.js
│   │   ├── App.jsx                   # Route declarations
│   │   ├── main.jsx                  # React application entrypoint
│   │   └── index.css                 # Tailwind directives & corporate design tokens
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
│
├── server/                           # Express.js REST API Backend
│   ├── src/
│   │   ├── config/                   # db.js, logger.js
│   │   ├── controllers/              # auth, blog, gallery, contact, quote, tracking
│   │   ├── middleware/               # auth, errorHandler, rateLimiter, validate
│   │   ├── models/                   # User, Blog, GalleryItem, ContactEnquiry, QuoteRequest, Shipment
│   │   ├── routes/                   # auth, blog, gallery, contact, quote, tracking, index
│   │   ├── scripts/                  # seed.js (initial demo data & admin credentials)
│   │   ├── services/                 # emailService.js (Nodemailer)
│   │   └── server.js                 # Express server configuration
│   └── package.json
│
├── .env.example                      # Root environment variables
├── DEPLOYMENT.md                     # Production deployment guide (Vercel, Render, VPS)
├── IMAGE_CATALOG.md                  # Dimensions, aspect ratios & image specifications
├── package.json                      # Monorepo scripts (concurrently dev & build)
└── README.md                         # Project documentation
```

---

## ⚡ Getting Started

### 1. Prerequisites
- **Node.js**: v18+ (tested on Node v20/v22/v26)
- **npm**: v9+
- **MongoDB** *(optional)*: Local instance on port `27017` or a MongoDB Atlas URI. *(The server features a built-in memory fallback for effortless local testing even if MongoDB is not running).*

---

### 2. Installation
Run the following from the root directory:
```bash
# Install root, client, and server dependencies
npm install
cd client && npm install
cd ../server && npm install
cd ..
```

---

### 3. Environment Setup
Create environment files from the examples:

```bash
# Server configuration
cp server/.env.example server/.env

# Client configuration
cp client/.env.example client/.env
```

---

### 4. Database Seeding
Seed initial admin credentials, sample blogs, gallery items, and live tracking records:
```bash
npm run seed
```
> **Default Admin Account:**  
> Email: `admin@abrroadlines.com`  
> Password: `Admin@1234`

---

### 5. Running the Application

#### Run both Frontend & Backend concurrently:
```bash
npm run dev
```
- **Client (Frontend):** `http://localhost:5173`
- **Server (Backend API):** `http://localhost:5000`
- **API Healthcheck:** `http://localhost:5000/api/health`

#### Or run independently:
```bash
# Terminal 1: Backend
npm run dev:server

# Terminal 2: Frontend
npm run dev:client
```

---

## 🚢 Building for Production

```bash
# Builds client with Vite code-splitting into /client/dist
npm run build

# Start production server
npm run start
```

---

## 📡 REST API Endpoints

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/api/contact` | Public | Submit contact enquiry & trigger email notification |
| `GET` | `/api/contact` | Admin | List all received contact enquiries |
| `POST` | `/api/quote` | Public | Submit quote calculation request & trigger email |
| `GET` | `/api/quote` | Admin | List all quote requests |
| `GET` | `/api/blogs` | Public | List blogs with pagination and search (`?search=&category=&page=`) |
| `GET` | `/api/blogs/:slug` | Public | Get single blog article by slug |
| `POST` | `/api/blogs` | Admin | Create a new blog article |
| `DELETE`| `/api/blogs/:id` | Admin | Delete a blog article |
| `GET` | `/api/gallery` | Public | Retrieve gallery items by category |
| `GET` | `/api/tracking/:lrNumber` | Public | Live telemetry for consignment (try `ABR-10023` or `ABR-10045`) |
| `POST` | `/api/auth/login` | Public | Admin authentication returning JWT |
| `GET` | `/api/auth/me` | Admin | Verify current token and session |
| `GET` | `/api/health` | Public | Server uptime and health verification |

---

## 🏢 Corporate Details Preserved

- **Company:** ABR Roadlines Pvt. Ltd.
- **Headquarters:** NH-1, Near Ambala Haveli Mohra, G.T. Road, Ambala Cantt, Haryana 133001
- **Phone:** +91-93150 01977
- **Email:** info@abrroadlines.com
- **WhatsApp:** +91 93150 01977
- **Operating Hours:** Mon – Sat 9:00 AM – 8:00 PM | Fleet Operations: 24/7/365

