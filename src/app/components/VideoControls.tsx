import { useEffect, useState } from "react";
import type { RefObject } from "react";
import icons from "../../assets/icons/icons.json";

// Same glassy round pill shape as the About page's Spotify player
// (src/app/components/about/SpotifyPlayer.tsx), but filled with the
// surface/fill1 token (#908E99 @ 50%) instead of that component's
// hardcoded lavender, since these sit over arbitrary video content
// across both themes rather than one fixed dark album-art background.
function PillButton({ onClick, ariaLabel, children }: { onClick: (e: React.MouseEvent) => void; ariaLabel: string; children: React.ReactNode }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backdropFilter: "blur(3px)",
        WebkitBackdropFilter: "blur(3px)",
        background: hovered ? "var(--color-surface-fill3)" : "var(--color-surface-fill1)",
        borderRadius: "100px",
        padding: "8px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "none",
        cursor: "pointer",
        transition: "background 0.15s ease",
      }}
    >
      {children}
    </button>
  );
}

// Bottom-right play/pause + restart-from-beginning overlay for any <video>.
// Self-contained: listens to the video element's own play/pause events
// rather than tracking clicks, so it stays in sync whether playback is
// driven by this button, autoplay, or an IntersectionObserver elsewhere.
export default function VideoControls({ videoRef }: { videoRef: RefObject<HTMLVideoElement | null> }) {
  const [playing, setPlaying] = useState(true);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);
    setPlaying(!video.paused);
    return () => {
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
    };
  }, [videoRef]);

  const stop = (e: React.MouseEvent) => e.stopPropagation();

  const restart = (e: React.MouseEvent) => {
    stop(e);
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = 0;
    video.play();
  };

  const togglePlay = (e: React.MouseEvent) => {
    stop(e);
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) video.play();
    else video.pause();
  };

  return (
    // Covers the whole video (its parent is always the video's own relative
    // wrapper) purely to detect hover — the button cluster below is what's
    // actually visible/positioned, this layer itself has no visuals.
    <div
      className="absolute inset-0"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="absolute flex items-center"
        style={{
          bottom: 12,
          right: 12,
          gap: 8,
          zIndex: 2,
          opacity: hovered ? 1 : 0,
          pointerEvents: hovered ? "auto" : "none",
          transition: "opacity 0.15s ease",
        }}
        onClick={stop}
      >
        <PillButton onClick={togglePlay} ariaLabel={playing ? "Pause video" : "Play video"}>
          {playing ? (
            <svg width="14" height="14" viewBox={icons.media.pause.viewBox} fill="none" xmlns="http://www.w3.org/2000/svg">
              {icons.media.pause.paths.map((p, i) => (
                <path key={i} d={p.d} stroke="white" strokeLinecap="round" strokeLinejoin="round" />
              ))}
            </svg>
          ) : (
            <svg width="14" height="14" viewBox={icons.media.play.viewBox} fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d={icons.media.play.paths[0].d} fill="white" />
            </svg>
          )}
        </PillButton>
        <PillButton onClick={restart} ariaLabel="Restart video from the beginning">
          <svg width="14" height="14" viewBox={icons.media["reverse-play"].viewBox} fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d={icons.media["reverse-play"].paths[0].d} stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </PillButton>
      </div>
    </div>
  );
}
