import Shipment from '../models/Shipment.js';
import { isDbConnected } from '../config/db.js';

const fallbackShipments = {
  'ABR-10023': {
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
  'ABR-10045': {
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
};

export async function trackByLr(req, res, next) {
  try {
    const lrNumber = req.params.lrNumber.trim().toUpperCase();

    if (isDbConnected()) {
      const shipment = await Shipment.findOne({ lrNumber });
      if (shipment) {
        return res.json({ success: true, data: shipment });
      }
    }

    if (fallbackShipments[lrNumber]) {
      return res.json({ success: true, data: fallbackShipments[lrNumber] });
    }

    return res.status(404).json({
      success: false,
      message: `No active shipment record found for LR "${lrNumber}".`,
    });
  } catch (error) {
    next(error);
  }
}

