import { useNavigate } from 'react-router-dom'
import { Search, ArrowLeft, Eye, AlertCircle, ArrowRight } from 'lucide-react'

function RequestUnderReview({ onNext }) {
  const navigate = useNavigate()

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Search className="w-10 h-10 text-blue-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Debugging Request is Under Review</h1>
        <p className="text-lg text-gray-600">
          Our engineers are analyzing your test reports and identifying the root cause of the issue. We'll notify you as soon as the diagnostics phase is complete.
        </p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-blue-800">
            <strong>No action needed from your side.</strong> We'll keep you updated.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/customer/dashboard')}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </button>
        
        <div className="flex items-center gap-4">
          <button
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold flex items-center gap-2"
          >
            <Eye className="w-4 h-4" />
            View Submitted Data
          </button>
          
          {onNext && (
            <button
              onClick={onNext}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center gap-2"
            >
              Proceed to Diagnostics
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default RequestUnderReview

