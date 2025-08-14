import React from 'react';

// Shared card container with translucent black theme to match the app
export const WidgetCard: React.FC<{ title: string; className?: string; children: React.ReactNode }> = ({ title, className = '', children }) => (
  <div className={`bg-black/60 text-white border border-white/10 backdrop-blur-sm rounded-2xl shadow-xl p-5 ${className}`}>
    <div className="flex items-center justify-between mb-3">
      <h3 className="text-sm font-semibold tracking-wide text-white/90">{title}</h3>
      <span className="inline-flex items-center justify-center w-6 h-6 rounded bg-white/10 text-white/80 text-[10px]">UI</span>
    </div>
    {children}
  </div>
);

export const StatCard: React.FC<{ label: string; value: string; delta?: string; positive?: boolean }> = ({ label, value, delta, positive }) => (
  <WidgetCard title={label}>
    <div className="flex items-end gap-3">
      <div>
        <div className="text-3xl font-bold">{value}</div>
      </div>
      {delta && (
        <div className={`text-xs px-2 py-1 rounded self-center ${positive ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'}`}>
          {positive ? '▲' : '▼'} {delta}
        </div>
      )}
    </div>
  </WidgetCard>
);

export const TrendCard: React.FC<{ title: string; points?: number[] }> = ({ title, points = [4, 6, 5, 7, 9, 8, 12, 10] }) => {
  // Simple sparkline-like SVG based on points
  const width = 220;
  const height = 70;
  const max = Math.max(...points);
  const min = Math.min(...points);
  const coords = points.map((p, i) => {
    const x = (i / (points.length - 1)) * width;
    const y = height - ((p - min) / (max - min || 1)) * height;
    return `${x},${y}`;
  }).join(' ');
  return (
    <WidgetCard title={title}>
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-[70px]"><polyline points={coords} fill="none" stroke="currentColor" className="text-emerald-300" strokeWidth="2"/></svg>
      <div className="text-xs text-white/70">Tendencia de los últimos 7 días</div>
    </WidgetCard>
  );
};

export const ListCard: React.FC<{ title: string; items: { id: string; text: string }[] }> = ({ title, items }) => (
  <WidgetCard title={title}>
    <ul className="space-y-2">
      {items.map((it) => (
        <li key={it.id} className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-white/50"/>
          <span className="text-sm text-white/90">{it.text}</span>
        </li>
      ))}
    </ul>
  </WidgetCard>
);

export const WeatherCard: React.FC<{ city: string; tempC: number; status: string }>= ({ city, tempC, status }) => (
  <WidgetCard title={`Clima • ${city}`}>
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
        <svg className="w-7 h-7 text-yellow-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M18.36 5.64l1.42-1.42M4.22 19.78l1.42-1.42"/></svg>
      </div>
      <div>
        <div className="text-3xl font-bold">{tempC}°C</div>
        <div className="text-sm text-white/70">{status}</div>
      </div>
    </div>
  </WidgetCard>
);

export const EventCard: React.FC<{ titleEvent: string; date: string; place: string }>= ({ titleEvent, date, place }) => (
  <WidgetCard title="Próximo evento">
    <div className="space-y-1">
      <div className="text-white font-medium">{titleEvent}</div>
      <div className="text-white/80 text-sm">{date}</div>
      <div className="text-white/60 text-sm">{place}</div>
    </div>
  </WidgetCard>
);

export const SecurityAlertCard: React.FC<{ level: 'Bajo'|'Medio'|'Alto'; incidents: number }>= ({ level, incidents }) => (
  <WidgetCard title="Seguridad">
    <div className="flex items-center justify-between">
      <div className="text-sm text-white/70">Nivel</div>
      <div className={`px-2 py-1 rounded text-xs ${level==='Alto'?'bg-rose-500/20 text-rose-300': level==='Medio'?'bg-amber-500/20 text-amber-300':'bg-emerald-500/20 text-emerald-300'}`}>{level}</div>
    </div>
    <div className="mt-3 text-2xl font-bold">{incidents} incidentes</div>
  </WidgetCard>
);

