import { useEffect, useState } from "react";
import axios from "axios";
import { ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    address: "",
    paymentMethod: "Cash On Delivery",
  });

  //fetch current user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API}/api/users/me`, {
          credentials: "include",
        });

        if (!res.ok) {
          setUser(null);
        } else {
          const data = await res.json();
          setUser(data.user);
        }
      } catch (err) {
        console.error(err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);


  // Fetch Cart
  useEffect(() => {
  if (!user) return;

  const fetchCart = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API}/api/cart/${user._id}`
      );

      setCartItems(res.data.items || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  fetchCart();
}, [user]);

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Total Price
  const totalPrice = cartItems.reduce(
    (acc, item) =>
      acc +
      item.product.price * item.quantity,
    0
  );

  // Place Order
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userId = user._id;
        

      // Convert Cart Items
      const items = cartItems.map((item) => ({
        product: item.product._id,
        quantity: item.quantity,
      }));

      const orderData = {
        userId,

        customerInfo: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
        },

        shippingAddress: {
          city: formData.city,
          address: formData.address,
        },

        paymentMethod:
          formData.paymentMethod,

        items,
      };

      await axios.post(
        `${import.meta.env.VITE_API}/api/orders`,
        orderData
      );

      alert("Order Placed Successfully");

      navigate("/orderconfirm");
    } catch (error) {
      console.log(error);

      alert("Failed To Place Order");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* LEFT SIDE */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8">

          <h2 className="text-3xl font-bold text-blue-950 mb-2">
            Checkout
          </h2>

          <p className="text-gray-500 mb-8">
            Complete your shipping details
          </p>

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

            {/* Payment Method */}
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
              className="w-full bg-blue-900 hover:bg-blue-800 text-white py-4 rounded-2xl font-semibold transition"
            >
              Place Order
            </button>
          </form>
        </div>

        {/* RIGHT SIDE */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 h-fit">

          <div className="flex items-center gap-3 mb-6">
            <ShoppingBag className="text-blue-900" />

            <h2 className="text-2xl font-bold text-blue-950">
              Order Summary
            </h2>
          </div>

          {loading ? (
            <div className="space-y-4">
              <div className="h-24 bg-slate-200 rounded-2xl animate-pulse"></div>

              <div className="h-24 bg-slate-200 rounded-2xl animate-pulse"></div>
            </div>
          ) : cartItems.length === 0 ? (
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
            <>
              <div className="space-y-5">
                {cartItems.map((item) => (
                  <div
                    key={item.product._id}
                    className="flex gap-4 border border-slate-200 rounded-2xl p-4"
                  >

                    {/* Image */}
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-24 h-24 object-cover rounded-2xl"
                    />

                    {/* Info */}
                    <div className="flex-1">
                      <h3 className="font-semibold text-blue-950">
                        {item.product.name}
                      </h3>

                      <p className="text-gray-500 text-sm mt-1">
                        Quantity: {item.quantity}
                      </p>

                      <p className="text-blue-900 font-bold mt-3">
                        Rs.{" "}
                        {item.product.price *
                          item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
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