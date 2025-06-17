'use client';
import { AiOutlineSetting } from "react-icons/ai"; // Using a gear icon

const LoadingButton = ({ isLoading }: { isLoading: boolean }) => (
  <button
    className={`${
      isLoading
        ? 'cursor-not-allowed'
        : 'hover:bg-white/10 hover:scale-105 active:scale-95 border border-white border-opacity-30'
    } text-white px-8 py-4 rounded-xl flex items-center gap-3 transition-all duration-200 mx-auto mt-8`}
    disabled={isLoading}
  >
    <AiOutlineSetting className="animate-spin text-2xl" /> {/* Using the gear icon */}
    {/* <FaPipeline className="animate-spin text-2xl" /> */} {/* Uncomment to use the pipeline icon */}
    <span className="font-semibold">Loading workflow...</span>
  </button>
);

export default LoadingButton;