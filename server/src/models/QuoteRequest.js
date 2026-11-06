import mongoose from 'mongoose';

const quoteRequestSchema = new mongoose.Schema(
  {
    referenceId: {
      type: String,
      unique: true,
      required: true,
      default: () => 'ABR-Q' + Math.floor(100000 + Math.random() * 900000),
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    companyName: {
      type: String,
      trim: true,
    },
    pickupCity: {
      type: String,
      required: true,
      trim: true,
    },
    dropCity: {
      type: String,
      required: true,
      trim: true,
    },
    vehicleType: {
      type: String,
      required: true,
    },
    loadType: {
      type: String,
      required: true,
    },
    weightMetricTons: {
      type: String,
      required: true,
    },
    pickupDate: {
      type: String,
    },
    additionalNotes: {
      type: String,
    },
    status: {
      type: String,
      enum: ['pending', 'quoted', 'contracted', 'rejected'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

export default mongoose.models.QuoteRequest ||
  mongoose.model('QuoteRequest', quoteRequestSchema);

