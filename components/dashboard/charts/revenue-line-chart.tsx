"use client";

import { memo, useMemo } from "react";
import { TrendPoint } from "@/types/dashboard";
import { ChartCanvas } from "@/components/dashboard/chart-canvas";

export const RevenueLineChart = memo(function RevenueLineChart({ data }: { data: TrendPoint[] }) {
  const config = useMemo(
    () => ({
      type: "line" as const,
      data: {
        labels: data.map((entry) => entry.month),
        datasets: [
          {
            label: "Revenue",
            data: data.map((entry) => entry.value),
            borderColor: "#6366f1",
            backgroundColor: "rgba(99, 102, 241, 0.15)",
            tension: 0.35,
            fill: true,
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: { enabled: true },
        },
      },
    }),
    [data]
  );

  return <ChartCanvas config={config} />;
});
