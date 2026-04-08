import svgPaths from "./svg-394lcs223f";
type CursorProps = {
  className?: string;
  instance?: "Default" | "External Links" | "Internal Page Hover" | "Shoutout" | "Variant10" | "External Link" | "Internal Link";
  type?: "Default" | "Click" | "Cllick" | "Hover";
};

function Cursor({ className, instance = "Shoutout", type = "Default" }: CursorProps) {
  const isDefaultAndDefault = instance === "Default" && type === "Default";
  const isExternalLinkAndHover = instance === "External Link" && type === "Hover";
  const isExternalLinksAndCllick = instance === "External Links" && type === "Cllick";
  const isExternalLinksAndDefault = instance === "External Links" && type === "Default";
  const isInternalLinkAndHover = instance === "Internal Link" && type === "Hover";
  const isInternalPageHoverAndClick = instance === "Internal Page Hover" && type === "Click";
  const isInternalPageHoverAndDefault = instance === "Internal Page Hover" && type === "Default";
  const isShoutoutAndClick = instance === "Shoutout" && type === "Click";
  const isShoutoutAndDefault = instance === "Shoutout" && type === "Default";
  const isShoutoutAndIsDefaultOrClick = instance === "Shoutout" && ["Default", "Click"].includes(type);
  const isVariant10AndDefault = instance === "Variant10" && type === "Default";
  return (
    <div className={className || `relative ${isVariant10AndDefault ? "bg-[#e8e7f0] h-[24px] rounded-[16px] w-[84px]" : isExternalLinkAndHover ? "bg-[#e5cfff] h-[24px] rounded-[16px] w-[84px]" : isInternalLinkAndHover ? "bg-[#faf9ff] h-[24px] rounded-[16px] w-[84px]" : isExternalLinksAndCllick ? "bg-[rgba(154,71,255,0.3)] rounded-[18.667px] size-[28px]" : isExternalLinksAndDefault ? "bg-[rgba(154,71,255,0.1)] rounded-[18.667px] size-[28px]" : isInternalPageHoverAndClick ? "bg-[rgba(35,34,38,0.2)] rounded-[18.667px] size-[28px]" : isInternalPageHoverAndDefault ? "bg-[rgba(35,34,38,0.1)] overflow-clip rounded-[18.667px] size-[28px]" : isDefaultAndDefault ? "bg-[rgba(200,196,215,0.2)] rounded-[18.667px] size-[28px]" : isShoutoutAndClick ? "size-[32px]" : "size-[28px]"}`}>
      <div aria-hidden={isInternalLinkAndHover || isExternalLinkAndHover || isVariant10AndDefault ? "true" : undefined} className={`absolute ${isVariant10AndDefault ? "border-[#c8c4d7] border-[0.75px] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.07)]" : isExternalLinkAndHover ? "border-[#e5cfff] border-[0.75px] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.07)]" : isInternalLinkAndHover ? "border-[#e8e7f0] border-[0.75px] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.07)]" : isShoutoutAndClick ? "left-0 size-[32px] top-0" : "left-0 size-[28px] top-0"}`}>
        {(isShoutoutAndDefault || isShoutoutAndClick || isDefaultAndDefault || isInternalPageHoverAndDefault || isInternalPageHoverAndClick || isExternalLinksAndDefault || isExternalLinksAndCllick) && (
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox={isShoutoutAndClick ? "0 0 32 32" : "0 0 28 28"}>
            <circle cx={isShoutoutAndClick ? "16" : "14"} cy={isShoutoutAndClick ? "16" : "14"} id="Ellipse 2853" r={isShoutoutAndClick ? "15.4" : "13.4"} stroke={isExternalLinksAndDefault ? "var(--stroke-0, #C698FF)" : isInternalPageHoverAndClick ? "var(--stroke-0, #716C87)" : isInternalPageHoverAndDefault ? "var(--stroke-0, #A29DB6)" : isDefaultAndDefault ? "var(--stroke-0, #C8C4D7)" : "var(--stroke-0, #9A47FF)"} strokeWidth="1.2" />
          </svg>
        )}
      </div>
      {(isShoutoutAndDefault || isShoutoutAndClick || isInternalLinkAndHover || isExternalLinkAndHover || isVariant10AndDefault) && (
        <div className={`absolute ${isInternalLinkAndHover || isExternalLinkAndHover || isVariant10AndDefault ? "left-0 size-[24px] top-0" : isShoutoutAndClick ? "flex h-[3.987px] items-center justify-center left-[21.33px] top-[8px] w-[0.32px]" : "flex h-[3.489px] items-center justify-center left-[18.67px] top-[7px] w-[0.28px]"}`} style={isShoutoutAndIsDefaultOrClick ? { "--transform-inner-width": "1200", "--transform-inner-height": "19" } : (undefined as React.CSSProperties)}>
          {(isInternalLinkAndHover || isExternalLinkAndHover || isVariant10AndDefault) && (
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
              <circle cx="12" cy="12" id="Ellipse 2853" opacity="0" r="11.4" stroke="var(--stroke-0, #9A47FF)" strokeWidth="1.2" />
            </svg>
          )}
          {isShoutoutAndIsDefaultOrClick && (
            <div className="flex-none rotate-[85.42deg]">
              <div className={`h-0 relative ${isShoutoutAndClick ? "w-[4px]" : "w-[3.5px]"}`}>
                <div className="absolute inset-[-1.2px_0_0_0]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox={isShoutoutAndClick ? "0 0 4 1.2" : "0 0 3.5 1.2"}>
                    <line id="Line 3" stroke="var(--stroke-0, #9A47FF)" strokeWidth="1.2" x2={isShoutoutAndClick ? "4" : "3.5"} y1="0.6" y2="0.6" />
                  </svg>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      {(isInternalLinkAndHover || isExternalLinkAndHover || isVariant10AndDefault) && <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[1.2] left-[7px] not-italic text-[14px] text-black top-[3px] whitespace-nowrap">{isVariant10AndDefault ? "Inside Link" : isExternalLinkAndHover ? "Instagram" : isInternalLinkAndHover ? "2 min read" : ""}</p>}
      {isShoutoutAndIsDefaultOrClick && (
        <>
          <div className={`absolute flex items-center justify-center ${isShoutoutAndClick ? "h-[3.671px] left-[12px] top-[10.67px] w-[1.588px]" : "h-[3.212px] left-[10.5px] top-[9.33px] w-[1.39px]"}`} style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}>
            <div className="flex-none rotate-[66.6deg]">
              <div className={`h-0 relative ${isShoutoutAndClick ? "w-[4px]" : "w-[3.5px]"}`}>
                <div className="absolute inset-[-1.2px_0_0_0]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox={isShoutoutAndClick ? "0 0 4 1.2" : "0 0 3.5 1.2"}>
                    <line id="Line 4" stroke="var(--stroke-0, #9A47FF)" strokeWidth="1.2" x2={isShoutoutAndClick ? "4" : "3.5"} y1="0.6" y2="0.6" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className={`absolute flex items-center justify-center ${isShoutoutAndClick ? "h-[12.555px] left-[14.88px] top-[15.06px] w-[11.571px]" : "h-[10.986px] left-[13.02px] top-[13.17px] w-[10.125px]"}`} style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}>
            <div className="flex-none rotate-[-13.54deg]">
              <div className={`relative ${isShoutoutAndClick ? "h-[10.667px] w-[9.333px]" : "h-[9.333px] w-[8.167px]"}`}>
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox={isShoutoutAndClick ? "0 0 9.33333 10.6667" : "0 0 8.16667 9.33333"}>
                  <path d={isShoutoutAndClick ? svgPaths.p39c73100 : svgPaths.p3fa82080} id="Ellipse 2854" stroke="var(--stroke-0, #9A47FF)" strokeWidth="1.2" />
                </svg>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default function Cursor1() {
  return <Cursor className="bg-[rgba(200,196,215,0.2)] relative rounded-[18.667px] size-full" instance="Default" />;
}