import { useState } from 'react'
import { motion } from 'framer-motion'
import { useData } from '../../contexts/DataContext'
import { MessageSquare, Mail, Bell, Trash2, CheckCircle2, Clock, User } from 'lucide-react'

function Messages() {
  const { messages, markMessageAsRead, deleteMessage } = useData()
  const [selectedMessage, setSelectedMessage] = useState(null)

  const unreadCount = messages.filter(m => !m.read).length

  const handleMessageClick = (message) => {
    setSelectedMessage(message)
    if (!message.read) {
      markMessageAsRead(message.id)
    }
  }

  const handleDelete = (id, e) => {
    e.stopPropagation()
    if (window.confirm('Are you sure you want to delete this message?')) {
      deleteMessage(id)
      if (selectedMessage?.id === id) {
        setSelectedMessage(null)
      }
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Messages</h2>
        {unreadCount > 0 && (
          <span className="px-3 py-1 bg-red-500 text-white rounded-full text-sm font-medium">
            {unreadCount} unread
          </span>
        )}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Messages List */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-gray-200 divide-y max-h-[600px] overflow-y-auto">
            {messages.length > 0 ? (
              messages.map((message, i) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => handleMessageClick(message)}
                  className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                    selectedMessage?.id === message.id ? 'bg-primary/5 border-l-4 border-primary' : ''
                  } ${!message.read ? 'bg-blue-50/50' : ''}`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {message.type === 'notification' ? (
                        <Bell className="w-4 h-4 text-primary" />
                      ) : (
                        <Mail className="w-4 h-4 text-gray-400" />
                      )}
                      <span className="font-semibold text-sm">{message.from}</span>
                      {!message.read && (
                        <span className="w-2 h-2 bg-primary rounded-full"></span>
                      )}
                    </div>
                    <button
                      onClick={(e) => handleDelete(message.id, e)}
                      className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-sm font-medium text-gray-900 mb-1 line-clamp-1">
                    {message.subject}
                  </p>
                  <p className="text-xs text-gray-500 line-clamp-2 mb-2">
                    {message.body}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <Clock className="w-3 h-3" />
                    {(() => {
                      const date = new Date(message.timestamp)
                      const now = new Date()
                      const diffMs = now - date
                      const diffMins = Math.floor(diffMs / 60000)
                      const diffHours = Math.floor(diffMs / 3600000)
                      const diffDays = Math.floor(diffMs / 86400000)
                      
                      if (diffMins < 1) return 'Just now'
                      if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`
                      if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`
                      if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`
                      return date.toLocaleDateString()
                    })()}
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="p-8 text-center text-gray-500">
                <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                <p>No messages yet</p>
              </div>
            )}
          </div>
        </div>

        {/* Message Detail */}
        <div className="lg:col-span-2">
          {selectedMessage ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl border border-gray-200 p-6"
            >
              <div className="flex items-start justify-between mb-4 pb-4 border-b">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <User className="w-5 h-5 text-gray-400" />
                    <span className="font-semibold">{selectedMessage.from}</span>
                    {selectedMessage.type === 'notification' && (
                      <span className="px-2 py-1 bg-primary/10 text-primary rounded text-xs">
                        Notification
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-bold">{selectedMessage.subject}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
                    <Clock className="w-4 h-4" />
                    {new Date(selectedMessage.timestamp).toLocaleString()}
                  </div>
                </div>
                {!selectedMessage.read && (
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                )}
              </div>
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {selectedMessage.body}
                </p>
              </div>
            </motion.div>
          ) : (
            <div className="bg-white rounded-xl border border-gray-200 p-12 text-center text-gray-500">
              <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p>Select a message to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Messages


