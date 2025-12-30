import { motion } from 'framer-motion'
import { Send, Mail, Phone, MapPin, MessageSquare } from 'lucide-react'
import { useState } from 'react'

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission
    console.log('Form submitted:', formData)
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'contact@techlink.com', link: 'mailto:contact@techlink.com' },
    { icon: Phone, label: 'Phone', value: '+91 9156031867', link: 'tel:+919156031867' },
    { icon: MapPin, label: 'Address', value: 'Millennium Techlink Private Limited, 17/18/19, 2nd Floor, Mahalaxmi Heights, Mumbai-Pune Road, Pimpri, Pune 411 018, Maharashtra, INDIA', link: '#' },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50 min-h-screen py-16">
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-purple-600 to-primary bg-clip-text text-transparent">
            Get in Touch
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We'd love to hear about your project or partnership opportunities.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {contactInfo.map((info, index) => (
            <motion.a
              key={index}
              href={info.link}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -5, scale: 1.05 }}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-dark rounded-lg flex items-center justify-center mb-4">
                <info.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">{info.label}</h3>
              <p className="text-gray-600 text-sm">{info.value}</p>
            </motion.a>
          ))}
        </div>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-2xl mx-auto"
        >
          <motion.form
            variants={itemVariants}
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
          >
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all bg-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all bg-white"
                  required
                />
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all bg-white"
                required
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-primary" />
                Message
              </label>
              <motion.textarea
                whileFocus={{ scale: 1.01 }}
                rows="6"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all bg-white resize-none"
                required
              ></motion.textarea>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.02, boxShadow: "0 10px 25px rgba(37, 99, 235, 0.3)" }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-gradient-to-r from-primary to-primary-dark text-white py-3 rounded-lg hover:shadow-lg transition-all font-medium flex items-center justify-center gap-2"
            >
              <Send className="w-5 h-5" />
              Submit
            </motion.button>
          </motion.form>
        </motion.div>
      </div>
    </div>
  )
}

export default Contact
