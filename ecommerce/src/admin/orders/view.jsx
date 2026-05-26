import { useEffect, useState } from "react";
import axios from "axios";
import {
  ShoppingBag,
  Search,
  Trash2,
} from "lucide-react";

export default function View() {
  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  // Fetch Orders
  const fetchOrders = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API}/api/orders`
      );

      setOrders(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

    // Delete Order
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `${import.meta.env.VITE_API}/api/orders/${id}`
      );

      setOrders((prev) =>
        prev.filter((order) => order._id !== id)
      );

      alert("order Deleted Successfully");
    } catch (error) {
      console.log(error);

      alert("Failed To Delete order");
    }
  };

  // Update Status
  const updateStatus = async (
    orderId,
    newStatus
  ) => {
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API}/api/orders/${orderId}`,
        {
          status: newStatus,
        }
      );

      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId
            ? res.data
            : order
        )
      );
    } catch (error) {
      console.log(error);

      alert("Failed To Update Status");
    }
  };

  // Search Orders
  const filteredOrders = orders.filter((order) =>
    `${order.customerInfo?.name || ""}
     ${order.customerInfo?.phone || ""}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-blue-950">
          Orders
        </h2>

        <p className="text-gray-500 mt-1">
          Manage customer orders
        </p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          size={18}
        />

        <input
          type="text"
          placeholder="Search by customer or phone..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="w-full bg-white border border-slate-300 rounded-2xl pl-12 pr-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Loading */}
      {loading ? (
        <div className="bg-white rounded-2xl p-6 animate-pulse">
          <div className="h-12 bg-slate-200 rounded"></div>

          <div className="mt-4 h-12 bg-slate-200 rounded"></div>

          <div className="mt-4 h-12 bg-slate-200 rounded"></div>
        </div>
      ) : filteredOrders.length === 0 ? (

        /* Empty State */
        <div className="bg-white rounded-2xl p-10 text-center shadow-sm border border-slate-200">

          <ShoppingBag
            size={50}
            className="mx-auto text-gray-300"
          />

          <h3 className="text-xl font-semibold text-gray-700 mt-4">
            No Orders Found
          </h3>

          <p className="text-gray-500 mt-2">
            Orders will appear here
          </p>
        </div>
      ) : (

        /* Orders */
        <div className="space-y-6">
          {filteredOrders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden"
            >

              {/* Top Section */}
              <div className="p-6 border-b border-slate-200 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

                {/* Customer Info */}
                <div className="space-y-1">
                  <h3 className="text-xl font-semibold text-blue-950">
                    {order.customerInfo?.name}
                  </h3>

                  <p className="text-gray-600">
                    {order.customerInfo?.phone}
                  </p>

                  <p className="text-gray-500 text-sm">
                    {order.shippingAddress?.city},{" "}
                    {
                      order.shippingAddress
                        ?.address
                    }
                  </p>
                </div>

                {/* Order Info */}
                <div className="flex flex-col md:flex-row gap-4 md:items-center">

                  {/* Total */}
                  <div>
                    <p className="text-gray-500 text-sm">
                      Total
                    </p>

                    <h4 className="font-bold text-blue-900 text-lg">
                      Rs. {order.totalPrice}
                    </h4>
                  </div>

                  {/* Status */}
                  <div>
                    <p className="text-gray-500 text-sm mb-1">
                      Status
                    </p>

                    <select
                      value={order.status}
                      onChange={(e) =>
                        updateStatus(
                          order._id,
                          e.target.value
                        )
                      }
                      className="border border-slate-300 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Pending">
                        Pending
                      </option>

                      <option value="Confirmed">
                        Confirmed
                      </option>

                      <option value="Processing">
                        Processing
                      </option>

                      <option value="Shipped">
                        Shipped
                      </option>

                      <option value="Delivered">
                        Delivered
                      </option>

                      <option value="Cancelled">
                        Cancelled
                      </option>
                    </select>
                  </div>

                  {/* Date */}
                  <div>
                    <p className="text-gray-500 text-sm">
                      Ordered On
                    </p>

                    <p className="font-medium text-gray-700">
                      {new Date(
                        order.createdAt
                      ).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Ordered Products */}
              <div className="p-6 space-y-4">

                <h4 className="font-semibold text-gray-800">
                  Ordered Items
                </h4>

                {order.orderItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 border border-slate-200 rounded-2xl p-4"
                  >

                    {/* Product Image */}
                    <img
                      src={`${import.meta.env.VITE_API}${item.image}`}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-xl"
                    />

                    {/* Product Info */}
                    <div className="flex-1">
                      <h5 className="font-semibold text-blue-950">
                        {item.name}
                      </h5>

                      <p className="text-gray-500 text-sm">
                        Quantity: {item.quantity}
                      </p>
                    </div>

                    {/* Price */}
                    <div className="font-bold text-blue-900">
                      Rs. {item.price}
                    </div>
                
                  </div>
                  
                ))}
                     <button
                  onClick={() =>
                    handleDelete(order._id)
                  }
                  className="w-full bg-red-500 hover:bg-red-600 text-white py-2.5 rounded-xl flex items-center justify-center gap-2 transition"
                >
                  <Trash2 size={16} />
                  Delete Order
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
     
    </div>
  );
}