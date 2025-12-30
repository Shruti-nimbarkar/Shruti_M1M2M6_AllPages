import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useData } from '../../contexts/DataContext'
import { 
  CheckCircle2, XCircle, Eye, Search, Plus, Package, 
  TrendingUp, Activity, CheckCircle, Clock 
} from 'lucide-react'

function OrderHistory() {
  const { orders, products } = useData()
  const [searchQuery, setSearchQuery] = useState('')
  
  const completed = products.filter(p => p.status === 'Complete')
  const cancelled = products.filter(p => p.status === 'Cancelled')
  const inProgress = products.filter(p => p.status !== 'Complete' && p.status !== 'Cancelled' && p.status !== 'Awaiting')
  const activeProducts = products.filter(p => p.status !== 'Complete' && p.status !== 'Cancelled')

  const totalProducts = products.length
  const completedCount = completed.length
  const inProgressCount = inProgress.length
  const activeFlowsCount = activeProducts.length

  // Calculate analytics
  const certificationRate = totalProducts > 0 ? Math.round((completedCount / totalProducts) * 100) : 0
  const workflowActivity = 84 // Mock data

  const getProgressStages = (product) => {
    return [
      { label: 'Planned', date: '15 Oct 2025', time: '10:25 am', completed: true },
      { label: 'Awaiting Samples', date: '16 Oct 2025', time: '11:00 am', completed: true },
      { label: 'Quoted', date: '16 Oct 2025', time: '03:00 pm', completed: true },
      { label: 'Testing', date: '17 Oct 2025', time: '11:30 am', completed: true },
      { label: 'In Progress', date: '17 Oct 2025', time: '04:00 pm', completed: true },
      { label: 'Under Review', date: '18 Oct 2025', time: '10:00 am', completed: product.progress >= 80 },
      { label: 'Report Submitted', date: '19 Oct 2025', time: '02:30 pm', completed: product.progress >= 90 },
      { label: 'Completed', date: '20 Oct 2025', time: '09:00 am', completed: product.status === 'Complete' },
    ]
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Your Products</h2>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Product
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl border border-gray-200 p-6"
        >
          <div className="text-3xl font-bold text-gray-800">{totalProducts}</div>
          <div className="text-sm text-gray-600 mt-1">Total Products</div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl border border-gray-200 p-6"
        >
          <div className="text-3xl font-bold text-green-600">{completedCount}</div>
          <div className="text-sm text-gray-600 mt-1">Completed</div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl border border-gray-200 p-6"
        >
          <div className="text-3xl font-bold text-yellow-600">{inProgressCount}</div>
          <div className="text-sm text-gray-600 mt-1">In Progress</div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl border border-gray-200 p-6"
        >
          <div className="text-3xl font-bold text-blue-600">{activeFlowsCount}</div>
          <div className="text-sm text-gray-600 mt-1">Active Flows</div>
        </motion.div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Completed Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl border border-gray-200"
          >
            <div className="p-6 border-b">
              <h3 className="text-xl font-bold">Completed</h3>
            </div>
            
            {completed.length > 0 ? (
              <div className="p-6">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-sm text-gray-600 border-b">
                        <th className="pb-3 font-medium">#</th>
                        <th className="pb-3 font-medium">Product Name</th>
                        <th className="pb-3 font-medium">Service Opted</th>
                        <th className="pb-3 font-medium">Progress</th>
                        <th className="pb-3 font-medium">Status</th>
                        <th className="pb-3 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {completed.map((product, index) => (
                        <tr key={product.id} className="border-b last:border-b-0">
                          <td className="py-4">{index + 1}</td>
                          <td className="py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-lg bg-green-100 text-green-600 flex items-center justify-center font-bold text-sm">
                                {product.name.substring(0, 2).toUpperCase()}
                              </div>
                              <div>
                                <div className="font-medium">{product.name}</div>
                                <div className="text-xs text-gray-500">ID: {product.id}</div>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 text-sm">{product.service}</td>
                          <td className="py-4">
                            <div className="flex items-center gap-2">
                              <div className="flex-1 h-2 bg-gray-200 rounded-full max-w-[100px]">
                                <div
                                  className="h-full bg-green-500 rounded-full"
                                  style={{ width: `${product.progress}%` }}
                                />
                              </div>
                              <span className="text-sm font-medium">{product.progress}%</span>
                            </div>
                          </td>
                          <td className="py-4">
                            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                              Completed
                            </span>
                          </td>
                          <td className="py-4">
                            <Link
                              to={`/customer/products/${product.id}`}
                              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                            >
                              View
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Timeline for first completed product */}
                {completed.length > 0 && (
                  <div className="mt-6 pt-6 border-t">
                    <div className="flex items-center justify-between relative">
                      {getProgressStages(completed[0]).map((stage, index) => (
                        <div key={index} className="flex flex-col items-center relative z-10">
                          <div
                            className={`w-6 h-6 rounded-full flex items-center justify-center mb-2 ${
                              stage.completed
                                ? 'bg-black'
                                : 'bg-gray-300'
                            }`}
                          >
                            {stage.completed && (
                              <div className="w-2 h-2 bg-white rounded-full" />
                            )}
                          </div>
                          <div className="text-xs font-medium text-center whitespace-nowrap">
                            {stage.label}
                          </div>
                          {stage.date && (
                            <>
                              <div className="text-xs text-gray-500 text-center mt-1">
                                {stage.date}
                              </div>
                              <div className="text-xs text-gray-500 text-center">
                                {stage.time}
                              </div>
                            </>
                          )}
                        </div>
                      ))}
                      <div className="absolute top-3 left-0 right-0 h-0.5 bg-gray-300 -z-0" />
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-12 text-center text-gray-500">
                No completed products yet
              </div>
            )}
          </motion.section>

          {/* Rejected / Cancelled Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl border border-gray-200"
          >
            <div className="p-6 border-b">
              <h3 className="text-xl font-bold">Rejected / Cancelled</h3>
            </div>
            
            {cancelled.length > 0 ? (
              <div className="p-6">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-sm text-gray-600 border-b">
                        <th className="pb-3 font-medium">#</th>
                        <th className="pb-3 font-medium">Product Name</th>
                        <th className="pb-3 font-medium">Service Opted</th>
                        <th className="pb-3 font-medium">Progress</th>
                        <th className="pb-3 font-medium">Status</th>
                        <th className="pb-3 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cancelled.map((product, index) => (
                        <tr key={product.id} className="border-b last:border-b-0">
                          <td className="py-4">{index + 1}</td>
                          <td className="py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-lg bg-red-100 text-red-600 flex items-center justify-center font-bold text-sm">
                                {product.name.substring(0, 2).toUpperCase()}
                              </div>
                              <div>
                                <div className="font-medium">{product.name}</div>
                                <div className="text-xs text-gray-500">ID: {product.id}</div>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 text-sm">{product.service}</td>
                          <td className="py-4">
                            <div className="flex items-center gap-2">
                              <div className="flex-1 h-2 bg-gray-200 rounded-full max-w-[100px]">
                                <div
                                  className="h-full bg-red-500 rounded-full"
                                  style={{ width: `${product.progress}%` }}
                                />
                              </div>
                              <span className="text-sm font-medium">{product.progress}%</span>
                            </div>
                          </td>
                          <td className="py-4">
                            <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">
                              Cancelled
                            </span>
                          </td>
                          <td className="py-4">
                            <Link
                              to={`/customer/products/${product.id}`}
                              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                            >
                              View
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="p-12 text-center text-gray-500">
                No cancelled products
              </div>
            )}
          </motion.section>

          {/* Active Workflows Section */}
          {activeProducts.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl border border-gray-200"
            >
              <div className="p-6 border-b">
                <h3 className="text-xl font-bold">Active Workflows</h3>
              </div>
              
              <div className="p-6 space-y-4">
                {activeProducts.slice(0, 3).map((product, index) => (
                  <div
                    key={product.id}
                    className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <div className="font-medium">
                          {product.service} - {product.name}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          Started {Math.floor(Math.random() * 5) + 1} days ago
                        </div>
                      </div>
                      <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">
                        In Progress
                      </span>
                    </div>
                    
                    <div className="mb-3">
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-gray-600">Progress</span>
                        <span className="font-medium">{product.progress}%</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${product.progress}%` }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className="h-full bg-blue-600 rounded-full"
                        />
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Link
                        to={`/customer/products/${product.id}`}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                      >
                        Continue
                      </Link>
                      <Link
                        to={`/customer/products/${product.id}`}
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                      >
                        Details
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>
          )}
        </div>

        {/* Progress Analytics Sidebar */}
        <aside className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl border border-gray-200 p-6 sticky top-6"
          >
            <h3 className="text-lg font-bold mb-6">Progress Analytics</h3>
            
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Certification Rate</span>
                  <span className="text-sm font-bold">{certificationRate}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${certificationRate}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="h-full bg-green-500 rounded-full"
                  />
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Workflow Activity</span>
                  <span className="text-sm font-bold">{workflowActivity}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${workflowActivity}%` }}
                    transition={{ duration: 1, delay: 0.7 }}
                    className="h-full bg-blue-500 rounded-full"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </aside>
      </div>
    </div>
  )
}

export default OrderHistory


