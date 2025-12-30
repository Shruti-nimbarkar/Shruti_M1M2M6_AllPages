import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useData } from '../../contexts/DataContext'
import { Plus, Search, Package, Edit, Eye, Trash2 } from 'lucide-react'

function Products() {
  const navigate = useNavigate()
  const { products, deleteProduct } = useData()
  const [searchTerm, setSearchTerm] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)
  const [newProduct, setNewProduct] = useState({
    name: '',
    service: 'EMC Testing',
    description: '',
    category: 'Electronics',
  })

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.service.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.service) {
      alert('Please fill in all required fields')
      return
    }
    navigate('/services/select')
    setShowAddModal(false)
    setNewProduct({ name: '', service: 'EMC Testing', description: '', category: 'Electronics' })
  }

  const handleDelete = (id, e) => {
    e.stopPropagation()
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct(id)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Your Products</h2>
        <Link
          to="/services/select"
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Product
        </Link>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search products by name, ID, or service..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>

      {/* Products List */}
      {filteredProducts.length > 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 divide-y">
          {filteredProducts.map((p, i) => (
            <Link key={p.id} to={`/customer/products/${p.id}`}>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-dark rounded-lg flex items-center justify-center">
                    <Package className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{p.name}</div>
                    <div className="text-xs text-gray-500">ID: {p.id}</div>
                  </div>
                  <div className="text-sm text-gray-600">{p.service}</div>
                  <div className={`text-xs px-2 py-1 rounded ${
                    p.status === 'Complete' ? 'bg-green-100 text-green-700' :
                    p.status === 'Testing' ? 'bg-blue-100 text-blue-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {p.status}
                  </div>
                  <div className="text-sm font-semibold text-gray-700">{p.progress}%</div>
                </div>
                <div className="flex gap-2 ml-4" onClick={(e) => e.stopPropagation()}>
                  <Link
                    to={`/customer/products/${p.id}`}
                    className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Eye className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={(e) => handleDelete(p.id, e)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-600 mb-4">
            {searchTerm ? 'No products found matching your search' : 'No products yet'}
          </p>
          {!searchTerm && (
            <Link
              to="/services/select"
              className="inline-block px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
            >
              Add Your First Product
            </Link>
          )}
        </div>
      )}
    </div>
  )
}

export default Products


