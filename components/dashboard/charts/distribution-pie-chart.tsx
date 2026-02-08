"use client";

import { memo, useMemo } from "react";
import { DistributionPoint } from "@/types/dashboard";
import { ChartCanvas } from "@/components/dashboard/chart-canvas";

export const DistributionPieChart = memo(function DistributionPieChart({ data, label }: { data: DistributionPoint[]; label: string }) {
  const config = useMemo(
    () => ({
      type: "pie" as const,
      data: {
        labels: data.map((entry) => entry.label),
        datasets: [
          {
            label,
            data: data.map((entry) => entry.value),
            backgroundColor: data.map((entry) => entry.color),
            hoverOffset: 4,
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { position: "bottom" } },
      },
    }),
    [data, label]
  );

  return <ChartCanvas config={config} />;
});
