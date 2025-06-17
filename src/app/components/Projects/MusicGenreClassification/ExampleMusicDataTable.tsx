import React from 'react';

interface RowHighlight {
  id: number;
  left: number;
  top: number;
  height: number;
  width: number;
  opacity: number;
}

interface Music {
  ArtistName: string;
  TrackName: string;
  key: number;
  mode: number;
  Popularity: number;
  acousticness: number;
  durationInMinMs: number;
  energy: number;
  instrumentalness: number;
  liveness: number;
  loudness: number;
  speechiness: number;
  tempo: number;
  timeSignature: number;
  valence: number;
}

interface Props {
  data: Music[];
  rowRefs: React.RefObject<{ [key: number]: HTMLElement | null }>;
  tableRef: React.RefObject<HTMLDivElement>;
  rowHighlights: RowHighlight[];
}

const ExampleMusicDataTable: React.FC<Props> = ({ data, rowRefs, tableRef, rowHighlights }) => {
  return (
    <div ref={tableRef} className="relative">
      <table className="min-w-full bg-white/10 rounded-lg">
      <thead className="bg-white/20">
          <tr>
            <th className="px-4 py-2 text-white text-left">Artist Name</th>
            <th className="px-4 py-2 text-white text-left">Track Name</th>
            <th className="px-4 py-2 text-white text-left">Key</th>
            <th className="px-4 py-2 text-white text-left">Mode</th>
            <th className="px-4 py-2 text-white text-left">Popularity</th>
            <th className="px-4 py-2 text-white text-left">Acousticness</th>
            <th className="px-4 py-2 text-white text-left">Duration</th>
            <th className="px-4 py-2 text-white text-left">Energy</th>
            <th className="px-4 py-2 text-white text-left">Instrumentalness</th>
            <th className="px-4 py-2 text-white text-left">Liveness</th>
            <th className="px-4 py-2 text-white text-left">Loudness</th>
            <th className="px-4 py-2 text-white text-left">Speechiness</th>
            <th className="px-4 py-2 text-white text-left">Tempo</th>
            <th className="px-4 py-2 text-white text-left">Time Signature</th>
            <th className="px-4 py-2 text-white text-left">Valence</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              ref={el => rowRefs.current[rowIndex] = el}
              className="bw-full table-fixed border-t border-white/20 border-collapse"
            >
              <td className="px-4 py-2 text-white/60">{row.ArtistName}</td>
              <td className="px-4 py-2 text-white/60">{row.TrackName}</td>
              <td className="px-4 py-2 text-white/60">{row.key}</td>
              <td className="px-4 py-2 text-white/60">{row.mode}</td>
              <td className="px-4 py-2 text-white/60">{row.Popularity}</td>
              <td className="px-4 py-2 text-white/60">{row.acousticness}</td>
              <td className="px-4 py-2 text-white/60">{row.durationInMinMs}</td>
              <td className="px-4 py-2 text-white/60">{row.energy}</td>
              <td className="px-4 py-2 text-white/60">{row.instrumentalness}</td>
              <td className="px-4 py-2 text-white/60">{row.liveness}</td>
              <td className="px-4 py-2 text-white/60">{row.loudness}</td>
              <td className="px-4 py-2 text-white/60">{row.speechiness}</td>
              <td className="px-4 py-2 text-white/60">{row.tempo}</td>
              <td className="px-4 py-2 text-white/60">{row.timeSignature}</td>
              <td className="px-4 py-2 text-white/60">{row.valence}</td>
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

      <p className="mt-4 mb-2 text-sm text-white/70 text-center">
        Note: This data represents a song characteristics.
      </p>
    </div>
  );
};

export default ExampleMusicDataTable;