"use client";

import { memo, useEffect, useRef } from "react";

export interface ChartConfig {
  type: "line" | "bar" | "pie" | "doughnut";
  data: {
    labels: string[];
    datasets: Array<{
      label: string;
      data: number[];
      borderColor?: string;
      backgroundColor?: string | string[];
      tension?: number;
      fill?: boolean;
      borderWidth?: number;
      hoverOffset?: number;
      borderRadius?: number;
    }>;
  };
  options?: Record<string, unknown>;
}

declare global {
  interface Window {
    Chart?: {
      new (context: CanvasRenderingContext2D, config: ChartConfig): { destroy: () => void };
    };
  }
}

let chartScriptPromise: Promise<void> | null = null;

function ensureChartScript() {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.Chart) return Promise.resolve();

  if (!chartScriptPromise) {
    chartScriptPromise = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/npm/chart.js@4.4.7/dist/chart.umd.min.js";
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error("Could not load chart library."));
      document.body.append(script);
    });
  }

  return chartScriptPromise;
}

interface ChartCanvasProps {
  config: ChartConfig;
}

export const ChartCanvas = memo(function ChartCanvas({ config }: ChartCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let chartInstance: { destroy: () => void } | null = null;
    let cancelled = false;

    ensureChartScript()
      .then(() => {
        if (cancelled || !window.Chart || !canvasRef.current) return;
        const context = canvasRef.current.getContext("2d");
        if (!context) return;

        chartInstance = new window.Chart(context, config);
      })
      .catch(() => null);

    return () => {
      cancelled = true;
      chartInstance?.destroy();
    };
  }, [config]);

  return <canvas ref={canvasRef} className="h-full w-full" />;
});
