import React, { useState, useEffect } from 'react';
import SEO from '../components/seo/SEO';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { contactService, quoteService, blogService } from '../services/api';
import { SAMPLE_BLOGS } from '../data/sampleBlogs';
import { GALLERY_ITEMS } from '../data/galleryData';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import {
  Lock,
  LogOut,
  Mail,
  FileText,
  Image,
  Truck,
  Plus,
  Trash2,
  Calendar,
  CheckCircle2,
} from 'lucide-react';

export default function AdminPage() {
  const { user, login, logout, isAuthenticated } = useAuth();
  const { addToast } = useToast();

  const [activeTab, setActiveTab] = useState('enquiries');
  const [emailInput, setEmailInput] = useState('admin@abrroadlines.com');
  const [passwordInput, setPasswordInput] = useState('Admin@1234');
  const [loggingIn, setLoggingIn] = useState(false);

  // Data states
  const [enquiries, setEnquiries] = useState([
    {
      _id: 'enq-1',
      name: 'Sunil Verma',
      email: 's.verma@manufacturing.in',
      phone: '+91 98123 45678',
      serviceType: 'Attached Basis Transport',
      message: 'Looking for 10 dedicated 32ft MX containers on monthly contract from Ambala to Pune.',
      createdAt: '2026-11-05T10:30:00Z',
    },
    {
      _id: 'enq-2',
      name: 'Meenakshi Rao',
      email: 'mrao@retailfmcg.com',
      phone: '+91 98765 01234',
      serviceType: 'Time-Definite Delivery',
      message: 'Need daily scheduled express runs from Delhi NCR to Ahmedabad with guaranteed 36-hr transit.',
      createdAt: '2026-11-04T15:20:00Z',
    },
  ]);

  const [quotes, setQuotes] = useState([
    {
      _id: 'q-1',
      fullName: 'Vikram Mehta',
      phone: '+91 98234 56789',
      email: 'vmehta@autospares.com',
      companyName: 'Mehta Precision Spares',
      pickupCity: 'Gurugram',
      dropCity: 'Bengaluru',
      vehicleType: '32 Ft Multi-Axle Container (18-22 MT)',
      loadType: 'Automotive & Spare Parts',
      weightMetricTons: '16 MT',
      createdAt: '2026-11-05T11:45:00Z',
    },
  ]);

  const [blogs, setBlogs] = useState(SAMPLE_BLOGS);
  const [newBlog, setNewBlog] = useState({
    title: '',
    category: 'Supply Chain Strategy',
    readTime: '4 min read',
    excerpt: '',
    content: '',
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoggingIn(true);
    try {
      await login(emailInput, passwordInput);
      addToast('Welcome back, Admin! Session authenticated.', 'success');
    } catch (err) {
      addToast(err.message || 'Invalid credentials', 'error');
    } finally {
      setLoggingIn(false);
    }
  };

  const handleAddBlog = (e) => {
    e.preventDefault();
    if (!newBlog.title || !newBlog.content) {
      addToast('Please provide a title and content', 'error');
      return;
    }
    const created = {
      _id: 'blog-' + Date.now(),
      title: newBlog.title,
      slug: newBlog.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      category: newBlog.category,
      readTime: newBlog.readTime,
      publishedAt: new Date().toISOString(),
      author: 'ABR Editorial Desk',
      excerpt: newBlog.excerpt || newBlog.title,
      coverImage: '/images/services/attached-basis.svg',
      content: `<p>${newBlog.content}</p>`,
    };
    setBlogs([created, ...blogs]);
    setNewBlog({
      title: '',
      category: 'Supply Chain Strategy',
      readTime: '4 min read',
      excerpt: '',
      content: '',
    });
    addToast('New blog article published successfully!', 'success');
  };

  const handleDeleteBlog = (id) => {
    setBlogs(blogs.filter((b) => b._id !== id));
    addToast('Article removed from publication.', 'info');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center py-16 px-4 bg-slate-50">
        <SEO title="Admin Login | ABR Roadlines" />
        <div className="max-w-md w-full bg-white p-8 rounded-3xl border border-slate-200 shadow-soft-lg">
          <div className="w-12 h-12 rounded-2xl bg-brand-navy text-white flex items-center justify-center mx-auto mb-4">
            <Lock className="w-6 h-6 text-brand-orange" />
          </div>
          <h1 className="text-2xl font-bold text-center text-brand-navy mb-1">
            Admin Operations Portal
          </h1>
          <p className="text-xs text-center text-slate-500 mb-6">
            Sign in to manage client enquiries, rate quotes, and published articles
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Admin Email
              </label>
              <input
                type="email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-brand-orange focus:ring-1 focus:ring-brand-orange"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Security Password
              </label>
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-brand-orange focus:ring-1 focus:ring-brand-orange"
                required
              />
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-[11px] text-slate-600">
              <strong>Evaluation Credentials:</strong>
              <div>Email: <code>admin@abrroadlines.com</code></div>
              <div>Password: <code>Admin@1234</code></div>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={loggingIn}
              className="w-full"
            >
              Sign In to Dashboard
            </Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <SEO title="Operations Control Dashboard" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-soft mb-8">
          <div>
            <div className="flex items-center gap-2">
              <Badge variant="orange" size="sm">Admin Portal</Badge>
              <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                Live Session Active
              </span>
            </div>
            <h1 className="text-2xl font-bold text-brand-navy mt-1">
              Freight Operations & Enquiries
            </h1>
            <p className="text-xs text-slate-500">Signed in as {user?.email || 'admin@abrroadlines.com'}</p>
          </div>

          <Button
            onClick={logout}
            variant="outline"
            size="sm"
            icon={LogOut}
            iconPosition="right"
          >
            Sign Out
          </Button>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setActiveTab('enquiries')}
            className={`px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-colors ${
              activeTab === 'enquiries'
                ? 'bg-brand-navy text-white'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            <Mail className="w-4 h-4" />
            <span>Contact Enquiries ({enquiries.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('quotes')}
            className={`px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-colors ${
              activeTab === 'quotes'
                ? 'bg-brand-navy text-white'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            <Truck className="w-4 h-4" />
            <span>Quote Requests ({quotes.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('blogs')}
            className={`px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-colors ${
              activeTab === 'blogs'
                ? 'bg-brand-navy text-white'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Manage Blogs ({blogs.length})</span>
          </button>
        </div>

        {/* Tab 1: Contact Enquiries */}
        {activeTab === 'enquiries' && (
          <div className="space-y-4">
            {enquiries.map((enq) => (
              <Card key={enq._id} padding="p-6" className="bg-white border-slate-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 pb-3 border-b border-slate-100">
                  <div>
                    <h3 className="text-base font-bold text-brand-navy">{enq.name}</h3>
                    <div className="text-xs text-slate-500">
                      {enq.email} • {enq.phone}
                    </div>
                  </div>
                  <Badge variant="orange" size="xs">{enq.serviceType}</Badge>
                </div>
                <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100 mb-3">
                  "{enq.message}"
                </p>
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Received: {new Date(enq.createdAt).toLocaleString()}</span>
                  <a
                    href={`tel:${enq.phone}`}
                    className="text-brand-orange font-bold hover:underline"
                  >
                    Call Client Back
                  </a>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Tab 2: Quote Requests */}
        {activeTab === 'quotes' && (
          <div className="space-y-4">
            {quotes.map((q) => (
              <Card key={q._id} padding="p-6" className="bg-white border-slate-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 pb-3 border-b border-slate-100">
                  <div>
                    <h3 className="text-base font-bold text-brand-navy">{q.fullName}</h3>
                    <div className="text-xs text-slate-500">
                      {q.companyName ? `${q.companyName} • ` : ''}{q.email} • {q.phone}
                    </div>
                  </div>
                  <div className="text-xs font-bold text-brand-orange bg-brand-orange/10 px-3 py-1 rounded-full">
                    {q.pickupCity} ➔ {q.dropCity}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs bg-slate-50 p-4 rounded-xl border border-slate-100 mb-3">
                  <div><strong>Vehicle:</strong> {q.vehicleType}</div>
                  <div><strong>Cargo:</strong> {q.loadType}</div>
                  <div><strong>Weight:</strong> {q.weightMetricTons}</div>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Requested: {new Date(q.createdAt).toLocaleString()}</span>
                  <a
                    href={`mailto:${q.email}?subject=Freight Quote from ABR Roadlines`}
                    className="text-brand-navy font-bold hover:underline"
                  >
                    Email Rate Quotation
                  </a>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Tab 3: Manage Blogs */}
        {activeTab === 'blogs' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Create Post */}
            <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-slate-200 shadow-soft">
              <h3 className="text-lg font-bold text-brand-navy mb-4">
                Publish New Insight Article
              </h3>
              <form onSubmit={handleAddBlog} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Article Title *
                  </label>
                  <input
                    type="text"
                    value={newBlog.title}
                    onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
                    placeholder="e.g. Electric Trucks on Indian Highways"
                    className="w-full px-4 py-2 rounded-xl border border-slate-200 text-sm focus:border-brand-orange"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Category
                  </label>
                  <select
                    value={newBlog.category}
                    onChange={(e) => setNewBlog({ ...newBlog, category: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl border border-slate-200 text-sm bg-white"
                  >
                    <option value="Supply Chain Strategy">Supply Chain Strategy</option>
                    <option value="Technology & Telematics">Technology & Telematics</option>
                    <option value="Fleet & Equipment">Fleet & Equipment</option>
                    <option value="Policy & Compliance">Policy & Compliance</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Summary / Excerpt
                  </label>
                  <input
                    type="text"
                    value={newBlog.excerpt}
                    onChange={(e) => setNewBlog({ ...newBlog, excerpt: e.target.value })}
                    placeholder="Short 2-sentence summary..."
                    className="w-full px-4 py-2 rounded-xl border border-slate-200 text-sm focus:border-brand-orange"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Content Body *
                  </label>
                  <textarea
                    rows={5}
                    value={newBlog.content}
                    onChange={(e) => setNewBlog({ ...newBlog, content: e.target.value })}
                    placeholder="Write article insights..."
                    className="w-full px-4 py-2 rounded-xl border border-slate-200 text-sm focus:border-brand-orange"
                    required
                  />
                </div>

                <Button type="submit" variant="primary" size="md" icon={Plus} className="w-full">
                  Publish Article
                </Button>
              </form>
            </div>

            {/* Existing Posts List */}
            <div className="lg:col-span-7 space-y-4">
              <h3 className="text-lg font-bold text-brand-navy mb-2">
                Published Articles ({blogs.length})
              </h3>

              {blogs.map((b) => (
                <div
                  key={b._id}
                  className="bg-white p-5 rounded-2xl border border-slate-200 shadow-soft flex items-center justify-between gap-4"
                >
                  <div className="flex-1">
                    <div className="text-xs font-semibold text-brand-orange mb-1">
                      {b.category} • {b.readTime}
                    </div>
                    <h4 className="font-bold text-brand-navy text-sm mb-1">{b.title}</h4>
                    <p className="text-xs text-slate-500 line-clamp-1">{b.excerpt}</p>
                  </div>

                  <button
                    onClick={() => handleDeleteBlog(b._id)}
                    className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                    title="Delete Article"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

