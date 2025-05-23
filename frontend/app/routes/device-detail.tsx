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
    <div>
      <Link to="/">← Volver</Link>

      <h2>
        {device.Manufacturer} {device.Model}
      </h2>

      <img src={device.ImageUrl} alt={device.Model} width={200} />

      <p>{device.Description}</p>
      <p>Stock: {device.Stock}</p>
      <p>Precio: ${device.Price}</p>
    </div>
  );
}
