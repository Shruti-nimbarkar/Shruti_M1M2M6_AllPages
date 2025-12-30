function CustomerDetails() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h2 className="text-2xl font-bold text-center mb-6">Customer Details</h2>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="text-sm text-gray-600">Name of Organization</label>
          <input className="w-full mt-1 px-3 py-2 border rounded-lg" />
        </div>
        <div>
          <label className="text-sm text-gray-600">Industry/ Application</label>
          <div className="border rounded-lg p-3">
            <div className="grid grid-cols-2 gap-2 text-sm">
              {['Automotive','Consumer','IoT','Military','Medical','Telecom','Lighting','Avionics','Others'].map((i) => (
                <label key={i} className="flex gap-2 items-center">
                  <input type="checkbox" /> <span>{i}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
        <div>
          <label className="text-sm text-gray-600">Contact Person</label>
          <input className="w-full mt-1 px-3 py-2 border rounded-lg" />
        </div>
        <div>
          <label className="text-sm text-gray-600">Preferable Dates (for testing)</label>
          <input className="w-full mt-1 px-3 py-2 border rounded-lg" />
        </div>
        <div>
          <label className="text-sm text-gray-600">Designation</label>
          <input className="w-full mt-1 px-3 py-2 border rounded-lg" />
        </div>
        <div>
          <label className="text-sm text-gray-600">Mobile No.</label>
          <input className="w-full mt-1 px-3 py-2 border rounded-lg" />
        </div>
        <div>
          <label className="text-sm text-gray-600">Email ID</label>
          <input className="w-full mt-1 px-3 py-2 border rounded-lg" />
        </div>
        <div className="md:col-span-2">
          <label className="text-sm text-gray-600">Address</label>
          <textarea rows="4" className="w-full mt-1 px-3 py-2 border rounded-lg"></textarea>
        </div>
      </div>
    </div>
  )
}

export default CustomerDetails


