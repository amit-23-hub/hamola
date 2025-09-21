import React, { useContext, useState } from 'react'
import Logo from './Logo'
import { GrSearch } from "react-icons/gr";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SummaryApi from '../common';
import { toast } from 'react-toastify'
import { setUserDetails } from '../store/userSlice';
import ROLE from '../common/role';
import Context from '../context';
import productCategory, { roomTypes } from '../helpers/productCategory';

const Header = () => {
  const user = useSelector(state => state?.user?.user)
  const dispatch = useDispatch()
  const [menuDisplay,setMenuDisplay] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [categoryMenuOpen, setCategoryMenuOpen] = useState(false)
  const context = useContext(Context)
  const navigate = useNavigate()
  const searchInput = useLocation()
  const URLSearch = new URLSearchParams(searchInput?.search)
  const searchQuery = URLSearch.getAll("q")
  const [search,setSearch] = useState(searchQuery)

  const handleLogout = async() => {
    const fetchData = await fetch(SummaryApi.logout_user.url,{
      method : SummaryApi.logout_user.method,
      credentials : 'include'
    })

    const data = await fetchData.json()

    if(data.success){
      toast.success(data.message)
      dispatch(setUserDetails(null))
      navigate("/")
    }

    if(data.error){
      toast.error(data.message)
    }

  }

  const handleSearch = (e)=>{
    const { value } = e.target
    setSearch(value)

    if(value){
      navigate(`/search?q=${value}`)
    }else{
      navigate("/search")
    }
  }
  
  return (
    <header className='bg-white shadow-lg fixed w-full z-50'>
      {/* Top Bar */}
      <div className='bg-red-50 border-b border-red-200'>
        <div className='container mx-auto px-4 py-1'>
          <div className='flex justify-between items-center text-xs text-red-800'>
            <div className='flex items-center space-x-4'>
              <span>🆓 Free shipping on orders over $500</span>
              <span>📞 Call us: (555) 123-FURN</span>
            </div>
            <div className='hidden md:flex items-center space-x-4'>
              <Link to="/furniture-care" className='hover:text-red-600'>Furniture Care</Link>
              <Link to="/contact" className='hover:text-red-600'>Contact</Link>
              <Link to="/about" className='hover:text-red-600'>About Us</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className='container mx-auto px-4'>
        <div className='flex items-center justify-between h-14'>
          {/* Logo */}
          <div className='flex items-center'>
            <Link to={"/"} className='flex items-center space-x-2'>
              <div className='text-3xl'>🪑</div>
              <div>
                <h1 className='text-2xl font-bold text-red-600'>FurniCraft</h1>
                <p className='text-xs text-gray-600 -mt-1'>Premium Furniture</p>
              </div>
            </Link>
          </div>

          {/* Search Bar */}
          <div className='hidden lg:flex items-center w-full max-w-2xl mx-8'>
            <div className='relative w-full'>
              <input 
                type='text' 
                placeholder='Search for furniture, rooms, or styles...' 
                className='w-full px-4 py-3 pr-12 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent' 
                onChange={handleSearch} 
                value={search}
              />
              <button className='absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-red-600 text-white rounded-full hover:bg-red-700'>
                <GrSearch />
              </button>
            </div>
          </div>

          {/* Right Side Icons */}
          <div className='flex items-center space-x-6'>
            {/* Mobile Menu Button */}
            <button 
              className='lg:hidden p-2'
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>

            {/* User Account */}
            <div className='relative'>
              {user?._id ? (
                <div className='flex items-center space-x-2'>
                  <div className='text-2xl cursor-pointer' onClick={()=>setMenuDisplay(!menuDisplay)}>
                    {user?.profilePic ? (
                      <img src={user?.profilePic} className='w-8 h-8 rounded-full' alt={user?.name} />
                    ) : (
                      <FaRegCircleUser/>
                    )}
                  </div>
                  {menuDisplay && (
                    <div className='absolute bg-white top-12 right-0 w-48 shadow-lg rounded-lg border p-2'>
                      <div className='px-3 py-2 border-b'>
                        <p className='font-medium'>{user?.name}</p>
                        <p className='text-sm text-gray-600'>{user?.email}</p>
                      </div>
                      <Link to={"/profile"} className='block px-3 py-2 hover:bg-gray-100 rounded' onClick={()=>setMenuDisplay(false)}>
                        Profile
                      </Link>
                      {user?.role === ROLE.ADMIN && (
                        <Link to={"/admin-panel/all-products"} className='block px-3 py-2 hover:bg-gray-100 rounded' onClick={()=>setMenuDisplay(false)}>
                          Admin Panel
                        </Link>
                      )}
                      <button onClick={handleLogout} className='block w-full text-left px-3 py-2 hover:bg-gray-100 rounded text-red-600'>
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link to={"/login"} className='text-2xl hover:text-red-600'>
                  <FaRegCircleUser/>
                </Link>
              )}
            </div>

            {/* Shopping Cart */}
            {user?._id && (
              <Link to={"/cart"} className='relative text-2xl hover:text-red-600'>
                <FaShoppingCart/>
                {context?.cartProductCount > 0 && (
                  <div className='absolute -top-2 -right-2 bg-red-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs'>
                    {context?.cartProductCount}
                  </div>
                )}
              </Link>
            )}

            {/* Login Button for non-logged in users */}
            {!user?._id && (
              <Link to={"/login"} className='px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors'>
                Login
              </Link>
            )}
          </div>
        </div>

        {/* Navigation Menu */}
        <div className='hidden lg:flex items-center justify-center space-x-6 py-0.5 border-t border-gray-200 overflow-x-auto scrollbar-none'>
          {productCategory.slice(0, 8).map(category => (
            <Link 
              key={category.id} 
              to={`/product-category?category=${category.value}`}
              className='flex items-center space-x-1 px-3 py-2 text-gray-700 hover:text-red-600 font-medium whitespace-nowrap transition-colors'
            >
              <span className='text-lg'>{category.icon}</span>
              <span className='text-sm'>{category.label}</span>
            </Link>
          ))}
          
          <Link to="/product-category?category=sale" className='px-3 py-2 text-gray-700 hover:text-red-600 font-medium whitespace-nowrap'>
            Sale
          </Link>
          <Link to="/product-category?category=new-arrivals" className='px-3 py-2 text-gray-700 hover:text-red-600 font-medium whitespace-nowrap'>
            New Arrivals
          </Link>
          <Link to="/inspiration" className='px-3 py-2 text-gray-700 hover:text-red-600 font-medium whitespace-nowrap'>
            Inspiration
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className='lg:hidden bg-white border-t border-gray-200'>
          <div className='container mx-auto px-4 py-4 space-y-4'>
            {/* Mobile Search */}
            <div className='relative'>
              <input 
                type='text' 
                placeholder='Search furniture...' 
                className='w-full px-4 py-3 pr-12 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500' 
                onChange={handleSearch} 
                value={search}
              />
              <button className='absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-red-600 text-white rounded-full'>
                <GrSearch />
              </button>
            </div>

            {/* Mobile Categories */}
            <div className='grid grid-cols-2 gap-2'>
              {productCategory.slice(0, 8).map(category => (
                <Link 
                  key={category.id} 
                  to={`/product-category?category=${category.value}`}
                  className='flex items-center space-x-2 p-3 hover:bg-gray-100 rounded-lg'
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className='text-xl'>{category.icon}</span>
                  <span className='text-sm'>{category.label}</span>
                </Link>
              ))}
            </div>

            {/* Mobile Navigation Links */}
            <div className='space-y-2 pt-4 border-t'>
              <Link to="/product-category?category=sale" className='block py-2 text-gray-700 hover:text-red-600' onClick={() => setMobileMenuOpen(false)}>
                Sale
              </Link>
              <Link to="/product-category?category=new-arrivals" className='block py-2 text-gray-700 hover:text-red-600' onClick={() => setMobileMenuOpen(false)}>
                New Arrivals
              </Link>
              <Link to="/inspiration" className='block py-2 text-gray-700 hover:text-red-600' onClick={() => setMobileMenuOpen(false)}>
                Inspiration
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header