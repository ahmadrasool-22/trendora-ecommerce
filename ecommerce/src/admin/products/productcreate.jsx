import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Create() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const [preview, setPreview] = useState("");

  const [loading, setLoading] = useState(false);

  // Handle Image Change
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    setImage(file);

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  // Submit Product
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("name", name);
      formData.append("price", price);
      formData.append("description", description);
      formData.append("image", image);

      await axios.post(
        `${import.meta.env.VITE_API}/api/products`,
        formData
      );

      alert("Product Created Successfully");

      navigate("/admin/products");
    } catch (error) {
      console.log(error);

      alert("Failed To Create Product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200">
      
      {/* Heading */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-blue-950">
          Create Product
        </h2>

        <p className="text-gray-500 mt-2">
          Add a new product to your store
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >

        {/* Product Name */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Product Name
          </label>

          <input
            type="text"
            placeholder="Enter product name"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
            placeholder="Enter price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
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
            placeholder="Enter product description"
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Product Image
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required
            className="w-full border border-slate-300 rounded-xl px-4 py-3 bg-white"
          />
        </div>

        {/* Image Preview */}
        {preview && (
          <div>
            <img
              src={preview}
              alt="Preview"
              className="w-40 h-40 object-cover rounded-xl border"
            />
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full md:w-auto bg-blue-950 hover:bg-blue-900 text-white px-8 py-3 rounded-xl transition font-medium"
        >
          {loading ? "Creating..." : "Create Product"}
        </button>
      </form>
    </div>
  );
}