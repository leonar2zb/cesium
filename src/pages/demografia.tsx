import Head from 'next/head';
import { DemographicsDonut, ListCard } from '@/Components/Widgets/Widgets';

export default function DemografiaPage() {
  return (
    <>
      <Head>
        <title>Demografía</title>
      </Head>
      <div className="p-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DemographicsDonut a={32} b={48} c={20} />
          <ListCard title="Datos clave" items={[{id:'1', text:'Población 1.2M'},{id:'2', text:'Crecimiento 1.8%'},{id:'3', text:'Densidad 3,500/km²'}]} />
        </div>
      </div>
    </>
  );
}
