import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";

export default function OrderConfirmation() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center p-6">
      <CheckCircle className="text-green-600 w-20 h-20 mb-6" />
      <h1 className="text-3xl font-bold text-blue-900 mb-4">
        Order Placed Successfully!
      </h1>
      <p className="text-gray-600 mb-8 max-w-md">
        Thank you for shopping with us. Your order has been confirmed and will be
        shipped to you soon. We’ve also sent you a confirmation email with the
        order details.
      </p>

      <Link
        to="/products"
        className="px-6 py-3 bg-blue-800 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
      >
        Continue Shopping
      </Link>
    </div>
  );
}
