import Head from 'next/head';
import { TourismSpotlight, StatCard } from '@/Components/Widgets/Widgets';

export default function TurismoPage() {
  return (
    <>
      <Head>
        <title>Turismo</title>
      </Head>
      <div className="p-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TourismSpotlight place="Malecón" score={9} />
          <StatCard label="Visitantes hoy" value="3,420" delta="+12%" positive />
        </div>
      </div>
    </>
  );
}
