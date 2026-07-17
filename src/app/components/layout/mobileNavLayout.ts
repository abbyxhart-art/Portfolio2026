// Shared layout numbers for the mobile bottom bars — MobileMainNav's
// permanent row and SectionNavigation's pill row are separate fixed-position
// components, so the only way "Back to top" (SectionNavigation) reliably lines
// up left-edge-to-left-edge with the Social Media chip (MobileMainNav) is
// for both to be built from these same numbers.

// Drink illustration is drawn at 42x62 natively (see SipCupInner/EmptyCup);
// scaled so its rendered height matches the Social Media chip's 34px height.
const DRINK_NATIVE_WIDTH = 42;
const DRINK_NATIVE_HEIGHT = 62;
export const DRINK_HEIGHT = 34;
export const DRINK_SCALE = DRINK_HEIGHT / DRINK_NATIVE_HEIGHT;
export const DRINK_WIDTH = Math.round(DRINK_NATIVE_WIDTH * DRINK_SCALE);

// Social Media chip: 3 icons (18px) + 2 gaps (16px) + horizontal padding (8px each side).
export const SOCIAL_CHIP_PADDING_X = 8;
export const SOCIAL_CHIP_WIDTH = 3 * 18 + 2 * 16 + 2 * SOCIAL_CHIP_PADDING_X;

export const SOCIAL_DRINK_GAP = 8;

// Total width of the Social + Drink cluster, flush against the shared 16px
// right margin. SectionNavigation's "Back to top" pill uses this same width
// so its left edge lands exactly where the Social Media chip's left edge is.
export const RIGHT_CLUSTER_WIDTH = SOCIAL_CHIP_WIDTH + SOCIAL_DRINK_GAP + DRINK_WIDTH;

// Shared horizontal margin both bars sit within.
export const MOBILE_NAV_MARGIN = 16;

// The Home/About/Lab row's own box (see MobileMainNav's extracted
// z-75 nav-links layer) — used so anything else that needs to align to its
// vertical center (e.g. SectionNavigation's open-sheet back-to-top button)
// derives it instead of guessing a matching number independently.
export const MAIN_NAV_ROW_BOTTOM = 24;
export const MAIN_NAV_ROW_HEIGHT = 34;
export const MAIN_NAV_ROW_CENTER = MAIN_NAV_ROW_BOTTOM + MAIN_NAV_ROW_HEIGHT / 2;

// Shared "rests above the permanent nav" offset for fixed mobile widgets
// (Home's MobileCasestudyNav, About's mobile ResumeCard) — derived, not
// hardcoded, so it stays correct if the main nav row's own height/offset
// ever changes.
export const STICKY_WIDGET_BOTTOM = MAIN_NAV_ROW_BOTTOM + MAIN_NAV_ROW_HEIGHT + 8;

// Shared 0.75px stroke used on the mobile casestudy chrome's buttons, pills,
// and the Social Media chip — Border/Light token at 20% opacity. color-mix
// is used since the token itself is an opaque hex value with no alpha.
export const MOBILE_BORDER_LIGHT_20 = "color-mix(in srgb, var(--color-border-light) 20%, transparent)";
