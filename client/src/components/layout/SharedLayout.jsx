import React from 'react';
import { Outlet } from 'react-router-dom';
import TopBar from './TopBar';
import Navbar from './Navbar';
import Footer from './Footer';
import FloatingWhatsApp from '../common/FloatingWhatsApp';
import { useScrollToTop } from '../../hooks/useScrollToTop';

export default function SharedLayout() {
  useScrollToTop();

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 selection:bg-brand-orange selection:text-white">
      <TopBar />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

