import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function Edit() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const [image, setImage] = useState(null);

  const [preview, setPreview] = useState("");

  const [loading, setLoading] = useState(true);

  const [updating, setUpdating] = useState(false);

  // Fetch Single Product
  const fetchProduct = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API}/api/products/${id}`
      );

      const product = res.data;

      setName(product.name);
      setPrice(product.price);
      setDescription(product.description);

      setPreview(
        `${import.meta.env.VITE_API}${product.image}`
      );
    } catch (error) {
      console.log(error);

      alert("Failed To Fetch Product");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  // Handle Image Change
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    setImage(file);

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  // Update Product
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setUpdating(true);

      const formData = new FormData();

      formData.append("name", name);
      formData.append("price", price);
      formData.append("description", description);

      // append image only if selected
      if (image) {
        formData.append("image", image);
      }

      await axios.put(
       `${import.meta.env.VITE_API}/api/products/${id}`,
        formData
      );

      alert("Product Updated Successfully");

      navigate("/admin/products");
    } catch (error) {
      console.log(error);

      alert("Failed To Update Product");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white p-8 rounded-2xl animate-pulse">
        <div className="h-8 bg-slate-200 rounded w-1/3"></div>

        <div className="mt-8 space-y-4">
          <div className="h-12 bg-slate-200 rounded"></div>

          <div className="h-12 bg-slate-200 rounded"></div>

          <div className="h-32 bg-slate-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200">

      {/* Heading */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-blue-950">
          Edit Product
        </h2>

        <p className="text-gray-500 mt-2">
          Update your existing product
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >

        {/* Name */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Product Name
          </label>

          <input
            type="text"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            required
            className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Price */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Price
          </label>

          <input
            type="number"
            value={price}
            onChange={(e) =>
              setPrice(e.target.value)
            }
            required
            className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Description
          </label>

          <textarea
            rows="5"
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Image */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Change Product Image
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full border border-slate-300 rounded-xl px-4 py-3 bg-white"
          />
        </div>

        {/* Preview */}
        {preview && (
          <div>
            <img
              src={preview}
              alt="Preview"
              className="w-44 h-44 object-cover rounded-xl border"
            />
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={updating}
          className="w-full md:w-auto bg-blue-950 hover:bg-blue-900 text-white px-8 py-3 rounded-xl transition font-medium"
        >
          {updating
            ? "Updating..."
            : "Update Product"}
        </button>
      </form>
    </div>
  );
}