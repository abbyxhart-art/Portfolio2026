import imgScrollUpGradient from "figma:asset/d4f6868b53150e0fcb820cbd3ee047852c02ed8f.png";

export default function ScrollUpGradient() {
  return (
    <div className="relative size-full" data-name="Scroll Up gradient" style={{
      maskImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0) 100%)',
      WebkitMaskImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0) 100%)'
    }}>
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgScrollUpGradient} />
    </div>
  );
}