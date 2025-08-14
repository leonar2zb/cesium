import Head from 'next/head';
import { ServiceStatusGrid, ListCard } from '@/Components/Widgets/Widgets';

export default function TiempoRealPage() {
  return (
    <>
      <Head>
        <title>Tiempo Real</title>
      </Head>
      <div className="p-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ServiceStatusGrid services={[{name:'Streaming', up:true},{name:'API', up:true},{name:'WebSocket', up:false},{name:'Notificaciones', up:true}]} />
          <ListCard title="Últimos eventos" items={[{id:'1', text:'Conexión establecida'},{id:'2', text:'Suscripción al canal X'},{id:'3', text:'Pico de latencia detectado'}]} />
        </div>
      </div>
    </>
  );
}
