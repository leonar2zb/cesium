import React from 'react';

interface WidgetProps {
  title: string;
  children: React.ReactNode;
}

const Widget: React.FC<WidgetProps> = ({ title, children }) => {
  return (
    <div className="bg-gradient-to-br from-[#23272f] to-[#181a20] border border-[#2c313c] shadow-xl rounded-2xl p-8 w-full max-w-md mx-auto flex flex-col items-center justify-center text-white backdrop-blur-md" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 100 }}>
      <h2 className="text-2xl font-bold mb-4 text-[#6ee7b7] drop-shadow-lg">{title}</h2>
      <div className="text-base text-white/90 text-center">
        {children}
      </div>
    </div>
  );
};

export default Widget;

