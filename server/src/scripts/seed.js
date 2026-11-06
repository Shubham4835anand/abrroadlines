import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import User from '../models/User.js';
import Blog from '../models/Blog.js';
import GalleryItem from '../models/GalleryItem.js';
import Shipment from '../models/Shipment.js';
import ContactEnquiry from '../models/ContactEnquiry.js';
import QuoteRequest from '../models/QuoteRequest.js';
import logger from '../config/logger.js';

async function seed() {
  const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/abrroadlines';
  console.log(`Connecting to MongoDB for seeding at: ${uri}`);

  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
    console.log('MongoDB connected for seeding.');

    // 1. Seed Admin User
    await User.deleteMany({ email: 'admin@abrroadlines.com' });
    const admin = new User({
      name: 'ABR Fleet Admin',
      email: 'admin@abrroadlines.com',
      password: 'Admin@1234',
      role: 'admin',
    });
    await admin.save();
    console.log('Admin user seeded: admin@abrroadlines.com / Admin@1234');

    // 2. Seed Blogs
    await Blog.deleteMany({});
    const blogs = [
      {
        title: 'How Dedicated Attached Fleets Cut Supply Chain Idle Costs by 22%',
        slug: 'how-dedicated-attached-fleets-cut-supply-chain-idle-costs',
        category: 'Supply Chain Strategy',
        readTime: '5 min read',
        publishedAt: new Date('2026-10-15'),
        author: 'Rajesh Sharma, Director of Operations',
        excerpt: 'Why modern manufacturers are shifting away from volatile spot transport markets in favor of contracted dedicated fleets.',
        coverImage: '/images/services/attached-basis.svg',
        tags: ['Attached Basis', 'Cost Optimization', 'Fleet Management'],
        content: `<h2>The Volatility Dilemma in Indian Road Freight</h2><p>For decades, Indian corporate logistics managers have relied heavily on spot freight brokers...</p>`,
      },
      {
        title: 'Highway Logistics & The Power of 24/7 Digital Control Towers',
        slug: 'highway-logistics-power-of-digital-control-towers',
        category: 'Technology & Telematics',
        readTime: '6 min read',
        publishedAt: new Date('2026-10-02'),
        author: 'Vikas Aggarwal, VP Fleet Engineering',
        excerpt: 'How IoT sensors, geofencing, and centralized telemetry transformed our Ambala Cantt HQ into a predictive monitoring hub.',
        coverImage: '/images/about/control-tower.svg',
        tags: ['Control Tower', 'Telematics', 'GPS Tracking'],
        content: `<h2>The Shift from Reactive Tracking to Predictive Command</h2><p>Old-school tracking meant calling a truck driver three times a day...</p>`,
      },
      {
        title: 'Maximizing Volumetric Payload: Why 32 Ft Multi-Axle Containers Rule Modern Linehaul',
        slug: 'why-32-ft-multi-axle-containers-rule-modern-linehaul',
        category: 'Fleet & Equipment',
        readTime: '4 min read',
        publishedAt: new Date('2026-09-18'),
        author: 'Baljit Singh, Managing Director',
        excerpt: 'An engineering look at how high-cube closed body containers have revolutionized FMCG, automotive parts, and e-commerce linehaul in India.',
        coverImage: '/images/fleet/fleet-container.svg',
        tags: ['Fleet Specifications', 'Multi-Axle', 'Container Freight'],
        content: `<h2>Volumetric vs Gross Weight Efficiency</h2><p>Modern e-commerce and retail cargo has high volume but relatively low weight density...</p>`,
      },
    ];
    await Blog.insertMany(blogs);
    console.log(`${blogs.length} blogs seeded successfully.`);

    // 3. Seed Gallery
    await GalleryItem.deleteMany({});
    const gallery = [
      {
        title: 'Modern Fleet at Ambala Terminal Yard',
        category: 'Fleet',
        location: 'Ambala Cantt HQ, Haryana',
        src: '/images/gallery/gallery-fleet-1.svg',
        description: 'High-cube 32ft multi-axle container fleet staged for evening interstate departure.',
      },
      {
        title: 'High-Throughput Cross-Dock Loading',
        category: 'Facilities',
        location: 'Regional Sorting Terminal',
        src: '/images/gallery/gallery-loading-2.svg',
        description: 'Automated hydraulic dock levelers and rapid forklift loading ensuring 20-minute turnaround.',
      },
      {
        title: '24/7 Digital Control & Telematics Tower',
        category: 'Technology',
        location: 'Central Command Center',
        src: '/images/gallery/gallery-telematics-3.svg',
        description: 'Real-time telemetry tracking live vehicle vectors nationwide.',
      },
    ];
    await GalleryItem.insertMany(gallery);
    console.log(`${gallery.length} gallery items seeded.`);

    // 4. Seed Shipments
    await Shipment.deleteMany({});
    const shipments = [
      {
        lrNumber: 'ABR-10023',
        status: 'In Transit',
        origin: 'Ambala Central Terminal, Haryana',
        destination: 'Bhiwandi Hub, Mumbai, Maharashtra',
        currentLocation: 'Passing Kotputli on Delhi-Jaipur Expressway (NH-48)',
        vehicleNumber: 'HR-01-AB-4492 (32 Ft MX Container)',
        driverName: 'Sukhwinder Singh & Relay Driver Ramesh',
        speed: '58 km/h',
        gpsStatus: 'Active IoT Telematics — Signal Strong',
        dispatchTime: 'Yesterday, 19:30 IST',
        estimatedDelivery: 'Tomorrow, 14:00 IST',
        cargoType: 'Palletized FMCG Cartons (18.5 MT)',
        steps: [
          { title: 'Booking & Bay Dock In', location: 'Ambala HQ Hub', time: '04 Nov, 16:30', completed: true },
          { title: 'Loaded & Tamper Seal Affixed', location: 'Ambala Dock 04', time: '04 Nov, 18:45', completed: true },
          { title: 'Highway Linehaul Dispatched', location: 'NH-1 Arterial Exit', time: '04 Nov, 19:30', completed: true },
          { title: 'Transit Telematics Active', location: 'Delhi-Jaipur Expressway', time: 'Live Updates', completed: true, current: true },
          { title: 'Arrival at Bhiwandi Mother Hub', location: 'Mumbai Terminal', time: 'Expected 06 Nov, 11:30', completed: false },
          { title: 'Delivery & e-POD Signed', location: 'Consignee Bay', time: 'Expected 06 Nov, 14:00', completed: false },
        ],
      },
      {
        lrNumber: 'ABR-10045',
        status: 'Delivered',
        origin: 'Baddi Industrial Area, Himachal Pradesh',
        destination: 'Sanand Industrial Estate, Ahmedabad, Gujarat',
        currentLocation: 'Delivered at Consignee Inbound Gate 2',
        vehicleNumber: 'HR-01-XY-9021 (32 Ft Single Axle)',
        driverName: 'Harpreet Singh',
        speed: 'Stationary (Docked)',
        gpsStatus: 'Completed Geofence Exit',
        dispatchTime: '02 Nov, 14:00 IST',
        estimatedDelivery: '04 Nov, 17:15 IST (Delivered On-Time)',
        cargoType: 'Automotive Precision Sub-Assemblies (8.2 MT)',
        steps: [
          { title: 'Booking & Factory Bay Dock In', location: 'Baddi Plant Hub', time: '02 Nov, 11:00', completed: true },
          { title: 'Loaded & Manifest Signed', location: 'Baddi Dock', time: '02 Nov, 13:30', completed: true },
          { title: 'Highway Linehaul Dispatched', location: 'Via Ambala Junction', time: '02 Nov, 14:00', completed: true },
          { title: 'Expressway Transit Completed', location: 'Western Corridor', time: '04 Nov, 12:00', completed: true },
          { title: 'Arrival at Sanand Hub', location: 'Ahmedabad Terminal', time: '04 Nov, 15:30', completed: true },
          { title: 'Delivered & e-POD Signed', location: 'Factory Gate 2', time: '04 Nov, 17:15', completed: true, current: true },
        ],
      },
    ];
    await Shipment.insertMany(shipments);
    console.log(`${shipments.length} sample tracking shipments seeded.`);

    console.log('Seeding completed successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err.message);
    process.exit(1);
  }
}

seed();

