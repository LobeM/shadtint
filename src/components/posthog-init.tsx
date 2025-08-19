"use client";

import { initPostHog } from "@/lib/posthog";
import { useEffect } from "react";

export function PostHogInit() {
  useEffect(() => {
    initPostHog();
  }, []);

  return null;
}
