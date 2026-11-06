import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown, Search, ArrowRight } from 'lucide-react';
import { NAV_LINKS, COMPANY } from '../../utils/constants';
import Button from '../common/Button';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
    setSearchOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/blogs?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
    }
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${isScrolled
            ? 'bg-white shadow-md py-3'
            : 'bg-white border-b border-slate-100 py-4'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 shrink-0" aria-label="ABR Roadlines Home">
              <img
                src="/logo.svg"
                alt="ABR Roadlines Pvt. Ltd. Logo"
                className="h-10 sm:h-12 w-auto object-contain"
                width="240"
                height="45"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1 font-semibold text-[15px] text-[#606676]">
              {NAV_LINKS.map((link) => {
                if (link.children) {
                  return (
                    <div
                      key={link.name}
                      className="relative group py-2"
                      onMouseEnter={() => setServicesDropdownOpen(true)}
                      onMouseLeave={() => setServicesDropdownOpen(false)}
                    >
                      <button
                        type="button"
                        className={`flex items-center gap-1.5 px-4 py-2 rounded-lg transition-colors ${location.pathname.startsWith('/services')
                            ? 'text-brand-orange font-bold'
                            : 'hover:text-brand-orange'
                          }`}
                        aria-expanded={servicesDropdownOpen}
                      >
                        <span>{link.name}</span>
                        <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180 text-slate-400" />
                      </button>

                      {/* Dropdown Menu */}
                      <div className="absolute top-full left-0 w-72 bg-white rounded-xl shadow-xl border border-slate-100 p-2 hidden group-hover:block transition-all z-50 animate-in fade-in slide-in-from-top-1">
                        <div className="p-2 border-b border-slate-100 mb-1">
                          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                            Specialized Services
                          </span>
                        </div>
                        {link.children.map((subItem) => (
                          <NavLink
                            key={subItem.path}
                            to={subItem.path}
                            className={({ isActive }) =>
                              `flex items-center justify-between p-3 rounded-lg transition-colors text-sm ${isActive
                                ? 'bg-brand-orange/10 text-brand-orange font-bold'
                                : 'hover:bg-slate-50 text-slate-700 hover:text-brand-orange font-medium'
                              }`
                            }
                          >
                            <div>
                              <div>{subItem.name}</div>
                              {subItem.path === '/services/attached-basis' && (
                                <div className="text-xs text-slate-400">Dedicated Fleet Linehaul</div>
                              )}
                              {subItem.path === '/services/time-definite' && (
                                <div className="text-xs text-slate-400">Express Delivery SLA</div>
                              )}
                              {subItem.path === '/services/hub-to-hub' && (
                                <div className="text-xs text-slate-400">Warehouse Inter-City Route</div>
                              )}
                            </div>
                            <ArrowRight className="w-3.5 h-3.5 opacity-50" />
                          </NavLink>
                        ))}
                      </div>
                    </div>
                  );
                }

                return (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    className={({ isActive }) =>
                      `px-4 py-2 transition-colors ${isActive
                        ? 'text-brand-orange font-bold'
                        : 'hover:text-brand-orange'
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                );
              })}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center space-x-4">
              {/* Search Toggle Icon */}
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className="w-10 h-10 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-600 hover:text-brand-orange transition-colors"
                aria-label="Open Search"
              >
                <Search className="w-4 h-4" />
              </button>

              <Button to="/get-quote" variant="primary" size="md" pill>
                Get a Quote
              </Button>
            </div>

            {/* Mobile Hamburger */}
            <div className="flex items-center lg:hidden gap-2">
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className="p-2 text-slate-600 hover:text-brand-orange"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-slate-800 hover:bg-slate-100 transition-colors"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-4 pb-6 space-y-3 shadow-xl animate-in slide-in-from-top-2">
            <div className="flex flex-col space-y-1">
              {NAV_LINKS.map((link) => {
                if (link.children) {
                  return (
                    <div key={link.name} className="py-2 border-b border-slate-100">
                      <div className="font-bold text-xs text-slate-400 uppercase tracking-wider px-3 mb-1">
                        {link.name}
                      </div>
                      {link.children.map((subItem) => (
                        <NavLink
                          key={subItem.path}
                          to={subItem.path}
                          className={({ isActive }) =>
                            `block px-3 py-2 rounded-lg text-sm ${isActive
                              ? 'bg-brand-orange/10 text-brand-orange font-bold'
                              : 'text-slate-700 hover:bg-slate-50'
                            }`
                          }
                        >
                          {subItem.name}
                        </NavLink>
                      ))}
                    </div>
                  );
                }

                return (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    className={({ isActive }) =>
                      `block px-3 py-2.5 rounded-lg text-base font-semibold ${isActive
                        ? 'bg-brand-orange/10 text-brand-orange font-bold'
                        : 'text-slate-800 hover:bg-slate-50'
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                );
              })}
            </div>

            <div className="pt-4 border-t border-slate-100 space-y-3">
              <Button to="/get-quote" variant="primary" size="lg" pill className="w-full">
                Get a Quote
              </Button>
            </div>
          </div>
        )}
      </header>

      {/* Full-Screen Search Overlay matching uiCookies #search */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 bg-[#1f262d]/95 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
          <button
            type="button"
            onClick={() => setSearchOpen(false)}
            className="absolute top-6 right-6 text-white/70 hover:text-white text-3xl font-light p-2"
            aria-label="Close search"
          >
            ×
          </button>

          <form onSubmit={handleSearchSubmit} className="max-w-2xl w-full text-center space-y-6">
            <h3 className="text-xl sm:text-2xl text-white font-light tracking-wide">
              Search Logistics Articles & Routes
            </h3>
            <div className="relative">
              <input
                type="search"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="type keyword(s) here..."
                className="w-full px-6 py-4 bg-transparent border-b-2 border-white/40 focus:border-brand-orange text-white text-xl sm:text-2xl placeholder:text-white/40 focus:outline-none"
              />
            </div>
            <div className="flex justify-center gap-3">
              <Button type="submit" variant="primary" size="md" pill>
                Search
              </Button>
              <Button
                type="button"
                onClick={() => setSearchOpen(false)}
                variant="outline"
                size="md"
                pill
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
