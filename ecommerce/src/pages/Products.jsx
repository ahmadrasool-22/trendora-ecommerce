
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [addingProduct, setAddingProduct] = useState(null);

  // FETCH CURRENT USER
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

  // FETCH PRODUCTS
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API}/api/products`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  // ADD TO CART
  const addToCart = async (product) => {
    try {
      setAddingProduct(product._id);

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
      setAddingProduct(null);
    }
  };

  // SKELETON CARD
  const SkeletonCard = () => {
    return (
      <div className="bg-white rounded-2xl shadow overflow-hidden animate-pulse">
        <div className="w-full h-48 bg-gray-300"></div>

        <div className="p-4">
          <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto mb-3"></div>

          <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-5/6 mx-auto mb-4"></div>

          <div className="h-4 bg-gray-300 rounded w-1/4 mx-auto"></div>
        </div>

        <div className="p-4 flex justify-center">
          <div className="h-10 w-28 bg-pink-300 rounded-lg"></div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-5">

        {/* Skeleton Loading */}
        {loading &&
          [...Array(6)].map((_, index) => (
            <SkeletonCard key={index} />
          ))}

        {/* Products */}
        {!loading &&
          products.map((product) => {
            return (
              <div
                key={product._id}
                className="bg-white rounded-2xl shadow overflow-hidden transform hover:scale-105 transition duration-300 ease-in-out"
              >
                <Link to={`/product/${product._id}`}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />

                  <div className="p-4 text-center">
                    <h3 className="font-semibold">
                      {product.name}
                    </h3>

                    <p className="text-sm text-gray-600 line-clamp-2">
                      {product.description}
                    </p>

                    <p className="font-bold mt-2">
                      ${product.price}
                    </p>
                  </div>
                </Link>

                <div className="p-4 text-center flex justify-center gap-2">
                  {/* ADD TO CART */}
                  <button
                    onClick={() => addToCart(product)}
                    disabled={addingProduct === product._id}
                    className={`mt-2 px-4 py-2 text-white rounded-lg transition ${
                      addingProduct === product._id
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-500 hover:bg-blue-600"
                    }`}
                  >
                    {addingProduct === product._id
                      ? "Adding..."
                      : "Add to Cart"}
                  </button>

                  {/* BUY NOW */}
                  <Link to={`/BuyNowCheckout/${product._id}`}>
                    <button className="mt-2 px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition">
                      Buy Now
                    </button>
                  </Link>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Products;

