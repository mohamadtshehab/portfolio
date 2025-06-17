import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

interface Props {
  predictedClass: string | null;
  isAnimated: boolean;
}

const ClassDisplay: React.FC<Props> = ({ predictedClass, isAnimated }) => {
  const formattedClass = predictedClass !== null ? predictedClass : '—';

  return (
    <div
      className={`w-full mt-2 transition-all duration-700 ${
        isAnimated ? 'translate-y-0 opacity-100' : 'translate-y-[-30px] opacity-0'
      }`}
      style={{ transformOrigin: 'top' }}
    >
      <h4 className="text-white font-semibold mb-2">Predicted Class:</h4>
      <div className="bg-black/30 rounded-lg overflow-hidden">
        <SyntaxHighlighter
          language="plaintext"
          style={atomOneDark}
          customStyle={{
            margin: 0,
            padding: '0.75rem',
            fontSize: '0.8125rem',
            borderRadius: '0.375rem',
            fontFamily: 'monospace',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            textAlign: 'center' as const,
          }}
        >
          {formattedClass}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default ClassDisplay;