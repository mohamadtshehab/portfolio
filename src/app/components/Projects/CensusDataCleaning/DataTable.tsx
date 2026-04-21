import React, { RefObject } from 'react';

interface RowHighlight {
  id: number;
  left: number;
  top: number;
  height: number;
  width: string | number;
  opacity: number;
}

interface CensusRowData {
  id: number;
  name: string; // Head of Household Name
  houseCondition: string; // Original House Condition
  femaleOrphans: number; // # Female Orphans (assuming it's a number)
  otherCases: string; // Other Cases? (assuming it's a string like 'Yes'/'No')
  specifyOtherCases: string; // Specify Other Cases
  [key: string]: unknown; // FIX: Use 'unknown' for type safety
  }

interface Props {
  data: CensusRowData[]; 
  rowRefs: React.RefObject<{ [key: number]: HTMLElement | null }>;
  tableRef: RefObject<HTMLDivElement | null>;
  rowHighlights: RowHighlight[];
}

const CensusDataTable: React.FC<Props> = ({ data, rowRefs, tableRef, rowHighlights }) => {
  return (
    <div ref={tableRef} className="relative max-w-full overflow-x-auto">
      <table className="min-w-max bg-white/10 rounded-lg">
        <thead className="bg-white/20">
          <tr>
            <th className="px-4 py-2 text-left text-white">ID</th>
            <th className="px-4 py-2 text-left text-white">Head of Household Name</th>
            <th className="px-4 py-2 text-left text-white">Original House Condition</th>
            <th className="px-4 py-2 text-left text-white"># Female Orphans</th>
            <th className="px-4 py-2 text-left text-white">Other Cases?</th>
            <th className="px-4 py-2 text-left text-white">Specify Other Cases</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={row.id}
              ref={(el) => { rowRefs.current[rowIndex] = el; }}
              className="border-t border-white/20"
            >
              <td className="px-4 py-2 font-medium text-white/60">{row.id}</td>
              <td className="px-4 py-2 text-white/60">{row.name}</td>
              <td className="px-4 py-2 text-white/60">{row.houseCondition}</td>
              <td className="px-4 py-2 text-white/60">{row.femaleOrphans}</td>
              <td className="px-4 py-2 text-white/60">{row.otherCases}</td>
              <td className="px-4 py-2 text-white/60">{row.specifyOtherCases}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Highlight Layer */}
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
        Note: This data is reduced, fabricated, and created for demonstration purposes only to protect privacy.
      </p>
    </div>
  );
};

export default CensusDataTable;
