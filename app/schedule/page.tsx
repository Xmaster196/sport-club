import { Suspense } from "react";

import { ScheduleView } from "@/components/schedule-view";

export default function SchedulePage() {
  return (
    <div className="container mx-auto px-4 py-16 sm:py-20">
      <Suspense
        fallback={
          <div className="mx-auto max-w-5xl animate-pulse space-y-4">
            <div className="mx-auto h-8 w-64 rounded-xl bg-muted" />
            <div className="h-32 rounded-2xl bg-muted/60" />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="h-56 rounded-2xl bg-muted/60" />
              ))}
            </div>
          </div>
        }
      >
        <ScheduleView />
      </Suspense>
    </div>
  );
}
