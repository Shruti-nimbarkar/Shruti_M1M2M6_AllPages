import { useState, useEffect, useMemo } from 'react'
import { ChevronDown, Clock, DollarSign, RefreshCw } from 'lucide-react'
import { fetchFullTestingRequest } from '../testingApi'

function LabSelection({ formData, updateFormData, testingRequestId }) {
  // State for review data from database
  const [reviewData, setReviewData] = useState({
    eutName: '',
    testingRequirements: [],
    testingStandards: []
  })
  const [loadingReview, setLoadingReview] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  // Initialize region from formData or use empty values
  const [selectedCountry, setSelectedCountry] = useState(formData.region?.country || '')
  const [selectedState, setSelectedState] = useState(formData.region?.state || '')
  const [selectedCity, setSelectedCity] = useState(formData.region?.city || '')

  const countries = ['India', 'USA', 'UK', 'Germany']
  const states = ['Maharashtra', 'Karnataka', 'Tamil Nadu', 'Gujarat']
  const cities = ['Pune', 'Mumbai', 'Bengaluru', 'Chennai']

  // Labs with location data
  const allLabs = [
    {
      id: 'tuv-india',
      name: 'TUV INDIA PVT. LTD., BANER, PUNE, MAHARASHTRA, INDIA',
      rating: 4.8,
      country: 'India',
      state: 'Maharashtra',
      city: 'Pune'
    },
    {
      id: 'sgs-india',
      name: 'SGS INDIA PRIVATE LIMITED, BENGALURU, KARNATAKA, INDIA',
      rating: 4.6,
      country: 'India',
      state: 'Karnataka',
      city: 'Bengaluru'
    },
    {
      id: 'abb-india',
      name: 'ABB INDIA LIMITED- ELSP-TESTING LABORATORY',
      rating: 4.5,
      country: 'India',
      state: 'Maharashtra',
      city: 'Pune'
    },
    {
      id: 'herrmann',
      name: 'HERRMANN RESEARCH PRODUCTS AND LABORATORIES PVT',
      rating: 4.7,
      country: 'India',
      state: 'Karnataka',
      city: 'Bengaluru'
    },
    {
      id: 'marquis',
      name: 'MARQUIS TECHNOLOGIES PRIVATE LIMITED',
      rating: 4.4,
      country: 'India',
      state: 'Tamil Nadu',
      city: 'Chennai'
    },
    {
      id: 'meter-testing',
      name: 'METER TESTING LABORATORY, RRVPNL',
      rating: 4.3,
      country: 'India',
      state: 'Gujarat',
      city: 'Mumbai'
    },
  ]

  // Filter labs based on selected Country, State, City
  const filteredLabs = useMemo(() => {
    return allLabs.filter(lab => {
      const countryMatch = !selectedCountry || lab.country === selectedCountry
      const stateMatch = !selectedState || lab.state === selectedState
      const cityMatch = !selectedCity || lab.city === selectedCity
      return countryMatch && stateMatch && cityMatch
    })
  }, [selectedCountry, selectedState, selectedCity])

  // Function to load review data
  const loadReviewData = async (isManualRefresh = false) => {
    if (!testingRequestId) {
      // Fallback to formData if no request ID
      setReviewData({
        eutName: formData.eutName || '',
        testingRequirements: formData.selectedTests || [],
        testingStandards: formData.selectedStandards || []
      })
      setLoadingReview(false)
      if (isManualRefresh) {
        setRefreshing(false)
        alert('No testing request ID found. Please complete previous steps first.')
      }
      return
    }

    try {
      if (isManualRefresh) {
        setRefreshing(true)
      } else {
        setLoadingReview(true)
      }

      console.log('Fetching data for testing request ID:', testingRequestId)
      const data = await fetchFullTestingRequest(testingRequestId)
      console.log('Received data:', data)

      setReviewData({
        eutName: data.product?.eut_name || '',
        testingRequirements: data.requirements?.selected_tests || [],
        testingStandards: data.standards?.standards || []
      })

      if (isManualRefresh) {
        alert('Review details refreshed successfully!')
      }
    } catch (error) {
      console.error('Failed to load review data:', error)
      // Fallback to formData if API fails
      setReviewData({
        eutName: formData.eutName || '',
        testingRequirements: formData.selectedTests || [],
        testingStandards: formData.selectedStandards || []
      })

      if (isManualRefresh) {
        alert('Failed to refresh data. Please ensure previous steps are completed.')
      }
    } finally {
      setLoadingReview(false)
      setRefreshing(false)
    }
  }

  // Manual refresh handler
  const handleRefreshDetails = () => {
    loadReviewData(true)
  }

  // Fetch review data from database on mount
  useEffect(() => {
    loadReviewData(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [testingRequestId])

  // Update formData when region changes
  useEffect(() => {
    const newRegion = {
      country: selectedCountry || null,
      state: selectedState || null,
      city: selectedCity || null
    }

    // Only update if region actually changed
    const currentRegion = formData.region || {}
    if (
      currentRegion.country !== newRegion.country ||
      currentRegion.state !== newRegion.state ||
      currentRegion.city !== newRegion.city
    ) {
      updateFormData({ region: newRegion })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCountry, selectedState, selectedCity])


  // const [selectedLabs, setSelectedLabs] = useState([recommendedLabs[0].id])

  // const toggleLabSelection = (labId) => {
  //   if (selectedLabs.includes(labId)) {
  //     setSelectedLabs(selectedLabs.filter(id => id !== labId))
  //   } else {
  //     setSelectedLabs([...selectedLabs, labId])
  //   }
  // }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Labs</h1>
      </div>

      {/* Region Selection */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="font-medium text-gray-700 mb-4">Region :</h3>

        <h4 className="text-center font-medium text-gray-700 mb-4">---------- Select Region ----------</h4>

        <div className="grid grid-cols-3 gap-4 mb-8">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
            <div className="relative">
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg appearance-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select</option>
                {countries.map((country) => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
            <div className="relative">
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg appearance-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select</option>
                {states.map((state) => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
            <div className="relative">
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg appearance-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select</option>
                {cities.map((city) => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Recommended Labs */}
        <h4 className="text-center font-medium text-gray-700 mb-4">---------- Select Lab ----------</h4>

        <div>
          <h5 className="font-semibold text-gray-900 mb-4">
            Recommended Labs
            {(selectedCountry || selectedState || selectedCity) && (
              <span className="text-sm font-normal text-gray-500 ml-2">
                ({filteredLabs.length} lab{filteredLabs.length !== 1 ? 's' : ''} found)
              </span>
            )}
          </h5>
          {filteredLabs.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>No labs found matching the selected filters.</p>
              <p className="text-sm mt-2">Please adjust your Country, State, or City selection.</p>
            </div>
          ) : (
            <div className="space-y-2 max-h-80 overflow-y-auto pr-2">
              {filteredLabs.map((lab) => (
                <label
                  key={lab.id}
                  className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={Array.isArray(formData.selectedLabs) && formData.selectedLabs.includes(lab.name)}
                    onChange={() => {
                      const current = Array.isArray(formData.selectedLabs)
                        ? formData.selectedLabs
                        : []

                      if (current.includes(lab.name)) {
                        updateFormData({
                          selectedLabs: current.filter(l => l !== lab.name)
                        })
                      } else {
                        updateFormData({
                          selectedLabs: [...current, lab.name]
                        })
                      }
                    }}
                    className="w-4 h-4"
                  />
                  <span className="text-sm flex-1 font-medium text-gray-900">{lab.name}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Review Section */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">Review</h3>
          <button
            onClick={handleRefreshDetails}
            disabled={refreshing}
            className={`flex items-center gap-2 px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${refreshing ? 'animate-pulse' : ''
              }`}
            title="Refresh review details from database"
          >
            <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
            {refreshing ? 'Refreshing...' : 'Refresh Details'}
          </button>
        </div>

        <div className="space-y-4 mb-6">
          {/* Info message when data is empty */}
          {!loadingReview && !reviewData.eutName && !reviewData.testingRequirements.length && !reviewData.testingStandards.length && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-blue-900 mb-1">No Review Data Available</h4>
                  <p className="text-sm text-blue-800">
                    Please complete the previous steps (Product Details, Testing Requirements, and Testing Standards) first, or click the "Refresh Details" button above to load existing data.
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="border border-gray-200 rounded-lg p-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Name of EUT</label>
            {loadingReview ? (
              <div className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-400">
                Loading...
              </div>
            ) : (
              <input
                type="text"
                value={reviewData.eutName || formData.eutName || ''}
                disabled
                placeholder="No EUT name available"
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-600"
              />
            )}
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Testing Requirements</label>
            <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg min-h-[60px]">
              {loadingReview ? (
                <p className="text-sm text-gray-400">Loading...</p>
              ) : (
                <>
                  {reviewData.testingRequirements && reviewData.testingRequirements.length > 0 ? (
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-gray-700 mb-2">
                        {reviewData.testingRequirements.length} test(s) selected:
                      </p>
                      <ul className="list-disc list-inside space-y-1">
                        {reviewData.testingRequirements.map((test, index) => (
                          <li key={index} className="text-sm text-gray-600">{test}</li>
                        ))}
                      </ul>
                    </div>
                  ) : formData.selectedTests && formData.selectedTests.length > 0 ? (
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-gray-700 mb-2">
                        {formData.selectedTests.length} test(s) selected:
                      </p>
                      <ul className="list-disc list-inside space-y-1">
                        {formData.selectedTests.map((test, index) => (
                          <li key={index} className="text-sm text-gray-600">{test}</li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-400">No tests selected</p>
                  )}
                </>
              )}
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Testing Standards</label>
            <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg min-h-[60px]">
              {loadingReview ? (
                <p className="text-sm text-gray-400">Loading...</p>
              ) : (
                <>
                  {reviewData.testingStandards && reviewData.testingStandards.length > 0 ? (
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-gray-700 mb-2">
                        {reviewData.testingStandards.length} standard(s) selected:
                      </p>
                      <ul className="list-disc list-inside space-y-1">
                        {reviewData.testingStandards.map((standard, index) => (
                          <li key={index} className="text-sm text-gray-600">{standard}</li>
                        ))}
                      </ul>
                    </div>
                  ) : formData.selectedStandards && formData.selectedStandards.length > 0 ? (
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-gray-700 mb-2">
                        {formData.selectedStandards.length} standard(s) selected:
                      </p>
                      <ul className="list-disc list-inside space-y-1">
                        {formData.selectedStandards.map((standard, index) => (
                          <li key={index} className="text-sm text-gray-600">{standard}</li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-400">No standards selected</p>
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6">
          <p className="text-center text-sm text-gray-600 mb-6">
            Our AI will instantly generate an approximate cost based on your inputs.
          </p>

          <div className="grid grid-cols-2 gap-6">
            <div className="bg-blue-50 rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div className="text-sm text-gray-600 mb-1">Estimated Time</div>
              <div className="text-2xl font-bold text-gray-900">24-48 hrs</div>
              <div className="text-xs text-gray-500 mt-1">Typical processing time</div>
            </div>

            <div className="bg-green-50 rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <div className="text-sm text-gray-600 mb-1">Estimated Price</div>
              <div className="text-2xl font-bold text-gray-900">$ 4000</div>
              <div className="text-xs text-gray-500 mt-1">
                This is an automatically generated estimate to help you plan your design verification journey. Final pricing may vary based on simulation complexity and additional testing requirements.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LabSelection

