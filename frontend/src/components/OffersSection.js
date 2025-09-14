import React, { useState, useEffect } from 'react'
import { FaTag, FaPercent, FaTruck, FaGift, FaClock } from 'react-icons/fa'
import SummaryApi from '../common'

const OffersSection = () => {
  const [coupons, setCoupons] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchActiveCoupons()
  }, [])

  const fetchActiveCoupons = async () => {
    try {
      const response = await fetch(`${SummaryApi.getAllCoupons.url}?status=active&limit=4`, {
        method: SummaryApi.getAllCoupons.method,
        credentials: 'include'
      })
      const data = await response.json()
      
      if (data.success) {
        setCoupons(data.data.coupons)
      }
    } catch (error) {
      console.error('Error fetching coupons:', error)
    } finally {
      setLoading(false)
    }
  }

  const getCouponIcon = (type) => {
    switch (type) {
      case 'percentage':
        return <FaPercent className="text-red-500" />
      case 'fixed':
        return <FaTag className="text-green-500" />
      case 'free_shipping':
        return <FaTruck className="text-blue-500" />
      default:
        return <FaGift className="text-purple-500" />
    }
  }

  const formatCouponValue = (coupon) => {
    switch (coupon.type) {
      case 'percentage':
        return `${coupon.value}% OFF`
      case 'fixed':
        return `$${coupon.value} OFF`
      case 'free_shipping':
        return 'FREE SHIPPING'
      default:
        return coupon.value
    }
  }

  const getDaysRemaining = (validUntil) => {
    const now = new Date()
    const until = new Date(validUntil)
    const diffTime = until - now
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays > 0 ? diffDays : 0
  }

  if (loading) {
    return (
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500 mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading offers...</p>
          </div>
        </div>
      </section>
    )
  }

  if (coupons.length === 0) {
    return null
  }

  return (
    <section className="py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Special Offers & Coupons</h2>
          <p className="text-gray-600">Save more on your favorite furniture</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {coupons.map((coupon) => (
            <div key={coupon._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    {getCouponIcon(coupon.type)}
                    <span className="text-sm font-medium text-gray-600">{coupon.name}</span>
                  </div>
                  <div className="flex items-center text-xs text-gray-500">
                    <FaClock className="mr-1" />
                    {getDaysRemaining(coupon.validUntil)} days left
                  </div>
                </div>

                <div className="text-center mb-3">
                  <div className="text-2xl font-bold text-red-600 mb-1">
                    {formatCouponValue(coupon)}
                  </div>
                  <div className="text-xs text-gray-500 font-mono bg-gray-100 px-2 py-1 rounded">
                    {coupon.code}
                  </div>
                </div>

                {coupon.description && (
                  <p className="text-xs text-gray-600 mb-3 text-center">
                    {coupon.description}
                  </p>
                )}

                {coupon.minimumAmount > 0 && (
                  <p className="text-xs text-gray-500 text-center mb-3">
                    Min. order: ${coupon.minimumAmount}
                  </p>
                )}

                <div className="text-center">
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(coupon.code)
                      // You could add a toast notification here
                    }}
                    className="w-full bg-red-600 text-white py-2 px-3 rounded text-xs font-semibold hover:bg-red-700 transition-colors"
                  >
                    Copy Code
                  </button>
                </div>

                <div className="mt-2 text-center">
                  <div className="text-xs text-gray-500">
                    {coupon.usedCount} / {coupon.usageLimit || '∞'} used
                  </div>
                  {coupon.usageLimit && (
                    <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
                      <div 
                        className="bg-red-500 h-1 rounded-full" 
                        style={{ width: `${Math.min((coupon.usedCount / coupon.usageLimit) * 100, 100)}%` }}
                      ></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-6">
          <button className="text-red-600 hover:text-red-700 font-medium text-sm">
            View All Offers →
          </button>
        </div>
      </div>
    </section>
  )
}

export default OffersSection
