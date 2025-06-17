import React from 'react';

interface VideoPlayerProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  src: string;
  onEnded: () => void;
}

const VideoPlayer = ({ videoRef, src, onEnded }: VideoPlayerProps) => (
  <div className="relative">
    <video
      ref={videoRef}
      className="rounded-[10px]"
      controls={false}
      onEnded={onEnded}
      playsInline
      preload="auto"
      autoPlay
      muted
      style={{ maxHeight: '400px' }}
    >
      <source src={src} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  </div>
);

export default VideoPlayer;