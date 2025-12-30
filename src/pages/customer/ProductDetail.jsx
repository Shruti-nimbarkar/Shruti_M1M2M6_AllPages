import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useData } from '../../contexts/DataContext'
import { ArrowLeft, Edit, Trash2, FileText, Calendar, Package, Tag } from 'lucide-react'
import { useState } from 'react'

function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { products, updateProduct, deleteProduct, documents } = useData()
  const product = products.find(p => p.id === id)
  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState(product || {})

  if (!product) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 mb-4">Product not found</p>
        <Link to="/customer/products" className="text-primary hover:underline">
          Back to Products
        </Link>
      </div>
    )
  }

  const productDocuments = documents.filter(d => d.productId === id)

  const handleSave = () => {
    updateProduct(id, editForm)
    setIsEditing(false)
  }

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct(id)
      navigate('/customer/products')
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            to="/customer/products"
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h2 className="text-2xl font-bold">Product Details</h2>
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
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setIsEditing(false)
                  setEditForm(product)
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl border border-gray-200 p-6"
          >
            <h3 className="text-lg font-semibold mb-4">Product Information</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-600 flex items-center gap-2 mb-1">
                  <Package className="w-4 h-4" />
                  Product Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editForm.name || ''}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                ) : (
                  <p className="text-lg font-medium">{product.name}</p>
                )}
              </div>
              <div>
                <label className="text-sm text-gray-600 flex items-center gap-2 mb-1">
                  <Tag className="w-4 h-4" />
                  Product ID
                </label>
                <p className="text-gray-700">{product.id}</p>
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
                    <option value="Simulation">Simulation</option>
                    <option value="Calibration">Calibration</option>
                    <option value="Design">Design</option>
                    <option value="Product Debugging">Product Debugging</option>
                    <option value="Certification">Certification</option>
                  </select>
                ) : (
                  <p className="text-gray-700">{product.service}</p>
                )}
              </div>
              <div>
                <label className="text-sm text-gray-600 mb-1">Description</label>
                {isEditing ? (
                  <textarea
                    value={editForm.description || ''}
                    onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                    rows={4}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-700">{product.description || 'No description available'}</p>
                )}
              </div>
              <div>
                <label className="text-sm text-gray-600 flex items-center gap-2 mb-1">
                  <Calendar className="w-4 h-4" />
                  Created At
                </label>
                <p className="text-gray-700">{new Date(product.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl border border-gray-200 p-6"
          >
            <h3 className="text-lg font-semibold mb-4">Progress</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-600">Completion</span>
                  <span className="text-sm font-semibold">{product.progress}%</span>
                </div>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${product.progress}%` }}
                    transition={{ duration: 1 }}
                    className="h-full bg-gradient-to-r from-primary to-primary-dark"
                  />
                </div>
              </div>
              <div>
                <span className="text-sm text-gray-600">Status: </span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  product.status === 'Complete' ? 'bg-green-100 text-green-700' :
                  product.status === 'Testing' ? 'bg-blue-100 text-blue-700' :
                  'bg-yellow-100 text-yellow-700'
                }`}>
                  {product.status}
                </span>
              </div>
            </div>
          </motion.div>

          {productDocuments.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl border border-gray-200 p-6"
            >
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Related Documents
              </h3>
              <div className="space-y-2">
                {productDocuments.map((doc) => (
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
                      <button className="text-primary hover:underline text-sm">
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
              <Link
                to={`/customer/documents?product=${id}`}
                className="block w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors text-center"
              >
                View Documents
              </Link>
              <Link
                to={`/customer/order-history?product=${id}`}
                className="block w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-center"
              >
                View Orders
              </Link>
              <Link
                to="/services/select"
                className="block w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-center"
              >
                Request Service
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail

