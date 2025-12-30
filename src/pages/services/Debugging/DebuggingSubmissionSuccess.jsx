import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CheckCircle, Settings, FileText, Eye, ArrowLeft, Clock } from 'lucide-react'

function DebuggingSubmissionSuccess() {
  const navigate = useNavigate()

  const detectedIssues = [
    { id: 1, text: 'Memory leak in user authentication module', color: 'red' },
    { id: 2, text: 'Database connection timeout errors', color: 'orange' },
    { id: 3, text: 'API response delays in payment gateway', color: 'yellow' },
    { id: 4, text: 'Frontend rendering inconsistencies', color: 'blue' },
  ]

  const submittedReports = [
    { id: 1, name: 'error_logs_2024_11_28.json' },
    { id: 2, name: 'performance_metrics.csv' },
    { id: 3, name: 'user_feedback_report.pdf' },
  ]

  const nextSteps = [
    { title: 'Diagnostics Completed', status: 'completed', icon: CheckCircle },
    { title: 'Debugging & Implementation', status: 'in-progress', icon: Settings },
    { title: 'Retesting', status: 'pending', icon: FileText },
    { title: 'Final Report Delivery', status: 'pending', icon: FileText },
  ]

  const getStatusColor = (status) => {
    if (status === 'completed') return 'text-green-600'
    if (status === 'in-progress') return 'text-blue-600'
    return 'text-gray-400'
  }

  const getStatusText = (status) => {
    if (status === 'completed') return '✓ Finished'
    if (status === 'in-progress') return 'In Progress'
    return 'Pending'
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar - Progress Tracker */}
          <aside className="w-64 flex-shrink-0">
            <div className="bg-gray-100 rounded-xl p-6 sticky top-8">
              <div className="space-y-4">
                {[
                  { title: 'Product Details', completed: true },
                  { title: 'Technical Specification Documents', completed: true },
                  { title: 'Product Debugging Details', completed: true },
                  { title: 'Request under Review', completed: true },
                  { title: 'Issue Identification & Review', completed: true },
                  { title: 'Submit Request', completed: true, active: true },
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
              className="bg-white rounded-xl border border-gray-200 p-8 mb-8"
            >
              {/* Success Header */}
              <div className="text-center mb-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring' }}
                  className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg"
                >
                  <CheckCircle className="w-12 h-12 text-white" />
                </motion.div>
                
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Diagnostics & Debugging Initiated</h1>
                <p className="text-lg text-gray-600">
                  Our engineering team has begun evaluating the issues identified from your test reports.
                </p>
              </div>

              {/* Diagnostics Outcome Summary */}
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                {/* Detected Issues */}
                <div className="bg-gray-50 rounded-xl border border-gray-200 p-6">
                  <h3 className="font-bold text-gray-900 mb-4">Detected Issues</h3>
                  <div className="space-y-2">
                    {detectedIssues.map((issue) => (
                      <div key={issue.id} className="flex items-start gap-2">
                        <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                          issue.color === 'red' ? 'bg-red-500' :
                          issue.color === 'orange' ? 'bg-orange-500' :
                          issue.color === 'yellow' ? 'bg-yellow-500' :
                          'bg-blue-500'
                        }`}></div>
                        <span className="text-sm text-gray-700">{issue.text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Service Path Selected */}
                <div className="bg-blue-50 rounded-xl border border-blue-200 p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Settings className="w-5 h-5 text-blue-600" />
                    <h3 className="font-bold text-gray-900">Service Path Selected</h3>
                  </div>
                  <div className="bg-white rounded-lg p-3 border border-blue-200 mb-2">
                    <p className="font-semibold text-gray-900">Full Debugging + Fix Implementation</p>
                  </div>
                  <p className="text-sm text-gray-600">Complete analysis with code fixes and optimization.</p>
                </div>

                {/* Your Submitted Reports */}
                <div className="bg-gray-50 rounded-xl border border-gray-200 p-6">
                  <h3 className="font-bold text-gray-900 mb-4">Your Submitted Reports</h3>
                  <div className="space-y-2">
                    {submittedReports.map((report) => (
                      <div key={report.id} className="flex items-center gap-2 p-2 bg-white rounded-lg border border-gray-200">
                        <FileText className="w-4 h-4 text-gray-600" />
                        <span className="text-sm text-gray-700">{report.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* What Happens Next */}
              <div className="bg-gray-50 rounded-xl border border-gray-200 p-6 mb-6">
                <h3 className="font-bold text-gray-900 mb-4">What Happens Next</h3>
                <div className="grid grid-cols-4 gap-4">
                  {nextSteps.map((step, index) => {
                    const Icon = step.icon
                    return (
                      <div key={index} className="text-center">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 ${
                          step.status === 'completed' ? 'bg-green-500' :
                          step.status === 'in-progress' ? 'bg-blue-500' :
                          'bg-gray-300'
                        }`}>
                          <Icon className={`w-6 h-6 ${
                            step.status === 'completed' || step.status === 'in-progress' ? 'text-white' : 'text-gray-600'
                          }`} />
                        </div>
                        <p className="text-sm font-medium text-gray-900 mb-1">{step.title}</p>
                        <p className={`text-xs ${getStatusColor(step.status)}`}>
                          {getStatusText(step.status)}
                        </p>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Informational Message */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-blue-800 font-medium mb-1">You don't need to take any further action.</p>
                    <p className="text-sm text-blue-800 mb-1">Our engineers will notify you once a detailed debugging report is ready.</p>
                    <p className="text-xs text-blue-700">Time varies based on complexity. No fixed ETA.</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between">
                <button
                  onClick={() => navigate('/customer/dashboard')}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center gap-2"
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
            <div className="flex items-center justify-end gap-6 text-sm text-gray-600">
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

export default DebuggingSubmissionSuccess

