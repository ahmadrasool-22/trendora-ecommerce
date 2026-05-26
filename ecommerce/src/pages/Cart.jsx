import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch Cart
  const fetchCart = useCallback(async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API}/api/cart`,
        {
          credentials: "include",
        }
      );

      const data = await res.json();

      setCart(data);

      setLoading(false);
    } catch (err) {
      console.error(err);

      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  // Update Quantity
  const updateQuantity = async (
    id,
    type
  ) => {
    // Optimistic UI
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item._id === id) {
            const newQty =
              type === "inc"
                ? item.quantity + 1
                : item.quantity - 1;

            return {
              ...item,
              quantity: newQty,
            };
          }

          return item;
        })
        .filter((item) => item.quantity > 0)
    );

    try {
      const endpoint =
        type === "inc"
          ? "incquantity"
          : "decquantity";

      await fetch(
        `${import.meta.env.VITE_API}/api/cart/${endpoint}`,
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            productid: id,
          }),
        }
      );
    } catch (err) {
      console.error(
        "Failed to sync quantity:",
        err
      );

      fetchCart();
    }
  };

  // Remove Product
  const removeFromCart = async (
    id
  ) => {
    setCart((prev) =>
      prev.filter(
        (item) => item._id !== id
      )
    );

    await fetch(
      `${import.meta.env.VITE_API}/api/cart/remove`,
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          productid: id,
        }),
      }
    );
  };

  // Total Price
  const totalPrice = cart.reduce(
    (acc, item) =>
      acc +
      item.price * item.quantity,
    0
  );

  if (loading)
    return (
      <p className="p-6 text-blue-600 font-medium">
        Loading your items...
      </p>
    );

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4">

      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">

          <div>
            <h1 className="text-4xl font-bold text-blue-950">
              My Cart
            </h1>

            <p className="text-gray-500 mt-2">
              Review your selected products
            </p>
          </div>

          {/* Single Checkout Button */}
          {cart.length > 0 && (
            <Link to="/checkout/:id">
              <button className="px-8 py-4 bg-blue-900 hover:bg-blue-800 text-white font-semibold rounded-2xl shadow-lg transition">
                Proceed To Checkout
              </button>
            </Link>
          )}
        </div>

        {cart.length > 0 ? (
          <>
            {/* Cart Products */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

              {cart.map((product) => (
                <div
                  key={product._id}
                  className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-200 hover:shadow-lg transition"
                >

                  {/* Image */}
                  <div className="h-44 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover hover:scale-105 transition duration-300"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-4">

                    <h2 className="text-xl font-semibold text-blue-950">
                      {product.name}
                    </h2>

                    <p className="text-blue-700 text-2xl font-bold mt-2">
                      Rs.{" "}
                      {product.price *
                        product.quantity}
                    </p>

                    {/* Quantity */}
                    <div className="flex items-center gap-3 bg-slate-100 w-max px-4 py-2 rounded-full mt-5 mb-6">

                      <button
                        className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow text-red-500 font-bold hover:bg-red-50"
                        onClick={() =>
                          updateQuantity(
                            product._id,
                            "dec"
                          )
                        }
                      >
                        -
                      </button>

                      <span className="font-bold text-gray-700 min-w-[20px] text-center">
                        {product.quantity}
                      </span>

                      <button
                        className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow text-blue-600 font-bold hover:bg-blue-50"
                        onClick={() =>
                          updateQuantity(
                            product._id,
                            "inc"
                          )
                        }
                      >
                        +
                      </button>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() =>
                        removeFromCart(
                          product._id
                        )
                      }
                      className="w-full py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-2xl transition"
                    >
                      Remove Product
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Summary */}
            <div className="mt-12 bg-white rounded-3xl border border-slate-200 shadow-sm p-6 flex flex-col md:flex-row items-center justify-between gap-4">

              <div>
                <p className="text-gray-500">
                  Total Cart Value
                </p>

                <h2 className="text-3xl font-bold text-blue-950 mt-1">
                  Rs. {totalPrice}
                </h2>
              </div>

              <Link to="/checkout/:id">
                <button className="px-8 py-4 bg-blue-900 hover:bg-blue-800 text-white font-semibold rounded-2xl shadow-lg transition">
                  Checkout Now
                </button>
              </Link>
            </div>
          </>
        ) : (
          // Empty Cart
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm py-20 text-center">

            <h2 className="text-3xl font-bold text-gray-700">
              Your Cart Is Empty
            </h2>

            <p className="text-gray-500 mt-3">
              Looks like you haven’t added anything yet.
            </p>

            <Link to="/">
              <button className="mt-8 px-8 py-4 bg-blue-900 hover:bg-blue-800 text-white rounded-2xl font-semibold transition">
                Continue Shopping
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}