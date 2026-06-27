// Toggle this to true to disable all Framer Motion animations for debugging.
// When enabled, motion components render as plain HTML elements with no
// initial/animate/transition/layout props — identical markup, zero GPU layers.
export const DEBUG_DISABLE_MOTION = false;

import * as React from 'react';
import {
  motion as _motion,
  AnimatePresence as _AnimatePresence,
} from 'motion/react';

export {
  useScroll,
  useTransform,
  useMotionValue,
  useInView,
  useAnimationControls,
} from 'motion/react';

// Props that are motion-specific and should be stripped in static mode
const MOTION_KEYS = new Set([
  'initial', 'animate', 'exit',
  'whileHover', 'whileTap', 'whileFocus', 'whileInView', 'whileDrag',
  'layout', 'layoutId', 'layoutDependency', 'layoutScroll',
  'transition', 'variants', 'custom', 'viewport',
  'onAnimationStart', 'onAnimationComplete', 'onAnimationIteration',
  'drag', 'dragConstraints', 'dragDirectionLock', 'dragElastic',
  'dragMomentum', 'dragPropagation', 'onDragStart', 'onDragEnd', 'onDrag',
  'onDirectionLock',
]);

function makeStatic(tag: string) {
  const Static = React.forwardRef(({ children, ...props }: Record<string, any>, ref: any) => {
    const htmlProps: Record<string, any> = { ref };
    for (const [k, v] of Object.entries(props)) {
      if (!MOTION_KEYS.has(k)) htmlProps[k] = v;
    }
    return React.createElement(tag, htmlProps, children);
  });
  Static.displayName = `Static.${tag}`;
  return Static;
}

// Proxy returns a static component for any motion.X tag
const staticMotion = new Proxy({} as typeof _motion, {
  get(_, tag: string) {
    return makeStatic(tag);
  },
});

export const motion = DEBUG_DISABLE_MOTION
  ? (staticMotion as unknown as typeof _motion)
  : _motion;

export const AnimatePresence: React.FC<{ children: React.ReactNode; [k: string]: any }> =
  DEBUG_DISABLE_MOTION
    ? ({ children }) => <>{children}</>
    : _AnimatePresence;
