const imgPurpleGradient = "https://www.figma.com/api/mcp/asset/e3ea75ac-d667-48b9-8c5f-ae9619cdaf12";
const imgIcon = "https://www.figma.com/api/mcp/asset/d09b7966-d101-4034-868f-9bf0e22b75fd";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border\/default,#d1cedc)] border-solid content-stretch flex flex-col h-[402px] items-start justify-between overflow-clip pb-[16px] pt-[100px] relative w-full">
      {/* Purple Gradient */}
      <div className="absolute bottom-[-350px] h-[658px] left-[-1px] w-full">
        <img alt="" className="absolute block max-w-none size-full" src={imgPurpleGradient} />
      </div>

      {/* Navigation Row */}
      <div className="content-stretch flex h-[118px] items-start justify-between px-[100px] relative shrink-0 w-full">
        {/* Copyright + Design info */}
        <div className="content-stretch flex flex-col h-full items-start justify-between relative shrink-0">
          <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-[235px]">
            <p className="font-[family-name:var(--text-font\/default,'Inter_Tight:Regular',sans-serif)] leading-none not-italic relative shrink-0 text-[length:var(--text-size\/default,18px)] text-[color:var(--text\/primary,#232226)] w-full">
              I design for connection.
            </p>
            <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full">
              <div className="overflow-clip relative shrink-0 size-[18px]">
                <div className="absolute inset-[20.83%]">
                  <div className="absolute inset-[-7.14%]">
                    <img alt="" className="block max-w-none size-full" src={imgIcon} />
                  </div>
                </div>
              </div>
              <p className="font-[family-name:var(--text-font\/default,'Inter_Tight:Regular',sans-serif)] leading-none not-italic relative shrink-0 text-[color:var(--text\/primary,#232226)] text-[length:var(--text-size\/default,18px)] whitespace-nowrap">
                It was nice to meet you!
              </p>
            </div>
          </div>
          <div className="content-stretch flex flex-col font-[family-name:var(--text-font\/default,'Inter_Tight:Regular',sans-serif)] gap-[8px] items-start leading-none not-italic relative shrink-0 text-[length:var(--text-size\/extra-small,14px)] whitespace-nowrap">
            <div className="content-stretch flex gap-[3px] items-center relative shrink-0">
              <p className="relative shrink-0 text-[color:var(--text\/primary,#232226)]">Typeset</p>
              <p className="relative shrink-0 text-[color:var(--text\/tertiary,#7e7c87)]">Inter Tight</p>
            </div>
            <div className="content-stretch flex gap-[3px] items-center relative shrink-0">
              <p className="relative shrink-0 text-[color:var(--text\/primary,#232226)]">Made with</p>
              <p className="relative shrink-0 text-[color:var(--text\/tertiary,#7e7c87)]">Figma + Claude → Github + Vercel</p>
            </div>
          </div>
        </div>

        {/* Links */}
        <div className="content-stretch flex font-[family-name:var(--text-font\/default,'Inter_Tight:Regular',sans-serif)] gap-[24px] items-start leading-none not-italic relative shrink-0 text-[color:var(--text\/primary,#232226)]">
          {/* Connect */}
          <div className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0 w-[61px]">
            <p className="relative shrink-0 text-[length:var(--text-size\/smallest,12px)] w-full">Connect</p>
            <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 text-[length:var(--text-size\/extra-small,14px)] w-full">
              <p className="relative shrink-0 w-full">LinkedIn</p>
              <p className="relative shrink-0 w-full">Instagram</p>
              <p className="relative shrink-0 w-full">Email</p>
            </div>
          </div>
          {/* Navigation */}
          <div className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0 w-[61px]">
            <p className="relative shrink-0 text-[length:var(--text-size\/smallest,12px)] w-full">Navigation</p>
            <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 text-[length:var(--text-size\/extra-small,14px)] w-full">
              <p className="relative shrink-0 w-full">Work</p>
              <p className="relative shrink-0 w-full">About</p>
              <p className="opacity-0 relative shrink-0 w-full">Resume</p>
            </div>
          </div>
        </div>
      </div>

      {/* Hover Directions */}
      <div className="content-stretch flex flex-col font-[family-name:var(--text-font\/default,'Inter_Tight:Regular',sans-serif)] gap-[5px] items-center leading-none not-italic relative shrink-0 text-[color:var(--text\/secondary,#585564)] text-[length:var(--text-size\/extra-small,14px)] w-full whitespace-nowrap">
        <p className="relative shrink-0">Play around. You never know what may grow!</p>
        <p className="relative shrink-0">Hover based on the book: the algorithmic beauty of plants</p>
      </div>

      {/* RIT Info */}
      <div className="absolute bottom-[15px] content-stretch flex flex-col font-[family-name:var(--text-font\/default,'Inter_Tight:Regular',sans-serif)] gap-[8px] items-start leading-none left-[99px] not-italic text-[length:var(--text-size\/extra-small,14px)] w-[301px] whitespace-nowrap">
        <p className="relative shrink-0 text-[color:var(--text\/primary,#232226)]">Rochester Institute of Technology</p>
        <div className="content-stretch flex gap-[3px] items-center relative shrink-0">
          <p className="relative shrink-0 text-[color:var(--text\/primary,#232226)]">BFA</p>
          <p className="relative shrink-0 text-[color:var(--text\/tertiary,#7e7c87)]">New Media Design</p>
        </div>
        <div className="content-stretch flex gap-[3px] items-center relative shrink-0 w-full">
          <p className="relative shrink-0 text-[color:var(--text\/primary,#232226)]">Minors</p>
          <p className="relative shrink-0 text-[color:var(--text\/tertiary,#7e7c87)]">Mobile Design and Development, Fine Arts</p>
        </div>
      </div>
    </footer>
  );
}
