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
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Dispositivos GPS</h1>

      <ul>
        {devices.map((device) => (
          <li key={device.Id}>
            <Link to={`/device/${device.Id}`}>
              {device.Manufacturer} {device.Model}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
