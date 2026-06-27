import { useState, useEffect } from "react";

type ApodData = {
  title: string;
  url: string;
  hdurl?: string;
  media_type: "image" | "video";
  date: string;
};

const API_KEY = "DEMO_KEY";

function apodUrl(date?: string) {
  const base = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`;
  return date ? `${base}&date=${date}` : base;
}

function prevDate(dateStr: string) {
  const d = new Date(dateStr);
  d.setDate(d.getDate() - 1);
  return d.toISOString().slice(0, 10);
}

export default function NasaCard() {
  const [data, setData] = useState<ApodData | null>(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    async function load(date?: string, tries = 0) {
      if (tries > 5) return;
      try {
        const res = await fetch(apodUrl(date));
        const json: ApodData = await res.json();
        // skip YouTube videos — go back a day
        if (json.media_type === "video" && !json.url.endsWith(".mp4")) {
          load(prevDate(json.date), tries + 1);
        } else {
          setData(json);
        }
      } catch {
        // silently fail
      }
    }
    load();
  }, []);

  const isVideo = data?.media_type === "video";

  return (
    <a
      href={data?.url ?? "https://apod.nasa.gov"}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "block",
        position: "relative",
        width: "100%",
        aspectRatio: "1/1",
        borderRadius: 8,
        overflow: "hidden",
        background: "#0a0a14",
        textDecoration: "none",
        cursor: "pointer",
      }}
    >
      {data && isVideo ? (
        <video
          src={data.url}
          autoPlay
          muted
          loop
          playsInline
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
        />
      ) : data ? (
        <img
          src={data.url}
          alt={data.title}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
        />
      ) : null}

      {/* Gradient overlay */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: hovered
          ? "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.75) 100%)"
          : "linear-gradient(to bottom, rgba(0,0,0,0) 40%, rgba(0,0,0,0.65) 100%)",
        transition: "background 0.2s ease",
      }} />

      {/* Title */}
      {data && (
        <div style={{ position: "absolute", bottom: 10, left: 10, right: 10 }}>
          <p style={{
            fontFamily: "'Inter Tight', sans-serif",
            fontSize: 11,
            fontWeight: 300,
            color: "#f2f2f6",
            lineHeight: 1.3,
            textShadow: "0 1px 4px rgba(0,0,0,0.8)",
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: hovered ? 2 : 1,
            WebkitBoxOrient: "vertical",
          }}>
            {data.title}
          </p>
        </div>
      )}

      {/* NASA label */}
      <p style={{
        position: "absolute",
        top: 10,
        right: 10,
        fontFamily: "'Inter Tight', sans-serif",
        fontSize: 9,
        fontWeight: 400,
        color: "rgba(242,242,246,0.5)",
        textShadow: "0 1px 4px rgba(0,0,0,0.8)",
        letterSpacing: "0.05em",
        textTransform: "uppercase",
      }}>
        NASA
      </p>
    </a>
  );
}
