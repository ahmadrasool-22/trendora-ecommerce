import { useEffect, useState } from "react";
import axios from "axios";
import { Search, Trash2, Users } from "lucide-react";

export default function View() {
  const [users, setUsers] = useState([]);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);

  // Fetch Users
  const fetchUsers = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API}/api/users`
      );

      setUsers(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Delete User
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `${import.meta.env.VITE_API}/api/users/${id}`
      );

      setUsers((prev) =>
        prev.filter((user) => user._id !== id)
      );

      alert("User Deleted Successfully");
    } catch (error) {
      console.log(error);

      alert("Failed To Delete User");
    }
  };

  // Live Search
  const filteredUsers = users.filter((user) =>
    user.firstName
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-blue-950">
          Users
        </h2>

        <p className="text-gray-500 mt-1">
          Manage all registered users
        </p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          size={18}
        />

        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-white border border-slate-300 rounded-2xl pl-12 pr-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Loading */}
      {loading ? (
        <div className="bg-white rounded-2xl p-6 animate-pulse">
          <div className="h-12 bg-slate-200 rounded"></div>

          <div className="mt-4 h-12 bg-slate-200 rounded"></div>

          <div className="mt-4 h-12 bg-slate-200 rounded"></div>
        </div>
      ) : filteredUsers.length === 0 ? (

        /* Empty State */
        <div className="bg-white rounded-2xl p-10 text-center shadow-sm border border-slate-200">
          <Users
            size={50}
            className="mx-auto text-gray-300"
          />

          <h3 className="text-xl font-semibold text-gray-700 mt-4">
            No Users Found
          </h3>

          <p className="text-gray-500 mt-2">
            No matching users available
          </p>
        </div>
      ) : (

        /* Users Table */
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">

          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">

              <thead className="bg-slate-100">
                <tr>
                  <th className="text-left px-6 py-4 text-gray-700 font-semibold">
                    Name
                  </th>

                  <th className="text-left px-6 py-4 text-gray-700 font-semibold">
                    Email
                  </th>

                  <th className="text-left px-6 py-4 text-gray-700 font-semibold">
                    Role
                  </th>

                  <th className="text-center px-6 py-4 text-gray-700 font-semibold">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredUsers.map((user) => (
                  <tr
                    key={user._id}
                    className="border-t border-slate-200"
                  >

                    <td className="px-6 py-4 font-medium text-blue-950">
                      {user.firstName}
                    </td>

                    <td className="px-6 py-4 text-gray-600">
                      {user.email}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          user.role === "admin"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-slate-100 text-slate-700"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() =>
                          handleDelete(user._id)
                        }
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl inline-flex items-center gap-2 transition"
                      >
                        <Trash2 size={16} />
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden p-4 space-y-4">
            {filteredUsers.map((user) => (
              <div
                key={user._id}
                className="border border-slate-200 rounded-2xl p-4 space-y-3"
              >

                <div>
                  <h3 className="font-semibold text-blue-950">
                    {user.name}
                  </h3>

                  <p className="text-sm text-gray-600">
                    {user.email}
                  </p>
                </div>

                <div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      user.role === "admin"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {user.role}
                  </span>
                </div>

                <button
                  onClick={() =>
                    handleDelete(user._id)
                  }
                  className="w-full bg-red-500 hover:bg-red-600 text-white py-2.5 rounded-xl flex items-center justify-center gap-2 transition"
                >
                  <Trash2 size={16} />
                  Delete User
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}