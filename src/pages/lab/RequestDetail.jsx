import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useLabData } from '../../contexts/LabDataContext'
import { ArrowLeft, User, Calendar, Package, AlertCircle, CheckCircle2, XCircle, Clock, Edit, Save, FileText, Download } from 'lucide-react'
import { useState } from 'react'

function RequestDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { labRequests, technicians, updateRequest, assignRequest, updateRequestStatus, updateRequestProgress } = useLabData()
  const request = labRequests.find(r => r.id === id)
  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState(request || {})
  const [selectedTechnician, setSelectedTechnician] = useState(request?.assignedTo || '')
  const [showAssignModal, setShowAssignModal] = useState(false)
  const [progress, setProgress] = useState(request?.progress || 0)
  const [notes, setNotes] = useState(request?.notes || '')

  if (!request) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 mb-4">Request not found</p>
        <Link to="/lab/queue" className="text-primary hover:underline">
          Back to Queue
        </Link>
      </div>
    )
  }

  const assignedTechnician = technicians.find(t => t.id === request.assignedTo)
  const availableTechnicians = technicians.filter(t => 
    t.specialization === request.service || t.status === 'Available'
  )

  const handleSave = () => {
    updateRequest(id, editForm)
    setIsEditing(false)
  }

  const handleAssign = () => {
    if (!selectedTechnician) {
      alert('Please select a technician')
      return
    }
    assignRequest(id, selectedTechnician)
    setShowAssignModal(false)
    alert('Request assigned successfully!')
  }

  const handleStatusChange = (newStatus) => {
    if (newStatus === 'Rejected') {
      const reason = prompt('Please provide a rejection reason:')
      if (reason) {
        updateRequestStatus(id, newStatus, { rejectionReason: reason })
      }
    } else {
      updateRequestStatus(id, newStatus)
    }
  }

  const handleProgressUpdate = () => {
    updateRequestProgress(id, progress)
    if (notes) {
      updateRequest(id, { notes })
    }
    alert('Progress updated successfully!')
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-700'
      case 'In Progress':
        return 'bg-blue-100 text-blue-700'
      case 'Rejected':
        return 'bg-red-100 text-red-700'
      case 'Pending':
        return 'bg-yellow-100 text-yellow-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Completed':
        return <CheckCircle2 className="w-4 h-4" />
      case 'In Progress':
        return <Clock className="w-4 h-4" />
      case 'Rejected':
        return <XCircle className="w-4 h-4" />
      case 'Pending':
        return <AlertCircle className="w-4 h-4" />
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            to="/lab/queue"
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h2 className="text-2xl font-bold">Request Details</h2>
        </div>
        <div className="flex gap-2">
          {!isEditing ? (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors flex items-center gap-2"
              >
                <Edit className="w-4 h-4" />
                Edit
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                <Save className="w-4 h-4 inline mr-2" />
                Save
              </button>
              <button
                onClick={() => {
                  setIsEditing(false)
                  setEditForm(request)
                }}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Request Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl border border-gray-200 p-6"
          >
            <h3 className="text-lg font-semibold mb-4">Request Information</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-600 flex items-center gap-2 mb-1">
                    <Package className="w-4 h-4" />
                    Request ID
                  </label>
                  <p className="text-gray-700 font-medium">{request.id}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600 flex items-center gap-2 mb-1">
                    <Calendar className="w-4 h-4" />
                    Date
                  </label>
                  <p className="text-gray-700">{request.date}</p>
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-600 mb-1">Product Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editForm.productName || ''}
                    onChange={(e) => setEditForm({ ...editForm, productName: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-700 font-medium">{request.productName}</p>
                )}
              </div>
              <div>
                <label className="text-sm text-gray-600 mb-1">Service Type</label>
                {isEditing ? (
                  <select
                    value={editForm.service || ''}
                    onChange={(e) => setEditForm({ ...editForm, service: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="EMC Testing">EMC Testing</option>
                    <option value="Safety Testing">Safety Testing</option>
                    <option value="Thermal Testing">Thermal Testing</option>
                    <option value="Simulation">Simulation</option>
                    <option value="Calibration">Calibration</option>
                  </select>
                ) : (
                  <p className="text-gray-700">{request.service}</p>
                )}
              </div>
              <div>
                <label className="text-sm text-gray-600 mb-1">Status</label>
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-3 py-1 rounded flex items-center gap-1 ${getStatusBadge(request.status)}`}>
                    {getStatusIcon(request.status)}
                    {request.status}
                  </span>
                  {request.status !== 'Completed' && request.status !== 'Rejected' && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleStatusChange('In Progress')}
                        className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                      >
                        Start
                      </button>
                      {request.status === 'In Progress' && (
                        <button
                          onClick={() => handleStatusChange('Completed')}
                          className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200"
                        >
                          Complete
                        </button>
                      )}
                      <button
                        onClick={() => handleStatusChange('Rejected')}
                        className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              </div>
              {request.rejectionReason && (
                <div>
                  <label className="text-sm text-gray-600 mb-1">Rejection Reason</label>
                  <p className="text-gray-700 bg-red-50 p-3 rounded-lg">{request.rejectionReason}</p>
                </div>
              )}
            </div>
          </motion.div>

          {/* Progress Tracking */}
          {request.status === 'In Progress' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl border border-gray-200 p-6"
            >
              <h3 className="text-lg font-semibold mb-4">Progress Tracking</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-600">Progress</span>
                    <span className="text-sm font-semibold">{request.progress}%</span>
                  </div>
                  <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${request.progress}%` }}
                      transition={{ duration: 0.5 }}
                      className="h-full bg-gradient-to-r from-primary to-primary-dark"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm text-gray-600 mb-2 block">Update Progress (%)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={progress}
                    onChange={(e) => setProgress(parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-600 mb-2 block">Notes</label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Add notes about the testing progress..."
                  />
                </div>
                <button
                  onClick={handleProgressUpdate}
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                >
                  Update Progress
                </button>
              </div>
            </motion.div>
          )}

          {/* Test Results */}
          {request.status === 'Completed' && request.testResults && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl border border-gray-200 p-6"
            >
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Test Results
              </h3>
              <p className="text-gray-700 bg-green-50 p-4 rounded-lg">{request.testResults}</p>
              <div className="mt-4">
                <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Download Report
                </button>
              </div>
            </motion.div>
          )}
        </div>

        <div className="space-y-6">
          {/* Assignment Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl border border-gray-200 p-6"
          >
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <User className="w-5 h-5" />
              Assignment
            </h3>
            {assignedTechnician ? (
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Assigned To</p>
                  <p className="font-medium">{assignedTechnician.name}</p>
                  <p className="text-sm text-gray-500">{assignedTechnician.id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Specialization</p>
                  <p className="text-sm text-gray-700">{assignedTechnician.specialization}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Status</p>
                  <span className={`text-xs px-2 py-1 rounded ${
                    assignedTechnician.status === 'Available' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {assignedTechnician.status}
                  </span>
                </div>
                <button
                  onClick={() => setShowAssignModal(true)}
                  className="w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                >
                  Reassign
                </button>
              </div>
            ) : (
              <div>
                <p className="text-sm text-gray-600 mb-3">Not assigned</p>
                <button
                  onClick={() => setShowAssignModal(true)}
                  className="w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                >
                  Assign Technician
                </button>
              </div>
            )}
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl border border-gray-200 p-6"
          >
            <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <Link
                to={`/lab/schedule?request=${id}`}
                className="block w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-center"
              >
                View Schedule
              </Link>
              <button className="block w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                Generate Report
              </button>
              <button className="block w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                View History
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Assign Modal */}
      {showAssignModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-6 max-w-md w-full mx-4"
          >
            <h3 className="text-lg font-semibold mb-4">Assign Technician</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-600 mb-2 block">Select Technician</label>
                <select
                  value={selectedTechnician}
                  onChange={(e) => setSelectedTechnician(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="">Select a technician</option>
                  {availableTechnicians.map(tech => (
                    <option key={tech.id} value={tech.id}>
                      {tech.name} ({tech.id}) - {tech.specialization} - {tech.status}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleAssign}
                  className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                >
                  Assign
                </button>
                <button
                  onClick={() => {
                    setShowAssignModal(false)
                    setSelectedTechnician(request?.assignedTo || '')
                  }}
                  className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default RequestDetail

