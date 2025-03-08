import { useEffect, useRef, useState } from "react";
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
} from 'chart.js';
import '../../styles/SkillRadar.css'
import { BeakerIcon, CheckCircleIcon, ChevronDownIcon, CodeBracketIcon, PaintBrushIcon, ServerIcon } from "@heroicons/react/24/solid";

// Register the required Chart.js components
ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
);

// Default skills data with colors and categories
const defaultSkills: Skill[] = [
    { name: "React", level: 90, color: "#61dafb", category: "Frontend" },
    { name: "TypeScript", level: 85, color: "#3178c6", category: "Frontend" },
    { name: "JavaScript", level: 95, color: "#f7df1e", category: "Frontend" },
    { name: "HTML/CSS", level: 90, color: "#e34c26", category: "Frontend" },
    { name: "Node.js", level: 75, color: "#68a063", category: "Backend" },
    { name: "Express", level: 70, color: "#000000", category: "Backend" },
    { name: "MongoDB", level: 65, color: "#4DB33D", category: "Backend" },
    { name: "SQL", level: 60, color: "#F29111", category: "Backend" },
    { name: "UI Design", level: 80, color: "#ff6b6b", category: "Design" },
    { name: "Figma", level: 75, color: "#F24E1E", category: "Design" },
    { name: "Jest", level: 65, color: "#C21325", category: "Testing" },
    { name: "Cypress", level: 60, color: "#17202C", category: "Testing" },
]

// Skill categories with icons and colors
const categories: Record<string, SkillCategory> = {
    Frontend: {
        name: "Frontend",
        icon: <CodeBracketIcon className="h-4 w-4" />,
        color: "#3b82f6",
    },
    Backend: {
        name: "Backend",
        icon: <ServerIcon className="h-4 w-4" />,
        color: "#10b981",
    },
    Design: {
        name: "Design",
        icon: <PaintBrushIcon className="h-4 w-4" />,
        color: "#f43f5e",
    },
    Testing: {
        name: "Testing",
        icon: <BeakerIcon className="h-4 w-4" />,
        color: "#8b5cf6",
    },
}


interface Skill {
    name: string
    level: number // 0-100
    color?: string
    category: string
}

interface SkillCategory {
    name: string
    icon: React.ReactNode
    color: string
}

interface SkillsRadarProps {
    skills: Skill[]
}

