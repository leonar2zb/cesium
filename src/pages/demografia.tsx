import Head from 'next/head';
import { useState } from 'react';
import { DemographicsDonut, ListCard } from '@/Components/Widgets/Widgets';

export default function DemografiaPage() {
  const [altDonut, setAltDonut] = useState(false);
  const [altList, setAltList] = useState(false);

  return (
    <>
      <Head>
        <title>Demografía</title>
      </Head>
      <div className="p-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div role="button" aria-label="Alternar demografía" onClick={() => setAltDonut(v=>!v)} className="cursor-pointer select-none">
            {altDonut ? (
              <DemographicsDonut a={25} b={40} c={35} />
            ) : (
              <DemographicsDonut a={32} b={48} c={20} />
            )}
          </div>
          <div role="button" aria-label="Alternar datos" onClick={() => setAltList(v=>!v)} className="cursor-pointer select-none">
            {altList ? (
              <ListCard title="Datos clave" items={[{id:'1', text:'Esperanza de vida 78'},{id:'2', text:'Índice urbanización 64%'},{id:'3', text:'Edad media 35'}]} />
            ) : (
              <ListCard title="Datos clave" items={[{id:'1', text:'Población 1.2M'},{id:'2', text:'Crecimiento 1.8%'},{id:'3', text:'Densidad 3,500/km²'}]} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
