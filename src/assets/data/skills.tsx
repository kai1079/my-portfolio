import { ChatBubbleLeftEllipsisIcon, CloudIcon, CodeBracketIcon, CodeBracketSquareIcon, CogIcon, ServerIcon, ShieldCheckIcon, TableCellsIcon, UsersIcon, WrenchScrewdriverIcon } from "@heroicons/react/24/solid";
import { Skill, SkillCategory } from "../../types/SkillType";

export const defaultSkills: Skill[] = [
  { name: "Java", level: 90, color: "#f89820", category: "Backend" },
  { name: "C#", level: 85, color: "#68217a", category: "Backend" },
  { name: "Spring Boot", level: 90, color: "#6db33f", category: "Backend" },
  { name: ".NET Core", level: 85, color: "#512bd4", category: "Backend" },
  { name: "Python", level: 65, color: "#3776ab", category: "Backend" },
  { name: "C/C++", level: 70, color: "#00599c", category: "SystemsProgramming" },
  { name: "Kafka", level: 85, color: "#231f20", category: "Messaging" },
  { name: "Redis", level: 80, color: "#dc382d", category: "Messaging" },
  { name: "RabbitMQ", level: 75, color: "#ff6600", category: "Messaging" },
  { name: "MySQL", level: 85, color: "#00758f", category: "Database" },
  { name: "SQL Server", level: 85, color: "#0db7ed", category: "Database" },
  { name: "AWS", level: 80, color: "#ff9900", category: "Cloud" },
  { name: "Azure", level: 70, color: "#d24939", category: "Cloud" },
  { name: "Kubernetes", level: 80, color: "#326ce5", category: "DevOps" },
  { name: "Docker", level: 80, color: "#0db7ed", category: "DevOps" },
  { name: "GoCD", level: 80, color: "#007acc", category: "DevOps" },
  { name: "Buildkite", level: 80, color: "#3ddc84", category: "DevOps" },
  { name: "Jenkins", level: 80, color: "#d24939", category: "DevOps" },
  { name: "JWT", level: 85, color: "#000000", category: "Security" },
  { name: "OAuth", level: 85, color: "#2d3748", category: "Security" },
  { name: "Multi-Factor Authentication", level: 80, color: "#008cff", category: "Security" },
  { name: "Bash Script", level: 60, color: "#4eaa25", category: "Others" },
  { name: "Postman", level: 80, color: "#ff6c37", category: "Others" },
  { name: "Jira", level: 85, color: "#0052cc", category: "Collaboration" },
  { name: "Confluence", level: 85, color: "#172b4d", category: "Collaboration" },
  { name: "Git", level: 85, color: "#f34f29", category: "VersionControl" },
  { name: "Gerrit", level: 85, color: "#bbbbbb", category: "VersionControl" },
  { name: "Autotools", level: 65, color: "#f0db4f", category: "BuildAutomation" },
  { name: "Makefile", level: 65, color: "#ef5734", category: "BuildAutomation" },
  { name: "React", level: 90, color: "#61dafb", category: "Frontend" },
  { name: "TypeScript", level: 85, color: "#3178c6", category: "Frontend" },
  { name: "JavaScript", level: 95, color: "#f7df1e", category: "Frontend" },
];

export const categories: Record<string, SkillCategory> = {
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
  Cloud: {
    name: "Cloud",
    icon: <CloudIcon className="h-4 w-4" />,
    color: "#0ea5e9",
  },
  DevOps: {
    name: "DevOps",
    icon: <WrenchScrewdriverIcon className="h-4 w-4" />,
    color: "#f59e0b",
  },
  Security: {
    name: "Security",
    icon: <ShieldCheckIcon className="h-4 w-4" />,
    color: "#ef4444",
  },
  Messaging: {
    name: "Messaging",
    icon: <ChatBubbleLeftEllipsisIcon className="h-4 w-4" />,
    color: "#ec4899",
  },
  Database: {
    name: "Database",
    icon: <TableCellsIcon className="h-4 w-4" />,
    color: "#22c55e",
  },
  Collaboration: {
    name: "Collaboration",
    icon: <UsersIcon className="h-4 w-4" />,
    color: "#6366f1",
  },
  VersionControl: {
    name: "Version Control",
    icon: <CodeBracketSquareIcon className="h-4 w-4" />,
    color: "#f97316",
  },
  BuildAutomation: {
    name: "Build Automation",
    icon: <CogIcon className="h-4 w-4" />,
    color: "#4b5563",
  },
};
