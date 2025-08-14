import { NextPage } from 'next';
import Head from 'next/head';
import { StatCard, TrendCard } from '@/Components/Widgets/Widgets';

const Dashboard: NextPage = () => {
  return (
    <>
      <Head>
        <title>Dashboard en Kunaverso</title>
      </Head>
      <div className="p-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <StatCard label="Usuarios activos" value="1,248" delta="+8%" positive />
          <TrendCard title="Engagement" points={[3,5,4,6,8,7,10,12]} />
        </div>
      </div>
    </>
  );
};

export default Dashboard;