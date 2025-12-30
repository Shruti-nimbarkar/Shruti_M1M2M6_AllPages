import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  Palette, 
  TestTube, 
  Settings, 
  Cpu, 
  Bug, 
  Award,
  ArrowRight,
  CheckCircle2
} from 'lucide-react'

function Services() {
  const services = [
    {
      icon: Palette,
      title: 'Design',
      description: 'Design verification and validation optimization for electronic products with automated validation.',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'from-blue-50 to-blue-100',
      features: ['Automated Validation', 'Quality Assurance', 'Real-time Feedback'],
      stats: '99%',
      statLabel: 'Accuracy',
    },
    {
      icon: TestTube,
      title: 'Testing',
      description: 'Comprehensive testing protocols with real-time analysis and automated reporting systems.',
      color: 'from-green-500 to-green-600',
      bgColor: 'from-green-50 to-green-100',
      features: ['Real-time Analysis', 'Automated Reports', 'Expert Consultation'],
      stats: '10x',
      statLabel: 'Faster',
    },
    {
      icon: Settings,
      title: 'Calibration',
      description: 'Precision calibration services ensuring accuracy and compliance with industry standards.',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'from-purple-50 to-purple-100',
      features: ['Industry Compliance', 'Fast Turnaround', 'Certification'],
      stats: '24/7',
      statLabel: 'Support',
    },
    {
      icon: Cpu,
      title: 'Simulation',
      description: 'Advanced simulation environments for predictive analysis and performance optimization.',
      color: 'from-orange-500 to-orange-600',
      bgColor: 'from-orange-50 to-orange-100',
      features: ['Predictive Analysis', 'Cloud Platform', 'Detailed Reports'],
      stats: '100+',
      statLabel: 'Models',
    },
    {
      icon: Bug,
      title: 'Product Debugging',
      description: 'Intelligent debugging tools that identify and resolve issues faster than traditional methods.',
      color: 'from-red-500 to-red-600',
      bgColor: 'from-red-50 to-red-100',
      features: ['AI-Powered', 'Fast Resolution', 'Comprehensive Analysis'],
      stats: '5x',
      statLabel: 'Faster',
    },
    {
      icon: Award,
      title: 'Certification',
      description: 'Streamlined certification management with automated compliance tracking and documentation.',
      color: 'from-indigo-500 to-indigo-600',
      bgColor: 'from-indigo-50 to-indigo-100',
      features: ['Global Standards', 'Compliance Tracking', 'Priority Support'],
      stats: '50+',
      statLabel: 'Standards',
    },
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

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-blue-50 min-h-screen py-8 sm:py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-primary via-purple-600 to-primary bg-clip-text text-transparent px-4">
            Services
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            Comprehensive solutions for your electronic product development needs
          </p>
        </motion.div>
        
        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -8 }}
              className="group relative"
            >
              <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 h-full flex flex-col">
                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br ${service.color} rounded-lg sm:rounded-xl flex items-center justify-center mb-4 sm:mb-6 shadow-md`}
                >
                  <service.icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
                </motion.div>

                <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-gray-900 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 flex-grow leading-relaxed">
                  {service.description}
                </p>

                {/* Features List */}
                <div className="mb-6 space-y-2">
                  {service.features.map((feature, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 text-sm text-gray-600"
                    >
                      <CheckCircle2 className={`w-4 h-4 ${service.color.replace('from-', 'text-').split(' ')[0]}`} />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <Link
                  to={`/services/${service.title.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full py-3 rounded-lg font-semibold transition-all shadow-md bg-gradient-to-r ${service.color} text-white hover:shadow-lg flex items-center justify-center gap-2 group/btn`}
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

export default Services
