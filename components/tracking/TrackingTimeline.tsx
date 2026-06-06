"use client";

/**
 * components/tracking/TrackingTimeline.tsx
 *
 * The full vertical timeline component for order tracking.
 * Accepts an array of TrackingStep objects and renders them in sequence.
 */

import TrackingStep from "./TrackingStep";
import type { TrackingStep as TrackingStepType } from "@/types/order";

interface TrackingTimelineProps {
  steps: TrackingStepType[];
}

export default function TrackingTimeline({ steps }: TrackingTimelineProps) {
  return (
    <div className="relative py-2">
      {steps.map((step, index) => (
        <TrackingStep
          key={step.status}
          step={step}
          isLast={index === steps.length - 1}
          index={index}
        />
      ))}
    </div>
  );
}
