import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook } from 'lucide-react'
import footerLogo from '../assets/techlink-footer-logo.svg'

function Footer() {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Facebook, href: '#', label: 'Facebook' },
  ]

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-6 sm:mb-8">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center mb-4">
              <motion.img
                src={footerLogo}
                alt="Techlink Logo"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="h-16 sm:h-20 md:h-24 w-auto"
              />
            </div>
            <p className="text-gray-400 text-sm sm:text-base mb-4 leading-relaxed">
              Accelerating electronic product testing, simulation, and certification through AI-powered solutions.
            </p>
            <div className="flex space-x-3 sm:space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ scale: 1.2, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 sm:w-11 sm:h-11 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary transition-colors min-w-[44px] min-h-[44px]"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="font-bold mb-4 text-base sm:text-lg">Quick Links</h3>
            <ul className="space-y-2 sm:space-y-3">
              {['Home', 'Services', 'Pricing', 'Blog', 'About', 'Contact'].map((link) => (
                <li key={link}>
                  <Link
                    to={`/${link.toLowerCase().replace(' ', '-')}`}
                    className="text-gray-400 hover:text-primary transition-colors text-sm sm:text-base block py-1 min-h-[32px] flex items-center"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="font-bold mb-4 text-base sm:text-lg">Services</h3>
            <ul className="space-y-2 sm:space-y-3">
              {[
                { name: 'Design', path: '/services/design' },
                { name: 'Testing', path: '/services/testing' },
                { name: 'Calibration', path: '/services/calibration' },
                { name: 'Simulation', path: '/services/simulation' },
                { name: 'Product Debugging', path: '/services/product-debugging' },
                { name: 'Certification', path: '/services/certification' },
              ].map((service) => (
                <li key={service.name}>
                  <Link
                    to={service.path}
                    className="text-gray-400 hover:text-primary transition-colors text-sm sm:text-base block py-1 min-h-[32px] flex items-center"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="font-bold mb-4 text-base sm:text-lg">Contact</h3>
            <ul className="space-y-3 sm:space-y-4">
              <li className="flex items-start gap-2 sm:gap-3 text-gray-400 text-sm sm:text-base">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 mt-0.5 sm:mt-1 flex-shrink-0" />
                <a href="mailto:contact@techlink.com" className="hover:text-primary transition-colors break-words">
                  contact@techlink.com
                </a>
              </li>
              <li className="flex items-start gap-2 sm:gap-3 text-gray-400 text-sm sm:text-base">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 mt-0.5 sm:mt-1 flex-shrink-0" />
                <a href="tel:+919156031867" className="hover:text-primary transition-colors">
                  +91 9156031867
                </a>
              </li>
              <li className="flex items-start gap-2 sm:gap-3 text-gray-400 text-sm sm:text-base">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 mt-0.5 sm:mt-1 flex-shrink-0" />
                <span className="break-words leading-relaxed">
                  Millennium Techlink Private Limited, 17/18/19, 2nd Floor, Mahalaxmi Heights, Mumbai-Pune Road, Pimpri, Pune 411 018, Maharashtra, INDIA
                </span>
              </li>
            </ul>
          </motion.div>
        </div>

        <div className="border-t border-gray-800 pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6">
          <p className="text-gray-400 text-xs sm:text-sm text-center sm:text-left">
            © {currentYear} Millennium Techlink. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center sm:justify-end gap-4 sm:gap-6 text-xs sm:text-sm">
            <Link to="/help" className="text-gray-400 hover:text-primary transition-colors min-h-[32px] flex items-center">
              Help
            </Link>
            <Link to="/privacy" className="text-gray-400 hover:text-primary transition-colors min-h-[32px] flex items-center">
              Privacy
            </Link>
            <Link to="/terms" className="text-gray-400 hover:text-primary transition-colors min-h-[32px] flex items-center">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
