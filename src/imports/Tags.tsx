type TagTextProps = {
  text: string;
};

function TagText({ text }: TagTextProps) {
  return (
    <div className="backdrop-blur-[1.484px] bg-[#e8e7f0] content-stretch flex flex-col items-start px-[4.749px] py-[2.374px] relative rounded-[1.187px] shrink-0">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.2] not-italic relative shrink-0 text-[#716c87] text-[14px] whitespace-nowrap">{text}</p>
    </div>
  );
}

export default function Tags() {
  return (
    <div className="content-stretch flex gap-[4.749px] items-center pt-[12px] relative size-full" data-name="Tags">
      <TagText text="Agentic Design" />
      <TagText text="Agentic Design" />
    </div>
  );
}