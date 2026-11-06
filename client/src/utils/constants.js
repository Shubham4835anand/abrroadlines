export const COMPANY = {
  name: 'ABR Roadlines Pvt. Ltd.',
  shortName: 'ABR Roadlines',
  tagline: 'Advanced, predictive, tech-enabled, connected logistics infrastructure across all of India',
  address: {
    line1: 'NH-1, Near Ambala Haveli Mohra',
    line2: 'G.T. Road, Ambala Cantt',
    state: 'Haryana',
    pincode: '133001',
    country: 'India',
    full: 'NH-1, Near Ambala Haveli Mohra, G.T. Road, Ambala Cantt, Haryana 133001, India',
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d110196.22593817176!2d76.75!3d30.37!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390fb649b5555555%3A0x1!2sAmbala+Cantt%2C+Haryana+133001!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',
  },
  phone: '+91-93150 01977',
  phoneRaw: '+919315001977',
  email: 'info@abrroadlines.com',
  whatsapp: '+91 93150 01977',
  whatsappRaw: '919315001977',
  whatsappMessage: 'Hello ABR Roadlines, I would like to inquire about road transport and logistics services.',
  cin: 'U60231HR2015PTC054890',
  gst: '06AAACA0000A1Z5',
  hours: {
    office: 'Mon – Sat: 9:00 AM – 8:00 PM',
    operations: '24/7/365 Real-Time Fleet Dispatch & GPS Monitoring',
  },
  socials: {
    facebook: 'https://facebook.com/abrroadlines',
    twitter: 'https://twitter.com/abrroadlines',
    instagram: 'https://instagram.com/abrroadlines',
    linkedin: 'https://linkedin.com/company/abrroadlines',
    whatsapp: 'https://wa.me/919315001977',
  },
  stats: [
    { label: 'Fleet Strength', value: 500, suffix: '+', description: 'GPS-enabled high-capacity commercial vehicles' },
    { label: 'Pan-India Cities', value: 150, suffix: '+', description: 'Direct highway network nodes & regional hubs' },
    { label: 'Years Experience', value: 20, suffix: '+', description: 'Unbroken legacy in inter-state logistics' },
    { label: 'On-Time SLA', value: 99.4, suffix: '%', decimals: 1, description: 'SLA-backed punctual delivery track record' },
    { label: 'Annual Kilometers', value: 12, suffix: 'M+', description: 'Safe road mileage clocked every year' },
  ],
};

export const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'About Us', path: '/about' },
  { 
    name: 'Services', 
    path: '/services',
    children: [
      { name: 'All Services', path: '/services' },
      { name: 'Attached Basis Transport', path: '/services/attached-basis' },
      { name: 'Time-Definite Delivery', path: '/services/time-definite' },
      { name: 'Hub To Hub Linehaul', path: '/services/hub-to-hub' },
    ]
  },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Blogs & Insights', path: '/blogs' },
  { name: 'Tracking', path: '/tracking' },
  { name: 'Contact', path: '/contact' },
];

