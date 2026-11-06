process.env.NODE_ENV = 'test';
import dotenv from 'dotenv';
dotenv.config();

import http from 'http';
import mongoose from 'mongoose';
const { default: app } = await import('./src/server.js');

const PORT = 5055;

async function runTests() {
  console.log('🚀 Starting ABR Roadlines Automated Test Suite...\n');
  
  const server = app.listen(PORT, async () => {
    console.log(`Test server running on port ${PORT}`);

    try {
      const BASE = `http://localhost:${PORT}/api`;

      // 1. Health check
      console.log('1. Testing /health endpoint...');
      const healthRes = await fetch(`${BASE}/health`).then(r => r.json());
      if (healthRes.status !== 'healthy') throw new Error('Health check failed');
      console.log('   ✅ Health check passed.');

      // 2. Submit Contact Inquiry
      console.log('2. Testing POST /contact...');
      const contactRes = await fetch(`${BASE}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Automated Test Shipper',
          phone: '9315001977',
          email: 'test@abrroadlines.com',
          serviceType: 'Attached Basis Transport',
          message: 'Automated verification test consignment message.'
        })
      }).then(r => r.json());
      if (!contactRes.success) throw new Error('Contact submission failed: ' + JSON.stringify(contactRes));
      console.log('   ✅ Contact submission passed.');

      // 3. Submit Quote Request
      console.log('3. Testing POST /quote...');
      const quoteRes = await fetch(`${BASE}/quote`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: 'Test Logistics Officer',
          phone: '9315001977',
          email: 'officer@logistics.com',
          companyName: 'ABR Automated QA',
          pickupCity: 'Ambala',
          dropCity: 'Pune',
          vehicleType: '32 Ft Multi-Axle Container (18-22 MT)',
          loadType: 'FMCG & Packaged Goods',
          weightMetricTons: '16'
        })
      }).then(r => r.json());
      if (!quoteRes.success || !quoteRes.referenceId) throw new Error('Quote submission failed');
      console.log('   ✅ Quote calculation passed. Generated Ref:', quoteRes.referenceId);

      // 4. Shipment Tracking
      console.log('4. Testing GET /tracking/ABR-10023...');
      const trackRes = await fetch(`${BASE}/tracking/ABR-10023`).then(r => r.json());
      if (!trackRes.success || trackRes.data.lrNumber !== 'ABR-10023') throw new Error('Tracking failed');
      console.log('   ✅ Live tracking passed. Speed:', trackRes.data.speed, 'Status:', trackRes.data.status);

      // 5. Blogs listing
      console.log('5. Testing GET /blogs...');
      const blogsRes = await fetch(`${BASE}/blogs`).then(r => r.json());
      if (!blogsRes.success || !Array.isArray(blogsRes.data)) throw new Error('Blogs failed');
      console.log('   ✅ Blog list passed. Total articles:', blogsRes.data.length);

      // 6. Admin Authentication & Protected Route
      console.log('6. Testing POST /auth/login & GET /contact (protected)...');
      const loginRes = await fetch(`${BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'admin@abrroadlines.com', password: 'Admin@1234' })
      }).then(r => r.json());
      if (!loginRes.success || !loginRes.token) throw new Error('Admin login failed');

      const protectedRes = await fetch(`${BASE}/contact`, {
        headers: { 'Authorization': 'Bearer ' + loginRes.token }
      }).then(r => r.json());
      if (!protectedRes.success) throw new Error('Protected endpoint failed');
      console.log('   ✅ Admin JWT login & protected lead query passed.');

      console.log('\n🎉 ALL 6 AUTOMATED API VERIFICATION TESTS PASSED SUCCESSFULLY!\n');
    } catch (err) {
      console.error('\n❌ Test failure:', err.message);
      process.exitCode = 1;
    } finally {
      server.close();
      if (mongoose.connection.readyState !== 0) {
        await mongoose.disconnect();
      }
      process.exit(process.exitCode || 0);
    }
  });
}

runTests();
