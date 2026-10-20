/**
 * Motion System Tokens & Utilities
 * Adheres strictly to the brief addendum:
 * - 3 durations (180ms, 420ms, 900ms)
 * - 2 easings (power3.out for entrances, expo.inOut for transitions)
 * - 1 stagger value (60ms)
 * - Only animate transform, opacity, clip-path, filter
 */

export const MOTION = {
  durations: {
    fast: 0.18,
    med: 0.42,
    slow: 0.9,
    // Milliseconds for CSS / Framer Motion
    fastMs: 180,
    medMs: 420,
    slowMs: 900,
  },
  easings: {
    // GSAP strings
    entrance: "power3.out",
    transition: "expo.inOut",
    // Cubic bezier arrays for Framer Motion / CSS
    entranceBezier: [0.22, 1, 0.36, 1] as const,
    transitionBezier: [0.87, 0, 0.13, 1] as const,
  },
  stagger: 0.06,
  staggerMs: 60,
} as const;

/**
 * Checks if reduced motion is requested either via system settings
 * or via the test URL query parameter `?reduce=1`
 */
export function isReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get("reduce") === "1") return true;

  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
