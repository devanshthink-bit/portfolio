"use client";

import { useEffect, useState } from "react";

interface Data {
  city: string;
  tempC: number;
  tempF: number;
}

export default function WeatherLocation() {
  const [data, setData] = useState<Data | null>(null);

  useEffect(() => {
    async function fetch_() {
      try {
        navigator.geolocation.getCurrentPosition(async (pos) => {
          const { latitude, longitude } = pos.coords;
          const weather = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m`
          ).then((r) => r.json());
          const geo = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          ).then((r) => r.json());

          const tempC = Math.round(weather.current.temperature_2m);
          const city = geo.address?.city || geo.address?.town || geo.address?.village || "Unknown";
          setData({ city, tempC, tempF: Math.round(tempC * 1.8 + 32) });
        }, () => {
          // Fallback to IP geolocation if browser geolocation fails
          fetch("https://ipapi.co/json/").then(async (r) => {
            const geo = await r.json();
            const weather = await fetch(
              `https://api.open-meteo.com/v1/forecast?latitude=${geo.latitude}&longitude=${geo.longitude}&current=temperature_2m`
            ).then((r) => r.json());
            const tempC = Math.round(weather.current.temperature_2m);
            setData({ city: geo.city, tempC, tempF: Math.round(tempC * 1.8 + 32) });
          });
        });
      } catch {
        // silently fail
      }
    }
    fetch_();
  }, []);

  if (!data) return <span className="footer-weather">—</span>;

  return (
    <span className="footer-weather">
      {data.tempC}°C / {data.tempF}°F · {data.city}
    </span>
  );
}
