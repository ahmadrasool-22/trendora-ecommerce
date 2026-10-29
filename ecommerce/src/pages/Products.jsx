
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [addingProduct, setAddingProduct] = useState(null);

  // FILTER STATES
  const [sortBy, setSortBy] = useState("newest");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [quickPrice, setQuickPrice] = useState("all");

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
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }

        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch products:", err);
        setLoading(false);
      });
  }, []);

  // FILTER AND SORT PRODUCTS
  const filteredProducts = products
    .filter((product) => {
      const price = Number(product.price);

      // CUSTOM MINIMUM PRICE
      const matchesMin =
        minPrice === "" ||
        price >= Number(minPrice);

      // CUSTOM MAXIMUM PRICE
      const matchesMax =
        maxPrice === "" ||
        price <= Number(maxPrice);

      // QUICK PRICE FILTERS
      let matchesQuickPrice = true;

      if (quickPrice === "under25") {
        matchesQuickPrice = price < 25;
      } else if (quickPrice === "25to50") {
        matchesQuickPrice = price >= 25 && price <= 50;
      } else if (quickPrice === "50to100") {
        matchesQuickPrice = price > 50 && price <= 100;
      } else if (quickPrice === "over100") {
        matchesQuickPrice = price > 100;
      }

      return (
        matchesMin &&
        matchesMax &&
        matchesQuickPrice
      );
    })
    .sort((a, b) => {
      if (sortBy === "priceLow") {
        return Number(a.price) - Number(b.price);
      }

      if (sortBy === "priceHigh") {
        return Number(b.price) - Number(a.price);
      }

      if (sortBy === "nameAZ") {
        return a.name.localeCompare(b.name);
      }

      if (sortBy === "newest") {
        return (
          new Date(b.createdAt || 0).getTime() -
          new Date(a.createdAt || 0).getTime()
        );
      }

      return 0;
    });

  // CLEAR FILTERS
  const clearFilters = () => {
    setSortBy("newest");
    setMinPrice("");
    setMaxPrice("");
    setQuickPrice("all");
  };

  // ADD TO CART
  const addToCart = async (product) => {
    try {
      setAddingProduct(product._id);

      // GUEST USER
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

      // LOGGED-IN USER
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
      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm animate-pulse">
        <div className="h-48 w-full bg-gray-200"></div>

        <div className="p-5">
          <div className="mx-auto mb-3 h-4 w-3/4 rounded bg-gray-200"></div>

          <div className="mb-2 h-3 w-full rounded bg-gray-100"></div>
          <div className="mx-auto mb-4 h-3 w-5/6 rounded bg-gray-100"></div>

          <div className="mx-auto h-4 w-1/4 rounded bg-gray-200"></div>
        </div>

        <div className="flex justify-center gap-2 p-4">
          <div className="h-10 w-28 rounded-lg bg-gray-200"></div>
          <div className="h-10 w-24 rounded-lg bg-gray-200"></div>
        </div>
      </div>
    );
  };

  // QUICK PRICE FILTER OPTIONS
  const priceOptions = [
    { label: "All prices", value: "all" },
    { label: "Under $25", value: "under25" },
    { label: "$25–$50", value: "25to50" },
    { label: "$50–$100", value: "50to100" },
    { label: "$100+", value: "over100" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-10">

      {/* PAGE HEADER */}
      <div className="mx-auto mb-8 max-w-7xl">
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-blue-600 sm:text-sm">
          Discover your favorites
        </p>

        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Our Products
            </h1>

            <p className="mt-2 text-sm text-gray-500 sm:text-base">
              Explore our collection and find something you love.
            </p>
          </div>

          {!loading && (
            <p className="text-sm font-medium text-gray-500">
              {products.length}{" "}
              {products.length === 1 ? "product" : "products"} available
            </p>
          )}
        </div>
      </div>

      {/* FILTER PANEL */}
      <div className="mx-auto mb-8 max-w-7xl">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">

          {/* FILTER HEADER */}
          <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-lg font-bold text-gray-900">
                Refine your selection
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Find the right product for your budget.
              </p>
            </div>

            <button
              type="button"
              onClick={clearFilters}
              className="self-start rounded-lg px-3 py-2 text-sm font-semibold text-blue-600 transition hover:bg-blue-50 hover:text-blue-800 sm:self-auto"
            >
              Reset filters ↺
            </button>
          </div>

          {/* SORTING */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

            <div>
              <label
                htmlFor="product-sort"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Sort products
              </label>

              <select
                id="product-sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              >
                <option value="newest">Newest arrivals</option>
                <option value="priceLow">
                  Price: Low to High
                </option>
                <option value="priceHigh">
                  Price: High to Low
                </option>
                <option value="nameAZ">Name: A to Z</option>
              </select>
            </div>

            <div>
              <p className="mb-2 text-sm font-semibold text-gray-700">
                Quick price filters
              </p>

              <div className="flex flex-wrap gap-2">
                {priceOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    aria-pressed={quickPrice === option.value}
                    onClick={() => setQuickPrice(option.value)}
                    className={`rounded-full border px-3 py-2 text-xs font-semibold transition duration-200 sm:text-sm ${
                      quickPrice === option.value
                        ? "border-blue-600 bg-blue-600 text-white shadow-sm"
                        : "border-gray-200 bg-white text-gray-600 hover:border-blue-300 hover:text-blue-600"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* CUSTOM PRICE RANGE */}
          <div className="mt-6 border-t border-gray-100 pt-5">

            <h3 className="mb-1 text-sm font-semibold text-gray-800">
              Custom price range
            </h3>

            <p className="mb-4 text-xs text-gray-500">
              Enter the minimum and maximum amount you're willing to spend.
            </p>

            <div className="grid grid-cols-1 items-end gap-3 sm:grid-cols-[1fr_1fr_auto]">

              <div>
                <label
                  htmlFor="min-price"
                  className="mb-2 block text-xs font-medium text-gray-500"
                >
                  Minimum price ($)
                </label>

                <input
                  id="min-price"
                  type="number"
                  min="0"
                  step="any"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  placeholder="e.g. 10"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div>
                <label
                  htmlFor="max-price"
                  className="mb-2 block text-xs font-medium text-gray-500"
                >
                  Maximum price ($)
                </label>

                <input
                  id="max-price"
                  type="number"
                  min="0"
                  step="any"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  placeholder="e.g. 100"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <button
                type="button"
                onClick={() => setQuickPrice("all")}
                className="rounded-xl bg-gray-100 px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-200"
              >
                Custom range
              </button>

            </div>

            {/* PRICE RANGE VALIDATION */}
            {minPrice !== "" &&
              maxPrice !== "" &&
              Number(minPrice) > Number(maxPrice) && (
                <p className="mt-3 text-sm text-red-600">
                  Minimum price cannot be greater than maximum price.
                </p>
              )}

          </div>
        </div>

        {/* RESULTS COUNT */}
        {!loading && (
          <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-gray-500">
              Showing{" "}
              <span className="font-bold text-gray-900">
                {minPrice !== "" &&
                maxPrice !== "" &&
                Number(minPrice) > Number(maxPrice)
                  ? 0
                  : filteredProducts.length}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-gray-900">
                {products.length}
              </span>{" "}
              products
            </p>

            {(quickPrice !== "all" ||
              minPrice !== "" ||
              maxPrice !== "" ||
              sortBy !== "newest") && (
              <button
                type="button"
                onClick={clearFilters}
                className="text-sm font-medium text-gray-500 underline decoration-gray-300 underline-offset-4 transition hover:text-blue-600"
              >
                Clear selections
              </button>
            )}
          </div>
        )}
      </div>

      {/* PRODUCT GRID */}
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

          {/* SKELETON LOADING */}
          {loading &&
            [...Array(6)].map((_, index) => (
              <SkeletonCard key={index} />
            ))}

          {/* FILTERED PRODUCTS */}
          {!loading &&
            !(minPrice !== "" &&
              maxPrice !== "" &&
              Number(minPrice) > Number(maxPrice)) &&
            filteredProducts.map((product) => (
              <div
                key={product._id}
                className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl"
              >
                {/* PRODUCT IMAGE AND DETAILS */}
                <Link
                  to={`/product/${product._id}`}
                  className="block"
                >
                  <div className="relative overflow-hidden bg-gray-100">
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                      className="h-52 w-full object-cover transition duration-500 group-hover:scale-105"
                    />

                    <span className="absolute left-3 top-3 rounded-full border border-white/70 bg-white/90 px-3 py-1 text-xs font-semibold text-gray-700 shadow-sm backdrop-blur">
                      Trendora
                    </span>
                  </div>

                  <div className="p-5">
                    <h3 className="truncate text-base font-bold text-gray-900 transition group-hover:text-blue-600">
                      {product.name}
                    </h3>

                    <p className="mt-2 line-clamp-2 min-h-10 text-sm leading-5 text-gray-500">
                      {product.description}
                    </p>

                    <div className="mt-4 flex items-center justify-between gap-3">
                      <p className="text-xl font-bold text-gray-900">
                        ${Number(product.price).toFixed(2)}
                      </p>

                      <span className="text-xs font-medium text-gray-400 transition group-hover:text-blue-600">
                        View details →
                      </span>
                    </div>
                  </div>
                </Link>

                {/* ACTION BUTTONS */}
                <div className="flex gap-3 px-5 pb-5">

                  {/* ADD TO CART */}
                  <button
                    type="button"
                    onClick={() => addToCart(product)}
                    disabled={addingProduct === product._id}
                    className={`flex-1 rounded-xl px-3 py-3 text-sm font-semibold text-white transition duration-200 ${
                      addingProduct === product._id
                        ? "cursor-not-allowed bg-gray-400"
                        : "bg-blue-600 hover:bg-blue-700 active:scale-95"
                    }`}
                  >
                    {addingProduct === product._id
                      ? "Adding..."
                      : "Add to Cart"}
                  </button>

                  {/* BUY NOW */}
                  <Link
                    to={`/BuyNowCheckout/${product._id}`}
                    className="flex-1"
                  >
                    <button
                      type="button"
                      className="w-full rounded-xl bg-pink-500 px-3 py-3 text-sm font-semibold text-white transition duration-200 hover:bg-pink-600 active:scale-95"
                    >
                      Buy Now
                    </button>
                  </Link>

                </div>
              </div>
            ))}

        </div>

        {/* EMPTY STATE */}
        {!loading &&
          (filteredProducts.length === 0 ||
            (minPrice !== "" &&
              maxPrice !== "" &&
              Number(minPrice) > Number(maxPrice))) && (
            <div className="rounded-2xl border border-gray-200 bg-white px-5 py-16 text-center shadow-sm">

              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-3xl">
                🔎
              </div>

              <h2 className="text-xl font-bold text-gray-900">
                {minPrice !== "" &&
                maxPrice !== "" &&
                Number(minPrice) > Number(maxPrice)
                  ? "Invalid price range"
                  : "No products found"}
              </h2>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
                {minPrice !== "" &&
                maxPrice !== "" &&
                Number(minPrice) > Number(maxPrice)
                  ? "Your minimum price is higher than your maximum price. Adjust your range to continue."
                  : "We couldn't find any products matching your selected price range. Try adjusting your filters."}
              </p>

              <button
                type="button"
                onClick={clearFilters}
                className="mt-6 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Reset filters
              </button>

            </div>
          )}

      </div>
    </div>
  );
}

export default Products;
