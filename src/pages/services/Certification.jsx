import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowLeft, CheckCircle2, Award, Zap, Shield, Clock, Target, BarChart3 } from 'lucide-react'

function Certification() {
  const features = [
    'Streamlined certification management',
    'Automated compliance tracking',
    'Comprehensive documentation',
    'Multi-standard support',
    'Real-time status updates',
    'Expert consultation',
  ]

  const benefits = [
    { icon: Shield, title: 'Full Compliance', desc: 'Meet all regulatory requirements' },
    { icon: Clock, title: 'Faster Approval', desc: 'Reduce certification time by 50%' },
    { icon: Target, title: 'Global Standards', desc: 'Support for international standards' },
    { icon: BarChart3, title: 'Track Progress', desc: 'Real-time certification status' },
  ]

  const standards = [
    'CE Marking (EU)',
    'FCC Certification (USA)',
    'IC Certification (Canada)',
    'BSMI (Taiwan)',
    'KC Mark (South Korea)',
    'ANATEL (Brazil)',
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50">
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
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
              <Award className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900">Certification</h1>
              <p className="text-gray-600 mt-2">Official Product Certification</p>
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
            Our streamlined certification management system provides automated compliance tracking and documentation. 
            We help you navigate complex regulatory requirements and obtain necessary certifications for global market 
            access, ensuring your products meet all standards efficiently.
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
                <CheckCircle2 className="w-5 h-5 text-indigo-500 mt-0.5 flex-shrink-0" />
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
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg flex items-center justify-center mb-4">
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
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Supported Standards</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {standards.map((standard, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + idx * 0.1 }}
                className="flex items-start gap-3 p-4 bg-indigo-50 rounded-lg"
              >
                <Award className="w-5 h-5 text-indigo-600 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700 font-medium">{standard}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-gradient-to-r from-indigo-600 to-indigo-700 rounded-2xl p-8 text-white text-center shadow-xl"
        >
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-6 text-indigo-100">Starting from $299 per project</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/services/certification/start">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-white text-indigo-600 rounded-lg font-semibold hover:shadow-lg transition-all"
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

export default Certification

