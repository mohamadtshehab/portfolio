import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

interface Props {
  errors: Array<{ id: number; errors: string[] }>; // Adjust based on actual structure
  isAnimated: boolean;
}

const ErrorDisplay: React.FC<Props> = ({ errors, isAnimated }) => {
  const filteredErrors = errors.reduce((acc, row) => {
    const id = row.id.toString();

    // Ensure errors is an array before filtering
    const errorList = Array.isArray(row.errors) ? row.errors : [];

    const filtered = errorList.filter(e => e !== '(None)');
    if (filtered.length > 0) {
      acc[id] = filtered;
    }
    return acc;
  }, {} as Record<string, string[]>);

  return (
    <div
      className={`w-full mt-2 transition-all duration-1000 ${
        isAnimated ? 'translate-y-0 opacity-100' : 'translate-y-[-30px] opacity-0'
      }`}
      style={{ transformOrigin: 'top' }}
    >
      <h4 className="text-white font-semibold mb-2">Validation Errors:</h4>
      <div className="bg-black/30 rounded-lg overflow-hidden">
        <SyntaxHighlighter
          language="json"
          style={atomOneDark}
          customStyle={{
            margin: 0,
            padding: '0.75rem',
            fontSize: '0.8125rem',
            borderRadius: '0.375rem',
            fontFamily: 'monospace',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
          }}
        >
          {JSON.stringify(filteredErrors, null, 2)}
        </SyntaxHighlighter>
      </div>
      <p className="text-white mt-1.5 text-xs">
        {Object.keys(filteredErrors).length > 0
          ? 'Validation errors grouped by row ID'
          : 'No validation errors found'}
      </p>
    </div>
  );
};

export default ErrorDisplay;