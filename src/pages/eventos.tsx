import Head from 'next/head';
import { EventCard, ListCard } from '@/Components/Widgets/Widgets';

export default function EventosPage() {
  return (
    <>
      <Head>
        <title>Eventos</title>
      </Head>
      <div className="p-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <EventCard titleEvent="Feria de Innovación" date="25 Ago, 10:00 AM" place="Centro de Convenciones" />
          <ListCard title="Agenda" items={[{id:'1', text:'Registro'},{id:'2', text:'Conferencia apertura'},{id:'3', text:'Networking'}]} />
        </div>
      </div>
    </>
  );
}
