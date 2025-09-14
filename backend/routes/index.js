const express = require('express')

const router = express.Router()

const userSignUpController = require("../controller/user/userSignUp")
const userSignInController = require('../controller/user/userSignIn')
const userDetailsController = require('../controller/user/userDetails')
const authToken = require('../middleware/authToken')
const userLogout = require('../controller/user/userLogout')
const allUsers = require('../controller/user/allUsers')
const updateUser = require('../controller/user/updateUser')
const getAllUsersDetailed = require('../controller/user/getAllUsersDetailed')
const updateUserStatus = require('../controller/user/updateUserStatus')
const getUserDetails = require('../controller/user/getUserDetails')
const updateUserProfile = require('../controller/user/updateUserProfile')
const UploadProductController = require('../controller/product/uploadProduct')
const getProductController = require('../controller/product/getProduct')
const updateProductController = require('../controller/product/updateProduct')
const getCategoryProduct = require('../controller/product/getCategoryProductOne')
const getCategoryWiseProduct = require('../controller/product/getCategoryWiseProduct')
const getProductDetails = require('../controller/product/getProductDetails')
const addToCartController = require('../controller/user/addToCartController')
const countAddToCartProduct = require('../controller/user/countAddToCartProduct')
const addToCartViewProduct  = require('../controller/user/addToCartViewProduct')
const updateAddToCartProduct = require('../controller/user/updateAddToCartProduct')
const deleteAddToCartProduct = require('../controller/user/deleteAddToCartProduct')
const searchProduct = require('../controller/product/searchProduct')
const filterProductController = require('../controller/product/filterProduct')
const getAdvertisements = require('../controller/advertisement/getAdvertisements')
const uploadAdvertisement = require('../controller/advertisement/uploadAdvertisement')
const getSliders = require('../controller/slider/getSliders')
const uploadSlider = require('../controller/slider/uploadSlider')
const getAllOrders = require('../controller/order/getAllOrders')
const updateOrderStatus = require('../controller/order/updateOrderStatus')
const getOrderDetails = require('../controller/order/getOrderDetails')
const getOrderStats = require('../controller/order/getOrderStats')
const getDashboardStats = require('../controller/analytics/getDashboardStats')
const getAllCoupons = require('../controller/coupon/getAllCoupons')
const createCoupon = require('../controller/coupon/createCoupon')
const updateCoupon = require('../controller/coupon/updateCoupon')
const deleteCoupon = require('../controller/coupon/deleteCoupon')
const validateCoupon = require('../controller/coupon/validateCoupon')
const uploadToCloudinary = require('../controller/upload/uploadToCloudinary')
const uploadMultipleToCloudinary = require('../controller/upload/uploadMultipleToCloudinary')
const deleteFromCloudinary = require('../controller/upload/deleteFromCloudinary')
const { uploadMiddleware, uploadMultipleMiddleware } = require('../config/cloudinary')



router.post("/signup",userSignUpController)
router.post("/signin",userSignInController)
router.get("/user-details",authToken,userDetailsController)
router.get("/userLogout",userLogout)

//admin panel 
router.get("/all-user",authToken,allUsers)
router.get("/all-users-detailed",authToken,getAllUsersDetailed)
router.get("/user-details/:userId",authToken,getUserDetails)
router.post("/update-user",authToken,updateUser)
router.post("/update-user-status",authToken,updateUserStatus)
router.put("/update-user-profile/:userId",authToken,updateUserProfile)

//product
router.post("/upload-product",authToken,UploadProductController)
router.get("/get-product",getProductController)
router.post("/update-product",authToken,updateProductController)
router.get("/get-categoryProduct",getCategoryProduct)
router.post("/category-product",getCategoryWiseProduct)
router.post("/product-details",getProductDetails)
router.get("/search",searchProduct)
router.post("/filter-product",filterProductController)

//user add to cart
router.post("/addtocart",authToken,addToCartController)
router.get("/countAddToCartProduct",authToken,countAddToCartProduct)
router.get("/view-card-product",authToken,addToCartViewProduct)
router.post("/update-cart-product",authToken,updateAddToCartProduct)
router.post("/delete-cart-product",authToken,deleteAddToCartProduct)

//advertisements
router.get("/advertisements",getAdvertisements)
router.post("/upload-advertisement",authToken,uploadAdvertisement)

//sliders
router.get("/sliders",getSliders)
router.post("/upload-slider",authToken,uploadSlider)

//orders
router.get("/orders",authToken,getAllOrders)
router.get("/order-stats",authToken,getOrderStats)
router.get("/order-details/:orderId",authToken,getOrderDetails)
router.post("/update-order-status",authToken,updateOrderStatus)

//analytics
router.get("/dashboard-stats",authToken,getDashboardStats)

//coupons
router.get("/coupons",authToken,getAllCoupons)
router.post("/coupons",authToken,createCoupon)
router.put("/coupons/:couponId",authToken,updateCoupon)
router.delete("/coupons/:couponId",authToken,deleteCoupon)
router.post("/validate-coupon",validateCoupon)

//cloudinary uploads
router.post("/upload-cloudinary",authToken,uploadMiddleware('products'),uploadToCloudinary)
router.post("/upload-multiple-cloudinary",authToken,uploadMultipleMiddleware('products',5),uploadMultipleToCloudinary)
router.delete("/delete-cloudinary/:publicId",authToken,deleteFromCloudinary)







module.exports = router