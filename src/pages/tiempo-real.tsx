import Head from 'next/head';
import { useState } from 'react';
import { ServiceStatusGrid, ListCard } from '@/Components/Widgets/Widgets';

export default function TiempoRealPage() {
  const [altServices, setAltServices] = useState(false);
  const [altList, setAltList] = useState(false);

  const servicesA = [{name:'Streaming', up:true},{name:'API', up:true},{name:'WebSocket', up:false},{name:'Notificaciones', up:true}];
  const servicesB = [{name:'DB', up:true},{name:'Cache', up:false},{name:'Auth', up:true},{name:'Workers', up:true}];

  return (
    <>
      <Head>
        <title>Tiempo Real</title>
      </Head>
      <div className="p-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div role="button" aria-label="Alternar servicios" onClick={() => setAltServices(v=>!v)} className="cursor-pointer select-none">
            <ServiceStatusGrid services={altServices ? servicesB : servicesA} />
          </div>
          <div role="button" aria-label="Alternar lista de eventos" onClick={() => setAltList(v=>!v)} className="cursor-pointer select-none">
            {altList ? (
              <ListCard title="Alertas" items={[{id:'1', text:'Tiempo de respuesta alto'},{id:'2', text:'Reconexión exitosa'},{id:'3', text:'Threshold alcanzado'}]} />
            ) : (
              <ListCard title="Últimos eventos" items={[{id:'1', text:'Conexión establecida'},{id:'2', text:'Suscripción al canal X'},{id:'3', text:'Pico de latencia detectado'}]} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
