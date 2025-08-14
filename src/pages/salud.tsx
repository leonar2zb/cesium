import Head from 'next/head';
import { HealthGauge, ListCard } from '@/Components/Widgets/Widgets';

export default function SaludPage() {
  return (
    <>
      <Head>
        <title>Salud</title>
      </Head>
      <div className="p-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <HealthGauge label="Estado general" value={76} />
          <ListCard title="Indicadores" items={[{id:'1', text:'Vacunación 92%'},{id:'2', text:'Camas disponibles 68%'},{id:'3', text:'Tiempo espera 15m'}]} />
        </div>
      </div>
    </>
  );
}
