import React from 'react';

interface RowHighlight {
  id: number;
  left: number;
  top: number;
  height: number;
  width: string | number;
  opacity: number;
}

interface Diamond {
  carat: number;
  cut: string;
  color: string;
  clarity: string;
  depth: number;
  table: number;
  x: number;
  y: number;
  z: number;
}

interface Props {
  data: Diamond[];
  rowRefs: React.RefObject<{ [key: number]: HTMLElement | null }>;
  tableRef: React.RefObject<HTMLDivElement>;
  rowHighlights: RowHighlight[];
}

const DiamondDataTable: React.FC<Props> = ({ data, rowRefs, tableRef, rowHighlights }) => {
  return (
    <div ref={tableRef} className="relative">
      <table className="min-w-full bg-white/10 rounded-lg">
        <thead className="bg-white/20">
          <tr>
            <th className="px-4 py-2 text-left text-white">Carat</th>
            <th className="px-4 py-2 text-left text-white">Cut</th>
            <th className="px-4 py-2 text-left text-white">Color</th>
            <th className="px-4 py-2 text-left text-white">Clarity</th>
            <th className="px-4 py-2 text-left text-white">Depth</th>
            <th className="px-4 py-2 text-left text-white">Table</th>
            <th className="px-4 py-2 text-left text-white">X</th>
            <th className="px-4 py-2 text-left text-white">Y</th>
            <th className="px-4 py-2 text-left text-white">Z</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              ref={el => rowRefs.current[rowIndex] = el}
              className="border-t border-white/20"
            >
              <td className="px-4 py-2 text-white/60">{row.carat}</td>
              <td className="px-4 py-2 text-white/60">{row.cut}</td>
              <td className="px-4 py-2 text-white/60">{row.color}</td>
              <td className="px-4 py-2 text-white/60">{row.clarity}</td>
              <td className="px-4 py-2 text-white/60">{row.depth}</td>
              <td className="px-4 py-2 text-white/60">{row.table}</td>
              <td className="px-4 py-2 text-white/60">{row.x}</td>
              <td className="px-4 py-2 text-white/60">{row.y}</td>
              <td className="px-4 py-2 text-white/60">{row.z}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="absolute inset-0 pointer-events-none">
        {rowHighlights.map((highlight, idx) => (
          <div
            key={idx}
            className="absolute h-full bg-white/10 rounded transition-all duration-800 ease-linear"
            style={{
              left: highlight.left,
              top: highlight.top,
              width: highlight.width,
              height: highlight.height,
              opacity: highlight.opacity,
              transform: 'translateZ(0)',
              willChange: 'transform, width, opacity'
            }}
          />
        ))}
      </div>

      <p className="mt-4 text-sm text-white/70 text-center">
        Note: This data represents a diamond characteristics.
      </p>
    </div>
  );
};

export default DiamondDataTable;