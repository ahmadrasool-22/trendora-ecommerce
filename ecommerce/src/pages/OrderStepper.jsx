import {
  CheckCircle,
  Truck,
  Package,
  ShoppingBag,
  Home,
  XCircle,
} from "lucide-react";

export default function OrderStepper({ status }) {
  const steps = [
    { label: "Pending", icon: ShoppingBag },
    { label: "Confirmed", icon: CheckCircle },
    { label: "Processing", icon: Package },
    { label: "Shipped", icon: Truck },
    { label: "Delivered", icon: Home },
  ];

  // fallback
  const safeStatus = status || "Pending";

  // cancelled check
  const isCancelled =
    safeStatus.toLowerCase() === "cancelled";

  // current active index
  const currentIndex = steps.findIndex(
    (step) =>
      step.label.toLowerCase() ===
      safeStatus.toLowerCase()
  );

  const activeIndex = currentIndex === -1 ? 0 : currentIndex;

  // progress width
  const progressWidth =
    steps.length > 1
      ? (activeIndex / (steps.length - 1)) * 100
      : 0;

  return (
    <div className="w-full px-2">

      {/* CANCELLED UI */}
      {isCancelled ? (
        <div className="flex flex-col items-center justify-center py-8">

          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center border-2 border-red-500">
            <XCircle className="text-red-600" size={34} />
          </div>

          <h2 className="mt-4 text-xl font-bold text-red-600">
            Order Cancelled
          </h2>

          <p className="text-gray-500 mt-1 text-center">
            This order has been cancelled.
          </p>
        </div>
      ) : (
        <div className="flex items-center justify-between relative">

          {/* BACKGROUND LINE */}
          <div className="absolute top-5 left-0 w-full h-1 bg-gray-200 z-0 rounded-full" />

          {/* ACTIVE LINE */}
          <div
            className="absolute top-5 left-0 h-1 bg-blue-600 z-0 transition-all duration-500 rounded-full"
            style={{ width: `${progressWidth}%` }}
          />

          {/* STEPS */}
          {steps.map((step, index) => {
            const Icon = step.icon;

            const isActive = index <= activeIndex;

            return (
              <div
                key={step.label}
                className="flex flex-col items-center relative z-10"
              >
                {/* ICON */}
                <div
                  className={`w-10 h-10 flex items-center justify-center rounded-full border-2 transition-all duration-300
                  ${
                    isActive
                      ? "bg-blue-600 border-blue-600 text-white scale-105"
                      : "bg-white border-gray-300 text-gray-400"
                  }`}
                >
                  <Icon size={18} />
                </div>

                {/* LABEL */}
                <p
                  className={`mt-2 text-sm font-medium transition-colors duration-300
                  ${
                    isActive
                      ? "text-blue-600"
                      : "text-gray-400"
                  }`}
                >
                  {step.label}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}