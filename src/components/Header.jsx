import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Menu, X, Users, FlaskConical } from 'lucide-react'
import { useState } from 'react'
import logo from '../assets/techlink-logo.svg'

function Header() {
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const isLabRoute = location.pathname.startsWith('/lab')
  const isCustomerRoute = location.pathname.startsWith('/customer')

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/services', label: 'Services' },
    { path: '/pricing', label: 'Pricing' },
    { path: '/blog', label: 'Blog' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
  ]


  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white/95 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 shadow-sm"
    >
      <nav className="container mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center space-x-2 sm:space-x-3 group min-w-0 flex-shrink-0">
          <motion.img
            src={logo}
            alt="Techlink Logo"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="h-12 sm:h-16 md:h-20 w-auto flex-shrink-0"
          />
        </Link>
        
        <div className="hidden lg:flex items-center space-x-4 xl:space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="relative text-sm xl:text-base text-gray-700 hover:text-primary transition-colors px-2 py-1.5"
            >
              {link.path === location.pathname && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                  initial={false}
                />
              )}
              <span className="relative z-10 whitespace-nowrap">{link.label}</span>
            </Link>
          ))}
        </div>
        
        <div className="hidden lg:flex items-center space-x-2 xl:space-x-4 flex-shrink-0">
          {/* Portal Links - Always visible */}
          <Link to="/customer/dashboard" className="hidden xl:block">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-3 xl:px-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-colors flex items-center gap-2 text-sm xl:text-base whitespace-nowrap"
            >
              <Users className="w-4 h-4" />
              <span className="hidden 2xl:inline">Customer Portal</span>
              <span className="2xl:hidden">Customer</span>
            </motion.button>
          </Link>
          <Link to="/lab/portal" className="hidden xl:block">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-3 xl:px-4 py-2 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-600 hover:text-white transition-colors flex items-center gap-2 text-sm xl:text-base whitespace-nowrap"
            >
              <FlaskConical className="w-4 h-4" />
              <span className="hidden 2xl:inline">Lab Portal</span>
              <span className="2xl:hidden">Lab</span>
            </motion.button>
          </Link>
          
          {/* Auth Buttons - Show on public pages only */}
          {!isLabRoute && !isCustomerRoute && (
            <>
              <Link to="/login">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-3 xl:px-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-colors text-sm xl:text-base whitespace-nowrap"
                >
                  Login
                </motion.button>
              </Link>
              <Link to="/signup">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-3 xl:px-4 py-2 bg-gradient-to-r from-primary to-primary-dark text-white rounded-lg hover:shadow-lg transition-all text-sm xl:text-base whitespace-nowrap"
                >
                  Sign Up
                </motion.button>
              </Link>
            </>
          )}
        </div>

        <button
          className="lg:hidden p-2 -mr-2 min-w-[44px] min-h-[44px] flex items-center justify-center text-gray-700 hover:text-primary transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {mobileMenuOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            onClick={() => setMobileMenuOpen(false)}
          />
          {/* Menu */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden border-t border-gray-200 bg-white relative z-50"
          >
            <div className="container mx-auto px-4 sm:px-6 py-4 space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block py-3 px-4 text-base font-medium rounded-lg transition-colors ${
                    link.path === location.pathname
                      ? 'bg-primary/10 text-primary'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-2 space-y-2 border-t border-gray-200">
                {/* Portal Links - Always visible */}
                <Link
                  to="/customer/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-center py-3 px-4 border-2 border-primary text-primary rounded-lg font-medium hover:bg-primary hover:text-white transition-colors flex items-center justify-center gap-2 min-h-[44px]"
                >
                  <Users className="w-5 h-5" />
                  Customer Portal
                </Link>
                <Link
                  to="/lab/portal"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-center py-3 px-4 border-2 border-purple-600 text-purple-600 rounded-lg font-medium hover:bg-purple-600 hover:text-white transition-colors flex items-center justify-center gap-2 min-h-[44px]"
                >
                  <FlaskConical className="w-5 h-5" />
                  Lab Portal
                </Link>
                
                {/* Auth Buttons - Show on public pages only */}
                {!isLabRoute && !isCustomerRoute && (
                  <>
                    <Link
                      to="/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-center py-3 px-4 border-2 border-primary text-primary rounded-lg font-medium hover:bg-primary hover:text-white transition-colors min-h-[44px]"
                    >
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-center py-3 px-4 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors min-h-[44px]"
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </motion.header>
  )
}

export default Header
