import Head from 'next/head';
import { useState } from 'react';
import { SecurityAlertCard, TrendCard } from '@/Components/Widgets/Widgets';

export default function SeguridadPage() {
  const [highAlert, setHighAlert] = useState(false);
  const [altTrend, setAltTrend] = useState(false);

  return (
    <>
      <Head>
        <title>Seguridad</title>
      </Head>
      <div className="p-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div role="button" aria-label="Alternar nivel de alerta" onClick={() => setHighAlert(v=>!v)} className="cursor-pointer select-none">
            {highAlert ? (
              <SecurityAlertCard level="Alto" incidents={18} />
            ) : (
              <SecurityAlertCard level="Medio" incidents={12} />
            )}
          </div>
          <div role="button" aria-label="Alternar tendencia de incidentes" onClick={() => setAltTrend(v=>!v)} className="cursor-pointer select-none">
            {altTrend ? (
              <TrendCard title="Incidentes semanales" points={[5,4,6,3,4,6,7]} />
            ) : (
              <TrendCard title="Incidentes semanales" points={[2,1,3,4,2,5,3]} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
