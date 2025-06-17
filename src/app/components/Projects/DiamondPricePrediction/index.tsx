import React, { useState } from 'react';
import DiamondDataTable from './ExampleDiamondDataTable';
import ProcessButton from '../MainComponents/ProcessButton';
import useRowAnimation from '../CensusDataCleaning/useRowAnimation';
import diamondData from './ExampleDiamondData';
import PriceDisplay from './PriceDisplay';
import exampleDiamondData from './ExampleDiamondData';
import sampleDiamondData from './SampleDiamondData';
import SampleDiamondDataTable from './SampleDiamondDataTable';

const DiamondPricePrediction = () => {
    const [processing, setProcessing] = useState(false);
    const [showPrice, setShowPrice] = useState(false);
  
    const onCompleteAnimation = () => {
      setProcessing(false);
      setShowPrice(true);
    };
  
    const handleProcessClick = () => {
      setProcessing(true);
      setShowPrice(false);
    };
  
    const { rowHighlights, rowRefs, tableRef } = useRowAnimation(
      processing,
      onCompleteAnimation,
      diamondData.length
    );
  
    return (
        <div className="relative">
          <div className="relative w-full">
            <div className="overflow-x-auto">
              <SampleDiamondDataTable
                data={sampleDiamondData}
                rowRefs={rowRefs}
                tableRef={tableRef}
                rowHighlights={rowHighlights}
              />
              <br />
              <DiamondDataTable
                data={exampleDiamondData}
                rowRefs={rowRefs}
                tableRef={tableRef}
                rowHighlights={rowHighlights}
              />
            </div>
    
            {!processing && !showPrice && (
              <ProcessButton onClick={handleProcessClick} />
            )}
    
            {showPrice && (
              <PriceDisplay predictedPrice={9.00385678} isAnimated={true} />
            )}
          </div>
        </div>
      );
    };
    

export default DiamondPricePrediction;



