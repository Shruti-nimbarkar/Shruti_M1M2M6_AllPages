function EUTDetails() {
  const fieldsLeft = [
    'Name of EUT',
    'Quantity of EUT',
    'Manufacturer/Make & Address',
    'Model No.',
    'Serial No.',
    'No. of Power Ports and Connector Type',
    'Name of the Software',
  ]
  const fieldsRight = [
    'Supply Voltage',
    'Operating Frequency',
    'Current',
    'Weight (Kg)',
    'Dimensions (L x W x H)mm',
    'No. of Signal Lines and Connector Type',
    'Software Version No.',
  ]
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h2 className="text-2xl font-bold text-center mb-6">EUT Details</h2>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          {fieldsLeft.map((f) => (
            <div key={f}>
              <label className="text-sm text-gray-600">{f}</label>
              <input className="w-full mt-1 px-3 py-2 border rounded-lg" />
            </div>
          ))}
        </div>
        <div className="space-y-4">
          {fieldsRight.map((f) => (
            <div key={f}>
              <label className="text-sm text-gray-600">{f}</label>
              <input className="w-full mt-1 px-3 py-2 border rounded-lg" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default EUTDetails


