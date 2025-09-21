const backendDomin = "http://localhost:8080"

const SummaryApi = {
    signUP : {
        url : `${backendDomin}/api/signup`,
        method : "post"
    },
    signIn : {
        url : `${backendDomin}/api/signin`,
        method : "post"
    },
    current_user : {
        url : `${backendDomin}/api/user-details`,
        method : "get"
    },
    logout_user : {
        url : `${backendDomin}/api/userLogout`,
        method : 'get'
    },
    allUser : {
        url : `${backendDomin}/api/all-user`,
        method : 'get'
    },
    allUsersDetailed : {
        url : `${backendDomin}/api/all-users-detailed`,
        method : 'get'
    },
    getUserDetails : {
        url : `${backendDomin}/api/user-details`,
        method : 'get'
    },
    updateUser : {
        url : `${backendDomin}/api/update-user`,
        method : "post"
    },
    updateUserStatus : {
        url : `${backendDomin}/api/update-user-status`,
        method : "post"
    },
    updateUserProfile : {
        url : `${backendDomin}/api/update-user-profile`,
        method : "put"
    },
    uploadProduct : {
        url : `${backendDomin}/api/upload-product`,
        method : 'post'
    },
    allProduct : {
        url : `${backendDomin}/api/get-product`,
        method : 'get'
    },
    updateProduct : {
        url : `${backendDomin}/api/update-product`,
        method  : 'post'
    },
    categoryProduct : {
        url : `${backendDomin}/api/get-categoryProduct`,
        method : 'get'
    },
    categoryWiseProduct : {
        url : `${backendDomin}/api/category-product`,
        method : 'post'
    },
    productDetails : {
        url : `${backendDomin}/api/product-details`,
        method : 'post'
    },
    featuredProducts : {
        url : `${backendDomin}/api/featured-products`,
        method : 'get'
    },
    addToCartProduct : {
        url : `${backendDomin}/api/addtocart`,
        method : 'post'
    },
    addToCartProductCount : {
        url : `${backendDomin}/api/countAddToCartProduct`,
        method : 'get'
    },
    addToCartProductView : {
        url : `${backendDomin}/api/view-card-product`,
        method : 'get'
    },
    updateCartProduct : {
        url : `${backendDomin}/api/update-cart-product`,
        method : 'post'
    },
    deleteCartProduct : {
        url : `${backendDomin}/api/delete-cart-product`,
        method : 'post'
    },
    searchProduct : {
        url : `${backendDomin}/api/search`,
        method : 'get'
    },
    filterProduct : {
        url : `${backendDomin}/api/filter-product`,
        method : 'post'
    },
    getAdvertisements : {
        url : `${backendDomin}/api/advertisements`,
        method : 'get'
    },
    uploadAdvertisement : {
        url : `${backendDomin}/api/upload-advertisement`,
        method : 'post'
    },
    getSliders : {
        url : `${backendDomin}/api/sliders`,
        method : 'get'
    },
    uploadSlider : {
        url : `${backendDomin}/api/upload-slider`,
        method : 'post'
    },
    getAllOrders : {
        url : `${backendDomin}/api/orders`,
        method : 'get'
    },
    getOrderStats : {
        url : `${backendDomin}/api/order-stats`,
        method : 'get'
    },
    getOrderDetails : {
        url : `${backendDomin}/api/order-details`,
        method : 'get'
    },
    updateOrderStatus : {
        url : `${backendDomin}/api/update-order-status`,
        method : 'post'
    },
    getDashboardStats : {
        url : `${backendDomin}/api/dashboard-stats`,
        method : 'get'
    },
    getAllCoupons : {
        url : `${backendDomin}/api/coupons`,
        method : 'get'
    },
    createCoupon : {
        url : `${backendDomin}/api/coupons`,
        method : 'post'
    },
    updateCoupon : {
        url : `${backendDomin}/api/coupons`,
        method : 'put'
    },
    deleteCoupon : {
        url : `${backendDomin}/api/coupons`,
        method : 'delete'
    },
    validateCoupon : {
        url : `${backendDomin}/api/validate-coupon`,
        method : 'post'
    },
    // Cloudinary uploads
    uploadToCloudinary : {
        url : `${backendDomin}/api/upload-cloudinary`,
        method : 'post'
    },
    uploadMultipleToCloudinary : {
        url : `${backendDomin}/api/upload-multiple-cloudinary`,
        method : 'post'
    },
    deleteFromCloudinary : {
        url : `${backendDomin}/api/delete-cloudinary`,
        method : 'delete'
    }
}


export default SummaryApi