export const HealthGauge: React.FC<{ label: string; value: number }>= ({ label, value }) => {
  const deg = Math.round((value/100)*360);
  return (
    <WidgetCard title={label}>
      <div className="w-28 h-28 rounded-full mx-auto relative" style={{ background: `conic-gradient(#34d399 ${deg}deg, rgba(255,255,255,0.1) 0deg)` }}>
        <div className="absolute inset-2 rounded-full bg-black/60 border border-white/10 flex items-center justify-center">
          <span className="text-xl font-semibold">{value}%</span>
        </div>
      </div>
      <div className="mt-2 text-center text-sm text-white/70">Índice de salud</div>
    </WidgetCard>
  );
};

export const TourismSpotlight: React.FC<{ place: string; score: number }>= ({ place, score }) => (
  <WidgetCard title="Spotlight turístico">
    <div className="aspect-video rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/70 mb-3">Imagen/Mapa</div>
    <div className="flex items-center justify-between">
      <div className="font-medium">{place}</div>
      <div className="text-sm px-2 py-1 rounded bg-white/10">{score}/10</div>
    </div>
  </WidgetCard>
);

export const DemographicsDonut: React.FC<{ a: number; b: number; c: number }>= ({ a, b, c }) => {
  const total = a+b+c || 1;
  const aDeg = (a/total)*360;
  const bDeg = (b/total)*360;
  return (
    <WidgetCard title="Demografía (grupo etario)">
      <div className="w-28 h-28 rounded-full mx-auto relative" style={{ background: `conic-gradient(#60a5fa ${aDeg}deg, #f472b6 0 ${aDeg+bDeg}deg, #34d399 0)` }}>
        <div className="absolute inset-2 rounded-full bg-black/60 border border-white/10"/>
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2 text-[11px] text-white/80">
        <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-400"/>Jóvenes</div>
        <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-pink-400"/>Adultos</div>
        <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-400"/>Mayores</div>
      </div>
    </WidgetCard>
  );
};

export const ServiceStatusGrid: React.FC<{ services: { name: string; up: boolean }[] }>= ({ services }) => (
  <WidgetCard title="Servicios">
    <div className="grid grid-cols-2 gap-3">
      {services.map((s) => (
        <div key={s.name} className="flex items-center gap-2 p-2 rounded border border-white/10 bg-white/5">
          <span className={`w-2 h-2 rounded-full ${s.up?'bg-emerald-400':'bg-rose-400'}`}/>
          <span className="text-sm text-white/90">{s.name}</span>
        </div>
      ))}
    </div>
  </WidgetCard>
);

export const AQICard: React.FC<{ aqi: number }>= ({ aqi }) => (
  <WidgetCard title="Calidad del aire (AQI)">
    <div className="text-3xl font-bold mb-2">{aqi}</div>
    <div className="w-full h-2 bg-white/10 rounded">
      <div className="h-2 rounded bg-emerald-400" style={{ width: `${Math.min(100, aqi)}%` }}/>
    </div>
    <div className="text-xs text-white/70 mt-2">0-50 Bueno • 51-100 Moderado • 101+ Insalubre</div>
  </WidgetCard>
);

export const TransportSchedule: React.FC<{ line: string; next: string[] }>= ({ line, next }) => (
  <WidgetCard title={`Próximas salidas • ${line}`}>
    <div className="space-y-2">
      {next.map((t, i) => (
        <div key={i} className="flex items-center justify-between p-2 rounded bg-white/5 border border-white/10">
          <span className="text-sm text-white/90">Parada #{i+1}</span>
          <span className="text-sm font-semibold">{t}</span>
        </div>
      ))}
    </div>
  </WidgetCard>
);
