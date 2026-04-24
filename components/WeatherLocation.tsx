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
        const geo = await fetch("https://ipapi.co/json/").then((r) => r.json());
        const weather = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${geo.latitude}&longitude=${geo.longitude}&current=temperature_2m`
        ).then((r) => r.json());
        const tempC = Math.round(weather.current.temperature_2m);
        setData({ city: geo.city, tempC, tempF: Math.round(tempC * 1.8 + 32) });
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
