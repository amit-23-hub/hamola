import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { FaSearch, FaFilter, FaEye, FaEdit, FaBan, FaCheck, FaUndo, FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCalendarAlt, FaDollarSign, FaShoppingCart } from 'react-icons/fa'
import SummaryApi from '../common'

const AdminUserManagement = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  const [showUserDetails, setShowUserDetails] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    sortBy: 'createdAt',
    sortOrder: 'desc'
  })
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalUsers: 0
  })

  useEffect(() => {
    fetchUsers()
  }, [filters, pagination.currentPage])

  const fetchUsers = async () => {
    setLoading(true)
    try {
      const queryParams = new URLSearchParams({
        page: pagination.currentPage,
        limit: 10,
        search: filters.search,
        status: filters.status,
        sortBy: filters.sortBy,
        sortOrder: filters.sortOrder
      })

      const response = await fetch(`${SummaryApi.allUsersDetailed.url}?${queryParams}`, {
        method: SummaryApi.allUsersDetailed.method,
        credentials: 'include'
      })
      const data = await response.json()
      
      if (data.success) {
        setUsers(data.data.users)
        setPagination(data.data.pagination)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error('Error fetching users')
    } finally {
      setLoading(false)
    }
  }

  const handleUserAction = async (userId, action) => {
    try {
      const response = await fetch(SummaryApi.updateUserStatus.url, {
        method: SummaryApi.updateUserStatus.method,
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ userId, action })
      })
      
      const data = await response.json()
      if (data.success) {
        toast.success(data.message)
        fetchUsers()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error('Error updating user status')
    }
  }

  const handleViewUser = async (userId) => {
    try {
      const response = await fetch(`${SummaryApi.getUserDetails.url}/${userId}`, {
        method: SummaryApi.getUserDetails.method,
        credentials: 'include'
      })
      
      const data = await response.json()
      if (data.success) {
        setSelectedUser(data.data)
        setShowUserDetails(true)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error('Error fetching user details')
    }
  }

  const getStatusBadge = (user) => {
    if (user.isBlocked) {
      return <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">Blocked</span>
    } else if (!user.isActive) {
      return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">Inactive</span>
    } else {
      return <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Active</span>
    }
  }

  const getActivityBadge = (user) => {
    if (user.isRecentlyActive) {
      return <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">Recently Active</span>
    } else if (user.daysSinceLastLogin !== null) {
      return <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">{user.daysSinceLastLogin} days ago</span>
    } else {
      return <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">Never logged in</span>
    }
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search users..."
              value={filters.search}
              onChange={(e) => setFilters({...filters, search: e.target.value})}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          <select
            value={filters.status}
            onChange={(e) => setFilters({...filters, status: e.target.value})}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="all">All Users</option>
            <option value="active">Active</option>
            <option value="blocked">Blocked</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Activity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stats</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center">Loading...</td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-gray-500">No users found</td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          {user.profilePic ? (
                            <img className="h-10 w-10 rounded-full" src={user.profilePic} alt={user.name} />
                          ) : (
                            <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                              <FaUser className="text-gray-600" />
                            </div>
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-500">ID: {user._id.slice(-8)}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{user.email}</div>
                      {user.phone && <div className="text-sm text-gray-500">{user.phone}</div>}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(user)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getActivityBadge(user)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        <div className="flex items-center">
                          <FaShoppingCart className="mr-1 text-gray-400" />
                          {user.stats.totalOrders} orders
                        </div>
                        <div className="flex items-center">
                          <FaDollarSign className="mr-1 text-gray-400" />
                          ${user.stats.totalSpent.toFixed(2)}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleViewUser(user._id)}
                          className="text-blue-600 hover:text-blue-900"
                          title="View Details"
                        >
                          <FaEye />
                        </button>
                        <button
                          onClick={() => { setSelectedUser(user); setShowEditModal(true); }}
                          className="text-green-600 hover:text-green-900"
                          title="Edit User"
                        >
                          <FaEdit />
                        </button>
                        {user.isBlocked ? (
                          <button
                            onClick={() => handleUserAction(user._id, 'unblock')}
                            className="text-green-600 hover:text-green-900"
                            title="Unblock User"
                          >
                            <FaCheck />
                          </button>
                        ) : (
                          <button
                            onClick={() => handleUserAction(user._id, 'block')}
                            className="text-red-600 hover:text-red-900"
                            title="Block User"
                          >
                            <FaBan />
                          </button>
                        )}
                        <button
                          onClick={() => handleUserAction(user._id, 'reset')}
                          className="text-orange-600 hover:text-orange-900"
                          title="Reset Account"
                        >
                          <FaUndo />
                        </button>
                      </div>
                    
                    
                    </td>

                  </tr>

                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="flex-1 flex justify-between sm:hidden">
              <button
                onClick={() => setPagination({...pagination, currentPage: pagination.currentPage - 1})}
                disabled={!pagination.hasPrev}
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={() => setPagination({...pagination, currentPage: pagination.currentPage + 1})}
                disabled={!pagination.hasNext}
                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing page <span className="font-medium">{pagination.currentPage}</span> of{' '}
                  <span className="font-medium">{pagination.totalPages}</span> ({pagination.totalUsers} total users)
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                  <button
                    onClick={() => setPagination({...pagination, currentPage: pagination.currentPage - 1})}
                    disabled={!pagination.hasPrev}
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setPagination({...pagination, currentPage: pagination.currentPage + 1})}
                    disabled={!pagination.hasNext}
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                  >
                    Next
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* User Details Modal */}
      {showUserDetails && selectedUser && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">User Details</h3>
                <button
                  onClick={() => setShowUserDetails(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedUser.name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedUser.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedUser.phone || 'Not provided'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Account Age</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedUser.accountAge} days</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Addresses</label>
                  {selectedUser.addresses && selectedUser.addresses.length > 0 ? (
                    <div className="mt-1 space-y-2">
                      {selectedUser.addresses.map((address, index) => (
                        <div key={index} className="text-sm text-gray-900 p-2 bg-gray-50 rounded">
                          <div className="font-medium">{address.type.charAt(0).toUpperCase() + address.type.slice(1)}</div>
                          <div>{address.street}, {address.city}, {address.state} {address.zipCode}</div>
                          <div>{address.country}</div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="mt-1 text-sm text-gray-500">No addresses provided</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Total Orders</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedUser.stats.totalOrders}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Total Spent</label>
                    <p className="mt-1 text-sm text-gray-900">${selectedUser.stats.totalSpent.toFixed(2)}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Average Order Value</label>
                    <p className="mt-1 text-sm text-gray-900">${selectedUser.averageOrderValue.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminUserManagement
