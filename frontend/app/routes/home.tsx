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
    <div className="container mx-auto p-6 text-gray-900 dark:text-gray-100">
      <h1 className="text-2xl font-bold mb-6">Dispositivos GPS</h1>
      <ul className="space-y-2">
        {devices.map((device) => (
          <li key={device.Id}>
            <Link
              to={`/device/${device.Id}`}
              className="hover:underline hover:text-blue-600 dark:hover:text-blue-400"
            >
              {device.Manufacturer} {device.Model}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
