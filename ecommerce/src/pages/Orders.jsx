import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const [user, setUser] = useState(null);

  // get current user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API}/api/users/me`,
          { credentials: "include" }
        );

        const data = await res.json();
        setUser(data.user);
      } catch (err) {
        console.log(err);
      }
    };

    fetchUser();
  }, []);

  // fetch orders
  useEffect(() => {
    if (!user?._id) return;

    const fetchOrders = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API}/api/orders/user/${user._id}`
        );

        setOrders(res.data || []);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  // status color helper
  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-700";

      case "Confirmed":
        return "bg-blue-100 text-blue-700";

      case "Processing":
        return "bg-indigo-100 text-indigo-700";

      case "Shipped":
        return "bg-purple-100 text-purple-700";

      case "Delivered":
        return "bg-green-100 text-green-700";

      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  if (loading)
    return (
      <p className="p-6 text-blue-600 font-medium">
        Loading your orders...
      </p>
    );

  if (!user)
    return (
      <p className="p-6 text-red-500">
        Please login to view your orders
      </p>
    );

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4">

      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <h1 className="text-3xl font-bold text-blue-950 mb-8">
          My Orders
        </h1>

        {orders.length === 0 ? (
          <div className="bg-white p-10 text-center rounded-2xl shadow-sm">
            <h2 className="text-xl font-semibold text-gray-700">
              No Orders Yet
            </h2>

            <p className="text-gray-500 mt-2">
              Start shopping to see your orders here
            </p>
          </div>
        ) : (
          <div className="space-y-5">

            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
              >

                {/* LEFT INFO */}
                <div>
                  <h2 className="font-semibold text-blue-950">
                    Order #{order._id.slice(-6)}
                  </h2>

                  <p className="text-gray-500 text-sm mt-1">
                    {order.orderItems.length} Items • Rs.{" "}
                    {order.totalPrice}
                  </p>
                </div>

                {/* STATUS */}
                <span
                  className={`px-4 py-1 rounded-full text-sm font-medium w-fit ${getStatusColor(
                    order.status
                  )}`}
                >
                  {order.status}
                </span>

                {/* ACTION */}
                <Link to={`/orders/${order._id}`}>
                  <button className="px-5 py-2 bg-blue-900 text-white rounded-xl hover:bg-blue-800 transition">
                    Track Order
                  </button>
                </Link>
              </div>
            ))}

          </div>
        )}
      </div>
    </div>
  );
}