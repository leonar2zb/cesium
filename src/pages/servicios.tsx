import Head from 'next/head';
import { useState } from 'react';
import { ServiceStatusGrid, StatCard } from '@/Components/Widgets/Widgets';

export default function ServiciosPage() {
  const [altGrid, setAltGrid] = useState(false);
  const [altSla, setAltSla] = useState(false);

  const gridA = [{name:'Agua', up:true},{name:'Electricidad', up:false},{name:'Internet', up:true},{name:'Recolección', up:true}];
  const gridB = [{name:'Alumbrado', up:true},{name:'Gas', up:true},{name:'Transporte', up:false},{name:'Call Center', up:true}];

  return (
    <>
      <Head>
        <title>Servicios</title>
      </Head>
      <div className="p-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div role="button" aria-label="Alternar estado de servicios" onClick={() => setAltGrid(v=>!v)} className="cursor-pointer select-none">
            <ServiceStatusGrid services={altGrid ? gridB : gridA} />
          </div>
          <div role="button" aria-label="Alternar SLA" onClick={() => setAltSla(v=>!v)} className="cursor-pointer select-none">
            {altSla ? (
              <StatCard label="SLA Promedio" value="97.4%" delta="-0.8%" />
            ) : (
              <StatCard label="SLA Promedio" value="98.2%" delta="+0.3%" positive />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
