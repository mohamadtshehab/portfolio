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
  price: number;
}

interface Props {
  data: Diamond[];
  rowRefs: React.RefObject<{ [key: number]: HTMLElement | null }>;
  tableRef: React.RefObject<HTMLDivElement>;
  rowHighlights: RowHighlight[];
}

const DiamondDataTable: React.FC<Props> = ({ data, rowRefs, tableRef }) => {
  return (
    <div ref={tableRef} className="relative">
      <table className="min-w-full bg-white/10 rounded-lg">
        <thead className="bg-white/20">
          <tr>
            <th className="px-4 py-2 text-white text-left">Carat</th>
            <th className="px-4 py-2 text-white text-left">Cut</th>
            <th className="px-4 py-2 text-white text-left">Color</th>
            <th className="px-4 py-2 text-white text-left">Clarity</th>
            <th className="px-4 py-2 text-white text-left">Depth</th>
            <th className="px-4 py-2 text-white text-left">Table</th>
            <th className="px-4 py-2 text-white text-left">X</th>
            <th className="px-4 py-2 text-white text-left">Y</th>
            <th className="px-4 py-2 text-white text-left">Z</th>
            <th className="px-4 py-2 text-white text-left font-bold">Price</th>
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
              <td className="px-4 py-2 text-white/60">{row.price}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="mt-4 text-sm text-white/70 text-center">
        Note: This data represents a sample of the diamond dataset.
      </p>
    </div>
  );
};

export default DiamondDataTable;