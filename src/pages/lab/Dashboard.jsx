import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useLabData } from '../../contexts/LabDataContext'
import { Clock, CheckCircle2, XCircle, AlertCircle, TrendingUp, Eye } from 'lucide-react'

function LabDashboard() {
  const { labRequests, getStats } = useLabData()
  const stats = getStats()

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

  const sections = {
    Pending: labRequests.filter(r => r.status === 'Pending'),
    'In Progress': labRequests.filter(r => r.status === 'In Progress'),
    Completed: labRequests.filter(r => r.status === 'Completed'),
    Rejected: labRequests.filter(r => r.status === 'Rejected'),
  }

  const statCards = [
    { label: 'Pending Requests', value: stats.pending, icon: AlertCircle, color: 'text-yellow-600' },
    { label: 'Active Tests', value: stats.activeTests, icon: Clock, color: 'text-blue-600' },
    { label: 'Completed This Week', value: stats.completedThisWeek, icon: CheckCircle2, color: 'text-green-600' },
    { label: 'Avg Turnaround', value: stats.avgTurnaround, icon: TrendingUp, color: 'text-purple-600' },
  ]

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-4">
        {statCards.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ scale: 1.02, y: -2 }}
            className="bg-white rounded-xl border border-gray-200 p-6 text-center shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-center mb-2">
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <div className="text-3xl font-bold mb-1">{stat.value}</div>
            <div className="text-sm text-gray-600">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Request Sections */}
      {Object.entries(sections).map(([section, requests]) => (
        <motion.div
          key={section}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl border border-gray-200 overflow-hidden"
        >
          <div className="px-6 py-4 font-semibold text-lg bg-gray-50 border-b flex items-center justify-between">
            <span>{section}</span>
            <span className="text-sm font-normal text-gray-500">({requests.length})</span>
          </div>
          {requests.length > 0 ? (
            <div className="divide-y">
              {requests.map((request, idx) => (
                <Link key={request.id} to={`/lab/queue/${request.id}`}>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="px-6 py-4 grid grid-cols-12 items-center hover:bg-gray-50 transition-colors cursor-pointer group"
                  >
                    <div className="col-span-2">
                      <span className="text-primary font-medium group-hover:underline">{request.id}</span>
                    </div>
                    <div className="col-span-4 font-medium">{request.productName}</div>
                    <div className="col-span-3 text-gray-600">{request.service}</div>
                    <div className="col-span-2 text-gray-500 text-sm">{request.date}</div>
                    <div className="col-span-1 flex items-center justify-end">
                      <span className={`text-xs px-2 py-1 rounded flex items-center gap-1 ${getStatusBadge(request.status)}`}>
                        {getStatusIcon(request.status)}
                        {request.status}
                      </span>
                    </div>
                    <div className="col-span-1 flex justify-end">
                      <Eye className="w-4 h-4 text-gray-400 group-hover:text-primary transition-colors" />
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="px-6 py-8 text-center text-gray-500">
              No {section.toLowerCase()} requests
            </div>
          )}
        </motion.div>
      ))}
    </div>
  )
}

export default LabDashboard


