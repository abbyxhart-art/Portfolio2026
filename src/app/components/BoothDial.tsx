import { useEffect, useRef, useState } from 'react';
import type { RefObject } from 'react';
import iconVideoRecorder from '../../assets/project/booth/video-recorder.svg';
import iconStickerCircle from '../../assets/project/booth/sticker-circle.svg';
import iconInstagram from '../../assets/project/booth/instagram.svg';
import iconTransform from '../../assets/project/booth/transform.svg';

const SIZE = 220;
const ORBIT_R = 70;
const PILL = 40;
const ICON = 22;

// flex gap between leading spacer and section 0
const GAP = 160;

// Icons: each angle is the snap-exact position it occupies when rotation = 0.
// As the dial rotates CW through 0 → 90 → 180 → 270°, the icon at 270° rises to top,
// then 180°, then 90° — matching sections 0 → 1 → 2 → 3.
const icons = [
  { src: iconVideoRecorder, angle: 0,   section: 0 },
  { src: iconInstagram,     angle: 90,  section: 3 },
  { src: iconStickerCircle, angle: 180, section: 2 },
  { src: iconTransform,     angle: 270, section: 1 },
];

// Section n snaps at scrollLeft = GAP + n * (0.5vw + GAP).
// The span from section 0 to section 3 = 3 * (0.5vw + GAP).
// Map that span to 0–270° so each snap point hits an exact multiple of 90°.
const snapScrollLeft = (index: number, vw: number) => GAP + index * (vw * 0.5 + GAP);
const spanPx = (vw: number) => 3 * (vw * 0.5 + GAP);

export default function BoothDial({ scrollRef }: { scrollRef: RefObject<HTMLDivElement | null> }) {
  const [rotation, setRotation] = useState(0);
  const [activeSection, setActiveSection] = useState(0);
  const [hoveredIcon, setHoveredIcon] = useState<number | null>(null);
  const [dragging, setDragging] = useState(false);
  const dialRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const lastAngle = useRef(0);

  // Scroll → rotation + active section
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      const vw = window.innerWidth;
      const span = spanPx(vw);
      const rot = Math.max(0, Math.min(270, ((el.scrollLeft - GAP) / span) * 270));
      setRotation(rot);
      const idx = Math.round((el.scrollLeft - GAP) / (vw * 0.5 + GAP));
      setActiveSection(Math.max(0, Math.min(3, idx)));
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, [scrollRef]);

  // Drag → scroll
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      const rect = dialRef.current?.getBoundingClientRect();
      if (!rect) return;
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const angle = Math.atan2(e.clientY - cy, e.clientX - cx) * (180 / Math.PI);
      let delta = angle - lastAngle.current;
      if (delta > 180) delta -= 360;
      if (delta < -180) delta += 360;
      lastAngle.current = angle;
      const el = scrollRef.current;
      if (!el) return;
      const vw = window.innerWidth;
      // 270° of rotation = full section span
      const scrollDelta = (delta / 270) * spanPx(vw);
      const min = snapScrollLeft(0, vw);
      const max = snapScrollLeft(3, vw);
      el.scrollLeft = Math.max(min - GAP * 2, Math.min(max + GAP * 2, el.scrollLeft + scrollDelta));
    };
    const onUp = () => { isDragging.current = false; setDragging(false); };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => { window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp); };
  }, [scrollRef]);

  const onDialMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    isDragging.current = true;
    setDragging(true);
    const rect = dialRef.current?.getBoundingClientRect();
    if (!rect) return;
    lastAngle.current = Math.atan2(e.clientY - (rect.top + rect.height / 2), e.clientX - (rect.left + rect.width / 2)) * (180 / Math.PI);
  };

  const scrollToSection = (index: number) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ left: snapScrollLeft(index, window.innerWidth), behavior: 'smooth' });
  };

  const C = SIZE / 2;

  return (
    <div
      ref={dialRef}
      onMouseDown={onDialMouseDown}
      className={`relative select-none ${dragging ? 'cursor-grabbing' : 'cursor-grab'}`}
      style={{ width: SIZE, height: SIZE }}
    >
      {/* Circle background */}
      <div
        className="absolute inset-0 rounded-full border border-[#302f34]"
        style={{ backgroundColor: 'rgba(88,85,100,0.15)', backdropFilter: 'blur(12px)' }}
      />

      {/* Rotating ring */}
      <div
        className="absolute inset-0"
        style={{ transform: `rotate(${rotation}deg)`, willChange: 'transform' }}
      >
        {icons.map(({ src, angle, section }, i) => {
          const rad = ((angle - 90) * Math.PI) / 180;
          const x = C + Math.cos(rad) * ORBIT_R - PILL / 2;
          const y = C + Math.sin(rad) * ORBIT_R - PILL / 2;
          const isActive = section === activeSection;
          const isHovered = hoveredIcon === i;
          return (
            <div
              key={i}
              className="absolute flex items-center justify-center rounded-full cursor-pointer transition-opacity duration-150"
              style={{
                left: x,
                top: y,
                width: PILL,
                height: PILL,
                backgroundColor: 'rgba(88,85,100,0.25)',
                transform: `rotate(${-rotation}deg)`,
                willChange: 'transform',
                opacity: isActive || isHovered ? 1 : 0.5,
              }}
              onMouseDown={e => e.stopPropagation()}
              onMouseEnter={() => setHoveredIcon(i)}
              onMouseLeave={() => setHoveredIcon(null)}
              onClick={() => scrollToSection(section)}
            >
              <img src={src} alt="" width={ICON} height={ICON} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
