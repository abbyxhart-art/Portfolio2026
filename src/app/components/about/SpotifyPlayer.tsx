import { useState, useEffect, useRef } from "react";
import iconPlay from "../../../assets/icons/play.svg";
import iconPause from "../../../assets/icons/Media/Pause.svg";
import iconSkip from "../../../assets/icons/skip-forward.svg";
import iconSpotify from "../../../assets/icons/spotify.svg";

const TRACKS = [
  { term: "Matt's Apartment The Internet", darkHeader: true },
  { term: "Bars. 16 Steve Lacy", darkHeader: true },
  { term: "Thunderbird Hermanos Gutierrez" },
  { term: "Take 2.5 Fana Hues" },
  { term: "While You Were Sleeping Instrumental Laufey" },
  { term: "fish in the pool yeule" },
  { term: "the house at swamp bottom Joe Hisaishi" },
];

const PLAYLIST_URL =
  "https://open.spotify.com/playlist/3DWizgLUncnzAe2r60b8zn?si=l6F7c1dXQyO_quh_xkBo_A";

interface Track {
  name: string;
  artist: string;
  albumArt: string;
  previewUrl: string | null;
  darkHeader?: boolean;
}

async function fetchTrack(term: string, darkHeader?: boolean): Promise<Track | null> {
  const res = await fetch(
    `https://itunes.apple.com/search?term=${encodeURIComponent(term)}&entity=song&limit=1`
  );
  const json = await res.json();
  const r = json.results?.[0];
  if (!r) return null;
  return {
    name: r.trackName,
    artist: r.artistName,
    albumArt: r.artworkUrl100?.replace("100x100bb", "600x600bb") ?? "",
    previewUrl: r.previewUrl ?? null,
    darkHeader,
  };
}

function PillButton({ onClick, disabled, children }: { onClick?: () => void; disabled?: boolean; children: React.ReactNode }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backdropFilter: "blur(3px)",
        WebkitBackdropFilter: "blur(3px)",
        background: hovered ? "rgba(218,216,227,0.75)" : "rgba(218,216,227,0.5)",
        borderRadius: "100px",
        padding: "10px",
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

function PillLink({ href, children }: { href: string; children: React.ReactNode }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backdropFilter: "blur(3px)",
        WebkitBackdropFilter: "blur(3px)",
        background: hovered ? "rgba(218,216,227,0.75)" : "rgba(218,216,227,0.5)",
        borderRadius: "100px",
        padding: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "background 0.15s ease",
      }}
    >
      {children}
    </a>
  );
}

export default function SpotifyPlayer() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [idx, setIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [hovered, setHovered] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    Promise.all(TRACKS.map((t) => fetchTrack(t.term, t.darkHeader)))
      .then((results) => results.filter(Boolean) as Track[])
      .then(setTracks);
  }, []);

  const track = tracks[idx] ?? null;
  const previewUrl = track?.previewUrl ?? null;

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (previewUrl) {
      audio.src = previewUrl;
      if (playing) audio.play().catch(() => {});
    } else {
      audio.pause();
      audio.src = "";
      setPlaying(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [previewUrl]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio || !previewUrl) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().catch(() => {});
      setPlaying(true);
    }
  };

  const next = () => setIdx((i) => (i + 1) % tracks.length);

  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{ background: "#0d0c0e" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <audio ref={audioRef} onEnded={next} />

      {/* Album art background */}
      {track?.albumArt && (
        <img
          src={track.albumArt}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 0.9 }}
        />
      )}

      {/* Dark gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: track?.darkHeader
            ? "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.0) 50%, rgba(0,0,0,0.35) 100%)"
            : "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.0) 50%, rgba(0,0,0,0.35) 100%)",
        }}
      />

      {/* Track info */}
      <div className="absolute" style={{ top: 9, left: 8, right: 8 }}>
        {hovered && track ? (
          <>
            <p
              className="font-['Inter_Tight',sans-serif] font-light leading-[1.35] truncate"
              style={{ fontSize: 14, color: "#fff", margin: 0 }}
            >
              {track.name}
            </p>
            <p
              className="font-['Inter_Tight',sans-serif] font-light leading-[1.35] truncate"
              style={{ fontSize: 14, color: "rgba(255,255,255,0.65)", margin: 0 }}
            >
              {track.artist}
            </p>
          </>
        ) : (
          <>
            <p className="font-['Inter_Tight',sans-serif] font-light leading-[1.35]" style={{ fontSize: 14, color: "#fff", margin: 0 }}>
              The BEST instrumental playlist
            </p>
            <p className="font-['Inter_Tight',sans-serif] font-light leading-[1.35]" style={{ fontSize: 14, color: "rgba(255,255,255,0.65)", margin: 0 }}>
              for locking in
            </p>
          </>
        )}
      </div>

      {/* Controls */}
      <div
        className="absolute flex items-center justify-between"
        style={{ bottom: 12, left: 12, right: 12 }}
      >
        <div className="flex" style={{ gap: 3 }}>
          <PillButton onClick={togglePlay} disabled={!previewUrl}>
            <img src={playing ? iconPause : iconPlay} alt={playing ? "Pause" : "Play"} style={{ width: 16, height: 16 }} />
          </PillButton>
          <PillButton onClick={next} disabled={tracks.length <= 1}>
            <img src={iconSkip} alt="Next" style={{ width: 16, height: 16 }} />
          </PillButton>
        </div>

        <PillLink href={PLAYLIST_URL}>
          <img src={iconSpotify} alt="Open in Spotify" style={{ width: 18, height: 18 }} />
        </PillLink>
      </div>
    </div>
  );
}
