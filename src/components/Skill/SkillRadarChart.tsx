import { useEffect, useRef, useState } from "react";
import { Radar } from 'react-chartjs-2';
import colors from "tailwindcss/colors"; // Import Tailwind colors
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
} from 'chart.js';
import { SkillData } from "./SkillData";
import SkillSliders from "./SkillSlider";

// Register the required Chart.js components
ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
);

interface SkillsRadarProps {
    skills?: {
        name: string;
        value: number;
    }[];
}

export const SkillRadar: React.FC<SkillsRadarProps> = ({ skills = SkillData.categories }) => {
    const chartRef = useRef<any>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [radarAngle, setRadarAngle] = useState(0);
    const [pingPoints, setPingPoints] = useState<Array<{ x: number, y: number, size: number, opacity: number, id: number }>>([]);
    const [nextId, setNextId] = useState(0);

    // Prepare data for the chart
    const data = {
        labels: skills.map(skill => skill.name),
        datasets: [
            {
                label: 'Skill Level',
                data: skills.map(skill => skill.value),
                // backgroundColor: 'rgba(246, 244, 123, 0.06)',
                borderColor: 'rgb(224, 217, 98)',
                borderWidth: 2,
                pointBackgroundColor: colors.amber[300],
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: colors.amber[800],
                pointLabelFontSize: 14,
            },
        ],
    };

    // Chart options
    const options = {
        scales: {
            r: {
                angleLines: {
                    color: colors.gray[300]
                },
                grid: {
                    circular: true,
                    // color: 'rgba(255, 255, 255, 0.2)',
                    color: colors.gray[300]
                },
                pointLabels: {
                    color: colors.amber[700],
                    font: {
                        size: 14,
                        weight: 'bold',
                    },
                },
                ticks: {
                    backdropColor: 'transparent',
                    color: colors.amber[800],
                    z: 1,
                    stepSize: 20,
                },
                suggestedMin: 0,
                suggestedMax: 100,
            },
        },
        plugins: {
            legend: {
                labels: {
                    color: colors.black[800],
                    font: {
                        size: 14,
                    },
                },
            },
            tooltip: {
                cornerRadius: 10,
                backgroundColor: colors.violet[800],
                titleColor: '#fff',
                bodyColor: '#fff',
                titleFont: {
                    size: 10,
                    weight: 'bold',
                },
                bodyFont: {
                    size: 8,
                },
                padding: 5,
                displayColors: false,
                callbacks: {
                    label: (context: any) => `Level: ${context.raw}/100`,
                },
            },
        },
        animation: {
            duration: 2000,
        },
        responsive: true,
        maintainAspectRatio: false,
    };

    // Radar sweep effect
    useEffect(() => {
        const radarSweepInterval = setInterval(() => {
            setRadarAngle(prevAngle => (prevAngle + 2) % 360);
        }, 50);

        return () => clearInterval(radarSweepInterval);
    }, []);

    // Calculate point positions and add pinging effect
    useEffect(() => {
        if (!chartRef.current || !containerRef.current) return;

        const chart = chartRef.current;
        if (!chart || !chart.chartArea) return;

        // Get chart center and radius
        // const centerX = chart.chartArea.left + chart.chartArea.width / 2;
        // const centerY = chart.chartArea.top + chart.chartArea.height / 2;
        // const radius = Math.min(chart.chartArea.width, chart.chartArea.height) / 2;

        // Create ping points at radar data points
        const newPingPoints: Array<{ x: number, y: number, size: number, opacity: number, id: number }> = [];

        const meta = chart.getDatasetMeta(0);
        if (meta && meta.data) {
            meta.data.forEach((point: any, index: number) => {
                // Only create new ping points occasionally, ensuring they only appear at actual data points
                if (Math.random() > 0.97) {
                    // Use the actual point location from Chart.js
                    const pointX = point.x;
                    const pointY = point.y;

                    newPingPoints.push({
                        x: pointX,
                        y: pointY,
                        size: 5,
                        opacity: 1,
                        id: nextId + new Date().getTime() + index // Ensure unique IDs
                    });
                }
            });

            if (newPingPoints.length > 0) {
                setNextId(prevId => prevId + newPingPoints.length);
                setPingPoints(prev => [...prev, ...newPingPoints]);
            }
        }
    }, [radarAngle, skills]);

    // Animate ping points
    useEffect(() => {
        if (pingPoints.length === 0) return;

        const pingInterval = setInterval(() => {
            setPingPoints(prev =>
                prev.map(point => ({
                    ...point,
                    size: point.size + 0.8,
                    opacity: point.opacity - 0.03
                })).filter(point => point.opacity > 0)
            );
        }, 40);

        return () => clearInterval(pingInterval);
    }, [pingPoints]);

    return (
        <section className="skills-radar-container mx-auto px-12 py-16 text-center relative w-full" ref={containerRef}>
            <div className="flex flex-col items-end justify-end relative text-right mb-8 w-full">
                <h2 className="text-4xl font-bold text-black mb-2">SKILLS</h2>
                <div className="border-t-2 border-yellow-500 w-15 mb-4"></div>
            </div>
            <div className="relative flex flex-row w-full p-4 overflow-hidden">
                {/* Radar Chart Section (Dynamic) */}
                <div className="flex-1 flex justify-center items-center w-[70%] max-sm:w-full">
                    <div className="h-[500px] w-full relative bg-blue-50">
                        {/* Radar Chart Component */}
                        {/* @ts-ignore */}
                        <Radar ref={chartRef} data={data} options={options} />
                        {/* Radar overlay container */}
                        <div className="absolute inset-0 pointer-events-none flex">
                            {/* Ping animations for points */}
                            {pingPoints.map(point => (
                                <div
                                    key={point.id}
                                    className="absolute rounded-full animate-ping-point"
                                    style={{
                                        left: `${point.x}px`,
                                        top: `${point.y}px`,
                                        width: `${point.size}px`,
                                        height: `${point.size}px`,
                                        backgroundColor: colors.amber[400],
                                        opacity: point.opacity,
                                        transform: 'translate(-50%, -50%)',
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Slider Information Section (Fixed) */}
                <div className="flex text-[10px] flex-none w-80 h-full ml-5 max-sm:flex-1 max-sm:w-full justify-center items-center">
                    <div>
                        {/* Sliders Component */}
                        <SkillSliders />
                    </div>
                </div>
            </div>
        </section>
    );
};