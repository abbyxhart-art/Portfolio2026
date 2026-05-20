import { useState } from "react";
import { Link } from "react-router";

export default function HomeButton() {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      to="/"
      className="fixed top-[16px] right-[16px] z-50 no-underline flex gap-[9px] items-center pl-[12px] pr-[16px] py-[8px] rounded-[24px] transition-colors duration-150"
      style={{
        border: "0.75px solid #302f34",
        background: hovered ? "rgba(88,85,100,0.2)" : "#171717",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <svg width="24" height="24" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M4.5 10.75L12.5 4L20.5 10.75V21C20.5 21.2761 20.2761 21.5 20 21.5H16V16H9V21.5H5C4.72386 21.5 4.5 21.2761 4.5 21V10.75Z"
          stroke="#908e99"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Link>
  );
}
