import React from 'react'
import { Link } from 'react-router-dom'
import { FaFacebook, FaTwitter, FaInstagram, FaPinterest, FaYoutube, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className='bg-gray-900 text-white'>
      {/* Main Footer Content */}
      <div className='container mx-auto px-4 py-12'>
        <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8'>
          {/* Company Info */}
          <div>
            <div className='flex items-center space-x-2 mb-4'>
              <div className='text-3xl'>🪑</div>
              <div>
                <h3 className='text-2xl font-bold text-red-600'>FurniCraft</h3>
                <p className='text-sm text-gray-400'>Premium Furniture</p>
              </div>
            </div>
            <p className='text-gray-300 mb-6'>
              Transform your space with our curated collection of handcrafted furniture. 
              Quality, style, and comfort in every piece.
            </p>
            <div className='flex space-x-4'>
              <a href="#" className='text-gray-400 hover:text-red-400 transition-colors'>
                <FaFacebook className='text-xl' />
              </a>
              <a href="#" className='text-gray-400 hover:text-red-400 transition-colors'>
                <FaTwitter className='text-xl' />
              </a>
              <a href="#" className='text-gray-400 hover:text-red-400 transition-colors'>
                <FaInstagram className='text-xl' />
              </a>
              <a href="#" className='text-gray-400 hover:text-red-400 transition-colors'>
                <FaPinterest className='text-xl' />
              </a>
              <a href="#" className='text-gray-400 hover:text-red-400 transition-colors'>
                <FaYoutube className='text-xl' />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className='text-lg font-semibold mb-4'>Quick Links</h4>
            <ul className='space-y-2'>
              <li><Link to="/" className='text-gray-300 hover:text-red-400 transition-colors'>Home</Link></li>
              <li><Link to="/all-products" className='text-gray-300 hover:text-red-400 transition-colors'>All Products</Link></li>
              <li><Link to="/room-planner" className='text-gray-300 hover:text-red-400 transition-colors'>Room Planner</Link></li>
              <li><Link to="/furniture-care" className='text-gray-300 hover:text-red-400 transition-colors'>Furniture Care</Link></li>
              <li><Link to="/sale" className='text-gray-300 hover:text-red-400 transition-colors'>Sale</Link></li>
              <li><Link to="/new-arrivals" className='text-gray-300 hover:text-red-400 transition-colors'>New Arrivals</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className='text-lg font-semibold mb-4'>Categories</h4>
            <ul className='space-y-2'>
              <li><Link to="/category/sofas" className='text-gray-300 hover:text-red-400 transition-colors'>Sofas & Couches</Link></li>
              <li><Link to="/category/chairs" className='text-gray-300 hover:text-red-400 transition-colors'>Chairs</Link></li>
              <li><Link to="/category/tables" className='text-gray-300 hover:text-red-400 transition-colors'>Tables</Link></li>
              <li><Link to="/category/beds" className='text-gray-300 hover:text-red-400 transition-colors'>Beds</Link></li>
              <li><Link to="/category/storage" className='text-gray-300 hover:text-red-400 transition-colors'>Storage</Link></li>
              <li><Link to="/category/office" className='text-gray-300 hover:text-red-400 transition-colors'>Office</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className='text-lg font-semibold mb-4'>Contact Us</h4>
            <div className='space-y-3'>
              <div className='flex items-center'>
                <FaPhone className='text-red-400 mr-3' />
                <span className='text-gray-300'>(555) 123-FURN</span>
              </div>
              <div className='flex items-center'>
                <FaEnvelope className='text-red-400 mr-3' />
                <span className='text-gray-300'>info@furnicraft.com</span>
              </div>
              <div className='flex items-start'>
                <FaMapMarkerAlt className='text-red-400 mr-3 mt-1' />
                <span className='text-gray-300'>
                  123 Furniture Street<br />
                  Design City, DC 12345
                </span>
              </div>
            </div>
            
            {/* Newsletter Signup */}
            <div className='mt-6'>
              <h5 className='font-semibold mb-2'>Newsletter</h5>
              <p className='text-sm text-gray-400 mb-3'>Get updates on new products and offers</p>
              <div className='flex'>
                <input
                  type='email'
                  placeholder='Your email'
                  className='flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-white'
                />
                <button className='bg-red-600 px-4 py-2 rounded-r-lg hover:bg-red-700 transition-colors'>
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className='border-t border-gray-800'>
        <div className='container mx-auto px-4 py-6'>
          <div className='flex flex-col md:flex-row justify-between items-center'>
            <div className='text-gray-400 text-sm mb-4 md:mb-0'>
              © 2024 FurniCraft. All rights reserved.
            </div>
            <div className='flex space-x-6 text-sm'>
              <Link to="/privacy" className='text-gray-400 hover:text-red-400 transition-colors'>Privacy Policy</Link>
              <Link to="/terms" className='text-gray-400 hover:text-red-400 transition-colors'>Terms of Service</Link>
              <Link to="/shipping" className='text-gray-400 hover:text-red-400 transition-colors'>Shipping Info</Link>
              <Link to="/returns" className='text-gray-400 hover:text-red-400 transition-colors'>Returns</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer