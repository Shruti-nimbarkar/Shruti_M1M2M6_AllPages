import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useData } from '../../contexts/DataContext'
import { FileText, Download, Eye, Upload, X, Package, ChevronDown, ChevronRight, File, CheckCircle } from 'lucide-react'
import toast from 'react-hot-toast'

function Documents() {
  const { documents, products, addDocument, deleteDocument } = useData()
  const [expandedProducts, setExpandedProducts] = useState(['BP-2024-001']) // First product expanded by default
  const [showUpload, setShowUpload] = useState(false)
  const [uploadFile, setUploadFile] = useState(null)
  const [uploadProductId, setUploadProductId] = useState('')

  const productsWithDocs = products.map(product => ({
    ...product,
    docs: documents.filter(doc => doc.productId === product.id)
  }))

  const toggleProduct = (productId) => {
    setExpandedProducts(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    )
  }

  const handleFileSelect = (e) => {
    const file = e.target.files[0]
    if (file) {
      setUploadFile(file)
    }
  }

  const handleUpload = () => {
    if (!uploadFile || !uploadProductId) {
      toast.error('Please select a product and file')
      return
    }

    const product = products.find(p => p.id === uploadProductId)
    if (!product) return

    const newDoc = {
      productId: uploadProductId,
      productName: product.name,
      title: uploadFile.name,
      type: uploadFile.type.includes('pdf') ? 'PDF Document' : 'Document',
      size: `${(uploadFile.size / 1024 / 1024).toFixed(2)} MB`,
      url: '#',
    }

    addDocument(newDoc)
    setUploadFile(null)
    setUploadProductId('')
    setShowUpload(false)
    toast.success('Document uploaded successfully!')
  }

  const handleView = (doc) => {
    toast.success(`Opening ${doc.title}...`)
    // In a real app, this would open the document
  }

  const handleDownload = (doc) => {
    toast.success(`Downloading ${doc.title}...`)
    // In a real app, this would trigger download
  }

  const getDocumentIcon = (type) => {
    if (type.includes('Test Report')) return { icon: FileText, color: 'bg-red-100 text-red-600' }
    if (type.includes('Certificate')) return { icon: CheckCircle, color: 'bg-green-100 text-green-600' }
    return { icon: File, color: 'bg-blue-100 text-blue-600' }
  }

  const getProductIcon = (index) => {
    const colors = [
      'bg-blue-100 text-blue-600',
      'bg-green-100 text-green-600',
      'bg-yellow-100 text-yellow-600',
      'bg-purple-100 text-purple-600',
      'bg-pink-100 text-pink-600',
    ]
    return colors[index % colors.length]
  }

  const getTimeAgo = (date) => {
    const now = new Date()
    const uploaded = new Date(date)
    const diffMs = now - uploaded
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
    
    if (diffDays === 0) return 'Today'
    if (diffDays === 1) return '1 day ago'
    if (diffDays < 7) return `${diffDays} days ago`
    if (diffDays < 30) {
      const weeks = Math.floor(diffDays / 7)
      return `${weeks} week${weeks > 1 ? 's' : ''} ago`
    }
    const months = Math.floor(diffDays / 30)
    return `${months} month${months > 1 ? 's' : ''} ago`
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">View Documents</h2>
          <p className="text-gray-600 mt-1">Your Products</p>
        </div>
        <button
          onClick={() => setShowUpload(!showUpload)}
          className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
        >
          <Upload className="w-4 h-4" />
          Upload Document
        </button>
      </div>

      {/* Upload Modal */}
      {showUpload && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl border border-gray-200 p-6 shadow-lg"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Upload Document</h3>
            <button
              onClick={() => {
                setShowUpload(false)
                setUploadFile(null)
                setUploadProductId('')
              }}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-600 mb-2 block">Select Product</label>
              <select
                value={uploadProductId}
                onChange={(e) => setUploadProductId(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Choose a product</option>
                {products.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm text-gray-600 mb-2 block">Choose File</label>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-400 transition-colors">
                {uploadFile ? (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileText className="w-5 h-5 text-blue-600" />
                      <span className="text-sm">{uploadFile.name}</span>
                    </div>
                    <button
                      onClick={() => setUploadFile(null)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <>
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600 mb-2">Click to select or drag and drop</p>
                    <label className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer">
                      Choose File
                      <input
                        type="file"
                        className="hidden"
                        onChange={handleFileSelect}
                      />
                    </label>
                  </>
                )}
              </div>
            </div>
            {uploadFile && uploadProductId && (
              <button
                onClick={handleUpload}
                className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                Upload Document
              </button>
            )}
          </div>
        </motion.div>
      )}

      {/* Products List with Documents */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl border border-gray-200"
            >
        <div className="p-6">
          <div className="space-y-3">
            {productsWithDocs.length > 0 ? (
              productsWithDocs.map((product, idx) => {
                const isExpanded = expandedProducts.includes(product.id)
                const IconComponent = getDocumentIcon(product.service).icon
                
                return (
                <motion.div
                  key={product.id}
                    initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="border border-gray-200 rounded-lg overflow-hidden"
                  >
                    {/* Product Header */}
                    <button
                      onClick={() => toggleProduct(product.id)}
                      className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors"
                    >
                      <span className="text-gray-600 font-medium">{idx + 1}</span>
                      
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getProductIcon(idx)}`}>
                        <Package className="w-5 h-5" />
                    </div>
                      
                      <div className="flex-1 text-left">
                        <div className="font-medium text-gray-900">{product.name}</div>
                        <div className="text-sm text-gray-500">ID: {product.id}</div>
                    </div>
                      
                      {isExpanded ? (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      )}
                    </button>

                    {/* Documents List (Expandable) */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="border-t border-gray-200 bg-gray-50"
                        >
                  {product.docs.length > 0 ? (
                            <div className="p-4 space-y-3">
                              {product.docs.map((doc) => {
                                const docIcon = getDocumentIcon(doc.type)
                                const DocIcon = docIcon.icon
                                
                                return (
                        <div
                          key={doc.id}
                                    className="flex items-center gap-4 p-3 bg-white rounded-lg border border-gray-200"
                        >
                                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${docIcon.color}`}>
                                      <DocIcon className="w-5 h-5" />
                              </div>
                                    
                                    <div className="flex-1">
                                      <div className="font-medium text-gray-900">{doc.title}</div>
                                      <div className="text-sm text-gray-500">
                                        {getTimeAgo(doc.uploadedAt)}
                            </div>
                          </div>
                                    
                          <div className="flex items-center gap-3">
                            <button
                                        onClick={() => handleView(doc)}
                                        className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                            >
                              View
                            </button>
                            <button
                              onClick={() => handleDownload(doc)}
                                        className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                            >
                              Download
                            </button>
                          </div>
                        </div>
                                )
                              })}
                    </div>
                  ) : (
                            <div className="p-6 text-center text-gray-500 text-sm">
                      No documents for this product
                    </div>
                  )}
                </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )
              })
            ) : (
              <div className="p-12 text-center text-gray-500">
                <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p>No products found</p>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Documents


