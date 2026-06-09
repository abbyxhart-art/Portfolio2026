export default function HomePage() {
  return (
    <div className="bg-[#161617] relative size-full" data-name="Home Page">
      <div className="-translate-x-1/2 absolute bg-gradient-to-t from-[rgba(22,22,23,0.2)] h-[410px] left-1/2 opacity-50 to-[#afa4d8] top-0 w-[1728px]" />
      <p className="[word-break:break-word] absolute font-['Inter_Tight:Regular',sans-serif] font-normal leading-[1.5] left-[863.5px] text-[16px] text-black top-[451px] whitespace-nowrap">​</p>
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Inter_Tight:Regular',sans-serif] font-normal leading-none left-1/2 text-[24px] text-center text-white top-[282px] w-[344px] whitespace-pre-wrap">{`abby hart is a product designer and  creative technologist`}</p>
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Inter_Tight:Regular',sans-serif] font-normal leading-none left-1/2 text-[14px] text-center text-white top-[396px] whitespace-nowrap">loading...</p>
      <div className="-translate-x-1/2 absolute left-1/2 size-[40px] top-[218px]" data-name="photo">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
          <circle cx="20" cy="20" fill="var(--fill-0, #D9D9D9)" id="photo" r="20" />
        </svg>
      </div>
      <div className="-translate-x-1/2 absolute bg-[#d9d9d9] h-[3px] left-1/2 top-[363px] w-[478px]" data-name="Loading screen" />
    </div>
  );
}