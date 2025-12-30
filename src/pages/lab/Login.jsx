import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ShieldCheck, Lock, Mail, LogIn, ChevronRight } from 'lucide-react'

function LabLogin() {
  return (
    <div className="min-h-screen grid md:grid-cols-2">
      <div className="hidden md:flex items-center justify-center bg-blue-600 text-white relative">
        <div className="max-w-md px-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="text-2xl font-bold">Millennium Techlink</div>
          </div>
          <h2 className="text-3xl font-bold mb-4">Empowering Labs. Simplifying Accreditation.</h2>
          <p className="text-white/80">NABL Verified • Secure Platform • Compliant</p>
        </div>
      </div>
      <div className="flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <h1 className="text-2xl font-bold mb-2">Welcome Back</h1>
          <p className="text-gray-600 mb-6">Sign in to your lab administration dashboard</p>
          <form className="bg-white rounded-xl border border-gray-200 p-6 space-y-4 shadow-sm">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input className="w-full pl-9 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="labadmin@example.com" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input type="password" className="w-full pl-9 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="********" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
              <select className="w-full px-3 py-2 border rounded-lg">
                <option>Lab Admin</option>
                <option>Technician</option>
                <option>Manager</option>
              </select>
            </div>
            <button className="w-full bg-primary text-white py-2 rounded-lg flex items-center justify-center gap-2">
              <LogIn className="w-4 h-4" /> Sign in to Dashboard
            </button>
          </form>
          <div className="text-center mt-4 text-sm">
            New lab?{' '}
            <Link to="/lab/signup" className="text-primary font-semibold inline-flex items-center gap-1">
              Register your NABL Lab <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LabLogin


