# ABR Roadlines Pvt. Ltd. — Production Deployment Guide

This guide covers production deployment for both the Frontend Client and the Backend API for **ABR Roadlines Pvt. Ltd.**

---

## 1. Architecture Overview

- **Frontend Client:** React 18 + Vite (SPA) deployed to **Vercel** or **Netlify** or served via **Nginx**.
- **Backend API:** Node.js Express service running behind **PM2** and **Nginx reverse proxy** on an Ubuntu VPS or **Render / Railway / AWS EC2**.
- **Database:** MongoDB Atlas (M0/M10 cluster) or self-hosted MongoDB with replica sets.
- **Domain:** `https://abrroadlines.com` (Frontend) and `https://api.abrroadlines.com` (Backend).

---

## 2. Frontend Deployment (Vercel / Netlify)

### Option A: Deploying to Vercel (Recommended)
1. Push the repository to GitHub / GitLab.
2. Log in to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Select the repository and configure project settings:
   - **Root Directory:** `client`
   - **Framework Preset:** `Vite`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Set Environment Variables in Vercel:
   ```env
   VITE_API_URL=https://api.abrroadlines.com/api
   VITE_COMPANY_NAME="ABR Roadlines Pvt. Ltd."
   VITE_PHONE="+91 93150 01977"
   VITE_EMAIL="info@abrroadlines.com"
   VITE_WHATSAPP_NUMBER="919315001977"
   ```
5. Deploy. Vercel automatically creates a global Edge CDN deployment.

### Option B: Deploying to Netlify
1. Log in to [Netlify](https://netlify.com) and import the repository.
2. Base directory: `client`
3. Build command: `npm run build`
4. Publish directory: `client/dist`
5. Create a `client/public/_redirects` file with the following line for SPA routing:
   ```
   /*    /index.html   200
   ```

---

## 3. Backend Deployment (Render / VPS with PM2 + Nginx)

### Option A: Render Cloud Deployment
1. Log into [Render](https://render.com) and choose **"New Web Service"**.
2. Connect your repo and set:
   - **Root Directory:** `server`
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
3. Add Environment Variables:
   - `PORT`: `5000`
   - `NODE_ENV`: `production`
   - `CLIENT_URL`: `https://abrroadlines.com`
   - `MONGO_URI`: `mongodb+srv://<user>:<password>@cluster.mongodb.net/abrroadlines?retryWrites=true&w=majority`
   - `JWT_SECRET`: `[Generate strong 64-char random string]`
   - `SMTP_HOST`: `smtp.gmail.com` (or SendGrid/Amazon SES)
   - `SMTP_PORT`: `587`
   - `SMTP_USER`: `info@abrroadlines.com`
   - `SMTP_PASS`: `[App Password]`
   - `ADMIN_NOTIFICATION_EMAIL`: `info@abrroadlines.com`

---

### Option B: Self-Hosted Ubuntu VPS (PM2 + Nginx + Let's Encrypt SSL)

#### 1. Server Prerequisites
```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y curl git nginx ufw

# Install Node.js 20 LTS / 22
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs

# Install PM2 Process Manager globally
sudo npm install -g pm2
```

#### 2. Clone & Setup Application
```bash
cd /var/www
sudo git clone https://github.com/your-org/abrroadlines.git
cd abrroadlines/server
sudo npm install --production

# Create Production .env
sudo cp .env.example .env
sudo nano .env
```

#### 3. Run Database Seeds
```bash
npm run seed
```

#### 4. Configure PM2 Process
```bash
pm2 start src/server.js --name "abr-api" -i max
pm2 save
pm2 startup
```

#### 5. Configure Nginx Reverse Proxy & 301 Redirects
Create `/etc/nginx/sites-available/abrroadlines`:
```nginx
# 301 Redirects from non-www to www or vice versa
server {
    listen 80;
    server_name www.abrroadlines.com;
    return 301 https://abrroadlines.com$request_uri;
}

# Backend API Reverse Proxy
server {
    listen 80;
    server_name api.abrroadlines.com;

    location / {
        proxy_pass http://127.0.0.1:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}

# Client Static SPA Hosting
server {
    listen 80;
    server_name abrroadlines.com;
    root /var/www/abrroadlines/client/dist;
    index index.html;

    # Gzip & Brotli Compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied any;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml application/json image/svg+xml;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|svg|ico|webp|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, no-transform";
    }

    # 301 Legacy redirects
    rewrite ^/about-us/?$ /about permanent;
    rewrite ^/service/?$ /services permanent;
    rewrite ^/our-fleet/?$ /services permanent;
    rewrite ^/contact-us/?$ /contact permanent;
}
```

Enable site and test Nginx:
```bash
sudo ln -s /etc/nginx/sites-available/abrroadlines /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

#### 6. Issue Free SSL with Certbot
```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d abrroadlines.com -d www.abrroadlines.com -d api.abrroadlines.com
```

---

## 4. Verification Checklist

- [x] Client builds in under 3s with Vite code splitting.
- [x] API healthcheck endpoint responds at `/api/health`.
- [x] Contact form submissions save to MongoDB and dispatch email to `info@abrroadlines.com`.
- [x] Quote form submissions generate reference ID and trigger notification email.
- [x] Live GPS tracking operates with sample consignment `ABR-10023` and `ABR-10045`.
- [x] WhatsApp button launches direct chat to `+91 93150 01977`.
- [x] LocalBusiness & Service schema JSON-LD valid for Google Rich Snippets.

