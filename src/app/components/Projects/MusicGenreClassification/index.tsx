import React, { useState } from 'react';
import MusicDataTable from './ExampleMusicDataTable';
import ProcessButton from '../MainComponents/ProcessButton';
import useRowAnimation from '../CensusDataCleaning/useRowAnimation';
import ClassDisplay from './ClassDisplay';
import exampleMusicData from './ExampleMusicData';
import sampleMusicData from './SampleMusicData';
import SampleMusicDataTable from './SampleMusicDataTable';

const MusicGenreClassification = () => {
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
      exampleMusicData.length
    );
  
    return (
        <div className="relative ">
          <div className="relative w-full ">
            <div className="overflow-x-auto custom-scrollbar roun">

              <SampleMusicDataTable
                data={sampleMusicData}
                rowRefs={rowRefs}
                tableRef={tableRef}
                rowHighlights={rowHighlights}
              />
              <br />
              <MusicDataTable
                data={exampleMusicData}
                rowRefs={rowRefs}
                tableRef={tableRef}
                rowHighlights={rowHighlights}
              />
            </div>
    
            {!processing && !showPrice && (
              <ProcessButton onClick={handleProcessClick} />
            )}
    
            {showPrice && (
              <ClassDisplay predictedClass={"Class-6: Metal"} isAnimated={true} />
            )}
          </div>
        </div>
      );
    };
    

export default MusicGenreClassification;



