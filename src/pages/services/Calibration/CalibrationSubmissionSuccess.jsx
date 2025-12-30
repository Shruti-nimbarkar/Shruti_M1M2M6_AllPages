import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CheckCircle, ArrowLeft, Eye, Search, Phone, Mail, MapPin, Package, Award, Clock } from 'lucide-react'

function CalibrationSubmissionSuccess({ formData }) {
  const navigate = useNavigate()

  const nextSteps = [
    {
      title: 'Technical Review',
      description: 'A technician reviews your request and documents to ensure all requirements are met.',
      icon: Search,
    },
    {
      title: 'Scheduling Confirmation',
      description: 'You will receive a call or email for scheduling confirmation within 24-48 hours.',
      icon: Phone,
    },
    {
      title: 'On-Site Service Details',
      description: 'On-site jobs will get technician contact details and expected arrival time.',
      icon: MapPin,
    },
    {
      title: 'Lab Service Instructions',
      description: 'Lab jobs will receive drop-off/shipping instructions and tracking information.',
      icon: Package,
    },
    {
      title: 'Results & Certificate',
      description: 'After calibration, results and certificate will be uploaded to your dashboard.',
      icon: Award,
    },
  ]

  const statusSteps = [
    { title: 'Request Submitted', status: 'completed' },
    { title: 'Technician Review', status: 'pending' },
    { title: 'Schedule Confirmation', status: 'pending' },
    { title: 'Calibration in Progress', status: 'pending' },
    { title: 'Report & Certificate', status: 'pending' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar - Progress Tracker */}
          <aside className="w-64 flex-shrink-0">
            <div className="bg-gray-100 rounded-xl p-6 sticky top-8">
              <div className="space-y-4">
                {[
                  { title: 'Calibration Request', completed: true },
                  { title: 'Calibration Details', completed: true },
                  { title: 'Review & Submit', completed: true, active: true },
                ].map((step, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3"
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      step.active
                        ? 'bg-blue-600 text-white'
                        : step.completed
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-300 text-gray-600'
                    }`}>
                      {step.completed ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : (
                        <span className="text-sm font-medium">{index + 1}</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className={`text-sm font-medium ${
                        step.active ? 'text-gray-900' : 'text-gray-600'
                      }`}>
                        {step.title}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-6"
            >
              {/* Success Header */}
              <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring' }}
                  className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg"
                >
                  <CheckCircle className="w-12 h-12 text-white" />
                </motion.div>
                
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Calibration Request Has Been Submitted</h1>
                <p className="text-lg text-gray-600">
                  Our technical team is now reviewing your details and documents.
                </p>
              </div>

              {/* Confirmation Summary */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Confirmation Summary</h2>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                    Submitted
                  </span>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm text-gray-700">Work Order Number</label>
                    <div className="mt-1 font-semibold text-gray-900">
                      {formData?.workOrderNumber || 'WO-2024-05892'}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-700">Job ID</label>
                    <div className="mt-1 font-semibold text-gray-900">
                      {formData?.jobId || 'CAL-J-47821'}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-700">Calibration Type</label>
                    <div className="mt-1 font-semibold text-gray-900">
                      {formData?.calibrationType === 'instrument' ? 'Instrument' : 'Chamber'}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-700">Preferred Date</label>
                    <div className="mt-1 font-semibold text-gray-900">
                      {formData?.preferredDate ? new Date(formData.preferredDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Dec 12, 2025'}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-700">Service Mode</label>
                    <div className="mt-1 font-semibold text-gray-900">On-Site</div>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg flex items-start gap-2">
                  <Clock className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-blue-800">
                    A technician will reach out soon to confirm scheduling.
                  </p>
                </div>
              </div>

              {/* Current Status */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-2">Current Status: Under Review</h2>
                <p className="text-sm text-gray-600 mb-6">Track your calibration request progress</p>
                
                <div className="flex items-center justify-between">
                  {statusSteps.map((step, index) => (
                    <div key={index} className="flex flex-col items-center flex-1">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                        step.status === 'completed' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'
                      }`}>
                        {step.status === 'completed' ? (
                          <CheckCircle className="w-5 h-5" />
                        ) : (
                          <span className="text-sm font-medium">{index + 1}</span>
                        )}
                      </div>
                      <span className="text-xs text-gray-600 text-center">{step.title}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* What Happens Next */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">What Happens Next</h2>
                
                <div className="space-y-4">
                  {nextSteps.map((step, index) => {
                    const Icon = step.icon
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg"
                      >
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Icon className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-1">{step.title}</h3>
                          <p className="text-sm text-gray-600">{step.description}</p>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </div>

              {/* Need Help */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Need Help?</h2>
                <p className="text-sm text-gray-600 mb-4">Our support team is here to assist you</p>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                    <Phone className="w-5 h-5 text-purple-600" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">Call Support</div>
                      <div className="text-sm text-gray-600">1-800-555-1234</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                    <Mail className="w-5 h-5 text-purple-600" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">Email Support</div>
                      <div className="text-sm text-gray-600">support@calibrationhub.com</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between">
                <button
                  onClick={() => navigate('/customer/dashboard')}
                  className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-semibold flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Dashboard
                </button>
                
                <button
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold flex items-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  View Submitted Data
                </button>
              </div>
            </motion.div>

            {/* Footer */}
            <div className="mt-8 flex items-center justify-end gap-6 text-sm text-gray-600">
              <a href="#" className="hover:text-gray-900">Help</a>
              <a href="#" className="hover:text-gray-900">Privacy</a>
              <a href="#" className="hover:text-gray-900">Terms</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CalibrationSubmissionSuccess

