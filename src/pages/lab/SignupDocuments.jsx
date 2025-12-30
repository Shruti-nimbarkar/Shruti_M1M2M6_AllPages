import { Link } from 'react-router-dom'

function LabSignupDocuments() {
  const sections = [
    { title: 'Authorization Letter *', hint: 'A signed letter on lab letterhead confirming the admin is authorized to represent the lab.' },
    { title: "Admin’s ID Proof (Govt. ID) *", hint: 'Aadhar / PAN / Passport' },
    { title: 'Lab Facility Photos *', hint: 'Upload photos of lab exterior, reception, and main testing areas.' },
    { title: 'Equipment List + Calibration Summary *', hint: 'Provide major equipment details with model, serial number, and calibration validity dates.' },
  ]
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
              <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center font-bold">1</div>
              <div className="text-sm mt-2">Personal Details</div>
            </div>
            <div className="h-px bg-gray-200 w-40" />
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">2</div>
              <div className="text-sm mt-2">Documents & Review</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border p-6">
          <h2 className="text-lg font-bold mb-2">Documents Required</h2>
          <p className="text-sm text-gray-600 mb-6">Please upload the documents for review</p>
          <div className="space-y-5">
            {sections.map((s) => (
              <div key={s.title}>
                <div className="font-medium mb-1">{s.title}</div>
                <div className="text-xs text-gray-500 mb-3">{s.hint}</div>
                <div className="border rounded-xl p-6 text-center text-gray-500 bg-gray-50">
                  Click to upload
                </div>
                <div className="text-xs text-gray-500 mt-1">PDF, DOCX, TXT | &lt; 10 MB</div>
              </div>
            ))}
          </div>
          <div className="space-y-2 mt-6 text-sm">
            <label className="flex items-start gap-2"><input type="checkbox" className="mt-1" defaultChecked /> I confirm that I am authorized to represent this laboratory.</label>
            <label className="flex items-start gap-2"><input type="checkbox" className="mt-1" defaultChecked /> Acceptance of <a className="text-primary" href="#">Terms & Conditions</a></label>
            <label className="flex items-start gap-2"><input type="checkbox" className="mt-1" defaultChecked /> Acceptance of <a className="text-primary" href="#">Verification Policy</a></label>
          </div>
          <div className="flex justify-end mt-6">
            <button className="px-5 py-2 bg-primary text-white rounded-lg">Submit for Review</button>
          </div>
        </div>
        <div className="text-center text-xs text-gray-500 mt-4">
          Your data is encrypted and secure. We’ll verify your documents within xx hours.
        </div>
      </div>
    </div>
  )
}

export default LabSignupDocuments


