import { ReactNode } from "react";

/**
 * Represents a project within a timeline item
 */
export interface Project {
    title: string;
    description: string;
  }
  
  /**
   * Represents a single item in the timeline
   */
  export interface TimelineItemData {
    company: string;
    title: string;
    project: Project[];
    date: string;
    logo: string;
    icon: ReactNode;
    skills: string[]
  }
  
  /**
   * Props for the Timeline component
   */
  export interface TimelineProps {
    items: TimelineItemData[];
  }