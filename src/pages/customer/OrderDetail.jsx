import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useData } from '../../contexts/DataContext'
import { ArrowLeft, Download, FileText, Calendar, DollarSign, Package, CheckCircle2, XCircle } from 'lucide-react'

function OrderDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { orders, products, documents } = useData()
  const order = orders.find(o => o.id === id)

  if (!order) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 mb-4">Order not found</p>
        <Link to="/customer/order-history" className="text-primary hover:underline">
          Back to Order History
        </Link>
      </div>
    )
  }

  const relatedProduct = products.find(p => p.id === order.productId)
  const orderDocuments = documents.filter(d => d.productId === order.productId)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            to="/customer/order-history"
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h2 className="text-2xl font-bold">Order Details</h2>
        </div>
        <div className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 ${
          order.status === 'Completed' 
            ? 'bg-green-100 text-green-700' 
            : 'bg-red-100 text-red-700'
        }`}>
          {order.status === 'Completed' ? (
            <CheckCircle2 className="w-5 h-5" />
          ) : (
            <XCircle className="w-5 h-5" />
          )}
          {order.status}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl border border-gray-200 p-6"
          >
            <h3 className="text-lg font-semibold mb-4">Order Information</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-600 flex items-center gap-2 mb-1">
                    <Package className="w-4 h-4" />
                    Order ID
                  </label>
                  <p className="text-gray-700 font-medium">{order.id}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600 flex items-center gap-2 mb-1">
                    <Calendar className="w-4 h-4" />
                    {order.status === 'Completed' ? 'Completed At' : 'Cancelled At'}
                  </label>
                  <p className="text-gray-700">
                    {new Date(order.completedAt || order.cancelledAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-600 mb-1">Product</label>
                <p className="text-gray-700 font-medium">{order.productName}</p>
                {relatedProduct && (
                  <Link
                    to={`/customer/products/${relatedProduct.id}`}
                    className="text-primary hover:underline text-sm"
                  >
                    View Product Details
                  </Link>
                )}
              </div>
              <div>
                <label className="text-sm text-gray-600 mb-1">Service</label>
                <p className="text-gray-700">{order.service}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600 flex items-center gap-2 mb-1">
                  <DollarSign className="w-4 h-4" />
                  Total Amount
                </label>
                <p className="text-2xl font-bold text-gray-900">${order.total.toFixed(2)}</p>
              </div>
            </div>
          </motion.div>

          {orderDocuments.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl border border-gray-200 p-6"
            >
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Order Documents
              </h3>
              <div className="space-y-2">
                {orderDocuments.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div>
                      <p className="font-medium">{doc.title}</p>
                      <p className="text-sm text-gray-500">{doc.type} • {doc.size}</p>
                    </div>
                    <div className="flex gap-2">
                      <Link
                        to={`/customer/documents`}
                        className="text-primary hover:underline text-sm"
                      >
                        View
                      </Link>
                      <button className="text-primary hover:underline text-sm flex items-center gap-1">
                        <Download className="w-4 h-4" />
                        Download
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl border border-gray-200 p-6"
          >
            <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
            <div className="space-y-2">
              {order.status === 'Completed' && (
                <button className="block w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors flex items-center justify-center gap-2">
                  <Download className="w-4 h-4" />
                  Download Invoice
                </button>
              )}
              <Link
                to={`/customer/products/${order.productId}`}
                className="block w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-center"
              >
                View Product
              </Link>
              <Link
                to="/customer/documents"
                className="block w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-center"
              >
                View Documents
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default OrderDetail

