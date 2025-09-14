import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { FaUsers, FaShoppingCart, FaDollarSign, FaBox, FaChartLine, FaArrowUp, FaArrowDown, FaEye, FaEdit, FaTruck, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa'
import SummaryApi from '../common'

const AdminDashboard = () => {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [period, setPeriod] = useState('30')

  useEffect(() => {
    fetchDashboardStats()
  }, [period])

  const fetchDashboardStats = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${SummaryApi.getDashboardStats.url}?period=${period}`, {
        method: SummaryApi.getDashboardStats.method,
        credentials: 'include'
      })
      const data = await response.json()
      
      if (data.success) {
        setStats(data.data)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error('Error fetching dashboard stats')
    } finally {
      setLoading(false)
    }
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-US').format(num)
  }

  const getPercentageChange = (current, previous) => {
    if (previous === 0) return current > 0 ? 100 : 0
    return ((current - previous) / previous) * 100
  }

  const StatCard = ({ title, value, icon: Icon, color, change, changeType }) => (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex items-center">
        <div className={`p-3 rounded-full ${color}`}>
          <Icon className="text-white text-xl" />
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-semibold text-gray-900">{value}</p>
          {change !== undefined && (
            <div className="flex items-center mt-1">
              {changeType === 'increase' ? (
                <FaArrowUp className="text-green-500 text-xs mr-1" />
              ) : (
                <FaArrowDown className="text-red-500 text-xs mr-1" />
              )}
              <span className={`text-xs ${changeType === 'increase' ? 'text-green-500' : 'text-red-500'}`}>
                {Math.abs(change).toFixed(1)}%
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  )

  const SimpleChart = ({ data, title, color = 'blue' }) => {
    if (!data || data.length === 0) {
      return (
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-4">{title}</h3>
          <div className="text-center text-gray-500">No data available</div>
        </div>
      )
    }

    const maxValue = Math.max(...data.map(item => item.revenue || item.count || item.orders))
    const colorClasses = {
      blue: 'bg-blue-500',
      green: 'bg-green-500',
      purple: 'bg-purple-500',
      red: 'bg-red-500'
    }

    return (
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-medium text-gray-900 mb-4">{title}</h3>
        <div className="space-y-2">
          {data.slice(0, 7).map((item, index) => {
            const height = ((item.revenue || item.count || item.orders) / maxValue) * 100
            return (
              <div key={index} className="flex items-center">
                <div className="w-16 text-xs text-gray-600">
                  {item._id ? `${item._id.month}/${item._id.day}` : `Day ${index + 1}`}
                </div>
                <div className="flex-1 mx-2">
                  <div className="bg-gray-200 rounded-full h-4">
                    <div 
                      className={`h-4 rounded-full ${colorClasses[color]}`}
                      style={{ width: `${height}%` }}
                    ></div>
                  </div>
                </div>
                <div className="w-16 text-xs text-gray-900 text-right">
                  {formatCurrency(item.revenue || 0)}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading dashboard...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!stats) {
    return (
      <div className="p-6">
        <div className="text-center text-gray-500">Failed to load dashboard data</div>
      </div>
    )
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
        <div className="flex items-center space-x-4">
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
            <option value="90">Last 90 days</option>
          </select>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Users"
          value={formatNumber(stats.overview.users.total)}
          icon={FaUsers}
          color="bg-blue-500"
        />
        <StatCard
          title="Total Orders"
          value={formatNumber(stats.overview.orders.total)}
          icon={FaShoppingCart}
          color="bg-green-500"
        />
        <StatCard
          title="Total Revenue"
          value={formatCurrency(stats.overview.revenue.total)}
          icon={FaDollarSign}
          color="bg-purple-500"
        />
        <StatCard
          title="Total Products"
          value={formatNumber(stats.overview.products.total)}
          icon={FaBox}
          color="bg-orange-500"
        />
      </div>

      {/* Recent Activity Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="New Users"
          value={formatNumber(stats.overview.users.new)}
          icon={FaUsers}
          color="bg-blue-100"
        />
        <StatCard
          title="New Orders"
          value={formatNumber(stats.overview.orders.new)}
          icon={FaShoppingCart}
          color="bg-green-100"
        />
        <StatCard
          title="Completed Orders"
          value={formatNumber(stats.overview.orders.completed)}
          icon={FaCheckCircle}
          color="bg-green-100"
        />
        <StatCard
          title="Pending Orders"
          value={formatNumber(stats.overview.orders.pending)}
          icon={FaExclamationTriangle}
          color="bg-yellow-100"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <SimpleChart
          data={stats.charts.dailySales}
          title="Daily Sales Revenue"
          color="green"
        />
        <SimpleChart
          data={stats.charts.userRegistrationTrend}
          title="User Registration Trend"
          color="blue"
        />
      </div>

      {/* Order Status Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Order Status Distribution</h3>
          <div className="space-y-3">
            {Object.entries(stats.charts.orderStatusDistribution).map(([status, count]) => (
              <div key={status} className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600 capitalize">
                  {status.replace('_', ' ')}
                </span>
                <div className="flex items-center">
                  <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                    <div 
                      className="bg-red-500 h-2 rounded-full"
                      style={{ 
                        width: `${(count / stats.overview.orders.total) * 100}%` 
                      }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900 w-8 text-right">
                    {count}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Top Selling Products</h3>
          <div className="space-y-3">
            {stats.charts.topProducts.map((product, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {product.productName}
                  </p>
                  <p className="text-xs text-gray-500">
                    {product.totalQuantity} sold
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">
                    {formatCurrency(product.totalRevenue)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <FaChartLine className="text-blue-500 text-2xl mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
              <p className="text-2xl font-semibold text-gray-900">
                {stats.overview.conversion.rate.toFixed(1)}%
              </p>
              <p className="text-xs text-gray-500">
                {stats.overview.conversion.uniqueCustomers} unique customers
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <FaDollarSign className="text-green-500 text-2xl mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-600">Average Order Value</p>
              <p className="text-2xl font-semibold text-gray-900">
                {formatCurrency(stats.overview.revenue.average)}
              </p>
              <p className="text-xs text-gray-500">
                Per order
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <FaBox className="text-orange-500 text-2xl mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-600">Inventory Status</p>
              <p className="text-2xl font-semibold text-gray-900">
                {stats.overview.products.inStock}
              </p>
              <p className="text-xs text-gray-500">
                {stats.overview.products.outOfStock} out of stock
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
