import { useState } from 'react'
import { Upload, Cloud, FileText, X } from 'lucide-react'

function ProductDebuggingDetails({ formData, updateFormData }) {
  const [selectedTests, setSelectedTests] = useState(formData.selectedDebugTests || [])
  const [customTest, setCustomTest] = useState(formData.customTest || '')
  const [uploadedFiles, setUploadedFiles] = useState(formData.uploadedTestReports || [])
  const [issueDescription, setIssueDescription] = useState(formData.issueDescription || '')

  const testTypes = [
    { id: 'conducted-emi', label: 'Conducted EMI' },
    { id: 'radiated-emi', label: 'Radiated EMI' },
    { id: 'esd', label: 'ESD' },
    { id: 'surge-eft', label: 'Surge / EFT' },
    { id: 'harmonics-flicker', label: 'Harmonics & Flicker' },
    { id: 'rf-emissions', label: 'RF Emissions' },
    { id: 'power-quality', label: 'Power Quality' },
    { id: 'functional', label: 'Functional Testing' },
  ]

  const toggleTest = (testId) => {
    const current = selectedTests
    if (current.includes(testId)) {
      const newSelection = current.filter(id => id !== testId)
      setSelectedTests(newSelection)
      updateFormData({ selectedDebugTests: newSelection })
    } else {
      const newSelection = [...current, testId]
      setSelectedTests(newSelection)
      updateFormData({ selectedDebugTests: newSelection })
    }
  }

  const handleCustomTestChange = (value) => {
    setCustomTest(value)
    updateFormData({ customTest: value })
  }

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files || [])
    const newFiles = files.map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: file.size,
      type: file.type,
      file: file
    }))
    const updatedFiles = [...uploadedFiles, ...newFiles]
    setUploadedFiles(updatedFiles)
    updateFormData({ uploadedTestReports: updatedFiles })
  }

  const handleRemoveFile = (fileId) => {
    const newFiles = uploadedFiles.filter(f => f.id !== fileId)
    setUploadedFiles(newFiles)
    updateFormData({ uploadedTestReports: newFiles })
  }

  const handleIssueDescriptionChange = (value) => {
    setIssueDescription(value)
    updateFormData({ issueDescription: value })
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Product Debugging - Targeted Testing</h1>
        <p className="text-gray-600 mt-2">Select the testing areas that need debugging and upload your test reports for analysis.</p>
      </div>

      {/* Select Testing to Debug */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-2">Select Testing to Debug</h2>
        <p className="text-sm text-gray-600 mb-6">Select the tests where issues were observed and need debugging.</p>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-3">
            {testTypes.slice(0, 4).map((test) => (
              <label
                key={test.id}
                className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selectedTests.includes(test.id)}
                  onChange={() => toggleTest(test.id)}
                  className="w-4 h-4"
                />
                <span className="text-sm font-medium">{test.label}</span>
              </label>
            ))}
            <div className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg">
              <input
                type="checkbox"
                checked={selectedTests.includes('custom')}
                onChange={() => toggleTest('custom')}
                className="w-4 h-4"
              />
              <span className="text-sm font-medium">Custom Test:</span>
              <input
                type="text"
                value={customTest}
                onChange={(e) => handleCustomTestChange(e.target.value)}
                placeholder="Specify custom test"
                className="flex-1 px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={!selectedTests.includes('custom')}
              />
            </div>
          </div>
          <div className="space-y-3">
            {testTypes.slice(4).map((test) => (
              <label
                key={test.id}
                className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selectedTests.includes(test.id)}
                  onChange={() => toggleTest(test.id)}
                  className="w-4 h-4"
                />
                <span className="text-sm font-medium">{test.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Upload Test Reports */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-2">Upload Test Reports (Mandatory)</h2>
        <p className="text-sm text-gray-600 mb-6">Upload the failed or problematic test reports from your lab. This helps our engineers analyze and identify issues accurately.</p>
        
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
          <Cloud className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 mb-2">Drag and drop files here or click to browse</p>
          <label className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer">
            Choose Files
            <input
              type="file"
              multiple
              accept=".pdf,.png,.jpg,.docx"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
          <p className="text-xs text-gray-500 mt-2">Supported formats: PDF, PNG, JPG, DOCX</p>
        </div>

        {uploadedFiles.length > 0 && (
          <div className="mt-4 space-y-2">
            {uploadedFiles.map((file) => (
              <div
                key={file.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
              >
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-gray-600" />
                  <span className="text-sm text-gray-900">{file.name}</span>
                  <span className="text-xs text-gray-500">
                    ({(file.size / 1024).toFixed(0)} KB)
                  </span>
                </div>
                <button
                  onClick={() => handleRemoveFile(file.id)}
                  className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Describe Observed Issues */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-2">Describe Observed Issues (Optional)</h2>
        <p className="text-sm text-gray-600 mb-4">Describe symptoms, failure points, unusual waveforms, or any observations.</p>
        
        <textarea
          value={issueDescription}
          onChange={(e) => handleIssueDescriptionChange(e.target.value)}
          placeholder="Enter details about the issues you've observed..."
          rows={6}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Next Step Information */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-xs font-bold">i</span>
          </div>
          <p className="text-sm text-blue-800">
            <strong>Next Step:</strong> After submission, our engineers will perform issue identification and diagnostics based on your uploaded reports.
          </p>
        </div>
      </div>
    </div>
  )
}

export default ProductDebuggingDetails

