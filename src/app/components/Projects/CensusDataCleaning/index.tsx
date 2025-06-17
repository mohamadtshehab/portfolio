import React, { useState } from 'react';
import DataTable from './DataTable';
import ErrorDisplay from './ErrorDisplay';
import ProcessButton from '../MainComponents/ProcessButton';
import useRowAnimation from './useRowAnimation';
import censusData from './Data';

const CensusDataCleaning = () => {
    const [processing, setProcessing] = useState(false);
    const [showErrors, setShowErrors] = useState(false);
    const [jsonAnimate, setJsonAnimate] = useState(false);
    const [rowHighlightsKey, setRowHighlightsKey] = useState(0); // Key to reset animation
  
    const onCompleteAnimation = () => {
      setProcessing(false);
      setShowErrors(true);
      setJsonAnimate(true);
    };
  
    const handleProcessClick = () => {
      setProcessing(true);
      setShowErrors(false);
      setJsonAnimate(false);
      setRowHighlightsKey(prev => prev + 1); // Reset highlight animation
    };
  
    const { rowHighlights, rowRefs, tableRef } = useRowAnimation(
      processing,
      onCompleteAnimation,
      censusData.length
    );
  
    return (
      <div className="relative">
        <div className="relative w-full">
          <div className="overflow-x-auto">
            <DataTable
              key={rowHighlightsKey} // Force remount to reset animation
              data={censusData}
              rowRefs={rowRefs}
              tableRef={tableRef}
              rowHighlights={rowHighlights}
            />
          </div>
  
          {!processing && !showErrors && (
            <ProcessButton onClick={handleProcessClick} />
          )}
  
          {/* Error display */}
          {showErrors && (
            <ErrorDisplay errors={censusData} isAnimated={jsonAnimate} />
          )}
        </div>
      </div>
    );
  };

export default CensusDataCleaning;



