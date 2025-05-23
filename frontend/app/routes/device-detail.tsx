import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";

export default function DeviceDetail() {
  const { id } = useParams();
  const [device, setDevice] = useState<Device | undefined>(undefined);

  useEffect(() => {
    fetch(`http://localhost:8000/api/v1/devices`)
      .then((response) => response.json())
      .then((devices: Device[]) => {
        setDevice(devices.find((device) => device.Id === Number(id)));
      });
  }, [id]);

  if (device == null) {
    return <div>Loading...</div>;
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
