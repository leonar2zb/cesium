import { NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import { StatCard, TrendCard, ListCard } from '@/Components/Widgets/Widgets';

const Dashboard: NextPage = () => {
  const [altUsers, setAltUsers] = useState(false);
  const [altTrend, setAltTrend] = useState(false);

  return (
    <>
      <Head>
        <title>Dashboard en Kunaverso</title>
      </Head>
      <div className="p-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            role="button"
            aria-label="Cambiar métrica de usuarios"
            onClick={() => setAltUsers((v) => !v)}
            className="cursor-pointer select-none"
          >
            {altUsers ? (
              <StatCard label="Sesiones" value="2,934" delta="+3%" positive />
            ) : (
              <StatCard label="Usuarios activos" value="1,248" delta="+8%" positive />
            )}
          </div>

          <div
            role="button"
            aria-label="Alternar tendencia"
            onClick={() => setAltTrend((v) => !v)}
            className="cursor-pointer select-none"
          >
            {altTrend ? (
              <ListCard title="Notas" items={[{id:'1', text:'Crecimiento estable'},{id:'2', text:'Pico por campaña'},{id:'3', text:'Retención mejora'}]} />
            ) : (
              <TrendCard title="Engagement" points={[3,5,4,6,8,7,10,12]} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;