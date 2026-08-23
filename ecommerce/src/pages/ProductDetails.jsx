import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

export default function ProductDetail() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [user, setUser] = useState(null);

  // GET CURRENT USER
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
      }
    };

    fetchUser();
  }, []);

  // GET PRODUCT DETAILS
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API}/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [id]);

  // ADD TO CART
  const addToCart = async () => {
    if (!product) return;

    try {
      setAdding(true);

      // =========================
      // GUEST USER
      // =========================
      if (!user) {
        const existingCart =
          JSON.parse(localStorage.getItem("guestCart")) || [];

        const existingItem = existingCart.find(
          (item) => item._id === product._id
        );

        let updatedCart;

        if (existingItem) {
          updatedCart = existingCart.map((item) =>
            item._id === product._id
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                }
              : item
          );
        } else {
          updatedCart = [
            ...existingCart,
            {
              _id: product._id,
              name: product.name,
              price: product.price,
              image: product.image,
              quantity: 1,
            },
          ];
        }

        localStorage.setItem(
          "guestCart",
          JSON.stringify(updatedCart)
        );

        console.log("Guest cart:", updatedCart);

        alert("Added to cart!");
        setAdding(false);
        return;
      }

      // =========================
      // LOGGED-IN USER
      // =========================
      const res = await fetch(
        `${import.meta.env.VITE_API}/api/cart`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            productid: product._id,
          }),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to add product to cart");
      }

      const data = await res.text();
      console.log(data);

      alert("Added to cart!");

    } catch (err) {
      console.error("Add to cart failed:", err);
      alert("Failed to add product to cart.");
    } finally {
      setAdding(false);
    }
  };

  // LOADING STATES
  if (loading) {
    return <p className="p-8">Loading...</p>;
  }

  if (!product) {
    return <p className="p-8">Product not found.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">

      {/* IMAGE */}
      <div>
        <img
          src={product.image}
          alt={product.name}
          className="rounded-lg shadow-lg w-full"
        />
      </div>

      {/* DETAILS */}
      <div>
        <h1 className="text-3xl font-bold">
          {product.name}
        </h1>

        <p className="text-gray-600 mt-2">
          {product.description}
        </p>

        <p className="text-2xl font-semibold text-blue-600 mt-4">
          ${product.price}
        </p>

        {/* ADD TO CART BUTTON */}
        <div className="mt-6">
          <button
            onClick={addToCart}
            disabled={adding}
            className={`px-6 py-2 rounded-lg text-white ${
              adding
                ? "bg-gray-400"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {adding ? "Adding..." : "Add to Cart"}
          </button>
        </div>
      </div>

    </div>
  );
}

