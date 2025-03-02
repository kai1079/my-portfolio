import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
    Align,
} from 'chart.js';
import { useRef } from 'react';
import { Radar } from 'react-chartjs-2';
import colors from "tailwindcss/colors"; // Import Tailwind colors
import ChartDataLabels from "chartjs-plugin-datalabels";
import SkillSliders from './SkillSlider';
import { SkillData } from "./SkillData"; // Import dataset
import { Anchor } from 'chartjs-plugin-datalabels/types/options';

ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
    ChartDataLabels
);

const data = {
    labels: SkillData.categories.map((cat) => cat.name),
    datasets: [
        {
            label: "Software Development Skills",
            data: SkillData.categories.map((cat) => cat.value),
            borderColor: "rgba(59, 130, 246, 1)",
            backgroundColor: "rgba(59, 130, 246, 0.2)",
            pointBackgroundColor: colors.indigo[600],
            pointBorderColor: "#ffffff",
            pointRadius: 6,
            pointHoverRadius: 10
        },
    ],
}


export const SkillRadar: React.FC = () => {
    const chartRef = useRef<any>(null);

    const options = {
        responsive: true,
        animation: {
            radius: {
                duration: 1000,
                easing: 'easeOutCubic',
                from: 8,
                to: 15,
                loop: true,
            }
        },
        plugins: {
            datalabels: {
                labels: {
                    value: {
                        color: "green"
                    },
                    title: {
                        color: colors.indigo[800]
                    }
                },
                color: "black", // Text color
                font: {
                    size: 12,
                },
                anchor: "end" as Anchor, // Position relative to the point
                align: "top" as Align, // Align text above points
                formatter: (value: number, _: any) => {
                    // return `${context.chart.data.labels[context.dataIndex]}: ${value}`; // ✅ Show both label and value
                    return `${value}`;
                },
            },
        },
        scales: {
            r: {
                grid: {
                    circular: true,
                    lineWidth: 1.5,
                    color: colors.indigo[200],
                },
                ticks: {
                    display: true,
                    color: colors.indigo[700], // Hide numbers around radar chart,
                    major: {
                        enabled: true
                    }
                },
            },
        },
    };
    return (
        <section className="mx-auto px-12 py-16 text-center relative h-full w-full">
            <div className="flex relative items-center justify-center mb-8 w-full">
                <div className="w-24 h-0.5 bg-yellow-500"></div>
                <h2 className="text-4xl font-bold text-black mx-4">SKILLS</h2>
                <div className="w-24 h-0.5 bg-yellow-500"></div>
            </div>
            <div className="flex relative items-center justify-center w-full" >
                <div className='flex flex-1 w-full h-full items-center justify-center mx-auto'>
                    <div className='w-full h-full'>
                        {/* @ts-ignore: Ignore the type error when passing 'options' */}
                        <Radar ref={chartRef} data={data} options={options} />
                    </div>
                </div>
                <div className='flex w-60 p-5 flex-none text-[8px]'>
                    <SkillSliders />
                </div>
            </div>

        </section>

    )
}