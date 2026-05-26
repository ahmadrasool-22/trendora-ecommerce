import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { User, Search, X, Menu } from "lucide-react";

export default function Header() {
  const [open, setOpen] = useState(false); // desktop user menu
  const [mobOpen, setMobOpen] = useState(false); // mobile hamburger menu
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);

  // Fetch products for live search
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API}/api/products`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
  }, []);

  const filteredproducts = products.filter(
    (product) =>
      searchTerm &&
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Fetch current user on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API}/api/users/me`, {
          credentials: "include",
        });
        if (!res.ok) {
          setUser(null);
          return;
        }
        const data = await res.json();
        setUser(data.user);
      } catch (err) {
        console.error(err);
        setUser(null);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch(`${import.meta.env.VITE_API}/api/users/logout`, {
        method: "POST",
        credentials: "include",
      });
      setUser(null);
      setOpen(false);
      setMobOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <header className="bg-white rounded-b-2xl shadow-xl fixed top-0 left-0 w-full z-50">
      {/* Desktop Navbar */}
      <nav className="hidden sm:flex justify-between items-center p-4 max-w-7xl mx-auto">
        <Link to="/">
          <h1 className="text-blue-900 text-3xl font-extrabold">Trendora</h1>
        </Link>

        <ul className="flex gap-6 text-blue-800 font-semibold">
          <li className="hover:text-blue-600">
            <Link to="/products">Products</Link>
          </li>
          <li className="hover:text-blue-600">
            <Link to="/cart">Cart</Link>
          </li>
          <li className="hover:text-blue-600">
            <Link to="orders/">Order</Link>
          </li>
          {user?.role === "admin" && (
            <li className="hover:text-blue-600">
              <Link to="/admin/dashboard">Dashboard</Link>
            </li>
          )}
        </ul>

        <div className="relative flex items-center gap-4">
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="text-blue-800 hover:text-blue-600"
          >
            <Search />
          </button>

          <div className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="text-blue-800 hover:text-blue-600 font-semibold flex items-center gap-2"
            >
              {user ? `Hi, ${user.firstName}` : <User />}
            </button>

            {open && (
              <ul className="absolute right-0 mt-2 w-48 bg-white shadow-2xl rounded-lg py-2 text-blue-800 font-semibold z-50 border border-gray-100">
                {user ? (
                  <li>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 hover:bg-red-50 hover:text-red-500 transition"
                    >
                      Logout
                    </button>
                  </li>
                ) : (
                  <>
                    <li>
                      <Link
                        to="/login"
                        className="block px-4 py-2 hover:bg-blue-50"
                        onClick={() => setOpen(false)}
                      >
                        Login
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/signup"
                        className="block px-4 py-2 hover:bg-blue-50"
                        onClick={() => setOpen(false)}
                      >
                        Signup
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Navbar */}
      <nav className="flex justify-between items-center p-4 sm:hidden">
        <Link to="/">
          <h1 className="text-blue-900 text-2xl font-bold">Trendora</h1>
        </Link>

        <div className="flex items-center gap-4">
          <button onClick={() => setSearchOpen(true)} className="text-blue-800">
            <Search size={24} />
          </button>

          <button onClick={() => setMobOpen(!mobOpen)} className="text-blue-800">
            {mobOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobOpen && (
          <div className="absolute top-full left-0 w-full bg-white shadow-2xl border-t border-gray-100 animate-in slide-in-from-top-2">
            <ul className="flex flex-col p-4 text-blue-800 font-semibold gap-2">
              {user && (
                <li className="px-4 py-2 text-sm text-gray-500 border-b border-gray-50">
                  Welcome, {user.firstName}
                </li>
              )}
              <li>
                <Link
                  to="/products"
                  className="block px-4 py-3 hover:bg-blue-50 rounded-lg"
                  onClick={() => setMobOpen(false)}
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  to="/cart"
                  className="block px-4 py-3 hover:bg-blue-50 rounded-lg"
                  onClick={() => setMobOpen(false)}
                >
                  Cart
                </Link>
              </li>
              {user?.role === "admin" && (
                <li>
                  <Link
                    to="/admin/dashboard"
                    className="block px-4 py-3 bg-blue-50 text-blue-700 rounded-lg"
                    onClick={() => setMobOpen(false)}
                  >
                    Admin Dashboard
                  </Link>
                </li>
              )}

              <hr className="my-2 border-gray-100" />

              {user ? (
                <li>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 text-red-500 hover:bg-red-50 rounded-lg transition"
                  >
                    Logout
                  </button>
                </li>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <li>
                    <Link
                      to="/login"
                      className="block px-4 py-3 text-center border border-blue-600 rounded-lg"
                      onClick={() => setMobOpen(false)}
                    >
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/signup"
                      className="block px-4 py-3 text-center bg-blue-900 text-white rounded-lg"
                      onClick={() => setMobOpen(false)}
                    >
                      Signup
                    </Link>
                  </li>
                </div>
              )}
            </ul>
          </div>
        )}
      </nav>

      {/* Shared Search Overlay (Responsive) */}
      {searchOpen && (
        <div className="fixed inset-0 bg-white/95 backdrop-blur-sm z-[60] p-4 sm:p-10 overflow-y-auto transition-all">
          <div className="max-w-4xl mx-auto relative">
            <button
              onClick={() => {
                setSearchOpen(false);
                setSearchTerm("");
              }}
              className="absolute -top-2 -right-2 p-2 text-gray-500 hover:text-red-500"
            >
              <X size={32} />
            </button>

            <input
              type="text"
              autoFocus
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search products..."
              className="w-full p-5 text-xl rounded-2xl border-2 border-blue-100 focus:border-blue-500 outline-none shadow-sm"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              {!searchTerm && (
                <p className="text-gray-400 text-center col-span-full">
                  Start typing to explore...
                </p>
              )}

              {searchTerm && filteredproducts.length === 0 && (
                <p className="text-gray-500 text-center col-span-full">
                  No matches found for "{searchTerm}"
                </p>
              )}

              {filteredproducts.map((product) => (
                <Link
                  key={product._id}
                  to={`/product/${product._id}`}
                  onClick={() => setSearchOpen(false)}
                  className="flex items-center gap-4 bg-gray-50 p-3 rounded-xl hover:bg-blue-50 transition"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="font-bold text-blue-900">{product.name}</h3>
                    <p className="text-blue-600 font-semibold">${product.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}