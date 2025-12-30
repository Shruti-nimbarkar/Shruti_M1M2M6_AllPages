import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, Save, CheckCircle } from 'lucide-react'
import ProductDetails from './ProductDetails'
import DebuggingTechnicalDocuments from './DebuggingTechnicalDocuments'
import ProductDebuggingDetails from './ProductDebuggingDetails'
import RequestUnderReview from './RequestUnderReview'
import IssueIdentificationReview from './IssueIdentificationReview'
import DebuggingSubmissionSuccess from './DebuggingSubmissionSuccess'

function DebuggingFlow() {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    // Product Details
    eutName: '',
    eutQuantity: '',
    manufacturer: '',
    modelNo: '',
    serialNo: '',
    supplyVoltage: '',
    operatingFrequency: '',
    current: '',
    weight: '',
    dimensions: { length: '', width: '', height: '' },
    powerPorts: '',
    signalLines: '',
    softwareName: '',
    softwareVersion: '',
    
    // Industry/Application
    industry: [],
    industryOther: '',
    
    // Testing dates
    preferredDate: '',
    additionalNotes: '',
    
    // Debugging Details
    selectedDebugTests: [],
    customTest: '',
    uploadedTestReports: [],
    issueDescription: '',
    
    // Issue Review
    engineerComments: '',
    issueCategory: 'EMI / EMC Category',
    severityRating: 'Low Severity',
    confidenceScore: 75,
    debugPath: 'full',
    
    // Documents
    uploadedDocs: {}
  })

  const steps = [
    { id: 'product', title: 'Product Details', component: ProductDetails },
    { id: 'documents', title: 'Technical Specification Documents', component: DebuggingTechnicalDocuments },
    { id: 'debugging', title: 'Product Debugging Details', component: ProductDebuggingDetails },
    { id: 'review', title: 'Request under Review', component: RequestUnderReview },
    { id: 'issue', title: 'Issue Identification & Review', component: IssueIdentificationReview },
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
    localStorage.setItem('debugging_draft', JSON.stringify(formData))
    alert('Draft saved successfully!')
  }

  const handleSubmit = () => {
    // Save to context or send to API
    console.log('Debugging Form submitted:', formData)
    setCurrentStep(steps.length) // Move to success page
  }

  const updateFormData = (updates) => {
    setFormData(prev => ({ ...prev, ...updates }))
  }

  // Sidebar navigation
  const sidebarSteps = [
    { title: 'Product Details', completed: currentStep > 0 },
    { title: 'Technical Specification Documents', completed: currentStep > 1 },
    { title: 'Product Debugging Details', completed: currentStep > 2 },
    { title: 'Request under Review', completed: currentStep > 3 },
    { title: 'Issue Identification & Review', completed: currentStep > 4 },
    { title: 'Submit Request', completed: currentStep > 5 },
  ]

  if (currentStep >= steps.length) {
    return <DebuggingSubmissionSuccess />
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
                    onNext={currentStep === 3 ? handleNext : undefined}
                  />
                )}
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            {currentStep !== 3 && ( // Hide navigation on Request under Review step
              <div className="mt-8 flex items-center justify-between">
                <button
                  onClick={handlePrevious}
                  disabled={currentStep === 0}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Previous
                </button>

                <button
                  onClick={handleSaveDraft}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Save as Draft
                </button>

                <button
                  onClick={handleNext}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  {currentStep === steps.length - 1 ? 'Submit Request' : currentStep === 2 ? 'Continue to Diagnostics →' : 'Next'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

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

export default DebuggingFlow

