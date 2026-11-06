import Blog from '../models/Blog.js';
import { isDbConnected } from '../config/db.js';

// Fallback seed data in case DB is offline
const fallbackBlogs = [
  {
    _id: 'b-1',
    title: 'How Dedicated Attached Fleets Cut Supply Chain Idle Costs by 22%',
    slug: 'how-dedicated-attached-fleets-cut-supply-chain-idle-costs',
    category: 'Supply Chain Strategy',
    readTime: '5 min read',
    publishedAt: new Date('2026-10-15'),
    author: 'Rajesh Sharma, Director of Operations',
    excerpt: 'Why modern manufacturers are shifting away from volatile spot transport markets in favor of contracted dedicated fleets.',
    coverImage: '/images/services/attached-basis.svg',
    tags: ['Attached Basis', 'Cost Optimization', 'Fleet Management'],
    content: '<p>Under the Attached Basis model, commercial vehicles are assigned exclusively to an enterprise...</p>',
  },
  {
    _id: 'b-2',
    title: 'Highway Logistics & The Power of 24/7 Digital Control Towers',
    slug: 'highway-logistics-power-of-digital-control-towers',
    category: 'Technology & Telematics',
    readTime: '6 min read',
    publishedAt: new Date('2026-10-02'),
    author: 'Vikas Aggarwal, VP Fleet Engineering',
    excerpt: 'How IoT sensors, geofencing, and centralized telemetry transformed our Ambala Cantt HQ into a predictive monitoring hub.',
    coverImage: '/images/about/control-tower.svg',
    tags: ['Control Tower', 'Telematics', 'GPS Tracking'],
    content: '<p>At ABR Roadlines Ambala Cantt Operations Tower, giant screens map real-time vehicle vectors across the entire country...</p>',
  },
];

export async function getAllBlogs(req, res, next) {
  try {
    const { search, category, page = 1, limit = 10 } = req.query;

    if (isDbConnected()) {
      const query = { isPublished: true };
      if (category && category !== 'All') {
        query.category = category;
      }
      if (search) {
        query.$or = [
          { title: { $regex: search, $options: 'i' } },
          { excerpt: { $regex: search, $options: 'i' } },
          { tags: { $in: [new RegExp(search, 'i')] } },
        ];
      }

      const total = await Blog.countDocuments(query);
      const blogs = await Blog.find(query)
        .sort({ publishedAt: -1 })
        .skip((page - 1) * limit)
        .limit(Number(limit));

      return res.json({
        success: true,
        data: blogs,
        meta: {
          total,
          page: Number(page),
          pages: Math.ceil(total / limit) || 1,
        },
      });
    }

    // Memory fallback
    let filtered = [...fallbackBlogs];
    if (category && category !== 'All') {
      filtered = filtered.filter((b) => b.category === category);
    }
    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(
        (b) => b.title.toLowerCase().includes(q) || b.excerpt.toLowerCase().includes(q)
      );
    }

    return res.json({
      success: true,
      data: filtered,
      meta: { total: filtered.length, page: 1, pages: 1 },
    });
  } catch (error) {
    next(error);
  }
}

export async function getBlogBySlug(req, res, next) {
  try {
    const { slug } = req.params;

    if (isDbConnected()) {
      const blog = await Blog.findOne({ slug });
      if (!blog) {
        return res.status(404).json({ success: false, message: 'Article not found' });
      }
      return res.json({ success: true, data: blog });
    }

    const blog = fallbackBlogs.find((b) => b.slug === slug);
    if (!blog) {
      return res.status(404).json({ success: false, message: 'Article not found' });
    }
    return res.json({ success: true, data: blog });
  } catch (error) {
    next(error);
  }
}

export async function createBlog(req, res, next) {
  try {
    const blogData = req.body;
    if (!blogData.slug) {
      blogData.slug = blogData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
    }

    if (isDbConnected()) {
      const created = await Blog.create(blogData);
      return res.status(201).json({ success: true, data: created });
    }

    const memoryBlog = { _id: 'b-' + Date.now(), ...blogData };
    fallbackBlogs.unshift(memoryBlog);
    return res.status(201).json({ success: true, data: memoryBlog });
  } catch (error) {
    next(error);
  }
}

export async function deleteBlog(req, res, next) {
  try {
    const { id } = req.params;

    if (isDbConnected()) {
      await Blog.findByIdAndDelete(id);
      return res.json({ success: true, message: 'Blog deleted successfully' });
    }

    const idx = fallbackBlogs.findIndex((b) => b._id === id);
    if (idx !== -1) fallbackBlogs.splice(idx, 1);
    return res.json({ success: true, message: 'Blog deleted successfully' });
  } catch (error) {
    next(error);
  }
}

