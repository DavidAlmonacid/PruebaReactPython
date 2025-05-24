import { useEffect, useState } from "react";
import { Link } from "react-router";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" }
  ];
}

export default function Home() {
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/api/v1/devices")
      .then((response) => response.json())
      .then(setDevices)
      .catch((error) => console.error("Error fetching devices:", error))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="p-6 text-gray-900 dark:text-gray-100">Loading...</div>
    );
  }

  return (
    <div className="p-14 text-gray-900 dark:text-gray-100">
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {devices.map((device) => (
          <li
            key={device.Id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden flex flex-col md:flex-row"
          >
            <div className="md:w-1/3 flex items-center justify-center p-4 bg-gray-100 dark:bg-gray-700">
              <img
                src={device.ImageUrl || "/placeholder-device.png"}
                alt={device.Model}
                className="w-24 h-24 object-contain"
              />
            </div>

            <div className="flex-1 p-4 flex flex-col justify-between">
              <div>
                <h2 className="text-lg font-bold mb-1">
                  {device.Manufacturer} {device.Model}
                </h2>
                <p className="text-gray-700 dark:text-gray-200 mb-2">
                  {device.Description || "Sin descripción."}
                </p>
                <div className="text-pink-600 font-semibold mb-2">
                  {device.Price ? `USD ${device.Price}` : ""}
                </div>
              </div>

              <div className="flex items-center justify-between mt-2">
                <Link
                  to={`/device/${device.Id}`}
                  className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-4 py-2 rounded-full font-semibold hover:from-pink-600 hover:to-red-600 transition"
                >
                  Ver detalles
                </Link>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
