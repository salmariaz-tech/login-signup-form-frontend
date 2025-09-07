import { useEffect, useState } from "react";
import API from "../utils/api";
import { useNavigate } from "react-router-dom";
import Chatbot from "../components/Chatbot";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const { data } = await API.get("/user/dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (data.ok) {
          setUser(data.user);
        } else {
          localStorage.removeItem("token");
          navigate("/login");
        }
      } catch (error) {
        console.error("Dashboard Fetch Error:", error);
        localStorage.removeItem("token");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-gray-600 text-lg">Loading Dashboard...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 relative">
      <h1 className="text-3xl font-bold mb-4">Welcome to Dashboard 🎉</h1>
      {user ? (
        <p className="text-lg mb-6">
          Hello, {user.name || "User"} ({user.email})
        </p>
      ) : (
        <p className="text-gray-600">User not found</p>
      )}

      <button
        onClick={logout}
        className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg shadow-md mb-6"
      >
        Logout
      </button>

      {/* ✅ Chatbot visible after user is loaded */}
      {user && (
        <div className="fixed bottom-4 right-4 w-96 shadow-xl rounded-lg border bg-white">
          <Chatbot userName={user.name || "User"} />
        </div>
      )}
    </div>
  );
}
