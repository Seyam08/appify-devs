"use client";

import { memo, useMemo } from "react";
import { TrendPoint } from "@/types/dashboard";
import { ChartCanvas } from "@/components/dashboard/chart-canvas";

export const OrdersBarChart = memo(function OrdersBarChart({ data }: { data: TrendPoint[] }) {
  const config = useMemo(
    () => ({
      type: "bar" as const,
      data: {
        labels: data.map((entry) => entry.month),
        datasets: [
          {
            label: "Orders",
            data: data.map((entry) => entry.value),
            backgroundColor: "rgba(16, 185, 129, 0.65)",
            borderColor: "#10b981",
            borderWidth: 1,
            borderRadius: 8,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: { duration: 800 },
        plugins: { legend: { display: false } },
      },
    }),
    [data]
  );

  return <ChartCanvas config={config} />;
});
