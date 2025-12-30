function LabsReview() {
  const labs = [
    'TUV INDIA PVT. LTD., BANER, PUNE, MAHARASHTRA, INDIA',
    'SGS INDIA PRIVATE LIMITED, BENGALURU, KARNATAKA, INDIA',
  ]
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h2 className="text-2xl font-bold text-center mb-6">Labs and Review</h2>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="border rounded-lg p-4">
          <div className="text-center text-sm text-gray-500 mb-3">---------- Select Lab ----------</div>
          <div className="font-semibold mb-2">Recommended Labs</div>
          <div className="border rounded-lg max-h-48 overflow-auto">
            {labs.map((lab) => (
              <label key={lab} className="flex gap-2 items-start px-3 py-2 border-b last:border-b-0 text-sm">
                <input type="checkbox" /> <span>{lab}</span>
              </label>
            ))}
          </div>
        </div>
        <div className="border rounded-lg p-4">
          <div className="font-semibold mb-2">Review</div>
          <div className="space-y-3">
            <div>
              <div className="text-sm text-gray-600 mb-1">Name of EUT</div>
              <input className="w-full px-3 py-2 border rounded-lg" />
            </div>
            <div>
              <div className="text-sm text-gray-600 mb-1">Testing Requirements</div>
              <textarea rows="3" className="w-full px-3 py-2 border rounded-lg"></textarea>
            </div>
            <div>
              <div className="text-sm text-gray-600 mb-1">Testing Standards</div>
              <textarea rows="3" className="w-full px-3 py-2 border rounded-lg"></textarea>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-center gap-3">
        <button className="px-6 py-2 bg-primary text-white rounded-lg">Submit</button>
        <button className="px-6 py-2 bg-gray-900 text-white rounded-lg">Get Quote</button>
      </div>
    </div>
  )
}

export default LabsReview


