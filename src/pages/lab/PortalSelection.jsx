import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FolderKanban, FlaskConical, ArrowRight } from 'lucide-react'

function PortalSelection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 flex items-center justify-center px-6 py-20">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl w-full"
      >
        <motion.div variants={itemVariants} className="text-center mb-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary to-primary-dark rounded-2xl mb-6 shadow-xl"
          >
            <FlaskConical className="w-10 h-10 text-white" />
          </motion.div>
          <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
            Lab Portal
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Access the lab portal for managing projects, queues, and schedules.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-1 gap-8">
          {/* Lab Portal Button */}
          <motion.div variants={itemVariants}>
            <Link to="/lab/dashboard">
              <motion.div
                whileHover={{ scale: 1.02, y: -4 }}
                whileTap={{ scale: 0.98 }}
                className="group relative h-full bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-200 hover:border-primary transition-all cursor-pointer overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-dark rounded-xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
                    <FolderKanban className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">
                    Lab Portal
                  </h2>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Manage lab projects, queues, and schedules. View and manage testing requests, track project progress, and coordinate lab activities.
                  </p>
                  <div className="flex items-center text-primary font-semibold group-hover:gap-3 transition-all">
                    <span>Enter Lab Portal</span>
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>
            </Link>
          </motion.div>

        </div>
      </motion.div>
    </div>
  )
}

export default PortalSelection

