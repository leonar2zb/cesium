import Head from 'next/head';
import { AQICard, TrendCard } from '@/Components/Widgets/Widgets';

export default function MedioAmbientePage() {
  return (
    <>
      <Head>
        <title>Medio Ambiente</title>
      </Head>
      <div className="p-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AQICard aqi={42} />
          <TrendCard title="Consumo energético" points={[60,58,55,52,50,48,47]} />
        </div>
      </div>
    </>
  );
}
