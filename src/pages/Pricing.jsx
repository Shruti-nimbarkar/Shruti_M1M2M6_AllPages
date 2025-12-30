import { motion, AnimatePresence } from 'framer-motion'
import { Check, Sparkles, Package, Star, ArrowRight, X, Info, Clock, Users, Shield } from 'lucide-react'
import { useState } from 'react'

function Pricing() {
  const [selectedPlan, setSelectedPlan] = useState(null)
  const pricingPlans = [
    { 
      service: 'Design', 
      price: 99,
      features: ['Design verification', 'Automated validation', 'Quality assurance', '24/7 support'],
      popular: false,
      details: {
        description: 'Comprehensive design verification services to ensure your electronic products meet all specifications and quality standards.',
        deliverables: ['Design verification report', 'Quality assurance documentation', 'Automated validation results', 'Technical recommendations'],
        timeline: '3-5 business days',
        support: '24/7 email and chat support',
        bestFor: 'Product development teams looking to validate designs before production',
        additionalInfo: 'Includes unlimited revisions and expert consultation throughout the process.'
      }
    },
    { 
      service: 'Testing', 
      price: 149,
      features: ['Comprehensive testing', 'Real-time analysis', 'Automated reporting', 'Expert consultation'],
      popular: true,
      details: {
        description: 'Complete testing suite covering EMC, RF, Safety, and Environmental testing with real-time monitoring and detailed analysis.',
        deliverables: ['Comprehensive test reports', 'Real-time analysis dashboard', 'Automated test documentation', 'Expert consultation sessions'],
        timeline: '5-7 business days',
        support: 'Priority 24/7 support with dedicated engineer',
        bestFor: 'Companies requiring thorough product testing across multiple standards',
        additionalInfo: 'Includes access to advanced testing equipment and certified testing facilities.'
      }
    },
    { 
      service: 'Calibration', 
      price: 79,
      features: ['Precision calibration', 'Industry compliance', 'Certification included', 'Fast turnaround'],
      popular: false,
      details: {
        description: 'Precision calibration services ensuring your equipment meets industry standards with full compliance certification.',
        deliverables: ['Calibration certificates', 'Compliance documentation', 'Equipment performance reports', 'Renewal reminders'],
        timeline: '2-3 business days',
        support: 'Standard support with calibration specialists',
        bestFor: 'Laboratories and manufacturing facilities requiring regular equipment calibration',
        additionalInfo: 'Includes traceable calibration standards and NIST-certified equipment.'
      }
    },
    { 
      service: 'Simulation', 
      price: 199,
      features: ['Advanced simulation', 'Predictive analysis', 'Performance optimization', 'Detailed reports'],
      popular: false,
      details: {
        description: 'Advanced simulation technology using AI-powered predictive analysis to identify issues before physical testing.',
        deliverables: ['Simulation reports', 'Predictive analysis results', 'Performance optimization recommendations', '3D visualization models'],
        timeline: '7-10 business days',
        support: 'Expert simulation engineers available for consultation',
        bestFor: 'R&D teams wanting to optimize designs and reduce physical testing costs',
        additionalInfo: 'Includes access to advanced simulation software and cloud computing resources.'
      }
    },
    { 
      service: 'Product Debugging', 
      price: 129,
      features: ['Intelligent debugging', 'Fast issue resolution', 'Comprehensive analysis', 'Ongoing support'],
      popular: false,
      details: {
        description: 'Intelligent debugging services using advanced diagnostic tools to quickly identify and resolve product issues.',
        deliverables: ['Debugging reports', 'Issue resolution documentation', 'Root cause analysis', 'Prevention recommendations'],
        timeline: '3-5 business days',
        support: 'Dedicated debugging specialist with ongoing support',
        bestFor: 'Companies facing product issues or needing proactive debugging',
        additionalInfo: 'Includes remote debugging capabilities and on-site support options.'
      }
    },
    { 
      service: 'Certification', 
      price: 299,
      features: ['Full certification', 'Compliance tracking', 'Documentation', 'Priority support'],
      popular: false,
      details: {
        description: 'Complete certification services covering all major standards with full compliance tracking and documentation management.',
        deliverables: ['Certification certificates', 'Compliance tracking dashboard', 'Complete documentation package', 'Renewal management'],
        timeline: '10-14 business days',
        support: 'Priority support with certification specialists',
        bestFor: 'Companies requiring full product certification for market entry',
        additionalInfo: 'Includes multi-standard certification options and international compliance support.'
      }
    },
  ]

  // Bundle Package - All services combined
  const bundlePackage = {
    service: 'Complete Bundle',
    originalPrice: 954, // Sum of all individual services
    price: 699, // Discounted bundle price
    discount: 27, // Percentage discount
    features: [
      'All Design services included',
      'Complete Testing suite',
      'Full Calibration services',
      'Advanced Simulation tools',
      'Product Debugging support',
      'Full Certification process',
      'Priority 24/7 support',
      'Dedicated account manager',
      'Custom reporting dashboard',
      'Unlimited consultations',
      'Early access to new features',
      'Volume discounts available'
    ],
    popular: false,
    bundle: true,
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-purple-50 min-h-screen py-16">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 overflow-visible"
        >
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-purple-600 to-primary bg-clip-text text-transparent leading-[1.2] pb-3 inline-block">
            Pricing
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Transparent pricing for all our services. Choose what works best for you.
          </p>
        </motion.div>
        
        {/* Bundle Package - Featured */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto mb-16"
        >
          <div className="relative rounded-3xl p-1 bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 shadow-2xl">
            <div className="bg-white rounded-3xl p-8 lg:p-12">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                    <Package className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-gray-900">{bundlePackage.service}</h3>
                    <p className="text-gray-600">Everything you need in one package</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl text-gray-400 line-through">${bundlePackage.originalPrice}</span>
                    <span className="text-5xl font-bold text-primary">${bundlePackage.price}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                      Save {bundlePackage.discount}%
                    </span>
                    <span className="text-sm text-gray-600">/project*</span>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">What's Included:</h4>
                  <ul className="space-y-3">
                    {bundlePackage.features.slice(0, 6).map((feature, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + idx * 0.05 }}
                        className="flex items-start gap-2"
                      >
                        <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Additional Benefits:</h4>
                  <ul className="space-y-3">
                    {bundlePackage.features.slice(6).map((feature, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 + idx * 0.05 }}
                        className="flex items-start gap-2"
                      >
                        <Star className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0 fill-yellow-500" />
                        <span className="text-gray-700">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 text-white rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-5 h-5" />
                Get Complete Bundle
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mb-12"
        >
          <h3 className="text-3xl font-bold text-gray-900 mb-2">Individual Services</h3>
          <p className="text-gray-600">Choose specific services or get the complete bundle above</p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -10, scale: 1.03 }}
              className={`relative rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 ${
                plan.popular 
                  ? 'bg-gradient-to-br from-primary to-primary-dark text-white border-4 border-yellow-400' 
                  : 'bg-white text-gray-900 border border-gray-100'
              }`}
            >
              {plan.popular && (
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.3, type: "spring" }}
                  className="absolute -top-4 right-4 bg-yellow-400 text-gray-900 px-4 py-1 rounded-full text-sm font-bold flex items-center gap-1"
                >
                  <Sparkles className="w-4 h-4" />
                  Popular
                </motion.div>
              )}
              
              <h3 className={`text-2xl font-bold mb-4 ${plan.popular ? 'text-white' : 'text-gray-900'}`}>
                {plan.service}
              </h3>
              
              <div className="mb-6">
                <span className={`text-4xl font-bold ${plan.popular ? 'text-white' : 'text-primary'}`}>
                  ${plan.price}
                </span>
                <span className={`text-lg ml-2 ${plan.popular ? 'text-white/80' : 'text-gray-600'}`}>
                  /project*
                </span>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + idx * 0.1 }}
                    className="flex items-start gap-2"
                  >
                    <Check className={`w-5 h-5 mt-0.5 flex-shrink-0 ${plan.popular ? 'text-yellow-400' : 'text-green-500'}`} />
                    <span className={plan.popular ? 'text-white/90' : 'text-gray-600'}>
                      {feature}
                    </span>
                  </motion.li>
                ))}
              </ul>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedPlan(plan)}
                className={`w-full py-3 rounded-lg font-semibold transition-all ${
                  plan.popular
                    ? 'bg-yellow-400 text-gray-900 hover:bg-yellow-300 shadow-lg'
                    : 'bg-primary text-white hover:bg-primary-dark shadow-md'
                }`}
              >
                View Details
              </motion.button>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Plan Details Modal */}
      <AnimatePresence>
        {selectedPlan && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedPlan(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className={`bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto ${
                selectedPlan.popular ? 'border-4 border-yellow-400' : ''
              }`}
            >
              {/* Modal Header */}
              <div className={`relative p-8 ${selectedPlan.popular ? 'bg-gradient-to-br from-primary to-primary-dark text-white' : 'bg-gradient-to-br from-gray-50 to-white'}`}>
                <button
                  onClick={() => setSelectedPlan(null)}
                  className="absolute top-4 right-4 p-2 rounded-full hover:bg-black/10 transition-colors"
                >
                  <X className={`w-6 h-6 ${selectedPlan.popular ? 'text-white' : 'text-gray-600'}`} />
                </button>
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-16 h-16 rounded-xl flex items-center justify-center ${
                    selectedPlan.popular ? 'bg-yellow-400' : 'bg-primary'
                  }`}>
                    <Info className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2 className={`text-3xl font-bold ${selectedPlan.popular ? 'text-white' : 'text-gray-900'}`}>
                      {selectedPlan.service} Service Details
                    </h2>
                    <div className="flex items-baseline gap-2 mt-2">
                      <span className={`text-4xl font-bold ${selectedPlan.popular ? 'text-white' : 'text-primary'}`}>
                        ${selectedPlan.price}
                      </span>
                      <span className={`text-lg ${selectedPlan.popular ? 'text-white/80' : 'text-gray-600'}`}>
                        /project*
                      </span>
                    </div>
                  </div>
                </div>
                {selectedPlan.popular && (
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-400 text-gray-900 rounded-full text-sm font-bold">
                    <Sparkles className="w-4 h-4" />
                    Popular Choice
                  </div>
                )}
              </div>

              {/* Modal Content */}
              <div className="p-8 space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Service Description</h3>
                  <p className="text-gray-600 leading-relaxed">{selectedPlan.details.description}</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <Package className="w-5 h-5 text-primary" />
                    What's Included
                  </h3>
                  <ul className="space-y-2">
                    {selectedPlan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <Check className="w-5 h-5 text-primary" />
                    Deliverables
                  </h3>
                  <ul className="space-y-2">
                    {selectedPlan.details.deliverables.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-4 bg-blue-50 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-5 h-5 text-blue-600" />
                      <h4 className="font-semibold text-gray-900">Timeline</h4>
                    </div>
                    <p className="text-gray-600">{selectedPlan.details.timeline}</p>
                  </div>

                  <div className="p-4 bg-green-50 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="w-5 h-5 text-green-600" />
                      <h4 className="font-semibold text-gray-900">Support</h4>
                    </div>
                    <p className="text-gray-600">{selectedPlan.details.support}</p>
                  </div>
                </div>

                <div className="p-4 bg-purple-50 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="w-5 h-5 text-purple-600" />
                    <h4 className="font-semibold text-gray-900">Best For</h4>
                  </div>
                  <p className="text-gray-600">{selectedPlan.details.bestFor}</p>
                </div>

                <div className="p-4 bg-yellow-50 rounded-xl border border-yellow-200">
                  <p className="text-gray-700">
                    <strong className="text-gray-900">Additional Information:</strong> {selectedPlan.details.additionalInfo}
                  </p>
                </div>

                <div className="flex gap-4 pt-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary-dark transition-colors"
                  >
                    Get Started
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedPlan(null)}
                    className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:border-gray-400 transition-colors"
                  >
                    Close
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Pricing
