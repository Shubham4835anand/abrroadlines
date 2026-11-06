import mongoose from 'mongoose';

const galleryItemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: ['Fleet', 'Facilities', 'Technology', 'Operations', 'Safety'],
    },
    location: {
      type: String,
      default: 'Ambala Cantt HQ, Haryana',
    },
    src: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: '',
    },
    aspect: {
      type: String,
      default: 'aspect-[4/3]',
    },
  },
  { timestamps: true }
);

export default mongoose.models.GalleryItem ||
  mongoose.model('GalleryItem', galleryItemSchema);

