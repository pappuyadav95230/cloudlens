"use client";

import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

interface CostBreakdownChartProps {
    labels: string[];
    data: number[];
    colors: string[];
    height?: number;
}

export default function CostBreakdownChart({ labels, data, colors, height = 280 }: CostBreakdownChartProps) {
    const chartData = {
        labels,
        datasets: [
            {
                data,
                backgroundColor: colors,
                borderColor: colors.map(() => "rgba(255,255,255,0.8)"),
                borderWidth: 2,
                hoverOffset: 6,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "65%",
        plugins: {
            legend: {
                position: "bottom" as const,
                labels: {
                    color: "#94a3b8",
                    padding: 16,
                    usePointStyle: true,
                    pointStyle: "circle",
                    font: { size: 12 },
                },
            },
            tooltip: {
                backgroundColor: "#1e293b",
                titleColor: "#e2e8f0",
                bodyColor: "#e2e8f0",
                borderColor: "#334155",
                borderWidth: 1,
                padding: 12,
                cornerRadius: 8,
                callbacks: {
                    label: (ctx: { label: string; parsed: number }) => `${ctx.label}: $${ctx.parsed.toLocaleString()}`,
                },
            },
        },
    };

    return (
        <div style={{ height }}>
            <Doughnut data={chartData} options={options} />
        </div>
    );
}
