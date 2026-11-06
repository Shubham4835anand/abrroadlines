import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imagesDir = path.resolve(__dirname, '../../public/images');

const makeSvg = (width, height, title, subtitle, iconType = 'truck', primaryColor = '#0B192C', accentColor = '#FF6500') => {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" fill="none">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${primaryColor}"/>
      <stop offset="100%" stop-color="#1E3E62"/>
    </linearGradient>
    <linearGradient id="accentGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${accentColor}"/>
      <stop offset="100%" stop-color="#FFA040"/>
    </linearGradient>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="1"/>
    </pattern>
  </defs>

  <rect width="${width}" height="${height}" fill="url(#bgGrad)"/>
  <rect width="${width}" height="${height}" fill="url(#grid)"/>

  <!-- Geometric Speed lines -->
  <path d="M 0 ${height * 0.75} Q ${width * 0.3} ${height * 0.5} ${width} ${height * 0.8}" stroke="rgba(255,101,0,0.15)" stroke-width="6" fill="none"/>
  <path d="M 0 ${height * 0.8} Q ${width * 0.4} ${height * 0.6} ${width} ${height * 0.85}" stroke="rgba(255,255,255,0.08)" stroke-width="3" fill="none"/>

  <!-- Center Visual Motif -->
  <g transform="translate(${width/2 - 60}, ${height/2 - 80})">
    <rect x="0" y="0" width="120" height="120" rx="24" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.15)" stroke-width="2"/>
    ${iconType === 'avatar' ? `
      <circle cx="60" cy="48" r="22" fill="#E2E8F0"/>
      <path d="M28 100 C28 78 42 70 60 70 C78 70 92 78 92 100 Z" fill="#E2E8F0"/>
    ` : iconType === 'warehouse' ? `
      <path d="M30 65 L60 35 L90 65 L90 95 L30 95 Z" fill="none" stroke="#FF6500" stroke-width="4"/>
      <path d="M45 95 L45 75 L75 75 L75 95" fill="none" stroke="#FFFFFF" stroke-width="3"/>
    ` : `
      <!-- Truck Icon -->
      <path d="M25 75 L25 45 L65 45 L80 60 L95 60 L95 75 Z" fill="none" stroke="#FFFFFF" stroke-width="3.5" stroke-linejoin="round"/>
      <line x1="65" y1="45" x2="65" y2="75" stroke="#FFFFFF" stroke-width="3.5"/>
      <circle cx="42" cy="78" r="9" fill="#FF6500"/>
      <circle cx="82" cy="78" r="9" fill="#FF6500"/>
    `}
  </g>

  <!-- Typography -->
  <text x="${width/2}" y="${height/2 + 75}" text-anchor="middle" font-family="'Poppins', sans-serif" font-weight="700" font-size="${Math.min(26, width * 0.035)}" fill="#FFFFFF" letter-spacing="0.5">${title}</text>
  <text x="${width/2}" y="${height/2 + 105}" text-anchor="middle" font-family="'Inter', sans-serif" font-weight="500" font-size="${Math.min(15, width * 0.02)}" fill="#94A3B8" letter-spacing="1.5">${subtitle}</text>
  
  <!-- Subtle Badge Bottom Right -->
  <rect x="${width - 160}" y="${height - 40}" width="140" height="26" rx="6" fill="rgba(15,23,42,0.6)"/>
  <text x="${width - 90}" y="${height - 23}" text-anchor="middle" font-family="'Inter', sans-serif" font-size="11" font-weight="600" fill="#FF6500">ABR ROADLINES</text>
