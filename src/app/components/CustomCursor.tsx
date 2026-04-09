import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import DefaultCursor from '../../imports/Cursor-22-723';
import ProjectCursor from '../../imports/Cursor-22-727';
import { useCursor } from '../context/CursorContext';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const { hoveredProject, isPurple } = useCursor();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);

  // Determine read time based on project
  const getReadTime = () => {
    switch (hoveredProject) {
      case 1:
        return '2 min read';
      case 2:
        return '5 min read';
      case 3:
        return '5 min read';
      case 4:
        return '7 min read';
      default:
        return '';
    }
  };

  const isProjectHovered = hoveredProject !== null;
  const readTime = getReadTime();

  return (
    <>
      <style>{`
        * {
          cursor: none !important;
        }
      `}</style>
      <motion.div
        className="fixed pointer-events-none z-[9999]"
        animate={{
          left: mousePosition.x,
          top: mousePosition.y,
          opacity: isVisible ? 1 : 0
        }}
        transition={{ 
          opacity: { duration: 0.2 },
          left: { duration: 0 },
          top: { duration: 0 }
        }}
        style={{
          x: isProjectHovered ? -45 : -14,
          y: -14
        }}
      >
        <motion.div
          initial={false}
          animate={{
            width: isProjectHovered ? 90 : 28,
          }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          {isPurple ? (
            <div className="size-[28px] rounded-[18.667px] bg-[rgba(154,71,255,0.2)] border-[0.75px] border-solid border-[#dbbdfe]" />
          ) : isProjectHovered ? (
            <motion.div 
              className="bg-[#faf9ff] relative rounded-[16px] h-[28px] flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.15 }}
            >
              <div aria-hidden="true" className="border-[#e8e7f0] border-[0.75px] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.07)] absolute">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
                  <circle cx="12" cy="12" id="Ellipse 2853" opacity="0" r="11.4" stroke="var(--stroke-0, #9A47FF)" strokeWidth="1.2" />
                </svg>
              </div>
              <div className="absolute left-0 size-[24px] top-0">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
                  <circle cx="12" cy="12" id="Ellipse 2853" opacity="0" r="11.4" stroke="var(--stroke-0, #9A47FF)" strokeWidth="1.2" />
                </svg>
              </div>
              <motion.p 
                className="font-['Inter:Regular',sans-serif] font-normal leading-[1.2] not-italic text-[14px] text-black whitespace-nowrap"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.15, delay: 0.05 }}
              >
                {readTime}
              </motion.p>
            </motion.div>
          ) : (
            <div className="size-[28px]">
              <DefaultCursor />
            </div>
          )}
        </motion.div>
      </motion.div>
    </>
  );
}