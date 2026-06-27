import friendsImg from "../../../assets/project/about/friends.JPEG";

export default function FriendsCard() {
  return (
    <div style={{ position: "relative", width: "100%", aspectRatio: "1/1", overflow: "hidden", borderRadius: 8 }}>
      <img
        src={friendsImg}
        alt="Friends"
        draggable={false}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }}
      />
      <p style={{
        position: "absolute",
        top: 14,
        left: 14,
        fontFamily: "'Inter Tight', sans-serif",
        fontSize: 14,
        fontWeight: 300,
        color: "#f2f2f6",
        lineHeight: 1.4,
        textShadow: "0 2px 8px rgba(0,0,0,0.8)",
      }}>
        Lab rats and day 1's
      </p>
    </div>
  );
}
