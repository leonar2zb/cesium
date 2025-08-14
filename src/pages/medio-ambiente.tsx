import Head from 'next/head';
import { useState } from 'react';
import { AQICard, TrendCard } from '@/Components/Widgets/Widgets';

export default function MedioAmbientePage() {
  const [altAqi, setAltAqi] = useState(false);
  const [altTrend, setAltTrend] = useState(false);

  return (
    <>
      <Head>
        <title>Medio Ambiente</title>
      </Head>
      <div className="p-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div role="button" aria-label="Alternar AQI" onClick={() => setAltAqi(v=>!v)} className="cursor-pointer select-none">
            <AQICard aqi={altAqi ? 65 : 42} />
          </div>
          <div role="button" aria-label="Alternar consumo energético" onClick={() => setAltTrend(v=>!v)} className="cursor-pointer select-none">
            {altTrend ? (
              <TrendCard title="Consumo energético" points={[47,49,51,50,53,55,57]} />
            ) : (
              <TrendCard title="Consumo energético" points={[60,58,55,52,50,48,47]} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
