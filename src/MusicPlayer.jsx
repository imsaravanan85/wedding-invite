import React, { useState, useRef, useEffect } from 'react';
import './MusicPlayer.css';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const iframeRef = useRef(null);

  // YouTube video ID extracted from URL
  const videoId = 'FyZz_kptbwU';

  const toggleMusic = () => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    if (isPlaying) {
      iframe.contentWindow.postMessage(
        JSON.stringify({ event: 'command', func: 'pauseVideo' }),
        '*'
      );
    } else {
      iframe.contentWindow.postMessage(
        JSON.stringify({ event: 'command', func: 'playVideo' }),
        '*'
      );
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <>
      {/* Hidden YouTube player */}
      <iframe
        ref={iframeRef}
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&enablejsapi=1&loop=1&playlist=${videoId}&controls=0&start=47`}
        style={{
          position: 'fixed',
          width: 0,
          height: 0,
          border: 'none',
          opacity: 0,
          pointerEvents: 'none'
        }}
        allow="autoplay"
        title="Wedding Music"
      />

      {/* Floating music toggle button */}
      <button
        className={`music-btn ${isPlaying ? 'music-playing' : ''}`}
        onClick={toggleMusic}
        aria-label={isPlaying ? 'Pause music' : 'Play music'}
      >
        <span className="music-icon">{isPlaying ? '♪' : '♪'}</span>
        <span className="music-label">{isPlaying ? 'ON' : 'OFF'}</span>
      </button>
    </>
  );
};

export default MusicPlayer;
