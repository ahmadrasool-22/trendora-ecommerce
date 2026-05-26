import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API}/api/products`)
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.log(err));
      console.log("fetched successfully")
      console.log(products)
  }, []);

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-5">
        {products.map((product) => {
         

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
                  <h3 className="font-semibold">{product.name}</h3>
                  <p className="text-sm text-gray-600">
                    {product.description}
                  </p>
                  <p className="font-bold mt-2">${product.price}</p>
                </div>
              </Link>

              <div className="p-4 text-center">
               <Link to={`/BuyNowCheckout/${product._id}`}>
                  <button
                  
                    className="mt-2 px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600"
                  >
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