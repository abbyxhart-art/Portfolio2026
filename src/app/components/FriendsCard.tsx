const friends = [
  { name: "Leah Healy",           role: "UI, Photography",           link: "LinkedIn",           href: "https://www.linkedin.com/in/leah-healy-b25964252/" },
  { name: "Cathy Nguyen",         role: "Illustration, Branding",    link: "cathynguillustration.com",    href: "https://www.cathynguillustration.com/" },
  { name: "Mary Clements",        role: "UX/UI",                     link: "LinkedIn",           href: "https://www.linkedin.com/in/maryeclements/" },
  { name: "Lasya Josyula",        role: "Designer, Developer",       link: "LinkedIn",           href: "https://www.linkedin.com/in/lasyapriya-josyula/" },
  { name: "Ivo",                  role: "Product, 3D",               link: "ivyoh_archive on IG", href: "https://www.instagram.com/ivyoh_archive/" },
  { name: "Ananhita Chemparathy", role: "UX/UI",                     link: "LinkedIn",           href: "https://www.linkedin.com/in/anahitac/" },
  { name: "Troy Ramiscal",        role: "Experience Maker",          link: "LinkedIn",           href: "https://www.linkedin.com/in/troyramiscal/" },
  { name: "TJ Hampton",           role: "UX/UI",                     link: "LinkedIn",           href: "https://www.linkedin.com/in/tj-hampton-a46361239/" },
];

function ArrowUpRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0">
      <path d="M4.5 11.5L11.5 4.5M11.5 4.5H5.5M11.5 4.5V10.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function FriendsCard() {
  return (
    <div className="w-full h-full p-[16px] flex flex-col">
      {/* Header */}
      <div className="flex flex-col gap-[6px] shrink-0">
        <p className="font-['Inter_Tight',sans-serif] font-normal text-[#faf9ff] text-[14px] leading-none">
          Friends
        </p>
        <p className="font-['Inter_Tight',sans-serif] font-normal text-[#908e99] text-[14px] leading-none">
          Late night lab rats and day 1's
        </p>
      </div>

      {/* Friends grid */}
      <div className="grid grid-cols-4 gap-x-[16px] gap-y-[32px] mt-[51px]">
        {friends.map(({ name, role, link, href }) => (
          <div key={name} className="flex flex-col gap-[8px] font-['Inter_Tight',sans-serif] font-light text-[14px] leading-none">
            <p className="text-[#faf9ff]">{name}</p>
            <p className="text-[#908e99]">{role}</p>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-[4px] text-[#908e99] hover:text-[#faf9ff] transition-colors duration-150 w-fit"
            >
              <span className="whitespace-nowrap">{link}</span>
              <ArrowUpRight />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
