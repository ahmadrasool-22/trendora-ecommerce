import { createBrowserRouter,RouterProvider } from "react-router-dom";
import Layout from "./component/Layout";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/Orderconfirm";
import ScrollTop from "./component/Scrolltop";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./admin/Dashboard";
import AdminRoute from "./admin/AdminRoute";
import AdminLayout from "./admin/AdminLayout";
import ProductView from "./admin/products/productview";
import ProductCreate from "./admin/products/productcreate";
import ProductEdit from "./admin/products/productedit";
import Users from "./admin/users/view";
import Orders from "./admin/orders/view";
import BuyNowCheckout from "./pages/BuyNowCheckout";
import Order from "./pages/Orders";
import OrderTracker from "./pages/OrderTracking";
  const router = createBrowserRouter([
  // --- CUSTOMER ROUTES ---
  {
    path: "/",
    element: (
      <>
        <ScrollTop />
        <Layout />
      </>
    ),
     children:[
        { path: "/", element:<Home /> },
        {path: "/products", element:<Products />},
        {path: "/product/:id", element:<ProductDetail />},
        {path: "/cart", element:<Cart />},
        {path: "/checkout/:id", element:<Checkout />},
        {path: "/BuyNowCheckout/:id", element:<BuyNowCheckout />},
        {path: "/orderconfirm", element:<OrderConfirmation />},
        {path: "/login", element:<Login />},
        {path: "/orders", element:<Order />},
        {path: "/orders/:id", element:<OrderTracker />},
        {path: "/signup", element:<Signup />}
      ],
  },

  // --- ADMIN ROUTES ---
  {
    path: "/admin",
    element: <AdminRoute />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          { path: "dashboard", element: <Dashboard /> },
          { path: "products", element: <ProductView /> },
          { path: "products/edit/:id", element: <ProductEdit /> },
          { path: "products/create", element: <ProductCreate /> },
          { path: "users", element: <Users /> },
          { path: "orders", element: <Orders /> },
        ],
      },
    ],
  },
]);
function App(){

  return <RouterProvider router={router} />


}
export default App;