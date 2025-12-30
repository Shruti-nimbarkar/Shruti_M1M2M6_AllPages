import { ArrowRightCircle, Palette, TestTube, Settings, Cpu, Bug, Award } from 'lucide-react'
import { Link } from 'react-router-dom'

const services = [
  { icon: Palette, title: 'Design', desc: 'Create and validate product designs' },
  { icon: TestTube, title: 'Testing', desc: 'Comprehensive product testing' },
  { icon: Settings, title: 'Calibration', desc: 'Precise instrument calibration' },
  { icon: Cpu, title: 'Simulation', desc: 'Virtual testing and modeling' },
  { icon: Bug, title: 'Debugging', desc: 'Identify and fix product issues' },
  { icon: Award, title: 'Certification', desc: 'Official product certification' },
]

function ServiceSelection() {
  return (
    <div className="bg-white min-h-screen py-16">
      <div className="container mx-auto px-6 max-w-5xl">
        <h2 className="text-2xl font-bold mb-6">Select a Service to Begin</h2>
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 flex items-center justify-between mb-8">
          <div>
            <div className="font-semibold">All Inclusive</div>
            <div className="text-sm text-gray-600">One stop solution - Includes all services</div>
          </div>
          <div className="flex gap-3">
            <Link to="/product-details" className="px-4 py-2 bg-primary text-white rounded-lg flex items-center gap-2">
              Start Service <ArrowRightCircle className="w-4 h-4" />
            </Link>
            <a href="#" className="px-4 py-2 border rounded-lg">Learn More</a>
          </div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <div key={i} className="bg-white border rounded-xl p-6 hover:shadow-lg transition">
              <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center mb-4">
                <s.icon className="w-5 h-5 text-primary" />
              </div>
              <div className="font-semibold">{s.title}</div>
              <div className="text-sm text-gray-600 mb-4">{s.desc}</div>
              <div className="flex gap-3">
                <Link to="/product-details" className="px-4 py-2 bg-primary text-white rounded-lg">
                  Start Service
                </Link>
                <a href="#" className="px-4 py-2 border rounded-lg">Learn More</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ServiceSelection


