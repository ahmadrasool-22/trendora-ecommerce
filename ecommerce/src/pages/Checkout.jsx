import { useEffect, useState } from "react";
import axios from "axios";
import { ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);
  const [placingOrder, setPlacingOrder] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    address: "",
    paymentMethod: "Cash On Delivery",
  });

  // =========================================================
  // GET CURRENT USER
  // =========================================================
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API}/api/users/me`,
          {
            credentials: "include",
          }
        );

        if (!res.ok) {
          // No logged-in user = guest
          setUser(null);
          return;
        }

        const data = await res.json();
        setUser(data.user);
      } catch (err) {
        console.log("User check failed:", err);
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  // =========================================================
  // FETCH CART
  // Logged in  -> MongoDB
  // Guest      -> localStorage
  // =========================================================
  useEffect(() => {
    const fetchCart = async () => {
      setLoading(true);

      // -----------------------------------------------------
      // GUEST CART
      // -----------------------------------------------------
      if (!user) {
        try {
          const guestCart =
            JSON.parse(
              localStorage.getItem("guestCart")
            ) || [];

          setCartItems(guestCart);
        } catch (error) {
          console.log(
            "Failed to read guest cart:",
            error
          );

          setCartItems([]);
        } finally {
          setLoading(false);
        }

        return;
      }

      // -----------------------------------------------------
      // LOGGED-IN CART
      // -----------------------------------------------------
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API}/api/cart/${user._id}`,
          {
            withCredentials: true,
          }
        );

        setCartItems(res.data.items || []);
      } catch (error) {
        console.log(
          "Failed to fetch user cart:",
          error
        );

        setCartItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [user]);

  // =========================================================
  // HANDLE INPUT
  // =========================================================
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // =========================================================
  // GET PRODUCT DATA
  //
  // Logged-in item:
  // item.product.price
  //
  // Guest item:
  // item.price
  // =========================================================
  const getProduct = (item) => {
    if (item.product) {
      return item.product;
    }

    return item;
  };

  // =========================================================
  // TOTAL PRICE
  // =========================================================
  const totalPrice = cartItems.reduce(
    (acc, item) => {
      const product = getProduct(item);

      return (
        acc +
        product.price * item.quantity
      );
    },
    0
  );

  // =========================================================
  // PLACE ORDER
  // =========================================================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    try {
      setPlacingOrder(true);

      // -----------------------------------------------------
      // Convert both cart types into backend order format
      // -----------------------------------------------------
      const items = cartItems.map((item) => {
        const product = getProduct(item);

        return {
          product: product._id,
          quantity: item.quantity,
        };
      });

      // -----------------------------------------------------
      // Common order data
      // -----------------------------------------------------
      const orderData = {
        customerInfo: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
        },

        shippingAddress: {
          city: formData.city,
          address: formData.address,
        },

        paymentMethod: formData.paymentMethod,

        items,
      };

      // -----------------------------------------------------
      // ONLY send userId when logged in
      // -----------------------------------------------------
      if (user) {
        orderData.userId = user._id;
      }

      // -----------------------------------------------------
      // CREATE ORDER
      // -----------------------------------------------------
      await axios.post(
        `${import.meta.env.VITE_API}/api/orders`,
        orderData
      );

      // -----------------------------------------------------
      // CLEAR GUEST CART
      // -----------------------------------------------------
      if (!user) {
        localStorage.removeItem("guestCart");
      }

      alert("Order Placed Successfully");

      navigate("/orderconfirm");
    } catch (error) {
      console.log(
        "Failed to place order:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Failed To Place Order"
      );
    } finally {
      setPlacingOrder(false);
    }
  };

  // =========================================================
  // LOADING
  // =========================================================
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <p className="text-blue-600 font-medium">
          Loading checkout...
        </p>
      </div>
    );
  }

  // =========================================================
  // CHECKOUT UI
  // =========================================================
  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4">

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* =================================================
            LEFT SIDE - CHECKOUT FORM
        ================================================= */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8">

          <h2 className="text-3xl font-bold text-blue-950 mb-2">
            Checkout
          </h2>

          <p className="text-gray-500 mb-8">
            Complete your shipping details
          </p>

          {/* Guest indicator */}
          {!user && (
            <div className="mb-6 rounded-2xl bg-blue-50 border border-blue-100 p-4">
              <p className="text-sm text-blue-800">
                You are checking out as a guest.
              </p>
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>

              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-slate-300 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-slate-300 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>

              <input
                type="text"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                className="w-full border border-slate-300 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* City */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                City
              </label>

              <input
                type="text"
                name="city"
                required
                value={formData.city}
                onChange={handleChange}
                className="w-full border border-slate-300 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address
              </label>

              <textarea
                rows="4"
                name="address"
                required
                value={formData.address}
                onChange={handleChange}
                className="w-full border border-slate-300 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Payment */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Payment Method
              </label>

              <select
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleChange}
                className="w-full border border-slate-300 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>
                  Cash On Delivery
                </option>

                <option>
                  JazzCash
                </option>

                <option>
                  Easypaisa
                </option>
              </select>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={
                placingOrder ||
                cartItems.length === 0
              }
              className={`w-full py-4 rounded-2xl font-semibold text-white transition ${
                placingOrder ||
                cartItems.length === 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-900 hover:bg-blue-800"
              }`}
            >
              {placingOrder
                ? "Placing Order..."
                : "Place Order"}
            </button>
          </form>
        </div>

        {/* =================================================
            RIGHT SIDE - ORDER SUMMARY
        ================================================= */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 h-fit">

          <div className="flex items-center gap-3 mb-6">

            <ShoppingBag className="text-blue-900" />

            <h2 className="text-2xl font-bold text-blue-950">
              Order Summary
            </h2>
          </div>

          {cartItems.length === 0 ? (

            /* EMPTY CART */
            <div className="text-center py-10">

              <ShoppingBag
                size={50}
                className="mx-auto text-gray-300"
              />

              <h3 className="mt-4 text-xl font-semibold text-gray-700">
                Cart Is Empty
              </h3>

              <p className="text-gray-500 mt-2">
                Add products to checkout
              </p>
            </div>

          ) : (

            /* CART ITEMS */
            <>
              <div className="space-y-5">

                {cartItems.map((item) => {

                  const product =
                    getProduct(item);

                  return (
                    <div
                      key={product._id}
                      className="flex gap-4 border border-slate-200 rounded-2xl p-4"
                    >

                      {/* Image */}
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-24 h-24 object-cover rounded-2xl"
                      />

                      {/* Info */}
                      <div className="flex-1">

                        <h3 className="font-semibold text-blue-950">
                          {product.name}
                        </h3>

                        <p className="text-gray-500 text-sm mt-1">
                          Quantity:{" "}
                          {item.quantity}
                        </p>

                        <p className="text-blue-900 font-bold mt-3">
                          Rs.{" "}
                          {product.price *
                            item.quantity}
                        </p>

                      </div>
                    </div>
                  );
                })}

              </div>

              {/* Total */}
              <div className="mt-8 border-t border-slate-200 pt-6 flex items-center justify-between">

                <h3 className="text-xl font-bold text-blue-950">
                  Total
                </h3>

                <h3 className="text-2xl font-bold text-blue-900">
                  Rs. {totalPrice}
                </h3>

              </div>
            </>
          )}
        </div>

      </div>
    </div>
  );
}