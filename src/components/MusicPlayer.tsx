import { useEffect, useRef, useState } from 'react';
import { Music2, Pause } from 'lucide-react';

type MusicPlayerProps = { music: string };

export default function MusicPlayer({ music }: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isUnavailable, setIsUnavailable] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleError = () => {
      setIsPlaying(false);
      setIsUnavailable(true);
    };
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('error', handleError);
    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('error', handleError);
      audio.pause();
    };
  }, []);

  const togglePlayback = async () => {
    const audio = audioRef.current;
    if (!audio || isUnavailable) return;
    if (!audio.src) audio.src = music;
    if (isPlaying) {
      audio.pause();
      return;
    }
    try {
      await audio.play();
    } catch {
      setIsUnavailable(true);
      setIsPlaying(false);
    }
  };

  return (
    <div className="music-dock">
      <audio ref={audioRef} preload="none" loop />
      <button
        className={`music-button ${isPlaying ? 'is-playing' : ''}`}
        type="button"
        onClick={togglePlayback}
        aria-pressed={isPlaying}
        aria-label={isUnavailable ? 'Music unavailable — add birthday.mp3 to public/music' : isPlaying ? 'Turn music off' : 'Turn music on'}
        title={isUnavailable ? 'Add /public/music/birthday.mp3 to enable music' : isPlaying ? 'Music On' : 'Music Off'}
      >
        {isPlaying ? <Pause size={16} strokeWidth={1.4} /> : <Music2 size={16} strokeWidth={1.4} />}
      </button>
      <span className="music-label" role="status">
        {isUnavailable ? 'Add your music' : isPlaying ? 'Music On' : 'Music Off'}
      </span>
    </div>
  );
}
