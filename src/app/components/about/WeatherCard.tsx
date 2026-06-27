import about8 from "../../../assets/project/about/about_8.JPG";

interface WeatherCardProps {
  style?: React.CSSProperties;
  className?: string;
}

export default function WeatherCard({ style, className }: WeatherCardProps) {
  return (
    <div style={{ ...style, position: "relative", overflow: "hidden" }} className={className}>
      <img
        src={about8}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        draggable={false}
      />
    </div>
  );
}
