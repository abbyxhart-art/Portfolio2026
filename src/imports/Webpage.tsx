export default function Webpage() {
  return (
    <div className="bg-white relative size-full" data-name="Webpage">
      <div className="absolute bg-[#f4efff] h-[1400px] left-0 overflow-clip top-[1400px] w-[1728px]" data-name="Section 1">
        <p className="absolute font-['Inter_Tight:Regular',sans-serif] font-normal leading-none left-[639px] text-[100px] text-black top-[326px] whitespace-nowrap">Section 2</p>
      </div>
      <div className="absolute bg-[#faf7ff] h-[1400px] left-0 overflow-clip top-0 w-[1728px]" data-name="Section 3">
        <p className="absolute font-['Inter_Tight:Regular',sans-serif] font-normal leading-none left-[673px] text-[100px] text-black top-[440px] whitespace-nowrap">Section 1</p>
      </div>
      <div className="absolute bg-[#e5daff] h-[1400px] left-0 overflow-clip top-[2800px] w-[1728px]" data-name="Section 2">
        <p className="absolute font-['Inter_Tight:Regular',sans-serif] font-normal leading-none left-[639px] text-[100px] text-black top-[322px] whitespace-nowrap">Section 3</p>
      </div>
    </div>
  );
}