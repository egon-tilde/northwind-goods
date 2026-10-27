'use client';
import { useEffect, useState } from 'react';

type Forecast = { daily: { time: string[]; precipitation_probability_max: number[]; temperature_2m_max: number[] } };

const WAREHOUSE = { name: 'Zagreb', lat: 45.815, lon: 15.982 };

export default function DeliveryEstimate() {
  const [forecast, setForecast] = useState<Forecast | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `https://api.open-meteo.com/v1/forecast?latitude=${WAREHOUSE.lat}&longitude=${WAREHOUSE.lon}&daily=precipitation_probability_max,temperature_2m_max&forecast_days=3&timezone=auto`);
    xhr.responseType = 'json';
    xhr.onload = () => (xhr.status === 200 ? setForecast(xhr.response) : setFailed(true));
    xhr.onerror = () => setFailed(true);
    xhr.send();
    return () => xhr.abort();
  }, []);

  if (failed) return null;
  if (!forecast) return <p className="mt-6 text-sm text-stone-400">Checking delivery conditions…</p>;

  const rainy = forecast.daily.precipitation_probability_max[1] > 60;
  const day = new Date(forecast.daily.time[rainy ? 2 : 1]).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'short' });

  return (
    <div className="mt-6 rounded-xl bg-teal-50 p-3 text-sm text-teal-900">
      🚚 Ships from {WAREHOUSE.name}. Arrives <strong>{day}</strong>
      {rainy && ' (rain expected tomorrow, so we added a day)'}.
    </div>
  );
}
