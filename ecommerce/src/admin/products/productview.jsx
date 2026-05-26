import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Search, Pencil, Trash2, Plus } from "lucide-react";

export default function View() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);

  // Fetch Products
  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API}/api/products`
      );

      setProducts(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Delete Product
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `${import.meta.env.VITE_API}/api/products/${id}`
      );

      setProducts((prev) =>
        prev.filter((product) => product._id !== id)
      );

      alert("Product Deleted Successfully");
    } catch (error) {
      console.log(error);

      alert("Failed To Delete Product");
    }
  };

  // Live Search
  const filteredProducts = products.filter((product) =>
    product.name
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">

      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        <div>
          <h2 className="text-3xl font-bold text-blue-950">
            Products
          </h2>

          <p className="text-gray-500 mt-1">
            Manage all store products
          </p>
        </div>

        {/* Create Button */}
        <Link
          to="/admin/products/create"
          className="bg-blue-950 hover:bg-blue-900 text-white px-5 py-3 rounded-xl flex items-center justify-center gap-2 transition"
        >
          <Plus size={18} />
          Create Product
        </Link>
      </div>

      {/* Search */}
      <div className="relative">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          size={18}
        />

        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-white border border-slate-300 rounded-2xl pl-12 pr-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Loading */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-4 animate-pulse"
            >
              <div className="h-48 bg-slate-200 rounded-xl"></div>

              <div className="mt-4 h-5 bg-slate-200 rounded w-3/4"></div>

              <div className="mt-2 h-4 bg-slate-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      ) : filteredProducts.length === 0 ? (
        
        /* Empty State */
        <div className="bg-white rounded-2xl p-10 text-center shadow-sm border border-slate-200">
          <h3 className="text-xl font-semibold text-gray-700">
            No Products Found
          </h3>

          <p className="text-gray-500 mt-2">
            Try adding products or search differently
          </p>
        </div>
      ) : (
        
        /* Products Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200 hover:shadow-md transition"
            >

              {/* Product Image */}
              <div className="h-56 bg-slate-100 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Product Info */}
              <div className="p-5 space-y-3">

                <div>
                  <h3 className="text-xl font-semibold text-blue-950">
                    {product.name}
                  </h3>

                  <p className="text-blue-700 font-bold mt-1">
                    Rs. {product.price}
                  </p>
                </div>

                <p className="text-gray-600 text-sm line-clamp-2">
                  {product.description}
                </p>

                {/* Actions */}
                <div className="flex gap-3 pt-2">

                  {/* Edit */}
                  <Link
                    to={`/admin/products/edit/${product._id}`}
                    className="flex-1 bg-blue-950 hover:bg-blue-900 text-white py-2.5 rounded-xl flex items-center justify-center gap-2 transition"
                  >
                    <Pencil size={16} />
                    Edit
                  </Link>

                  {/* Delete */}
                  <button
                    onClick={() =>
                      handleDelete(product._id)
                    }
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2.5 rounded-xl flex items-center justify-center gap-2 transition"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}