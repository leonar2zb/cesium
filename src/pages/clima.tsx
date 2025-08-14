import Head from 'next/head';
import { useState } from 'react';
import { WeatherCard, TrendCard } from '@/Components/Widgets/Widgets';

export default function ClimaPage() {
  const [altCity, setAltCity] = useState(false);
  const [altTrend, setAltTrend] = useState(false);

  return (
    <>
      <Head>
        <title>Clima</title>
      </Head>
      <div className="p-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div role="button" aria-label="Alternar ciudad" onClick={() => setAltCity(v=>!v)} className="cursor-pointer select-none">
            {altCity ? (
              <WeatherCard city="Santiago" tempC={31} status="Caluroso" />
            ) : (
              <WeatherCard city="La Habana" tempC={29} status="Soleado con nubes" />
            )}
          </div>
          <div role="button" aria-label="Alternar tendencia de temperatura" onClick={() => setAltTrend(v=>!v)} className="cursor-pointer select-none">
            {altTrend ? (
              <TrendCard title="Temperatura semanal" points={[27,28,29,29,30,31,33]} />
            ) : (
              <TrendCard title="Temperatura semanal" points={[28,29,31,30,29,27,28]} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
