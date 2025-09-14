import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Home from '../pages/Home'
import Login from '../pages/Login'
import ForgotPassowrd from '../pages/ForgotPassowrd'
import SignUp from '../pages/SignUp'
import AdminPanel from '../pages/AdminPanel'
import AllUsers from '../pages/AllUsers'
import AllProducts from '../pages/AllProducts'
import CategoryProduct from '../pages/CategoryProduct'
import ProductDetails from '../pages/ProductDetails'
import Cart from '../pages/Cart'
import SearchProduct from '../pages/SearchProduct'
import RoomPlanner from '../pages/RoomPlanner'
import FurnitureCare from '../pages/FurnitureCare'
import Profile from '../pages/Profile'
import Contact from '../pages/Contact'
import AdminAdvertisementManager from '../components/AdminAdvertisementManager'
import AdminUserManagement from '../components/AdminUserManagement'
import AdminOrderManagement from '../components/AdminOrderManagement'
import AdminDashboard from '../components/AdminDashboard'
import AdminCouponManagement from '../components/AdminCouponManagement'

const router = createBrowserRouter([
    {
        path : "/",
        element : <App/>,
        children : [
            {
                path : "",
                element : <Home/>
            },
            {
                path : "login",
                element : <Login/>
            },
            {
                path : "forgot-password",
                element : <ForgotPassowrd/>
            },
            {
                path : "sign-up",
                element : <SignUp/>
            },
            {
                path : "product-category",
                element : <CategoryProduct/>
            },
            {
                path : "product/:id",
                element : <ProductDetails/>
            },
            {
                path : 'cart',
                element : <Cart/>
            },
            {
                path : "search",
                element : <SearchProduct/>
            },
            {
                path : "room-planner",
                element : <RoomPlanner/>
            },
            {
                path : "furniture-care",
                element : <FurnitureCare/>
            },
            {
                path : "all-products",
                element : <AllProducts/>
            },
            {
                path : "category/:category",
                element : <CategoryProduct/>
            },
            {
                path : "room/:roomType",
                element : <CategoryProduct/>
            },
            {
                path : "profile",
                element : <Profile/>
            },
            {
                path : "contact",
                element : <Contact/>
            },
            {
                path : "admin-panel",
                element : <AdminPanel/>,
                children : [
                    {
                        path : "dashboard",
                        element : <AdminDashboard/>
                    },
                    {
                        path : "user-management",
                        element : <AdminUserManagement/>
                    },
                    {
                        path : "order-management",
                        element : <AdminOrderManagement/>
                    },
                    {
                        path : "coupon-management",
                        element : <AdminCouponManagement/>
                    },
                    {
                        path : "all-users",
                        element : <AllUsers/>
                    },
                    {
                        path : "all-products",
                        element : <AllProducts/>
                    },
                    {
                        path : "content-management",
                        element : <AdminAdvertisementManager/>
                    }
                ]
            },
        ]
    }
])


export default router