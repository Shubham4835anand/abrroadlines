import mongoose from 'mongoose';

const shipmentStepSchema = new mongoose.Schema({
  title: String,
  location: String,
  time: String,
  completed: Boolean,
  current: Boolean,
});

const shipmentSchema = new mongoose.Schema(
  {
    lrNumber: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ['Booked', 'Dispatched', 'In Transit', 'Out for Delivery', 'Delivered'],
      default: 'In Transit',
    },
    origin: {
      type: String,
      required: true,
    },
    destination: {
      type: String,
      required: true,
    },
    currentLocation: {
      type: String,
      default: 'Highway Linehaul In Transit',
    },
    vehicleNumber: {
      type: String,
      required: true,
    },
    driverName: {
      type: String,
      default: 'Assigned Driver Relay',
    },
    speed: {
      type: String,
      default: '55 km/h',
    },
    gpsStatus: {
      type: String,
      default: 'Active IoT Telematics',
    },
    dispatchTime: String,
    estimatedDelivery: String,
    cargoType: String,
    steps: [shipmentStepSchema],
  },
  { timestamps: true }
);

export default mongoose.models.Shipment || mongoose.model('Shipment', shipmentSchema);

