"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { isReducedMotion, MOTION } from "@/lib/motion";

export function IntroOverlay() {
  // As specified by the addendum: "Never block first paint for an animation. Skip preloader if assets are optimized."
  // The Hero component natively executes the masked slide-up and hairline draw-across.
  return null;
}
