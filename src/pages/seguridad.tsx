import Head from 'next/head';
import { SecurityAlertCard, TrendCard } from '@/Components/Widgets/Widgets';

export default function SeguridadPage() {
  return (
    <>
      <Head>
        <title>Seguridad</title>
      </Head>
      <div className="p-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SecurityAlertCard level="Medio" incidents={12} />
          <TrendCard title="Incidentes semanales" points={[2,1,3,4,2,5,3]} />
        </div>
      </div>
    </>
  );
}
