'use client';
import { useRef, useState, useEffect } from "react";
import MessageBubble from "./MessageBubble";
import Notification from "./Notification";
import VideoPlayer from "./VideoPlayer";
import LoadingButton from "./LoadingButton";




const AiNewsAggregator: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showVideo, setShowVideo] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [autoplayFailed, setAutoplayFailed] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Auto-start the demo when component mounts
    setTimeout(() => {
      setIsLoading(false);
      setShowVideo(true);
    }, 2000);
  }, []);

  useEffect(() => {
    console.log("showVideo:", showVideo);
    console.log("videoRef.current:", videoRef.current);
    if (showVideo && videoRef.current) {
      videoRef.current.currentTime = 0;
      setAutoplayFailed(false);

      const playPromise = videoRef.current.play();

      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.error("Video play failed:", error);
          setAutoplayFailed(true);
        });
      }
    }
  }, [showVideo]);



  const handleVideoEnded = () => {
    setTimeout(() => {
      setShowNotification(true);
    }, 500);
  };

  const handleNotificationClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log("Notification clicked, showing image");

    setShowNotification(false);
    setShowVideo(false);
    setShowImage(true);
  };

  const handleCloseNotification = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowNotification(false);
  };

  return (
    <>
      <div className="rounded-lg overflow-hidden relative min-h-[300px]">
  {isLoading ? (
    <div className="flex justify-center items-center min-h-[300px]"> {/* MODIFIED LINE */}
      <LoadingButton isLoading={isLoading} />
    </div>
  ) : showVideo ? (
    <div className="relative">
      <VideoPlayer
        videoRef={videoRef as React.RefObject<HTMLVideoElement>}
        src="/n8n-workflow.mp4"
        onEnded={handleVideoEnded}
      />
      <p className="mt-4 text-sm text-white/70 text-center">
        Note: A message will appear when the video ends.
      </p>
    </div>
  ) : showImage ? (
    <MessageBubble />
  ) : null}
</div>
  
      {showNotification && (
        <Notification
          onClick={handleNotificationClick}
          onClose={handleCloseNotification}
        />
      )}
    </>
  );
  
};

export default AiNewsAggregator;