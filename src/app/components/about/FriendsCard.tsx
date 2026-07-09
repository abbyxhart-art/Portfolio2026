import friendsImg from "../../../assets/project/about/friends.JPEG";

export default function FriendsCard() {
  return (
    <div style={{ position: "relative", width: "100%", aspectRatio: "1/1", overflow: "hidden", borderRadius: 8 }}>
      <img
        src={friendsImg}
        alt="Friends"
        loading="lazy"
        draggable={false}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }}
      />
    </div>
  );
}
