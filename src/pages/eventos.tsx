import Head from 'next/head';
import { useState } from 'react';
import { EventCard, ListCard } from '@/Components/Widgets/Widgets';

export default function EventosPage() {
  const [altEvent, setAltEvent] = useState(false);
  const [altList, setAltList] = useState(false);

  return (
    <>
      <Head>
        <title>Eventos</title>
      </Head>
      <div className="p-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div role="button" aria-label="Alternar evento" onClick={() => setAltEvent(v=>!v)} className="cursor-pointer select-none">
            {altEvent ? (
              <EventCard titleEvent="Expo Tecnología" date="30 Sep, 9:00 AM" place="Parque Tecnológico" />
            ) : (
              <EventCard titleEvent="Feria de Innovación" date="25 Ago, 10:00 AM" place="Centro de Convenciones" />
            )}
          </div>
          <div role="button" aria-label="Alternar lista" onClick={() => setAltList(v=>!v)} className="cursor-pointer select-none">
            {altList ? (
              <ListCard title="Asistentes" items={[{id:'1', text:'Empresas'},{id:'2', text:'Startups'},{id:'3', text:'Inversores'}]} />
            ) : (
              <ListCard title="Agenda" items={[{id:'1', text:'Registro'},{id:'2', text:'Conferencia apertura'},{id:'3', text:'Networking'}]} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
