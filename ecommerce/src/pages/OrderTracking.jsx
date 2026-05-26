import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import OrderStepper from "../pages/OrderStepper";

export default function OrderTracking() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API}/api/orders/${id}`
        );

        setOrder(res.data);
        console.log(order);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (loading)
    return <p className="p-6">Loading order...</p>;

  if (!order)
    return <p className="p-6">Order not found</p>;

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4">

      <div className="max-w-4xl mx-auto bg-white p-6 rounded-3xl shadow-sm">

        <h1 className="text-2xl font-bold text-blue-950 mb-6">
          Track Your Order
        </h1>

        {/* STEP TRACKER */}
        <OrderStepper status={order.status} />

        {/* ORDER INFO */}
        <div className="mt-10 space-y-3">

          <p>
            <span className="font-semibold">Order ID:</span>{" "}
            {order._id}
          </p> 

          <p>
            <span className="font-semibold">Customer:</span>{" "}
            {order.customerInfo?.name}
          </p>

          <p>
            <span className="font-semibold">Total Items:</span>{" "}
            {order.orderItems?.length || 0}
          </p>

          <p>
            <span className="font-semibold">Status:</span>{" "}
            <span className="text-blue-600 font-semibold">
              {order.status}
            </span>
          </p>
        </div>

        {/* ITEMS */}
        <div className="mt-8 space-y-4">

          {order.orderItems?.map((item, index) => (
            <div
              key={item.product?._id || index}
              className="flex items-center gap-4 border p-4 rounded-xl"
            >

              <img
                src={item.product?.image}
                className="w-20 h-20 object-cover rounded-lg"
                alt={item.product?.name}
              />

              <div>
                <h3 className="font-semibold">
                  {item.product?.name}
                </h3>

                <p className="text-gray-500">
                  Qty: {item.quantity}
                </p>
              </div>

            </div>
          ))}

        </div>

      </div>
    </div>
  );
}