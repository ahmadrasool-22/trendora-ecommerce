import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { ShoppingBag } from "lucide-react";

export default function BuyNowCheckout() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    address: "",
    paymentMethod: "Cash On Delivery",
  });

  // Fetch product
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API}/api/products/${id}`
        );

        setProduct(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const orderData = {
        userId: null, // guest user

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

        items: [
          {
            product: product._id,
            quantity: 1,
          },
        ],
      };

      await axios.post(
        `${import.meta.env.VITE_API}/api/orders`,
        orderData
      );

      alert("Order Placed Successfully");
      navigate("/orderconfirm");
    } catch (err) {
      console.log(err);
      alert("Order Failed");
    }
  };

  if (loading)
    return <p className="p-6">Loading...</p>;

  if (!product)
    return <p className="p-6">Product not found</p>;

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4">

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* LEFT FORM */}
        <div className="bg-white p-6 rounded-3xl shadow-sm">

          <h2 className="text-2xl font-bold text-blue-950 mb-6">
            Buy Now Checkout
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">

            <input
              name="name"
              placeholder="Full Name"
              className="w-full p-3 border rounded-xl"
              onChange={handleChange}
              required
            />

            <input
              name="email"
              placeholder="Email"
              className="w-full p-3 border rounded-xl"
              onChange={handleChange}
            />

            <input
              name="phone"
              placeholder="Phone"
              className="w-full p-3 border rounded-xl"
              onChange={handleChange}
              required
            />

            <input
              name="city"
              placeholder="City"
              className="w-full p-3 border rounded-xl"
              onChange={handleChange}
              required
            />

            <textarea
              name="address"
              placeholder="Address"
              className="w-full p-3 border rounded-xl"
              onChange={handleChange}
              required
            />

            <select
              name="paymentMethod"
              className="w-full p-3 border rounded-xl"
              onChange={handleChange}
            >
              <option>Cash On Delivery</option>
              <option>JazzCash</option>
              <option>Easypaisa</option>
            </select>

            <button className="w-full bg-blue-900 text-white py-3 rounded-xl">
              Place Order
            </button>
          </form>
        </div>

        {/* RIGHT SUMMARY */}
        <div className="bg-white p-6 rounded-3xl shadow-sm">

          <div className="flex items-center gap-2 mb-4">
            <ShoppingBag />
            <h2 className="text-xl font-bold">Order Summary</h2>
          </div>

          <img
            src={product.image}
            className="w-full h-52 object-cover rounded-xl"
          />

          <h3 className="mt-4 font-semibold text-lg">
            {product.name}
          </h3>

          <p className="text-blue-900 font-bold text-xl mt-2">
            Rs. {product.price}
          </p>
        </div>

      </div>
    </div>
  );
}