import Head from 'next/head';
import { useState } from 'react';
import { HealthGauge, ListCard } from '@/Components/Widgets/Widgets';

export default function SaludPage() {
  const [altGauge, setAltGauge] = useState(false);
  const [altList, setAltList] = useState(false);

  return (
    <>
      <Head>
        <title>Salud</title>
      </Head>
      <div className="p-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div role="button" aria-label="Alternar indicador de salud" onClick={() => setAltGauge(v=>!v)} className="cursor-pointer select-none">
            <HealthGauge label="Estado general" value={altGauge ? 88 : 76} />
          </div>
          <div role="button" aria-label="Alternar lista de indicadores" onClick={() => setAltList(v=>!v)} className="cursor-pointer select-none">
            {altList ? (
              <ListCard title="Indicadores" items={[{id:'1', text:'Oxígeno 98%'},{id:'2', text:'Riesgo 12%'},{id:'3', text:'Consultas 1.2k'}]} />
            ) : (
              <ListCard title="Indicadores" items={[{id:'1', text:'Vacunación 92%'},{id:'2', text:'Camas disponibles 68%'},{id:'3', text:'Tiempo espera 15m'}]} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
