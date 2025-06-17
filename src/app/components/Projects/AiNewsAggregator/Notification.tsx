import { FaTimes } from "react-icons/fa";

interface NotificationProps {
  onClick: () => void;
  onClose: () => void;
}

const Notification = ({ onClick, onClose }: NotificationProps) => (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm w-full animate-slideUp">
      <div
        className="bg-[#123529] rounded-md shadow-xl overflow-hidden cursor-pointer transform hover:translate-y-[-2px] transition-all border border-white/10 relative"
        onClick={onClick}
      >
        <div className="p-4">
          <div className="flex gap-3">
            <div className="h-17 w-17 overflow-hidden rounded-full flex items-center justify-center">
              <img
                src="/starfall-ai.png"
                alt="Starfall AI"
                className="w-full h-full object-cover"
              />
            </div>
  
            <div className="flex-1">
              <div className="flex justify-between">
                <span className="font-semibold text-white">Starfall AI</span>
              </div>
              <p className="text-sm text-white mt-1">• Google Research introduces LightLab, a diffusion-based AI method...</p>
            </div>
          </div>
        </div>
  
        <div
          onClick={onClose}
          className="absolute top-2 right-2 cursor-pointer p-1 hover:bg-black rounded-full"
        >
          <FaTimes className="text-white text-xs hover:text-white" />
        </div>
      </div>
    </div>
  );

export default Notification;