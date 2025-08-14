import Head from 'next/head';
import { useState } from 'react';
import { TourismSpotlight, StatCard } from '@/Components/Widgets/Widgets';

export default function TurismoPage() {
  const [altSpot, setAltSpot] = useState(false);
  const [altStat, setAltStat] = useState(false);

  return (
    <>
      <Head>
        <title>Turismo</title>
      </Head>
      <div className="p-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div role="button" aria-label="Alternar lugar destacado" onClick={() => setAltSpot(v=>!v)} className="cursor-pointer select-none">
            {altSpot ? (
              <TourismSpotlight place="Capitolio" score={8} />
            ) : (
              <TourismSpotlight place="Malecón" score={9} />
            )}
          </div>
          <div role="button" aria-label="Alternar estadística" onClick={() => setAltStat(v=>!v)} className="cursor-pointer select-none">
            {altStat ? (
              <StatCard label="Visitantes hoy" value="2,980" delta="-4%" />
            ) : (
              <StatCard label="Visitantes hoy" value="3,420" delta="+12%" positive />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
