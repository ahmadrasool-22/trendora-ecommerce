
import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  // ==========================================
  // FETCH CURRENT USER
  // ==========================================
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
          setUser(null);
          return;
        }

        const data = await res.json();
        setUser(data.user);
      } catch (err) {
        console.error("Failed to fetch user:", err);
        setUser(null);
      } finally {
        setAuthLoading(false);
      }
    };

    fetchUser();
  }, []);

  // ==========================================
  // FETCH LOGGED-IN USER CART
  // ==========================================
  const fetchCart = useCallback(async () => {
    try {
      setLoading(true);

      const res = await fetch(
        `${import.meta.env.VITE_API}/api/cart`,
        {
          credentials: "include",
        }
      );

      if (!res.ok) {
        throw new Error("Failed to fetch cart");
      }

      const data = await res.json();

      setCart(data);
    } catch (err) {
      console.error("Failed to fetch cart:", err);
      setCart([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // ==========================================
  // LOAD CART AFTER AUTH CHECK
  // ==========================================
  useEffect(() => {
    if (authLoading) {
      return;
    }

    // --------------------------
    // GUEST CART
    // --------------------------
    if (!user) {
      try {
        const guestCart =
          JSON.parse(
            localStorage.getItem("guestCart")
          ) || [];

        setCart(guestCart);
      } catch (err) {
        console.error(
          "Failed to load guest cart:",
          err
        );

        setCart([]);
      }

      setLoading(false);
      return;
    }

    // --------------------------
    // LOGGED-IN USER CART
    // --------------------------
    fetchCart();
  }, [user, authLoading, fetchCart]);

  // ==========================================
  // UPDATE QUANTITY
  // ==========================================
  const updateQuantity = async (id, type) => {
    // ========================================
    // GUEST USER
    // ========================================
    if (!user) {
      try {
        const existingCart =
          JSON.parse(
            localStorage.getItem("guestCart")
          ) || [];

        const updatedCart = existingCart
          .map((item) => {
            if (item._id !== id) {
              return item;
            }

            const newQuantity =
              type === "inc"
                ? item.quantity + 1
                : item.quantity - 1;

            return {
              ...item,
              quantity: newQuantity,
            };
          })
          .filter((item) => item.quantity > 0);

        localStorage.setItem(
          "guestCart",
          JSON.stringify(updatedCart)
        );

        setCart(updatedCart);
      } catch (err) {
        console.error(
          "Failed to update guest cart:",
          err
        );
      }

      return;
    }

    // ========================================
    // LOGGED-IN USER
    // ========================================

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

      const res = await fetch(
        `${import.meta.env.VITE_API}/api/cart/${endpoint}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            productid: id,
          }),
        }
      );

      if (!res.ok) {
        throw new Error(
          "Failed to update cart quantity"
        );
      }
    } catch (err) {
      console.error(
        "Failed to sync quantity:",
        err
      );

      fetchCart();
    }
  };

  // ==========================================
  // REMOVE PRODUCT
  // ==========================================
  const removeFromCart = async (id) => {
    // ========================================
    // GUEST USER
    // ========================================
    if (!user) {
      try {
        const existingCart =
          JSON.parse(
            localStorage.getItem("guestCart")
          ) || [];

        const updatedCart = existingCart.filter(
          (item) => item._id !== id
        );

        localStorage.setItem(
          "guestCart",
          JSON.stringify(updatedCart)
        );

        setCart(updatedCart);
      } catch (err) {
        console.error(
          "Failed to remove guest product:",
          err
        );
      }

      return;
    }

    // ========================================
    // LOGGED-IN USER
    // ========================================

    setCart((prev) =>
      prev.filter(
        (item) => item._id !== id
      )
    );

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API}/api/cart/remove`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            productid: id,
          }),
        }
      );

      if (!res.ok) {
        throw new Error(
          "Failed to remove product"
        );
      }
    } catch (err) {
      console.error(
        "Failed to remove product:",
        err
      );

      fetchCart();
    }
  };

  // ==========================================
  // TOTAL PRICE
  // ==========================================
  const totalPrice = cart.reduce(
    (acc, item) =>
      acc +
      item.price * item.quantity,
    0
  );

  // ==========================================
  // LOADING
  // ==========================================
  if (authLoading || loading) {
    return (
      <p className="p-6 text-blue-600 font-medium">
        Loading your items...
      </p>
    );
  }

  // ==========================================
  // CART UI
  // ==========================================
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

          {/* Checkout Button */}
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
