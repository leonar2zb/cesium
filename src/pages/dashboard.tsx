import { NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import { StatCard, TrendCard, ListCard, WidgetCard } from '@/Components/Widgets/Widgets';

const Dashboard: NextPage = () => {
  // KPI toggles
  const [kpiA, setKpiA] = useState(false);
  const [kpiB, setKpiB] = useState(false);
  const [kpiC, setKpiC] = useState(false);
  const [kpiD, setKpiD] = useState(false);

  // Trend tabs
  const [trendTab, setTrendTab] = useState<'eng'|'conv'|'ret'>('eng');

  // Collapsible list
  const [openList, setOpenList] = useState(true);

  // Dismissible announcements
  const [showAnn, setShowAnn] = useState(true);

  // Modal and Slide-over
  const [showModal, setShowModal] = useState(false);
  const [showSlide, setShowSlide] = useState(false);

  // Expandable map panel
  const [expandMap, setExpandMap] = useState(false);

  // Helper: trends datasets
  const trendData = {
    eng: [3,5,4,6,8,7,10,12],
    conv: [1,2,1,3,4,3,5,6],
    ret: [8,7,7,8,9,9,10,11]
  };

  return (
    <>
      <Head>
        <title>Dashboard en Kunaverso</title>
      </Head>

      <div className="p-2">
        {/* KPIs Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {[
            {label: kpiA ? 'Sesiones' : 'Usuarios activos', value: kpiA ? '2,934' : '1,248', delta: kpiA ? '+3%' : '+8%', pos: true, toggle: () => setKpiA(v=>!v), aria: 'Alternar KPI A'},
            {label: kpiB ? 'Ingresos' : 'MRR', value: kpiB ? '$48.9k' : '$52.3k', delta: kpiB ? '-2%' : '+5%', pos: !kpiB, toggle: () => setKpiB(v=>!v), aria: 'Alternar KPI B'},
            {label: kpiC ? 'Tickets cerrados' : 'NPS', value: kpiC ? '1,102' : '72', delta: kpiC ? '+11%' : '+2', pos: true, toggle: () => setKpiC(v=>!v), aria: 'Alternar KPI C'},
            {label: kpiD ? 'Tasa rebote' : 'Conversion', value: kpiD ? '34%' : '4.3%', delta: kpiD ? '-1.2%' : '+0.6%', pos: !kpiD, toggle: () => setKpiD(v=>!v), aria: 'Alternar KPI D'},
          ].map((k, i) => (
            <button
              key={i}
              onClick={k.toggle}
              aria-label={k.aria}
              className="text-left group transform transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl"
            >
              <StatCard label={k.label} value={k.value} delta={k.delta} positive={k.pos} />
            </button>
          ))}
        </div>

        {/* Middle Grid: trends, list, announcements, controls */}
        <div className="mt-4 grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Trend with tabs */}
          <div className="lg:col-span-6">
            <WidgetCard title="Métricas (tabs)">
              <div className="flex items-center gap-2 mb-3">
                {[
                  {id:'eng', label:'Engagement'},
                  {id:'conv', label:'Conversion'},
                  {id:'ret', label:'Retención'}
                ].map(t => (
                  <button
                    key={t.id}
                    onClick={() => setTrendTab(t.id as any)}
                    className={`px-3 py-1 rounded text-xs transition-colors ${trendTab===t.id ? 'bg-emerald-500/20 text-emerald-200' : 'bg-white/10 text-white/70 hover:text-white'}`}
                    aria-label={`Mostrar ${t.label}`}
                  >{t.label}</button>
                ))}
              </div>
              <div className="transition-all">
                <TrendCard title={`Tendencia • ${trendTab.toUpperCase()}`} points={trendData[trendTab]} />
              </div>
            </WidgetCard>
          </div>

          {/* Collapsible list */}
          <div className="lg:col-span-3">
            <WidgetCard title="Tareas">
              <button
                onClick={() => setOpenList(v=>!v)}
                className="mb-2 text-xs px-2 py-1 rounded bg-white/10 hover:bg-white/15 transition-colors"
                aria-expanded={openList}
                aria-controls="task-list"
              >{openList ? 'Ocultar' : 'Mostrar'} lista</button>
              <div id="task-list" className={`overflow-hidden transition-all duration-300 ${openList ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}>
                <ListCard title="Hoy" items={[
                  {id:'1', text:'Revisar alertas'},
                  {id:'2', text:'Actualizar métricas'},
                  {id:'3', text:'Preparar informe'}
                ]} />
              </div>
            </WidgetCard>
          </div>

          {/* Dismissible announcements */}
          <div className="lg:col-span-3">
            {showAnn && (
              <div className="relative">
                <button
                  onClick={() => setShowAnn(false)}
                  aria-label="Cerrar anuncios"
                  className="absolute top-2 right-2 z-10 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded px-2 py-0.5 text-xs"
                >×</button>
                <WidgetCard title="Anuncios" className="transition-all duration-300">
                  <ul className="space-y-2 text-sm">
                    <li className="bg-white/5 border border-white/10 rounded p-2">Nuevo release disponible</li>
                    <li className="bg-white/5 border border-white/10 rounded p-2">Mantenimiento sábado 02:00AM</li>
                    <li className="bg-white/5 border border-white/10 rounded p-2">Se habilitó el perfil global</li>
                  </ul>
                </WidgetCard>
              </div>
            )}
            {!showAnn && (
              <button onClick={() => setShowAnn(true)} className="w-full text-left px-3 py-2 text-white/80 hover:text-white bg-black/40 border border-white/10 rounded-lg backdrop-blur-sm">Mostrar anuncios</button>
            )}
          </div>
        </div>

        {/* Expandable Map row */}
        <div className="mt-4 grid grid-cols-1 lg:grid-cols-12 gap-4">
          <div className={`${expandMap ? 'lg:col-span-12' : 'lg:col-span-8'} transition-all`}>
            <WidgetCard title="Mapa de calor">
              <div className="aspect-[16/9] rounded-lg border border-white/10 bg-white/5 flex items-center justify-center text-white/70 mb-3">Mapa/Gráfico</div>
              <div className="flex items-center gap-2">
                <button onClick={() => setExpandMap(v=>!v)} className="px-3 py-1 rounded text-xs bg-white/10 hover:bg-white/15 transition-colors" aria-label="Alternar tamaño del mapa">{expandMap ? 'Reducir' : 'Expandir'}</button>
                <button onClick={() => setShowModal(true)} className="px-3 py-1 rounded text-xs bg-emerald-500/20 text-emerald-200 hover:bg-emerald-500/30 transition-colors" aria-label="Abrir detalles">Detalles</button>
              </div>
            </WidgetCard>
          </div>

          {/* Control Center */}
          <div className={`${expandMap ? 'lg:col-span-12' : 'lg:col-span-4'} transition-all`}>
            <WidgetCard title="Centro de control">
              <div className="grid grid-cols-2 gap-2">
                <button onClick={() => setShowSlide(true)} className="p-3 rounded bg-white/10 hover:bg-white/15 transition-all hover:-translate-y-0.5">Panel lateral</button>
                <button onClick={() => setShowModal(true)} className="p-3 rounded bg-white/10 hover:bg-white/15 transition-all hover:-translate-y-0.5">Abrir modal</button>
                <button onClick={() => setTrendTab('eng')} className="p-3 rounded bg-white/10 hover:bg-white/15">Eng</button>
                <button onClick={() => setTrendTab('conv')} className="p-3 rounded bg-white/10 hover:bg-white/15">Conv</button>
                <button onClick={() => setTrendTab('ret')} className="p-3 rounded bg-white/10 hover:bg-white/15">Ret</button>
                <button onClick={() => setOpenList(v=>!v)} className="p-3 rounded bg-white/10 hover:bg-white/15">Lista</button>
              </div>
            </WidgetCard>
          </div>
        </div>
      </div>

      {/* Center Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[10070] flex items-center justify-center">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowModal(false)} aria-hidden></div>
          <div className="relative z-[10071] w-full max-w-xl mx-auto bg-black/70 text-white border border-white/10 rounded-2xl shadow-2xl p-6 backdrop-blur-sm animate-[fadeIn_200ms_ease-out]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Detalles del mapa</h3>
              <button onClick={() => setShowModal(false)} className="text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded px-2 py-0.5 text-sm" aria-label="Cerrar">×</button>
            </div>
            <div className="space-y-3 text-sm">
              <p>Interacciones recientes, hotspots y métricas relevantes.</p>
              <ul className="grid grid-cols-2 gap-2">
                <li className="bg-white/5 border border-white/10 rounded p-2">Hotspot A • 78%</li>
                <li className="bg-white/5 border border-white/10 rounded p-2">Hotspot B • 64%</li>
                <li className="bg-white/5 border border-white/10 rounded p-2">Hotspot C • 51%</li>
                <li className="bg-white/5 border border-white/10 rounded p-2">Hotspot D • 32%</li>
              </ul>
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button onClick={() => setShowModal(false)} className="px-3 py-1 rounded bg-white/10 hover:bg-white/15">Cerrar</button>
              <button onClick={() => setShowSlide(true)} className="px-3 py-1 rounded bg-emerald-500/20 text-emerald-200 hover:bg-emerald-500/30">Abrir panel</button>
            </div>
          </div>
        </div>
      )}

      {/* Slide-over Panel */}
      <div className={`fixed inset-y-0 right-0 z-[10070] w-80 max-w-[90vw] transform transition-transform duration-300 ${showSlide ? 'translate-x-0' : 'translate-x-full'}`} role="dialog" aria-label="Panel lateral">
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowSlide(false)} aria-hidden></div>
        <div className="relative h-full bg-black/70 text-white border-l border-white/10 backdrop-blur-sm p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold">Panel lateral</h3>
            <button onClick={() => setShowSlide(false)} className="text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded px-2 py-0.5 text-xs" aria-label="Cerrar">×</button>
          </div>
          <ListCard title="Eventos recientes" items={[
            {id:'1', text:'Usuario inició sesión'},
            {id:'2', text:'Actualización de perfil'},
            {id:'3', text:'Nuevo reporte generado'}
          ]} />
        </div>
      </div>
    </>
  );
};

export default Dashboard;