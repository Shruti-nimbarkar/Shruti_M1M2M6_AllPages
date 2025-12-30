import { motion } from 'framer-motion'
import { Target, Users, Award, Zap, TrendingUp, Shield } from 'lucide-react'

function About() {
  const features = [
    {
      icon: Target,
      title: 'Our Mission',
      description: 'To revolutionize electronic product testing through AI-powered solutions that deliver accuracy and speed.',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: Users,
      title: 'Expert Team',
      description: 'A dedicated team of engineers and AI specialists working to bring you the best solutions.',
      color: 'from-green-500 to-green-600',
    },
    {
      icon: Award,
      title: 'Industry Leader',
      description: 'Trusted by leading companies worldwide for reliable testing and certification services.',
      color: 'from-purple-500 to-purple-600',
    },
    {
      icon: Zap,
      title: 'Fast & Efficient',
      description: 'Cutting-edge technology that reduces testing time by up to 90% without compromising quality.',
      color: 'from-orange-500 to-orange-600',
    },
    {
      icon: TrendingUp,
      title: 'Continuous Innovation',
      description: 'Constantly evolving our platform with the latest AI and machine learning technologies.',
      color: 'from-red-500 to-red-600',
    },
    {
      icon: Shield,
      title: 'Secure & Reliable',
      description: 'Enterprise-grade security ensuring your data and intellectual property are always protected.',
      color: 'from-indigo-500 to-indigo-600',
    },
  ]

  const stats = [
    { number: '10,000+', label: 'Products Tested' },
    { number: '500+', label: 'Happy Clients' },
    { number: '99.9%', label: 'Accuracy Rate' },
    { number: '24/7', label: 'Support Available' },
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
    <div className="bg-gradient-to-br from-gray-50 via-white to-blue-50 min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-purple-600 to-primary bg-clip-text text-transparent">
            About Millennium Techlink
          </h1>
        </motion.div>

        {/* Our Story Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto mb-16"
        >
          <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 lg:p-12 shadow-xl border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">Our Story</h2>
            </div>
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Millennium Techlink is an integrated AI platform designed to accelerate electronic product testing, simulation, and certification. We provide comprehensive solutions for design verification, product debugging, and certification management—all in one place.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Our mission is to revolutionize how companies approach product development by combining cutting-edge artificial intelligence with deep industry expertise. We empower teams to bring products to market faster, with greater confidence, and at a lower cost—all while maintaining the highest standards of quality and compliance.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white rounded-xl p-6 shadow-lg text-center border border-gray-100"
            >
              <div className="text-3xl font-bold text-primary mb-2">{stat.number}</div>
              <div className="text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -10, scale: 1.02 }}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all border border-gray-100"
            >
              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.5 }}
                className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-4 shadow-lg`}
              >
                <feature.icon className="w-7 h-7 text-white" />
              </motion.div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Story Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-primary via-blue-600 to-primary-dark rounded-2xl p-12 text-white shadow-2xl"
        >
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <Award className="w-8 h-8" />
            Our Journey
          </h2>
          <p className="text-lg leading-relaxed mb-4 text-white/95">
            Founded in 2020, Millennium Techlink emerged from a vision to transform the electronic product testing 
            industry. Our platform leverages cutting-edge artificial intelligence to streamline workflows, 
            reduce development time, and ensure compliance with industry standards.
          </p>
          <p className="text-lg leading-relaxed text-white/95">
            Whether you're working on design verification, testing protocols, calibration services, or 
            certification management, Millennium Techlink provides the tools and expertise you need to bring your 
            products to market faster and with confidence.
          </p>
        </motion.div>
      </section>
    </div>
  )
}

export default About