</svg>`;
};

const images = [
  { dir: 'hero', file: 'hero-truck.svg', w: 1200, h: 800, title: 'Pan-India Express Transport', sub: 'GPS-ENABLED FLEET • ZERO TRANSIT DELAYS', icon: 'truck' },
  { dir: 'fleet', file: 'fleet-container.svg', w: 800, h: 600, title: 'Multi-Axle Container Fleet', sub: '32FT TO 40FT MX HIGH-CUBE VEHICLES', icon: 'truck' },
  { dir: 'fleet', file: 'fleet-trailer.svg', w: 800, h: 600, title: 'Heavy Duty Flatbed Trailers', sub: 'OVER-DIMENSIONAL CARGO CAPABLE', icon: 'truck' },
  { dir: 'fleet', file: 'fleet-express.svg', w: 800, h: 600, title: 'Time-Critical Express Liners', sub: 'DUAL-DRIVER ROUND-THE-CLOCK TRANSIT', icon: 'truck' },
  { dir: 'services', file: 'attached-basis.svg', w: 800, h: 600, title: 'Dedicated Fleet Attachment', sub: 'CUSTOMIZED TRUCKS ATTACHED TO YOUR ENTERPRISE', icon: 'truck' },
  { dir: 'services', file: 'time-definite.svg', w: 800, h: 600, title: 'Time-Definite Express Logistics', sub: 'GUARANTEED SLA DELIVERY WINDOWS', icon: 'truck' },
  { dir: 'services', file: 'hub-to-hub.svg', w: 800, h: 600, title: 'Hub-to-Hub Scheduled Linehaul', sub: 'INTER-STATE DISTRIBUTION NETWORKS', icon: 'warehouse' },
  { dir: 'about', file: 'headquarters.svg', w: 900, h: 600, title: 'Corporate HQ & Transit Yard', sub: 'AMBALA CANTT, HARYANA • NH-1 G.T. ROAD', icon: 'warehouse' },
  { dir: 'about', file: 'control-tower.svg', w: 900, h: 600, title: '24/7 Digital Control Tower', sub: 'PREDICTIVE TELEMATICS & AI DISPATCH', icon: 'warehouse' },
  { dir: 'team', file: 'team-md.svg', w: 600, h: 600, title: 'Executive Leadership', sub: 'CHAIRMAN & MANAGING DIRECTOR', icon: 'avatar' },
  { dir: 'team', file: 'team-ops.svg', w: 600, h: 600, title: 'Operations Director', sub: 'HEAD OF PAN-INDIA TRANSIT', icon: 'avatar' },
  { dir: 'team', file: 'team-fleet.svg', w: 600, h: 600, title: 'VP Fleet Engineering', sub: 'TELEMATICS & VEHICLE SAFETY', icon: 'avatar' },
  { dir: 'team', file: 'team-crm.svg', w: 600, h: 600, title: 'Chief Customer Officer', sub: 'ENTERPRISE CLIENT PARTNERSHIPS', icon: 'avatar' },
  { dir: 'gallery', file: 'gallery-fleet-1.svg', w: 800, h: 600, title: 'Modern Fleet at Ambala Terminal', sub: 'STATE-OF-THE-ART CONTAINERS', icon: 'truck' },
  { dir: 'gallery', file: 'gallery-loading-2.svg', w: 800, h: 600, title: 'High-Throughput Loading Docks', sub: 'PALLETIZED CARGO OPERATIONS', icon: 'warehouse' },
  { dir: 'gallery', file: 'gallery-telematics-3.svg', w: 800, h: 600, title: 'Real-Time Control Tower', sub: 'IOT TRACKING & GPS TELEMATICS', icon: 'warehouse' },
  { dir: 'gallery', file: 'gallery-highway-4.svg', w: 800, h: 600, title: 'Express Highway Linehaul', sub: 'DEDICATED CORRIDOR TRANSIT', icon: 'truck' },
  { dir: 'gallery', file: 'gallery-inspection-5.svg', w: 800, h: 600, title: 'Pre-Trip Rigorous Inspection', sub: 'ZERO BREAKDOWN PROTOCOLS', icon: 'truck' },
  { dir: 'gallery', file: 'gallery-hub-6.svg', w: 800, h: 600, title: 'Strategic Regional Hub', sub: 'NORTH INDIA CENTRAL DISTRIBUTION', icon: 'warehouse' },
];

images.forEach(img => {
  const targetPath = path.join(imagesDir, img.dir, img.file);
  const content = makeSvg(img.w, img.h, img.title, img.sub, img.icon);
  fs.writeFileSync(targetPath, content, 'utf8');
  console.log(`Generated: ${targetPath}`);
});

// Generate client logos
const clientBrands = ['Tata Steel Logistics', 'Reliance Retail', 'Adani Logistics', 'Maruti Suzuki Supply', 'ITC Limited', 'Havells India'];
clientBrands.forEach((brand, idx) => {
  const targetPath = path.join(imagesDir, 'clients', `client-${idx+1}.svg`);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 80" width="240" height="80" fill="none">
    <rect width="240" height="80" rx="8" fill="#F8FAFC" stroke="#E2E8F0"/>
    <text x="120" y="46" text-anchor="middle" font-family="'Poppins', sans-serif" font-weight="700" font-size="15" fill="#334155">${brand}</text>
  </svg>`;
  fs.writeFileSync(targetPath, svg, 'utf8');
});

console.log('All image placeholders generated successfully.');
