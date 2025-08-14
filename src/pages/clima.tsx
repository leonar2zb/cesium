import Head from 'next/head';
import { WeatherCard, TrendCard } from '@/Components/Widgets/Widgets';

export default function ClimaPage() {
  return (
    <>
      <Head>
        <title>Clima</title>
      </Head>
      <div className="p-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <WeatherCard city="La Habana" tempC={29} status="Soleado con nubes" />
          <TrendCard title="Temperatura semanal" points={[28,29,31,30,29,27,28]} />
        </div>
      </div>
    </>
  );
}
