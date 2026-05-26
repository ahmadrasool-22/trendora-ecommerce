import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

export default function ProductDetail() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);

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

  // ADD TO CART FUNCTION
  const addToCart = async () => {
    try {
      setAdding(true);

      const res = await fetch(`${import.meta.env.VITE_API}/api/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include", // 🔥 IMPORTANT (sends JWT cookie)
        body: JSON.stringify({
          productid: product._id
        })
      });

      const data = await res.text();
      console.log(data);

      setAdding(false);
      alert("Added to cart!");

    } catch (err) {
      console.log(err);
      setAdding(false);
    }
  };

  // LOADING STATES
  if (loading) return <p className="p-8">Loading...</p>;
  if (!product) return <p className="p-8">Product not found.</p>;

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
        <h1 className="text-3xl font-bold">{product.name}</h1>

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