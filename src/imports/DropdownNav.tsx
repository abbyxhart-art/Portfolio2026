import clsx from "clsx";
type HelperProps = {
  text: string;
  text1: string;
  additionalClassNames?: string;
  isActive?: boolean;
};

function Helper({ text, text1, additionalClassNames = "", isActive = false }: HelperProps) {
  return (
    <div className={clsx("absolute content-stretch flex items-center leading-none left-[10.25px] text-[14px]", additionalClassNames)}>
      <p className={clsx("relative shrink-0 transition-all duration-75 ease-in-out", isActive ? "opacity-100 text-[#272336]" : "opacity-50 text-[#7E7C87]")}>{text}</p>
      <p className={clsx("relative shrink-0 transition-all duration-75 ease-in-out", isActive ? "opacity-100 text-[#272336]" : "opacity-50 text-[#7E7C87]")}>{text1}</p>
    </div>
  );
}

type DropdownNavProps = {
  currentSection?: number;
  onBackToTop?: () => void;
};

export default function DropdownNav({ currentSection = 1, onBackToTop }: DropdownNavProps) {
  return (
    <div className="border-[#c8c4d7] border border-solid font-['Inter_Tight:Regular',sans-serif] font-normal relative rounded-[8px] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.15)] size-full whitespace-nowrap" data-name="Dropdown Nav">
      <Helper text="3" text1="Section 3" additionalClassNames="gap-[8px] top-[103.25px]" isActive={currentSection === 3} />
      <Helper text="2" text1="Section 2" additionalClassNames="gap-[9px] top-[74.25px]" isActive={currentSection === 2} />
      <Helper text="1" text1="Section 1" additionalClassNames="gap-[12px] top-[45.25px]" isActive={currentSection === 1} />
      <button 
        onClick={onBackToTop}
        className="absolute leading-[normal] left-[10.25px] text-[#7E7C87] text-[12px] top-[7.25px] underline decoration-dotted underline-offset-[1px] hover:text-black transition-colors cursor-pointer bg-transparent border-none p-0"
      >
        Back to top
      </button>
    </div>
  );
}