import { motion } from 'framer-motion'
import { Package, Send, FileText, CheckCircle2 } from 'lucide-react'
import { useState } from 'react'

function ProductDetails() {
  const [formData, setFormData] = useState({
    organizationName: '',
    contactPerson: '',
    designation: '',
    email: '',
    mobileNo: '',
    address: '',
    preferableDates: '',
    industry: '',
    services: '',
    productName: '',
    productQuantity: '',
    productSpecification: '',
    productPartNo: '',
    standardsRequired: '',
    productDescription: '',
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
      },
    },
  }

  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-blue-50 min-h-screen py-12">
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Package className="w-10 h-10 text-primary" />
            <h2 className="text-4xl font-bold bg-gradient-to-r from-primary via-purple-600 to-primary bg-clip-text text-transparent">
              Product Details
            </h2>
          </div>
          <p className="text-gray-600 text-lg">
            Submit your product information to get started
          </p>
        </motion.div>
        
        <motion.form
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
        >
          <div className="grid md:grid-cols-2 gap-6">
            {/* Left Column */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                Organization Information
              </h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name of Organization
                </label>
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="text"
                  name="organizationName"
                  value={formData.organizationName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Person
                </label>
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="text"
                  name="contactPerson"
                  value={formData.contactPerson}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Designation
                </label>
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="text"
                  name="designation"
                  value={formData.designation}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mobile No
                </label>
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="tel"
                  name="mobileNo"
                  value={formData.mobileNo}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address
                </label>
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferable Dates (for Testing)
                </label>
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="text"
                  name="preferableDates"
                  value={formData.preferableDates}
                  onChange={handleChange}
                  placeholder="e.g., March 20-25, 2024"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Industry/Application
                </label>
                <motion.select
                  whileFocus={{ scale: 1.02 }}
                  name="industry"
                  value={formData.industry}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                >
                  <option value="">Select Industry</option>
                  <option value="electronics">Electronics</option>
                  <option value="automotive">Automotive</option>
                  <option value="telecommunications">Telecommunications</option>
                  <option value="medical">Medical Devices</option>
                  <option value="aerospace">Aerospace</option>
                </motion.select>
              </div>
            </motion.div>
            
            {/* Right Column */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Package className="w-5 h-5 text-primary" />
                Product Information
              </h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Services
                </label>
                <motion.select
                  whileFocus={{ scale: 1.02 }}
                  name="services"
                  value={formData.services}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                >
                  <option value="">Select Service</option>
                  <option value="design">Design</option>
                  <option value="testing">Testing</option>
                  <option value="calibration">Calibration</option>
                  <option value="simulation">Simulation</option>
                  <option value="debugging">Product Debugging</option>
                  <option value="certification">Certification</option>
                </motion.select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Name
                </label>
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="text"
                  name="productName"
                  value={formData.productName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Quantity
                </label>
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="number"
                  name="productQuantity"
                  value={formData.productQuantity}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Specification (Weight, height, width)
                </label>
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="text"
                  name="productSpecification"
                  value={formData.productSpecification}
                  onChange={handleChange}
                  placeholder="e.g., 2kg, 10cm, 5cm"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Part No.
                </label>
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="text"
                  name="productPartNo"
                  value={formData.productPartNo}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Standards Required
                </label>
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="text"
                  name="standardsRequired"
                  value={formData.standardsRequired}
                  onChange={handleChange}
                  placeholder="e.g., ISO 9001, CE Mark"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Description
                </label>
                <motion.textarea
                  whileFocus={{ scale: 1.01 }}
                  rows="4"
                  name="productDescription"
                  value={formData.productDescription}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                ></motion.textarea>
              </div>
            </motion.div>
          </div>
          
          <motion.div
            variants={itemVariants}
            className="flex justify-center gap-4 mt-8"
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(37, 99, 235, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="px-8 py-3 bg-gradient-to-r from-primary to-primary-dark text-white rounded-lg hover:shadow-lg transition-all font-medium flex items-center gap-2"
            >
              <Send className="w-5 h-5" />
              Submit
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              className="px-8 py-3 bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-lg hover:shadow-lg transition-all font-medium flex items-center gap-2"
            >
              <CheckCircle2 className="w-5 h-5" />
              Get Quote
            </motion.button>
          </motion.div>
        </motion.form>
      </div>
    </div>
  )
}

export default ProductDetails
