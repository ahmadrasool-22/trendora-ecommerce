import { useEffect, useState } from "react";
import axios from "axios";
import {
  Package,
  ShoppingBag,
  Users,
  DollarSign,
  TrendingUp,
  Clock3,
  CheckCircle,
  XCircle,
} from "lucide-react";

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(true);

  // Fetch Dashboard Data
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [productsRes, ordersRes, usersRes] =
          await Promise.all([
            axios.get(
              `${import.meta.env.VITE_API}/api/products`
            ),

            axios.get(
             `${import.meta.env.VITE_API}/api/orders`
            ),

            axios.get(
              `${import.meta.env.VITE_API}/api/users`
            ),
          ]);

        setProducts(productsRes.data);
        setOrders(ordersRes.data);
        setUsers(usersRes.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // =========================
  // CALCULATIONS
  // =========================

  const totalRevenue = orders
    .filter((order) => order.status !== "Cancelled")
    .reduce(
      (acc, order) => acc + order.totalPrice,
      0
    );

  const totalOrders = orders.length;

  const totalProducts = products.length;

  const totalUsers = users.length;

  const pendingOrders = orders.filter(
    (order) => order.status === "Pending"
  ).length;

  const deliveredOrders = orders.filter(
    (order) => order.status === "Delivered"
  ).length;

  const cancelledOrders = orders.filter(
    (order) => order.status === "Cancelled"
  ).length;

  // Latest Orders
  const latestOrders = [...orders]
    .sort(
      (a, b) =>
        new Date(b.createdAt) -
        new Date(a.createdAt)
    )
    .slice(0, 5);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-10 bg-slate-200 rounded-xl animate-pulse"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="bg-white h-32 rounded-2xl animate-pulse"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-blue-950">
          Dashboard Overview
        </h1>

        <p className="text-gray-500 mt-1">
          Welcome back Admin 👋
        </p>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        {/* Revenue */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">
                Total Revenue
              </p>

              <h2 className="text-3xl font-bold text-blue-950 mt-2">
                Rs. {totalRevenue.toLocaleString()}
              </h2>
            </div>

            <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center">
              <DollarSign
                className="text-green-600"
                size={28}
              />
            </div>
          </div>
        </div>

        {/* Orders */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">
                Total Orders
              </p>

              <h2 className="text-3xl font-bold text-blue-950 mt-2">
                {totalOrders}
              </h2>
            </div>

            <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center">
              <ShoppingBag
                className="text-blue-700"
                size={28}
              />
            </div>
          </div>
        </div>

        {/* Products */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">
                Total Products
              </p>

              <h2 className="text-3xl font-bold text-blue-950 mt-2">
                {totalProducts}
              </h2>
            </div>

            <div className="w-14 h-14 rounded-2xl bg-purple-100 flex items-center justify-center">
              <Package
                className="text-purple-700"
                size={28}
              />
            </div>
          </div>
        </div>

        {/* Users */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">
                Total Users
              </p>

              <h2 className="text-3xl font-bold text-blue-950 mt-2">
                {totalUsers}
              </h2>
            </div>

            <div className="w-14 h-14 rounded-2xl bg-orange-100 flex items-center justify-center">
              <Users
                className="text-orange-600"
                size={28}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ORDER ANALYTICS */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* Pending */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-yellow-100 flex items-center justify-center">
              <Clock3
                className="text-yellow-600"
                size={28}
              />
            </div>

            <div>
              <p className="text-gray-500">
                Pending Orders
              </p>

              <h3 className="text-2xl font-bold text-blue-950">
                {pendingOrders}
              </h3>
            </div>
          </div>
        </div>

        {/* Delivered */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center">
              <CheckCircle
                className="text-green-600"
                size={28}
              />
            </div>

            <div>
              <p className="text-gray-500">
                Delivered Orders
              </p>

              <h3 className="text-2xl font-bold text-blue-950">
                {deliveredOrders}
              </h3>
            </div>
          </div>
        </div>

        {/* Cancelled */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-red-100 flex items-center justify-center">
              <XCircle
                className="text-red-600"
                size={28}
              />
            </div>

            <div>
              <p className="text-gray-500">
                Cancelled Orders
              </p>

              <h3 className="text-2xl font-bold text-blue-950">
                {cancelledOrders}
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* RECENT ORDERS */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">

        <div className="p-6 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-blue-950">
              Recent Orders
            </h2>

            <p className="text-gray-500 text-sm mt-1">
              Latest customer purchases
            </p>
          </div>

          <TrendingUp
            className="text-blue-700"
            size={24}
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">

            <thead className="bg-slate-100">
              <tr>
                <th className="text-left px-6 py-4">
                  Customer
                </th>

                <th className="text-left px-6 py-4">
                  Amount
                </th>

                <th className="text-left px-6 py-4">
                  Status
                </th>

                <th className="text-left px-6 py-4">
                  Date
                </th>
              </tr>
            </thead>

            <tbody>
              {latestOrders.map((order) => (
                <tr
                  key={order._id}
                  className="border-t border-slate-200"
                >
                  <td className="px-6 py-4 font-medium text-blue-950">
                    {order.customerInfo?.name}
                  </td>

                  <td className="px-6 py-4 font-semibold">
                    Rs. {order.totalPrice}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium
                      ${
                        order.status ===
                        "Delivered"
                          ? "bg-green-100 text-green-700"
                          : order.status ===
                            "Cancelled"
                          ? "bg-red-100 text-red-700"
                          : order.status ===
                            "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-gray-600">
                    {new Date(
                      order.createdAt
                    ).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>
    </div>
  );
}