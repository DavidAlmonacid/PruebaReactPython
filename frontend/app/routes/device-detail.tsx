import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";

export default function DeviceDetail() {
  const { id } = useParams();
  const [device, setDevice] = useState<Device | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:8000/api/v1/devices/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        return response.json();
      })
      .then(setDevice)
      .catch((error) => console.error("Error fetching device:", error))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!device) {
    return <div>Device not found.</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-gray-200 via-white to-pink-200 dark:from-gray-900 dark:via-gray-800 dark:to-pink-900 py-10">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl flex flex-col md:flex-row max-w-3xl w-full overflow-hidden">
        {/* Image Section */}
        <div className="md:w-1/2 flex flex-col items-center justify-center p-8 bg-gray-100 dark:bg-gray-700 relative">
          <img
            src={device.ImageUrl || "/placeholder-device.png"}
            alt={device.Model}
            className="w-60 h-60 object-contain rounded-xl shadow-md"
          />
        </div>

        {/* Info Section */}
        <div className="flex-1 p-8 flex flex-col justify-between">
          <div>
            <Link
              to="/"
              className="text-sm text-pink-500 hover:underline mb-2 inline-block"
            >
              ← Back
            </Link>

            <h2 className="text-2xl font-bold mb-1 flex items-center gap-2">
              {device.Manufacturer} {device.Model}
            </h2>

            <div className="text-pink-600 font-bold text-xl mb-2">
              {device.Price ? `USD ${device.Price}` : ""}
            </div>

            <p className="text-gray-700 dark:text-gray-200 mb-4">
              {device.Description || "Sin descripción."}
            </p>

            <div className="flex flex-wrap gap-4 mb-4">
              <span className="bg-gray-200 dark:bg-gray-600 rounded-full px-3 py-1 text-xs font-semibold text-gray-700 dark:text-gray-200">
                Stock: {device.Stock}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 mt-4">
            <button className="flex-1 bg-gradient-to-r from-pink-500 to-red-500 text-white px-6 py-3 rounded-full font-semibold text-lg shadow hover:from-pink-600 hover:to-red-600 transition flex items-center justify-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9m5-9v9m4-9v9m4-9l2 9"
                />
              </svg>
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
