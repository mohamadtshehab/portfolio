import React from 'react';

interface Props {
  onClick: () => void;
}

const ProcessButton: React.FC<Props> = ({ onClick }) => (
  <div className="mt-4 flex justify-center">
    <button
      onClick={onClick}
      className="hover:bg-white/10 hover:scale-105 active:scale-95 hover:shadow-lg text-white px-8 py-3 rounded-xl flex items-center gap-3 transition-all duration-200 border border-white border-opacity-30"
    >
      <span className="font-semibold">Process</span>
    </button>
  </div>
);

export default ProcessButton;