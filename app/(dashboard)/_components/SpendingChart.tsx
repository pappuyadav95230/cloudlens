"use client";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
} from "chart.js";
import type { ChartOptions } from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

interface SpendingChartProps {
    labels: string[];
    data: number[];
    label?: string;
    height?: number;
}

export default function SpendingChart({ labels, data, label = "Spending ($)", height = 300 }: SpendingChartProps) {
    const chartData = {
        labels,
        datasets: [
            {
                label,
                data,
                borderColor: "#6366f1",
                backgroundColor: "rgba(99, 102, 241, 0.08)",
                borderWidth: 2,
                fill: true,
                tension: 0.4,
                pointRadius: 0,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "#6366f1",
                pointHoverBorderColor: "#fff",
                pointHoverBorderWidth: 2,
            },
        ],
    };

    const options: ChartOptions<"line"> = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: "#1e293b",
                titleColor: "#e2e8f0",
                bodyColor: "#e2e8f0",
                borderColor: "#334155",
                borderWidth: 1,
                padding: 12,
                cornerRadius: 8,
                displayColors: false,
                callbacks: {
                    label: (ctx: { parsed: { y: number | null } }) => `$${(ctx.parsed.y ?? 0).toLocaleString()}`,
                },
            },
        },
        scales: {
            x: {
                grid: { display: false },
                ticks: { color: "#94a3b8", font: { size: 11 } },
                border: { display: false },
            },
            y: {
                grid: { color: "rgba(148, 163, 184, 0.1)" },
                ticks: {
                    color: "#94a3b8",
                    font: { size: 11 },
                    callback: (value: string | number) => `$${value}`,
                },
                border: { display: false },
            },
        },
        interaction: {
            intersect: false,
            mode: "index" as const,
        },
    };

    return (
        <div style={{ height }}>
            <Line data={chartData} options={options} />
        </div>
    );
}
