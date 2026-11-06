import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      default: 'Supply Chain Strategy',
    },
    readTime: {
      type: String,
      default: '5 min read',
    },
    publishedAt: {
      type: Date,
      default: Date.now,
    },
    author: {
      type: String,
      default: 'ABR Editorial Desk',
    },
    excerpt: {
      type: String,
      required: true,
    },
    coverImage: {
      type: String,
      default: '/images/services/attached-basis.svg',
    },
    tags: [String],
    content: {
      type: String,
      required: true,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Blog || mongoose.model('Blog', blogSchema);