export const SkillRadar: React.FC<SkillsRadarProps> = ({ skills = defaultSkills }) => {

    const [activeCategory, setActiveCategory] = useState<string>("All")
    const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({})
    const [hoveredSkill, setHoveredSkill] = useState<Skill | null>(null)
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 })
    const chartRef = useRef<SVGSVGElement>(null)
    const tooltipRef = useRef<HTMLDivElement>(null)

    // Filter skills based on active category
    const filteredSkills = activeCategory === "All" ? skills : skills.filter((skill) => skill.category === activeCategory)

    // Group skills by category
    const skillsByCategory = skills.reduce(
        (acc, skill) => {
            if (!acc[skill.category]) {
                acc[skill.category] = []
            }
            acc[skill.category].push(skill)
            return acc
        },
        {} as Record<string, Skill[]>,
    )

    // Toggle category expansion
    const toggleCategory = (category: string) => {
        setOpenCategories((prev) => ({
            ...prev,
            [category]: !prev[category],
        }))
    }

    // Calculate points for the radar chart
    const calculatePoints = (skills: Skill[], radius: number, cx: number, cy: number) => {
        return skills.map((skill, i) => {
            const angle = (Math.PI * 2 * i) / skills.length - Math.PI / 2
            const value = skill.level / 100
            const x = cx + radius * value * Math.cos(angle)
            const y = cy + radius * value * Math.sin(angle)
            return { x, y, skill, angle }
        })
    }

    // Handle skill point hover
    const handleSkillHover = (skill: Skill, x: number, y: number) => {
        setHoveredSkill(skill)
        setTooltipPosition({ x, y })
    }

    // Handle skill point mouse leave
    const handleSkillLeave = () => {
        setHoveredSkill(null)
    }

    // Animate skill bars on category open
    useEffect(() => {
        Object.entries(openCategories).forEach(([category, isOpen]) => {
            if (isOpen) {
                const bars = document.querySelectorAll(
                    `.category-${category.toLowerCase().replace(/\s+/g, "-")} .skills-list-bar`,
                )
                bars.forEach((bar, index) => {
                    setTimeout(() => {
                        const width = bar.getAttribute("data-width")
                        if (width) {
                            bar.setAttribute("style", `width: ${width}; transition-delay: ${index * 100}ms;`)
                        }
                    }, 50)
                })
            }
        })
    }, [openCategories])

    // Chart dimensions
    const size = 300
    const radius = size * 0.4
    const cx = size / 2
    const cy = size / 2

    // Calculate points for the radar chart
    const points = calculatePoints(filteredSkills, radius, cx, cy)
    const polygonPoints = points.map((p) => `${p.x},${p.y}`).join(" ")

    // Generate circles for the radar background
    const circles = [0.2, 0.4, 0.6, 0.8, 1].map((ratio) => ({
        r: radius * ratio,
        cx,
        cy,
        label: `${ratio * 100}%`,
    }))

    return (
        <section className="relative">
            <div className="flex flex-col items-end justify-end relative text-right mb-8 w-full">
        <h2 className="text-4xl font-bold text-black mb-2">S K I L L S</h2>
        <div className="border-t-2 border-yellow-500 w-30 mb-4"></div>
      </div>
        <div className="skills-container">
            <div className="skills-background-pattern"></div>
            <div className="skills-wrapper">
                <div className="skills-header">
                    <h4 className="skills-subtitle">A comprehensive overview of my technical expertise and proficiency levels</h4>
                </div>

                <div className="skills-grid">
                    <div className="skills-text">
                        <h3 className="skills-text-title">Technical Proficiency</h3>
                        <p className="skills-text-description">
                            With over 5 years of experience in software development, I've developed expertise in a wide range of
                            technologies and frameworks. My focus has been on soft development, technical solutioning, technical design, problem-solving,
                            colloration, communication and buiding high-value product.
                        </p>

                        <div className="skills-categories">
                            {Object.entries(categories).map(([categoryName, category]) => (
                                <div
                                    key={categoryName}
                                    className={`skills-category category-${categoryName.toLowerCase().replace(/\s+/g, "-")}`}
                                    style={{
                                        animationDelay: `${Object.keys(categories).indexOf(categoryName) * 100}ms`,
                                        borderLeft: `4px solid ${category.color}`,
                                    }}
                                >
                                    <div className="skills-category-header" onClick={() => toggleCategory(categoryName)}>
                                        <h4 className="skills-category-title">
                                            <span className="skills-category-icon" style={{ color: category.color }}>
                                                {category.icon}
                                            </span>
                                            {categoryName}
                                        </h4>
                                        <ChevronDownIcon
                                            className={`skills-category-toggle ${openCategories[categoryName] ? "open" : ""}`}
                                        />
                                    </div>

                                    <div className={`skills-category-content ${openCategories[categoryName] ? "open" : ""}`}>
                                        {skillsByCategory[categoryName]?.map((skill, _) => (
                                            <div key={skill.name} className="skills-list-item">
                                                <div className="skills-list-name">
                                                    <CheckCircleIcon
                                                        className="skills-list-icon"
                                                        style={{ color: skill.color || category.color }}
                                                    />
                                                    <span className="skills-list-text">{skill.name}</span>
                                                </div>
                                                <div className="skills-list-bar-container">
                                                    <div
                                                        className="skills-list-bar"
                                                        data-width={`${skill.level}%`}
                                                        style={{
                                                            width: openCategories[categoryName] ? `${skill.level}%` : "0%",
                                                            backgroundColor: skill.color || category.color,
                                                        }}
                                                    ></div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="skills-chart-container">
                        <div className="skills-chart-tabs">
                            <button
                                className={`skills-chart-tab ${activeCategory === "All" ? "active" : ""}`}
                                onClick={() => setActiveCategory("All")}
                            >
                                All Skills
                            </button>
                            {Object.entries(categories).map(([categoryName, category]) => (
                                <button
                                    key={categoryName}
                                    className={`skills-chart-tab ${activeCategory === categoryName ? "active" : ""}`}
                                    onClick={() => setActiveCategory(categoryName)}
                                    style={{
                                        backgroundColor: activeCategory === categoryName ? `${category.color}20` : "",
                                        color: activeCategory === categoryName ? category.color : "",
                                    }}
                                >
                                    {categoryName}
                                </button>
                            ))}
                        </div>

                        <div className="skills-chart-content">
                            <svg ref={chartRef} className="skills-chart-svg" viewBox={`0 0 ${size} ${size}`}>
                                {/* Background circles */}
                                {circles.map((circle, i) => (
                                    <g key={i}>
                                        <circle cx={circle.cx} cy={circle.cy} r={circle.r} className="skills-chart-circle" />
                                        <text
                                            x={circle.cx}
                                            y={circle.cy - circle.r - 5}
                                            textAnchor="middle"
                                            className="text-[8px] fill-gray-400"
                                        >
                                            {circle.label}
                                        </text>
                                    </g>
                                ))}

                                {/* Axes */}
                                {points.map((point, i) => (
                                    <line
                                        key={i}
                                        x1={cx}
                                        y1={cy}
                                        x2={cx + radius * Math.cos(point.angle)}
                                        y2={cy + radius * Math.sin(point.angle)}
                                        className="skills-chart-axis"
                                    />
                                ))}

                                {/* Skill polygon */}
                                <polygon
                                    points={polygonPoints}
                                    className="skills-chart-polygon"
                                    style={{
                                        fill: activeCategory !== "All" ? `${categories[activeCategory].color}40` : "url(#skillGradient)",
                                        stroke: activeCategory !== "All" ? categories[activeCategory].color : "#3b82f6",
                                    }}
                                />

                                {/* Gradient definition */}
                                <defs>
                                    <linearGradient id="skillGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.6" />
                                        <stop offset="100%" stopColor="#6366f1" stopOpacity="0.2" />
                                    </linearGradient>
                                </defs>

                                {/* Skill points */}
                                {points.map((point, i) => (
                                    <circle
                                        key={i}
                                        cx={point.x}
                                        cy={point.y}
                                        r={5}
                                        className="skills-chart-point"
                                        style={{
                                            fill: point.skill.color || categories[point.skill.category].color,
                                        }}
                                        onMouseEnter={(e) => {
                                            const rect = e.currentTarget.getBoundingClientRect()
                                            const x = rect.left + window.scrollX
                                            const y = rect.top + window.scrollY
                                            handleSkillHover(point.skill, x, y)
                                        }}
                                        onMouseLeave={handleSkillLeave}
                                    />
                                ))}

                                {/* Labels */}
                                {points.map((point, i) => {
                                    const labelX = cx + (radius + 20) * Math.cos(point.angle)
                                    const labelY = cy + (radius + 20) * Math.sin(point.angle)
                                    const textAnchor =
                                        point.angle === -Math.PI / 2
                                            ? "middle"
                                            : point.angle < -Math.PI / 2 || point.angle > Math.PI / 2
                                                ? "end"
                                                : "start"

                                    return (
                                        <text
                                            key={i}
                                            x={labelX}
                                            y={labelY}
                                            textAnchor={textAnchor}
                                            dominantBaseline="middle"
                                            className="skills-chart-label"
                                            style={{
                                                fill: point.skill.color || categories[point.skill.category].color,
                                            }}
                                        >
                                            {point.skill.name}
                                        </text>
                                    )
                                })}
                            </svg>

                            {/* Tooltip */}
                            <div
                                ref={tooltipRef}
                                className={`skills-tooltip ${hoveredSkill ? "visible" : ""}`}
                                style={{
                                    left: tooltipPosition.x + 10,
                                    top: tooltipPosition.y - 30,
                                }}
                            >
                                {hoveredSkill && (
                                    <>
                                        <div className="font-bold">{hoveredSkill.name}</div>
                                        <div>Proficiency: {hoveredSkill.level}%</div>
                                        <div>Category: {hoveredSkill.category}</div>
                                    </>
                                )}
                            </div>
                        </div>

                        <div className="skills-legend">
                            {Object.entries(categories).map(([categoryName, category]) => (
                                <div key={categoryName} className="skills-legend-item">
                                    <div className="skills-legend-color" style={{ backgroundColor: category.color }}></div>
                                    {categoryName}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </section>
    );
};