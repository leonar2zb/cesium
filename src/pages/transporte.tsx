import Head from 'next/head';
import { useState } from 'react';
import { TransportSchedule, StatCard } from '@/Components/Widgets/Widgets';

export default function TransportePage() {
  const [altSchedule, setAltSchedule] = useState(false);
  const [altOcc, setAltOcc] = useState(false);

  return (
    <>
      <Head>
        <title>Transporte</title>
      </Head>
      <div className="p-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div role="button" aria-label="Alternar horarios" onClick={() => setAltSchedule(v=>!v)} className="cursor-pointer select-none">
            {altSchedule ? (
              <TransportSchedule line="Línea A" next={["1 min","5 min","12 min"]} />
            ) : (
              <TransportSchedule line="Línea A" next={["2 min","7 min","15 min"]} />
            )}
          </div>
          <div role="button" aria-label="Alternar ocupación" onClick={() => setAltOcc(v=>!v)} className="cursor-pointer select-none">
            {altOcc ? (
              <StatCard label="Ocupación promedio" value="59%" delta="-3%" />
            ) : (
              <StatCard label="Ocupación promedio" value="67%" delta="+5%" positive />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
