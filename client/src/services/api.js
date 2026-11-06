const API_BASE = import.meta.env.VITE_API_URL || '/api';

export async function fetchApi(endpoint, options = {}) {
  const token = localStorage.getItem('abr_auth_token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || `Request failed with status ${response.status}`);
  }

  return data;
}

// Specific API Services
export const contactService = {
  submit: (formData) =>
    fetchApi('/contact', {
      method: 'POST',
      body: JSON.stringify(formData),
    }),
  getAll: () => fetchApi('/contact'),
};

export const quoteService = {
  submit: (quoteData) =>
    fetchApi('/quote', {
      method: 'POST',
      body: JSON.stringify(quoteData),
    }),
  getAll: () => fetchApi('/quote'),
};

export const blogService = {
  getAll: (params = '') => fetchApi(`/blogs${params ? `?${params}` : ''}`),
  getBySlug: (slug) => fetchApi(`/blogs/${slug}`),
  create: (blogData) =>
    fetchApi('/blogs', {
      method: 'POST',
      body: JSON.stringify(blogData),
    }),
  delete: (id) =>
    fetchApi(`/blogs/${id}`, {
      method: 'DELETE',
    }),
};

export const galleryService = {
  getAll: () => fetchApi('/gallery'),
};

export const trackingService = {
  track: (consignmentNumber) => fetchApi(`/tracking/${consignmentNumber}`),
};

export const authService = {
  login: (credentials) =>
    fetchApi('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),
  getMe: () => fetchApi('/auth/me'),
};

