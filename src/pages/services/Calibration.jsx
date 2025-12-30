import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowLeft, CheckCircle2, Settings, Zap, Shield, Clock, Target, BarChart3 } from 'lucide-react'

function Calibration() {
  const features = [
    'Precision instrument calibration',
    'Industry standard compliance',
    'Automated calibration workflows',
    'Traceable certification',
    'On-site and lab-based options',
    'Regular maintenance scheduling',
  ]

  const benefits = [
    { icon: Shield, title: 'ISO Certified', desc: 'Full compliance with ISO standards' },
    { icon: Target, title: 'High Precision', desc: 'Accuracy within 0.01% tolerance' },
    { icon: Clock, title: 'Fast Turnaround', desc: 'Complete calibration in 24-48 hours' },
    { icon: BarChart3, title: 'Documentation', desc: 'Comprehensive calibration certificates' },
  ]

  const equipment = [
    'Oscilloscopes',
    'Multimeters',
    'Power Supplies',
    'Signal Generators',
    'Spectrum Analyzers',
    'Network Analyzers',
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50">
      <div className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-primary hover:text-primary-dark transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Services
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <Settings className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900">Calibration</h1>
              <p className="text-gray-600 mt-2">Precision Instrument Calibration</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl p-8 shadow-lg mb-8 border border-gray-100"
        >
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Overview</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Our precision calibration services ensure accuracy and compliance with industry standards. 
            We provide comprehensive calibration for a wide range of electronic test equipment, ensuring 
            your instruments maintain optimal performance and meet regulatory requirements.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-8 shadow-lg mb-8 border border-gray-100"
        >
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Key Features</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + idx * 0.1 }}
                className="flex items-start gap-3"
              >
                <CheckCircle2 className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">{feature}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Benefits</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -5, scale: 1.02 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + idx * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                  <benefit.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-lg mb-2 text-gray-900">{benefit.title}</h3>
                <p className="text-gray-600 text-sm">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-2xl p-8 shadow-lg mb-8 border border-gray-100"
        >
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Equipment We Calibrate</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {equipment.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + idx * 0.1 }}
                className="p-4 bg-purple-50 rounded-lg border border-purple-100 text-center"
              >
                <span className="text-gray-700 font-medium">{item}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-2xl p-8 text-white text-center shadow-xl"
        >
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-6 text-purple-100">Starting from $79 per project</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/services/calibration/start">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-white text-purple-600 rounded-lg font-semibold hover:shadow-lg transition-all"
              >
                Start Your Project
              </motion.button>
            </Link>
            <Link to="/pricing">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-all"
              >
                View Pricing
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Calibration

