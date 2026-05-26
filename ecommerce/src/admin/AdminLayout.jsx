import { Outlet, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { LayoutDashboard, Package, ShoppingBag, Menu, X, LogOut,Users } from "lucide-react";

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: <LayoutDashboard size={20} /> },
    { name: "Products", path: "/admin/products", icon: <Package size={20} /> },
    { name: "Orders", path: "/admin/orders", icon: <ShoppingBag size={20} /> },
    { name: "Users", path: "/admin/users", icon: <Users size={20} /> },
  ];

  return (
    <div className="flex h-screen bg-slate-100">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-blue-950 text-white transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 md:relative md:translate-x-0 flex flex-col`}>
        <div className="p-6 text-2xl font-serif font-bold border-b border-blue-900">
          Trendora<span className="text-blue-400">.</span>
        </div>
        
        <nav className="flex-grow p-4 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-900 transition text-blue-100"
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-blue-900">
          <button className="flex items-center gap-3 w-full px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl transition">
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Admin Header */}
        <header className="h-16 bg-white shadow-sm flex items-center justify-between px-6">
          <button className="md:hidden text-blue-900" onClick={() => setSidebarOpen(true)}>
            <Menu size={24} />
          </button>
          <div className="font-bold text-blue-900 hidden md:block">Admin Control Panel</div>
          <Link to="/" className="text-sm text-blue-600 hover:underline">View Storefront</Link>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-slate-50">
          <Outlet /> 
        </main>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}
    </div>
  );
}