import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useLabData } from '../../contexts/LabDataContext'
import { Calendar, Clock, User, Edit, X, Plus, CheckCircle2 } from 'lucide-react'

function LabSchedule() {
  const [searchParams] = useSearchParams()
  const requestId = searchParams.get('request')
  const { schedule, labRequests, technicians, addScheduleItem, updateScheduleItem, deleteScheduleItem, assignRequest } = useLabData()
  const [showAddModal, setShowAddModal] = useState(false)
  const [showRescheduleModal, setShowRescheduleModal] = useState(null)
  const [newSchedule, setNewSchedule] = useState({
    requestId: requestId || '',
    technicianId: '',
    startTime: '',
    endTime: '',
  })

  const sortedSchedule = [...schedule].sort((a, b) => 
    new Date(a.startTime) - new Date(b.startTime)
  )

  const handleAddSchedule = () => {
    if (!newSchedule.requestId || !newSchedule.technicianId || !newSchedule.startTime || !newSchedule.endTime) {
      alert('Please fill in all fields')
      return
    }

    const request = labRequests.find(r => r.id === newSchedule.requestId)
    if (!request) {
      alert('Request not found')
      return
    }

    const technician = technicians.find(t => t.id === newSchedule.technicianId)
    if (!technician) {
      alert('Technician not found')
      return
    }

    addScheduleItem({
      requestId: newSchedule.requestId,
      productName: request.productName,
      service: request.service,
      technicianId: newSchedule.technicianId,
      technicianName: technician.name,
      startTime: newSchedule.startTime,
      endTime: newSchedule.endTime,
      status: 'Scheduled',
    })

    // Auto-assign the request if not already assigned
    if (!request.assignedTo) {
      assignRequest(newSchedule.requestId, newSchedule.technicianId)
    }

    setNewSchedule({ requestId: '', technicianId: '', startTime: '', endTime: '' })
    setShowAddModal(false)
    alert('Schedule item added successfully!')
  }

  const handleReschedule = (scheduleId, newStartTime, newEndTime) => {
    updateScheduleItem(scheduleId, {
      startTime: newStartTime,
      endTime: newEndTime,
    })
    setShowRescheduleModal(null)
    alert('Schedule updated successfully!')
  }

  const handleDelete = (scheduleId) => {
    if (window.confirm('Are you sure you want to delete this schedule item?')) {
      deleteScheduleItem(scheduleId)
    }
  }

  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString)
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const pendingRequests = labRequests.filter(r => r.status === 'Pending' || r.status === 'In Progress')

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Schedule</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Schedule
        </button>
      </div>

      {/* Schedule List */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 border-b">
          <div className="font-semibold">Scheduled Tasks ({sortedSchedule.length})</div>
        </div>
        {sortedSchedule.length > 0 ? (
          <div className="divide-y">
            {sortedSchedule.map((item, idx) => {
              const request = labRequests.find(r => r.id === item.requestId)
              const technician = technicians.find(t => t.id === item.technicianId)
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="px-6 py-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Link
                          to={`/lab/queue/${item.requestId}`}
                          className="font-medium text-primary hover:underline"
                        >
                          {item.service} - {item.productName}
                        </Link>
                        <span className="text-xs text-gray-500">({item.requestId})</span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {formatDateTime(item.startTime)}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {formatDateTime(item.endTime)}
                        </div>
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {technician?.name} ({item.technicianId})
                        </div>
                        <span className={`text-xs px-2 py-1 rounded ${
                          item.status === 'Scheduled' ? 'bg-blue-100 text-blue-700' :
                          item.status === 'Completed' ? 'bg-green-100 text-green-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {item.status}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      {item.status === 'Scheduled' && (
                        <>
                          <button
                            onClick={() => {
                              const newStart = prompt('Enter new start time (YYYY-MM-DDTHH:MM):', item.startTime)
                              const newEnd = prompt('Enter new end time (YYYY-MM-DDTHH:MM):', item.endTime)
                              if (newStart && newEnd) {
                                handleReschedule(item.id, newStart, newEnd)
                              }
                            }}
                            className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-100 transition-colors flex items-center gap-1"
                          >
                            <Edit className="w-4 h-4" />
                            Reschedule
                          </button>
                          <button
                            onClick={() => updateScheduleItem(item.id, { status: 'Completed' })}
                            className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600 transition-colors flex items-center gap-1"
                          >
                            <CheckCircle2 className="w-4 h-4" />
                            Complete
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="px-3 py-1 text-red-500 hover:bg-red-50 rounded transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        ) : (
          <div className="px-6 py-12 text-center text-gray-500">
            No scheduled tasks. Add a new schedule item to get started.
          </div>
        )}
      </div>

      {/* Add Schedule Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-6 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Add Schedule</h3>
              <button
                onClick={() => {
                  setShowAddModal(false)
                  setNewSchedule({ requestId: '', technicianId: '', startTime: '', endTime: '' })
                }}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-600 mb-2 block">Request</label>
                <select
                  value={newSchedule.requestId}
                  onChange={(e) => setNewSchedule({ ...newSchedule, requestId: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="">Select a request</option>
                  {pendingRequests.map(req => (
                    <option key={req.id} value={req.id}>
                      {req.id} - {req.productName} ({req.service})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm text-gray-600 mb-2 block">Technician</label>
                <select
                  value={newSchedule.technicianId}
                  onChange={(e) => setNewSchedule({ ...newSchedule, technicianId: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="">Select a technician</option>
                  {technicians.map(tech => (
                    <option key={tech.id} value={tech.id}>
                      {tech.name} ({tech.id}) - {tech.specialization}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm text-gray-600 mb-2 block">Start Time</label>
                <input
                  type="datetime-local"
                  value={newSchedule.startTime}
                  onChange={(e) => setNewSchedule({ ...newSchedule, startTime: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div>
                <label className="text-sm text-gray-600 mb-2 block">End Time</label>
                <input
                  type="datetime-local"
                  value={newSchedule.endTime}
                  onChange={(e) => setNewSchedule({ ...newSchedule, endTime: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div className="flex gap-2 pt-2">
                <button
                  onClick={handleAddSchedule}
                  className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                >
                  Add Schedule
                </button>
                <button
                  onClick={() => {
                    setShowAddModal(false)
                    setNewSchedule({ requestId: '', technicianId: '', startTime: '', endTime: '' })
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

export default LabSchedule


