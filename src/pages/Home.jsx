import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, TrendingUp, Zap, Clock, Sparkles, CheckCircle2, Shield, Target, BarChart3, Users, Award, Globe, FileCheck, Cpu, TestTube } from 'lucide-react'
import { useEffect, useState } from 'react'

function Home() {
  const [dashboardData, setDashboardData] = useState({
    gauge: 99,
    numbers: [73, 27, 35, 119, 67, 157],
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setDashboardData((prev) => ({
        ...prev,
        numbers: prev.numbers.map(() => Math.floor(Math.random() * 200)),
      }))
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
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
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 overflow-hidden">
      {/* Enhanced Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            rotate: [0, 90, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-blue-400/10 to-primary/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
            rotate: [0, -90, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            rotate: [0, 45, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-br from-indigo-300/5 to-blue-300/5 rounded-full blur-3xl"
        />
      </div>

      {/* Hero Section */}
      <section className="relative container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20 lg:py-32">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center relative z-10"
        >
          {/* Left Side - Enhanced Content */}
          <motion.div variants={itemVariants} className="space-y-6 sm:space-y-8">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-blue-50 to-purple-50 rounded-full border border-blue-100"
            >
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
              <span className="text-xs sm:text-sm font-medium text-gray-700">AI-Powered Testing Platform</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={itemVariants}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-gray-900 leading-[1.1] tracking-tight"
            >
              Accelerate{' '}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-primary via-purple-600 to-primary bg-clip-text text-transparent">
                  Electronic Product
                </span>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ delay: 1, duration: 0.8 }}
                  className="absolute bottom-2 left-0 h-3 bg-gradient-to-r from-primary/20 to-purple-600/20 -z-10 rounded-full"
                />
              </span>
              <br />
              Testing, Simulation, and Certification
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 leading-relaxed max-w-xl"
            >
              An integrated AI platform for design verification, simulation, product debugging, and certification management — all in one place.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 sm:pt-4"
            >
              <Link to="/product-details" className="w-full sm:w-auto">
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-primary via-blue-600 to-primary-dark text-white rounded-lg sm:rounded-xl font-semibold flex items-center justify-center gap-2 sm:gap-3 shadow-xl shadow-primary/25 hover:shadow-2xl hover:shadow-primary/30 transition-all overflow-hidden text-sm sm:text-base min-h-[44px]"
                >
                  <span className="relative z-10 flex items-center gap-2 sm:gap-3">
                    Begin with Your Product
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary-dark to-primary"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              </Link>
              <Link to="/services" className="w-full sm:w-auto">
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 border-2 border-primary/20 bg-white/50 backdrop-blur-sm text-primary rounded-lg sm:rounded-xl hover:border-primary hover:bg-primary/5 transition-all font-semibold shadow-lg text-sm sm:text-base min-h-[44px]"
                >
                  Explore Services
                </motion.button>
              </Link>
            </motion.div>

            {/* Enhanced Stats Cards */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-3 gap-4 pt-8"
            >
              {[
                { icon: TrendingUp, value: '99%', label: 'Accuracy', color: 'from-blue-500 to-blue-600' },
                { icon: Zap, value: '10x', label: 'Faster', color: 'from-purple-500 to-purple-600' },
                { icon: Clock, value: '24/7', label: 'Support', color: 'from-indigo-500 to-indigo-600' },
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.05, y: -8 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + idx * 0.1 }}
                  className="group relative p-6 bg-white/80 backdrop-blur-md rounded-2xl shadow-lg hover:shadow-xl border border-gray-100 overflow-hidden"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity`} />
                  <div className="relative">
                    <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center mb-3 shadow-lg group-hover:scale-110 transition-transform`}>
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                    <div className="text-sm font-medium text-gray-600">{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          
          {/* Right Side - Enhanced Dashboard Graphic */}
          <motion.div
            variants={itemVariants}
            className="relative lg:pl-8"
          >
            {/* Glow Effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-purple-600/20 to-primary/20 rounded-3xl blur-2xl opacity-50" />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
              animate={{ opacity: 1, scale: 1, rotate: 2 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ rotate: 0, scale: 1.02 }}
              className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-3xl p-8 shadow-2xl border border-gray-700/50 backdrop-blur-sm"
            >
              {/* Dashboard Header */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-700/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold">M</span>
                  </div>
                  <span className="text-white font-semibold">QE47 Dashboard</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-xs text-gray-400">Live</span>
                </div>
              </div>

              {/* Dashboard Content */}
              <div className="space-y-6">
                {/* Top Metrics Row */}
                <div className="flex items-center justify-between gap-4">
                  <motion.div
                    className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl w-20 h-20 flex items-center justify-center shadow-xl"
                  >
                    <span className="text-white font-bold text-2xl">{dashboardData.gauge}</span>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                    className="bg-gray-800/90 backdrop-blur-sm rounded-xl p-4 flex-1 border border-gray-700/50"
                  >
                    <div className="text-white text-sm mb-3 font-semibold flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-400" />
                      Status Items
                    </div>
                    <div className="space-y-2">
                      {['06%', '75%', '25%'].map((percent, i) => (
                        <motion.div
                          key={i}
                          initial={{ width: 0, opacity: 0 }}
                          animate={{ width: '100%', opacity: 1 }}
                          transition={{ delay: 0.8 + i * 0.15, duration: 0.6 }}
                          className="flex items-center justify-between text-xs"
                        >
                          <span className="text-gray-300 flex items-center gap-2">
                            <CheckCircle2 className="w-3 h-3 text-green-400" />
                            Item {i + 1}
                          </span>
                          <span className="text-blue-400 font-semibold">{percent}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl w-20 h-20 flex items-center justify-center shadow-xl"
                  >
                    <CheckCircle2 className="w-8 h-8 text-white" />
                  </motion.div>
                </div>
                
                {/* Numbers Row */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="flex justify-around items-center py-4 bg-gray-800/50 rounded-xl border border-gray-700/30"
                >
                  {dashboardData.numbers.map((num, i) => (
                    <motion.span
                      key={i}
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{
                        delay: 1.2 + i * 0.1,
                        duration: 0.4,
                        repeat: Infinity,
                        repeatDelay: 2.5,
                      }}
                      className="text-2xl font-bold text-blue-400"
                    >
                      {num}
                    </motion.span>
                  ))}
                </motion.div>
                
                {/* Charts Row */}
                <div className="grid grid-cols-2 gap-4">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.2 }}
                    className="bg-gray-800/90 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50"
                  >
                    <div className="text-white text-sm mb-3 font-semibold">Total Values</div>
                    <div className="flex items-end space-x-1.5 h-20">
                      {[8, 12, 6, 10, 14, 9].map((height, i) => (
                        <motion.div
                          key={i}
                          initial={{ height: 0 }}
                          animate={{ height: `${height * 5}px` }}
                          transition={{ delay: 1.4 + i * 0.1, duration: 0.6, ease: "easeOut" }}
                          className="bg-gradient-to-t from-blue-600 via-blue-500 to-blue-400 w-full rounded-t-lg shadow-lg"
                        />
                      ))}
                    </div>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.3 }}
                    className="bg-gray-800/90 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50"
                  >
                    <div className="text-white text-sm mb-3 font-semibold">Error Type</div>
                    <div className="h-20 flex items-end">
                      <svg className="w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
                        <motion.polyline
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ delay: 1.5, duration: 1.2, ease: "easeInOut" }}
                          points="0,35 15,30 30,25 45,20 60,15 75,10 90,8 100,5"
                          fill="none"
                          stroke="url(#gradient)"
                          strokeWidth="3"
                          strokeLinecap="round"
                        />
                        <defs>
                          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#3B82F6" />
                            <stop offset="100%" stopColor="#8B5CF6" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>
                  </motion.div>
                </div>
                
                {/* Bottom Row */}
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { title: 'Simulation Status', type: 'wave' },
                    { title: 'Hardware Type', type: 'bars' },
                    { title: 'Low-High Ratio', type: 'bar' },
                  ].map((chart, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.6 + idx * 0.1 }}
                      className="bg-gray-800/90 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50"
                    >
                      <div className="text-white text-xs mb-3 font-semibold">{chart.title}</div>
                      <div className="h-16">
                        {chart.type === 'wave' && (
                          <svg className="w-full h-full" viewBox="0 0 100 30" preserveAspectRatio="none">
                            <motion.path
                              initial={{ pathLength: 0 }}
                              animate={{ pathLength: 1 }}
                              transition={{ delay: 1.8, duration: 1.2, ease: "easeInOut" }}
                              d="M 0,15 Q 25,5 50,15 T 100,15"
                              fill="none"
                              stroke="#3B82F6"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                            />
                          </svg>
                        )}
                        {chart.type === 'bars' && (
                          <div className="flex items-end space-x-1.5 h-full">
                            {[8, 6, 10, 7].map((h, i) => (
                              <motion.div
                                key={i}
                                initial={{ height: 0 }}
                                animate={{ height: `${h * 5}px` }}
                                transition={{ delay: 1.9 + i * 0.1, duration: 0.6 }}
                                className="bg-gradient-to-t from-blue-600 to-blue-400 w-full rounded-t-lg shadow-md"
                              />
                            ))}
                          </div>
                        )}
                        {chart.type === 'bar' && (
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: '100%' }}
                            transition={{ delay: 2, duration: 1 }}
                            className="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 h-full rounded-lg shadow-lg"
                          />
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="relative py-20 lg:py-32 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Everything You Need for{' '}
              <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                Product Excellence
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive testing, simulation, and certification services powered by cutting-edge technology
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: TestTube,
                title: 'Advanced Testing',
                description: 'Comprehensive testing suite covering EMC, RF, Safety, and Environmental testing with real-time analysis and automated reporting.',
                color: 'from-blue-500 to-blue-600'
              },
              {
                icon: Cpu,
                title: 'AI-Powered Simulation',
                description: 'Predictive simulation technology that identifies potential issues before physical testing, saving time and resources.',
                color: 'from-purple-500 to-purple-600'
              },
              {
                icon: Shield,
                title: 'Certification Management',
                description: 'Streamlined certification process with compliance tracking, documentation management, and automated renewal reminders.',
                color: 'from-green-500 to-green-600'
              },
              {
                icon: Target,
                title: 'Design Verification',
                description: 'Automated design validation and quality assurance to ensure your product meets all specifications and standards.',
                color: 'from-orange-500 to-orange-600'
              },
              {
                icon: BarChart3,
                title: 'Real-Time Analytics',
                description: 'Comprehensive dashboards with live metrics, performance tracking, and actionable insights for data-driven decisions.',
                color: 'from-indigo-500 to-indigo-600'
              },
              {
                icon: FileCheck,
                title: 'Complete Documentation',
                description: 'Automated report generation, test documentation, and compliance certificates with professional formatting.',
                color: 'from-pink-500 to-pink-600'
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl border border-gray-100 transition-all"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity`} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="relative py-16 sm:py-20 lg:py-32 bg-gradient-to-br from-gray-50 to-blue-50/30 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
              How It <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">Works</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              Simple, streamlined process from submission to certification
            </p>
          </motion.div>

          {/* Steps Container */}
          <div className="relative max-w-6xl mx-auto">
            {/* Connecting Line - Desktop Horizontal */}
            <div className="hidden md:block absolute top-24 left-0 right-0 h-1 -z-10">
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                className="h-full bg-gradient-to-r from-primary via-purple-500 to-primary origin-left relative"
              >
                {/* Animated flowing dot */}
                <motion.div
                  initial={{ x: 0 }}
                  whileInView={{ x: "100%" }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatDelay: 1,
                    ease: "linear"
                  }}
                  className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg border-2 border-primary"
                />
                {/* Pulsing dots at each step */}
                {[0, 1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: [0, 1.5, 1], opacity: [0, 1, 1] }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8 + i * 0.3, duration: 0.6 }}
                    className="absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-primary rounded-full border-4 border-white shadow-lg"
                    style={{ left: `${(i * 33.33) + 8}%` }}
                  >
                    <motion.div
                      animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 1.5 + i * 0.3 }}
                      className="absolute inset-0 bg-primary rounded-full"
                    />
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Connecting Line - Mobile Vertical */}
            <div className="md:hidden absolute left-8 top-0 bottom-0 w-1 -z-10">
              <motion.div
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                className="h-full bg-gradient-to-b from-primary via-purple-500 to-primary origin-top relative"
              >
                {/* Animated flowing dot */}
                <motion.div
                  initial={{ y: 0 }}
                  whileInView={{ y: "100%" }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatDelay: 1,
                    ease: "linear"
                  }}
                  className="absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-white rounded-full shadow-lg border-2 border-primary"
                />
                {/* Pulsing dots at each step */}
                {[0, 1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: [0, 1.5, 1], opacity: [0, 1, 1] }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8 + i * 0.3, duration: 0.6 }}
                    className="absolute left-1/2 -translate-x-1/2 w-6 h-6 bg-primary rounded-full border-4 border-white shadow-lg"
                    style={{ top: `${(i * 25) + 12}%` }}
                  >
                    <motion.div
                      animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 1.5 + i * 0.3 }}
                      className="absolute inset-0 bg-primary rounded-full"
                    />
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Steps Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 sm:gap-8 md:gap-6 lg:gap-8">
              {[
                { step: '01', title: 'Submit Product', description: 'Upload your product details and specifications through our secure portal', icon: FileCheck },
                { step: '02', title: 'Analysis & Planning', description: 'Our AI analyzes your requirements and creates a comprehensive test plan', icon: Target },
                { step: '03', title: 'Testing & Simulation', description: 'Automated testing and simulation processes run with real-time monitoring', icon: TestTube },
                { step: '04', title: 'Certification & Reports', description: 'Receive detailed reports, certificates, and compliance documentation', icon: Award },
              ].map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ 
                    delay: index * 0.2, 
                    duration: 0.6,
                    type: "spring",
                    stiffness: 100
                  }}
                  whileHover={{ 
                    y: -8, 
                    scale: 1.05,
                    transition: { duration: 0.3 }
                  }}
                  className="relative group h-full flex"
                >
                  {/* Step Card */}
                  <div className="relative text-center bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 w-full flex flex-col h-full">
                    {/* Icon Container with Enhanced Animation */}
                    <div className="relative mb-6 flex justify-center flex-shrink-0">
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ 
                          delay: 0.5 + index * 0.2, 
                          duration: 0.8,
                          type: "spring",
                          stiffness: 100
                        }}
                        whileHover={{ 
                          scale: 1.1,
                          transition: { duration: 0.6 }
                        }}
                        className="relative"
                      >
                        {/* Glow effect */}
                        <motion.div
                          animate={{ 
                            scale: [1, 1.2, 1],
                            opacity: [0.3, 0.6, 0.3]
                          }}
                          transition={{ 
                            duration: 2,
                            repeat: Infinity,
                            delay: index * 0.5
                          }}
                          className="absolute inset-0 bg-gradient-to-br from-primary to-purple-600 rounded-2xl blur-xl"
                        />
                        <div className="relative w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-primary via-blue-600 to-primary-dark rounded-2xl flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all">
                          <motion.div
                            animate={{ 
                              y: [0, -5, 0],
                            }}
                            transition={{ 
                              duration: 2,
                              repeat: Infinity,
                              delay: index * 0.3,
                              ease: "easeInOut"
                            }}
                          >
                            <step.icon className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
                          </motion.div>
                        </div>
                      </motion.div>
                      
                      {/* Step Number Badge */}
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ 
                          delay: 0.7 + index * 0.2,
                          type: "spring",
                          stiffness: 200
                        }}
                        whileHover={{ 
                          scale: 1.1,
                          transition: { duration: 0.4 }
                        }}
                        className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 rounded-full flex items-center justify-center text-gray-900 font-bold shadow-xl border-4 border-white z-10"
                      >
                        <span className="text-sm sm:text-base">{step.step}</span>
                      </motion.div>
                    </div>

                    {/* Content */}
                    <div className="flex flex-col flex-grow">
                      <motion.h3
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.9 + index * 0.2 }}
                        className="text-lg sm:text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors flex-shrink-0"
                      >
                        {step.title}
                      </motion.h3>
                      <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 1 + index * 0.2 }}
                        className="text-sm sm:text-base text-gray-600 leading-relaxed flex-grow"
                      >
                        {step.description}
                      </motion.p>
                    </div>

                    {/* Hover effect overlay */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      className="absolute inset-0 bg-gradient-to-br from-primary/5 to-purple-600/5 rounded-2xl pointer-events-none"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats & Trust Section */}
      <section className="relative py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: Users, value: '500+', label: 'Satisfied Clients', color: 'text-blue-600' },
              { icon: TestTube, value: '10K+', label: 'Tests Completed', color: 'text-purple-600' },
              { icon: Award, value: '99.9%', label: 'Success Rate', color: 'text-green-600' },
              { icon: Globe, value: '50+', label: 'Countries Served', color: 'text-orange-600' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
                className="text-center p-8 bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-lg hover:shadow-xl transition-all"
              >
                <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-br ${stat.color.replace('text-', 'from-')} to-${stat.color.replace('text-', '')}/80 rounded-xl flex items-center justify-center`}>
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 lg:py-32 bg-gradient-to-br from-primary via-blue-600 to-primary-dark overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6">
              Ready to Accelerate Your Product Development?
            </h2>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Join hundreds of companies using our platform to streamline testing, simulation, and certification processes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/product-details">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white text-primary rounded-xl font-semibold shadow-xl hover:shadow-2xl transition-all flex items-center gap-2"
                >
                  Get Started Free
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
              <Link to="/pricing">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl font-semibold hover:bg-white/10 transition-all"
                >
                  View Pricing
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Home
