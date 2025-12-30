import { useState } from 'react'
import { Search, DollarSign, User, Lightbulb, Wrench, CheckCircle, ArrowLeft, ArrowRight } from 'lucide-react'

function IssueIdentificationReview({ formData, updateFormData }) {
  const [engineerComments, setEngineerComments] = useState(formData.engineerComments || '')
  const [issueCategory, setIssueCategory] = useState(formData.issueCategory || 'EMI / EMC Category')
  const [severityRating, setSeverityRating] = useState(formData.severityRating || 'Low Severity')
  const [confidenceScore, setConfidenceScore] = useState(formData.confidenceScore || 75)
  const [debugPath, setDebugPath] = useState(formData.debugPath || 'full')

  const detectedIssues = [
    { id: 1, text: 'Excessive conducted emissions in mid-frequency range (2-5MHz)', color: 'orange' },
    { id: 2, text: 'Power supply switching noise propagating through AC mains', color: 'orange' },
    { id: 3, text: 'Insufficient input filtering on primary power stage', color: 'orange' },
    { id: 4, text: 'Ground loop potential detected in chassis-to-earth connection', color: 'orange' },
  ]

  const costBreakdown = [
    { item: 'Analysis & Planning', amount: 600 },
    { item: 'Hardware Modifications', amount: 900 },
    { item: 'Testing & Validation', amount: 700 },
    { item: 'Documentation', amount: 200 },
  ]

  const totalCost = costBreakdown.reduce((sum, item) => sum + item.amount, 0)

  const handleCommentsChange = (value) => {
    setEngineerComments(value)
    updateFormData({ engineerComments: value })
  }

  const handleDebugPathChange = (path) => {
    setDebugPath(path)
    updateFormData({ debugPath: path })
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Issue Identification & Engineer Review</h1>
        <p className="text-gray-600 mt-2">Review AI-extracted insights and provide engineering assessment</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Issue Identification Summary */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Search className="w-5 h-5 text-blue-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Issue Identification Summary</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Detected Test Type</label>
              <div className="mt-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-900">
                Conducted EMI Testing
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Report Parsing Summary</label>
              <div className="mt-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700">
                Frequency range 150kHz-30MHz. Multiple exceedances detected in the 2-5MHz range with peak violations at 3.2MHz (+8dB above limit). Power supply harmonics showing non-compliance patterns.
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Initial Issues Identified</label>
              <div className="mt-2 space-y-2">
                {detectedIssues.map((issue) => (
                  <div key={issue.id} className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></div>
                    <span className="text-sm text-gray-700">{issue.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Estimated Debug Cost */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-green-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Estimated Debug Cost</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Predicted Cost Range</label>
              <div className="mt-2 p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="text-3xl font-bold text-gray-900">${totalCost.toLocaleString()}</div>
                <div className="text-sm text-gray-600 mt-1">* $300</div>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Cost Breakdown</label>
              <div className="mt-2 space-y-2">
                {costBreakdown.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-700">{item.item}</span>
                    <span className="text-sm font-medium text-gray-900">${item.amount}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-xs text-yellow-800">
                This is an approximate cost. Actual cost depends on debugging complexity and required iterations.
              </p>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-700">
              <div className="w-5 h-5 bg-gray-200 rounded flex items-center justify-center">
                <span className="text-xs">🕐</span>
              </div>
              <span>Estimated Timeline: 3-5 business days</span>
            </div>
          </div>
        </div>
      </div>

      {/* Technician / Engineer Review Commenting */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
            <User className="w-5 h-5 text-purple-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">Technician / Engineer Review Commenting</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Comments</label>
            <textarea
              value={engineerComments}
              onChange={(e) => handleCommentsChange(e.target.value)}
              placeholder="Write to the Technician / Engineer"
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Issue Category</label>
              <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-900">
                {issueCategory}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Severity Rating</label>
              <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-900">
                {severityRating}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Issue Confidence Score: {confidenceScore}%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={confidenceScore}
                onChange={(e) => {
                  const value = parseInt(e.target.value)
                  setConfidenceScore(value)
                  updateFormData({ confidenceScore: value })
                }}
                className="w-full"
              />
              <div className="flex items-center justify-between text-xs text-gray-500 mt-1">
                <span>Low Confidence</span>
                <span>High Confidence</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Debug Path Selection */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Debug Path Selection</h2>
        
        <div className="grid md:grid-cols-2 gap-4">
          <button
            onClick={() => handleDebugPathChange('recommendation')}
            className={`p-6 border-2 rounded-xl text-left transition-all ${
              debugPath === 'recommendation'
                ? 'border-blue-600 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                debugPath === 'recommendation' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'
              }`}>
                <Lightbulb className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg text-gray-900 mb-2">Recommendation Only</h3>
                <p className="text-sm text-gray-600">
                  Only provide debugging recommendations based on the identified issue. No hands-on debugging required.
                </p>
              </div>
            </div>
          </button>

          <button
            onClick={() => handleDebugPathChange('full')}
            className={`p-6 border-2 rounded-xl text-left transition-all relative ${
              debugPath === 'full'
                ? 'border-blue-600 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            {debugPath === 'full' && (
              <div className="absolute top-2 right-2 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-white" />
              </div>
            )}
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                debugPath === 'full' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'
              }`}>
                <Wrench className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg text-gray-900 mb-2">Full Debugging</h3>
                <p className="text-sm text-gray-600">
                  Proceed with full debugging including fix strategy, implementation planning, and retesting pathway.
                </p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}

export default IssueIdentificationReview

