import Head from 'next/head';
import { ServiceStatusGrid, StatCard } from '@/Components/Widgets/Widgets';

export default function ServiciosPage() {
  return (
    <>
      <Head>
        <title>Servicios</title>
      </Head>
      <div className="p-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ServiceStatusGrid services={[{name:'Agua', up:true},{name:'Electricidad', up:false},{name:'Internet', up:true},{name:'Recolección', up:true}]} />
          <StatCard label="SLA Promedio" value="98.2%" delta="-0.3%" />
        </div>
      </div>
    </>
  );
}
