import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, Save, CheckCircle } from 'lucide-react'
import CertificationDocuments from './CertificationDocuments'
import CertificationSubmissionSuccess from './CertificationSubmissionSuccess'
import SubmissionReview from './SubmissionReview'

function CertificationFlow() {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    targetRegion: '',
    productName: '',
    productCategory: '',
    standards: ['IEC 61000-4-5', 'CISPR 32', 'IEC 61851'],
    uploadedCertDocs: {},
    additionalNotes: '',
    confirmAccurate: false,
    confirmCorrect: false,
    confirmUnderstand: false,
  })

  const steps = [
    { id: 'documents', title: 'Certification Documents', component: CertificationDocuments },
    { id: 'review', title: 'Submission Review', component: SubmissionReview },
  ]

  const CurrentStepComponent = steps[currentStep]?.component

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      // Submit form
      handleSubmit()
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleSaveDraft = () => {
    localStorage.setItem('certification_draft', JSON.stringify(formData))
    alert('Draft saved successfully!')
  }

  const handleSubmit = () => {
    // Validate confirmations
    if (!formData.confirmAccurate || !formData.confirmCorrect || !formData.confirmUnderstand) {
      alert('Please confirm all statements before submitting.')
      return
    }
    
    // Save to context or send to API
    console.log('Certification Form submitted:', formData)
    setCurrentStep(steps.length) // Move to success page
  }

  const handleEdit = () => {
    setCurrentStep(0) // Go back to first step
  }

  const updateFormData = (updates) => {
    setFormData(prev => ({ ...prev, ...updates }))
  }

  // Sidebar navigation
  const sidebarSteps = [
    { title: 'Certification Documents', completed: currentStep > 0 },
    { title: 'Submission Review', completed: currentStep > 1 },
  ]

  if (currentStep >= steps.length) {
    return <CertificationSubmissionSuccess formData={formData} />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className="w-64 flex-shrink-0">
            <div className="bg-gray-100 rounded-xl p-6 sticky top-8">
              <div className="space-y-4">
                {sidebarSteps.map((step, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3"
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      index === currentStep
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
                        index === currentStep ? 'text-gray-900' : 'text-gray-600'
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
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {CurrentStepComponent && (
                  <CurrentStepComponent
                    formData={formData}
                    updateFormData={updateFormData}
                    onEdit={currentStep === 1 ? handleEdit : undefined}
                  />
                )}
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="mt-8 flex items-center justify-between">
              <button
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {currentStep === 1 ? (
                  <>
                    <ArrowLeft className="w-4 h-4" />
                    Go Back & Edit
                  </>
                ) : (
                  <>
                    <ArrowLeft className="w-4 h-4" />
                    Previous
                  </>
                )}
              </button>

              <button
                onClick={handleSaveDraft}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Save & Continue Later
              </button>

              <button
                onClick={handleNext}
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
              >
                {currentStep === steps.length - 1 ? 'Submit for Review' : 'Next'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

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

export default CertificationFlow

