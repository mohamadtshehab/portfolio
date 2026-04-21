import React from 'react';

interface VideoPlayerProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  src: string;
  onEnded: () => void;
}

const VideoPlayer = ({ videoRef, src, onEnded }: VideoPlayerProps) => (
  <div className="relative w-full max-w-full">
    <video
      ref={videoRef}
      className="h-auto max-h-[min(400px,70vh)] w-full max-w-full rounded-[10px] object-contain"
      controls={false}
      onEnded={onEnded}
      playsInline
      preload="auto"
      autoPlay
      muted
    >
      <source src={src} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  </div>
);

export default VideoPlayer;