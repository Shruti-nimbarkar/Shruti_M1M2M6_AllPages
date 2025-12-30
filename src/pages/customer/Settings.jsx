import { useState } from 'react'
import { motion } from 'framer-motion'
import { useData } from '../../contexts/DataContext'
import { Bell, Moon, Mail, MessageSquare, Save } from 'lucide-react'

function Settings() {
  const { settings, setSettings } = useData()
  const [localSettings, setLocalSettings] = useState(settings)
  const [saveSuccess, setSaveSuccess] = useState(false)

  const handleToggle = (key) => {
    setLocalSettings({ ...localSettings, [key]: !localSettings[key] })
    setSaveSuccess(false)
  }

  const handleSave = () => {
    setSettings(localSettings)
    setSaveSuccess(true)
    setTimeout(() => setSaveSuccess(false), 3000)
  }

  const settingItems = [
    {
      key: 'notifications',
      label: 'Notifications',
      description: 'Receive email updates about your products and orders',
      icon: Bell,
    },
    {
      key: 'emailUpdates',
      label: 'Email Updates',
      description: 'Get notified via email when there are updates',
      icon: Mail,
    },
    {
      key: 'smsNotifications',
      label: 'SMS Notifications',
      description: 'Receive important updates via SMS',
      icon: MessageSquare,
    },
    {
      key: 'darkMode',
      label: 'Dark Mode',
      description: 'Reduce eye strain at night (coming soon)',
      icon: Moon,
      disabled: true,
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Settings</h2>
        {saveSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="px-4 py-2 bg-green-100 text-green-700 rounded-lg text-sm"
          >
            Settings saved successfully!
          </motion.div>
        )}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl border border-gray-200 p-6"
      >
        <div className="space-y-4">
          {settingItems.map((item) => (
            <div
              key={item.key}
              className={`flex items-center justify-between p-4 rounded-lg border ${
                item.disabled ? 'bg-gray-50 opacity-60' : 'hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-3 flex-1">
                <div className={`p-2 rounded-lg ${
                  item.disabled ? 'bg-gray-200' : 'bg-primary/10'
                }`}>
                  <item.icon className={`w-5 h-5 ${
                    item.disabled ? 'text-gray-400' : 'text-primary'
                  }`} />
                </div>
                <div className="flex-1">
                  <div className="font-medium">{item.label}</div>
                  <div className="text-sm text-gray-500">{item.description}</div>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={localSettings[item.key] || false}
                  onChange={() => !item.disabled && handleToggle(item.key)}
                  disabled={item.disabled}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary peer-disabled:opacity-50"></div>
              </label>
            </div>
          ))}
        </div>
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            Save Settings
          </button>
        </div>
      </motion.div>
    </div>
  )
}

export default Settings


