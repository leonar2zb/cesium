import Head from 'next/head';
import { TransportSchedule, StatCard } from '@/Components/Widgets/Widgets';

export default function TransportePage() {
  return (
    <>
      <Head>
        <title>Transporte</title>
      </Head>
      <div className="p-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TransportSchedule line="Línea A" next={["2 min","7 min","15 min"]} />
          <StatCard label="Ocupación promedio" value="67%" delta="+5%" positive />
        </div>
      </div>
    </>
  );
}
