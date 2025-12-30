import { Link } from 'react-router-dom'

function LabSignupPersonal() {
  const categories = ['EMC', 'Safety', 'Thermal', 'Environmental', 'RF', 'Other']
  const roles = ['Owner', 'Admin', 'Manager', 'Technician']
  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold">B</div>
            <div className="text-xl font-bold">Millennium Techlink</div>
          </div>
          <div className="text-sm">
            Already have an account? <Link to="/lab/login" className="text-primary font-semibold">Sign in</Link>
          </div>
        </div>
        <div className="bg-white rounded-xl border p-6 mb-6">
          <div className="flex items-center justify-center gap-10">
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">1</div>
              <div className="text-sm mt-2">Personal Details</div>
            </div>
            <div className="h-px bg-gray-200 w-40" />
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center font-bold">2</div>
              <div className="text-sm mt-2">Documents & Review</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border p-6">
          <h2 className="text-lg font-bold mb-2">Lab & Admin Details</h2>
          <p className="text-sm text-gray-600 mb-6">Please provide your lab information to get started</p>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-700">Lab Name*</label>
              <input className="w-full mt-1 px-3 py-2 border rounded-lg" placeholder="Enter lab name" />
            </div>
            <div>
              <label className="text-sm text-gray-700">Admin Full Name*</label>
              <input className="w-full mt-1 px-3 py-2 border rounded-lg" placeholder="Enter your Full Name" />
            </div>
            <div>
              <label className="text-sm text-gray-700">NABL Certificate No.*</label>
              <input className="w-full mt-1 px-3 py-2 border rounded-lg" placeholder="Certification Number" />
            </div>
            <div>
              <label className="text-sm text-gray-700">Admin Phone No.*</label>
              <input className="w-full mt-1 px-3 py-2 border rounded-lg" placeholder="Phone No." />
            </div>
            <div>
              <label className="text-sm text-gray-700">Lab Official Phone No.*</label>
              <input className="w-full mt-1 px-3 py-2 border rounded-lg" placeholder="Phone No." />
            </div>
            <div>
              <label className="text-sm text-gray-700">Admin Official Email ID*</label>
              <input className="w-full mt-1 px-3 py-2 border rounded-lg" placeholder="you@company.com" />
            </div>
            <div>
              <label className="text-sm text-gray-700">Lab Address*</label>
              <input className="w-full mt-1 px-3 py-2 border rounded-lg" placeholder="Full Address" />
            </div>
            <div>
              <label className="text-sm text-gray-700">Role / Title*</label>
              <select className="w-full mt-1 px-3 py-2 border rounded-lg">
                {roles.map((r) => <option key={r}>{r}</option>)}
              </select>
            </div>
            <div>
              <label className="text-sm text-gray-700">Lab Category / Field*</label>
              <select className="w-full mt-1 px-3 py-2 border rounded-lg">
                {categories.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="text-sm text-gray-700">Lab Official Email*</label>
              <input className="w-full mt-1 px-3 py-2 border rounded-lg" placeholder="you@company.com" />
            </div>
            <div>
              <label className="text-sm text-gray-700">Password*</label>
              <input type="password" className="w-full mt-1 px-3 py-2 border rounded-lg" placeholder="Create a strong password" />
              <p className="text-xs text-gray-500 mt-1">Use 8+ characters with a mix of letters, numbers & symbols</p>
            </div>
            <div>
              <label className="text-sm text-gray-700">Confirm Password*</label>
              <input type="password" className="w-full mt-1 px-3 py-2 border rounded-lg" placeholder="Re-enter your password" />
            </div>
          </div>
          <div className="flex justify-end mt-6">
            <Link to="/lab/signup/documents" className="px-5 py-2 bg-primary text-white rounded-lg">Next Step</Link>
          </div>
        </div>
        <div className="text-center text-xs text-gray-500 mt-4">
          Your data is encrypted and secure. We’ll verify your documents within xx hours.
        </div>
      </div>
    </div>
  )
}

export default LabSignupPersonal


