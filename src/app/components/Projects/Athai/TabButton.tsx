import React from 'react';

interface TabButtonProps {
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

const TabButton = ({ isActive, onClick, children }: TabButtonProps) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-full transition-all duration-200 ${
      isActive
        ? 'bg-white/10 text-white shadow-md border border-white'
        : 'bg-white/10 text-white border border-white/20 shadow-md hover:bg-white/20 hover:text-white hover:border-white hover:scale-105'
    }`}
  >
    {children}
  </button>
);

export default TabButton;