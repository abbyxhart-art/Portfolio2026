import imgCasestudyImage from "figma:asset/e5076f9a0ed3ba84a00e1bfeb85050f0bfbf58b8.png";
type CasestudyTagTextProps = {
  text: string;
};

function CasestudyTagText({ text }: CasestudyTagTextProps) {
  return (
    <div className="backdrop-blur-[1.484px] bg-[#e8e7f0] content-stretch flex flex-col items-start px-[4.749px] py-[2.374px] relative rounded-[1.187px] shrink-0">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.2] not-italic relative shrink-0 text-[#716c87] text-[14px] whitespace-nowrap">{text}</p>
    </div>
  );
}

export default function Frame() {
  return (
    <div className="bg-[rgba(247,246,251,0.8)] content-stretch flex flex-col gap-[18.994px] items-start p-[14.246px] relative rounded-[8.31px] size-full">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-tl-[4.155px] rounded-tr-[4.155px] shrink-0 w-full">
        <div className="h-[256.421px] relative shrink-0 w-full" data-name="casestudy-image">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgCasestudyImage} />
        </div>
      </div>
      <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
        <p className="font-['Inter_Tight:Regular',sans-serif] font-normal leading-[1.5] min-w-full opacity-78 relative shrink-0 text-[#232226] text-[18px] w-[min-content]">Tian Air</p>
        <p className="font-['Inter_Tight:Regular',sans-serif] font-normal leading-[1.5] opacity-78 relative shrink-0 text-[#716c87] text-[16px] w-[377px]">An experimental design system working on variables, tokens, and interaction within a fictional airline</p>
        <div className="content-stretch flex gap-[4.749px] items-center pt-[12px] relative shrink-0">
          <CasestudyTagText text="Agentic Design" />
          <CasestudyTagText text="Agentic Design" />
        </div>
      </div>
    </div>
  );
}