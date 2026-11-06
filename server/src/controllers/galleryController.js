import GalleryItem from '../models/GalleryItem.js';
import { isDbConnected } from '../config/db.js';

const fallbackGallery = [
  {
    _id: 'g-1',
    title: 'Modern Fleet at Ambala Terminal Yard',
    category: 'Fleet',
    location: 'Ambala Cantt HQ, Haryana',
    src: '/images/gallery/gallery-fleet-1.svg',
    description: 'High-cube 32ft multi-axle container fleet staged for evening interstate departure along NH-1.',
    aspect: 'aspect-[4/3]',
  },
  {
    _id: 'g-2',
    title: 'High-Throughput Cross-Dock Loading',
    category: 'Facilities',
    location: 'Regional Sorting Terminal',
    src: '/images/gallery/gallery-loading-2.svg',
    description: 'Automated hydraulic dock levelers and rapid forklift loading ensuring 20-minute vehicle turnaround times.',
    aspect: 'aspect-[4/3]',
  },
  {
    _id: 'g-3',
    title: '24/7 Digital Control & Telematics Tower',
    category: 'Technology',
    location: 'Central Command Center',
    src: '/images/gallery/gallery-telematics-3.svg',
    description: 'Real-time telemetry tracking live vehicle vectors, speed, geofence compliance, and temperature logs nationwide.',
    aspect: 'aspect-[4/3]',
  },
];

export async function getAllGallery(req, res, next) {
  try {
    if (isDbConnected()) {
      const items = await GalleryItem.find().sort({ createdAt: -1 });
      return res.json({ success: true, count: items.length, data: items });
    }
    return res.json({ success: true, count: fallbackGallery.length, data: fallbackGallery });
  } catch (error) {
    next(error);
  }
}

export async function createGalleryItem(req, res, next) {
  try {
    const itemData = req.body;
    if (isDbConnected()) {
      const created = await GalleryItem.create(itemData);
      return res.status(201).json({ success: true, data: created });
    }
    const memItem = { _id: 'g-' + Date.now(), ...itemData };
    fallbackGallery.unshift(memItem);
    return res.status(201).json({ success: true, data: memItem });
  } catch (error) {
    next(error);
  }
}

