import { useState } from 'react'
import { Settings, List, Star, FileText, Calendar, CheckCircle, Building2 } from 'lucide-react'

function CalibrationDetails({ formData, updateFormData }) {
  const [approvePlan, setApprovePlan] = useState(formData.approvePlan || false)
  const [understandTests, setUnderstandTests] = useState(formData.understandTests || false)

  const instrumentTests = [
    'Frequency Accuracy',
    'Amplitude Accuracy',
    'Bandwidth / RBW Verification',
    'Display Linearity',
    'Time Base / Trigger Accuracy',
    'Noise Floor Measurement',
    'Probe Calibration / Offset Tests',
    'Self-Test & Functional Checks',
  ]

  const chamberTests = [
    'Field Uniformity Measurement',
    'SVSWR (Site Voltage Standing Wave Ratio)',
    'NSA (Normalized Site Attenuation) Validation',
    'Antenna Factor Calibration',
    'Temperature Profile Validation',
    'Humidity Stability Check',
    'Vibration Spectrum Verification',
    'Absorber Performance Test',
    'Ambient RF Noise Check',
  ]

  const tests = formData.calibrationType === 'chamber' ? chamberTests : instrumentTests

  const handleApprovalChange = (field, value) => {
    if (field === 'approvePlan') {
      setApprovePlan(value)
      updateFormData({ approvePlan: value })
    } else if (field === 'understandTests') {
      setUnderstandTests(value)
      updateFormData({ understandTests: value })
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Calibration Details</h1>
      </div>

      {/* Equipment Summary */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
            <Settings className="w-5 h-5 text-blue-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">Equipment Summary</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-medium text-gray-700">Calibration Type</label>
            <div className="mt-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-900">
              {formData.calibrationType === 'instrument' ? 'Instrument' : 'Chamber'}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Model & Serial Number</label>
            <div className="mt-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-900">
              {formData.modelNumber || 'N/A'} / SN: {formData.serialNumber || 'N/A'}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              {formData.calibrationType === 'instrument' ? 'Equipment Name' : 'Chamber Type'}
            </label>
            <div className="mt-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-900">
              {formData.calibrationType === 'instrument' 
                ? (formData.instrumentType || 'Not specified')
                : (formData.chamberType || 'Not specified')}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Calibration Location</label>
            <div className="mt-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-blue-600" />
              Lab
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Calibration Scope</label>
            <div className="mt-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-900">
              {formData.calibrationServices?.includes('full') ? 'Full' : 'Partial'}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Scheduled Date</label>
            <div className="mt-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-600" />
              {formData.preferredDate ? new Date(formData.preferredDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Not scheduled'}
            </div>
          </div>
        </div>
      </div>

      {/* Tests to Be Performed */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
            <List className="w-5 h-5 text-blue-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">Tests to Be Performed</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {tests.map((test, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              <span className="text-sm text-gray-700">{test}</span>
            </div>
          ))}
        </div>
      </div>

      {/* How Calibration Will Be Performed */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
            <Settings className="w-5 h-5 text-blue-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">How Calibration Will Be Performed</h2>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4 flex items-center gap-3">
          <Star className="w-5 h-5 text-blue-600" />
          <div>
            <p className="font-semibold text-gray-900">Standards Reference</p>
            <p className="text-sm text-gray-600">ANSI 678.... compliance verification</p>
          </div>
        </div>
      </div>

      {/* Deliverables */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
            <FileText className="w-5 h-5 text-blue-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">Deliverables</h2>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Star className="w-5 h-5 text-green-600" />
            <span className="text-gray-700">Calibration Certificate</span>
          </div>
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-green-600" />
            <span className="text-gray-700">Next Calibration Due Date</span>
          </div>
        </div>
      </div>

      {/* Confirmation */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
            <CheckCircle className="w-5 h-5 text-blue-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">Confirmation</h2>
        </div>

        <div className="space-y-3">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={approvePlan}
              onChange={(e) => handleApprovalChange('approvePlan', e.target.checked)}
              className="w-5 h-5 mt-0.5"
            />
            <span className="text-sm text-gray-700">
              I have reviewed and approve the calibration test plan.
            </span>
          </label>

          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={understandTests}
              onChange={(e) => handleApprovalChange('understandTests', e.target.checked)}
              className="w-5 h-5 mt-0.5"
            />
            <span className="text-sm text-gray-700">
              I understand additional tests may be required depending on equipment condition.
            </span>
          </label>
        </div>
      </div>
    </div>
  )
}

export default CalibrationDetails

