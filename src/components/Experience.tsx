// @ts-nocheck

import React, { useEffect, useRef, useState } from 'react';
import { Card, CardBody, CardHeader, Chip, IconButton, Typography } from "@material-tailwind/react";
import '../styles/Timeline.css';
import { TimelineItemData, TimelineProps } from '../types/TimelineType';
import { ChevronDownIcon } from '@heroicons/react/24/solid';

interface TimelineItemProps {
  item: TimelineItemData
  isEven: boolean
}

export function TimelineItem({ item, isEven }: TimelineItemProps) {
  const { company, title, project, date, logo, icon, skills } = item
  const Icon = icon;
  const [expandedProjects, setExpandedProjects] = useState<Record<number, boolean>>({})
  const [isVisible, setIsVisible] = useState(false)
  const itemRef = useRef<HTMLDivElement>(null)

  // Toggle expand/collapse for a project
  const toggleExpand = (index: number) => {
    setExpandedProjects((prev) => ({
      ...prev,
      [index]: !prev[index],
    }))
  }

  // Check if description is long enough to need truncation
  const needsTruncation = (text: string) => {
    return text.length > 100
  }

  // Intersection observer for animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 },
    )

    if (itemRef.current) {
      observer.observe(itemRef.current)
    }

    return () => {
      if (itemRef.current) {
        observer.disconnect()
      }
    }
  }, [])

  return (
    <div ref={itemRef} className={`timeline-item text-left ${isVisible && "animate"}`} style={{ transitionDelay: `${isEven ? 0.2 : 0.4}s` }}>
      {/* Timeline dot */}
      <div className="timeline-dot">
        <div className="p-2 h-10 w-10 flex items-center justify-center rounded-full hover:bg-gray-600 bg-gray-900 transition duration-300 text-white">
          <Icon className="w-10 h-10" />
        </div>
      </div>

      {/* Content */}
      <div className={`timeline-content ${isEven ? "timeline-content-even" : "timeline-content-odd"}`}>
        <Card className="timeline-card">
          <CardBody className="flex flex-row items-center gap-4 pb-2">
            {logo && (
              <div className="company-logo">
                <img
                  src={logo || "/placeholder.svg"}
                  alt={company}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div>
              <h3 className="text-lg font-bold">{company}</h3>
              <p className="text-sm text-muted-foreground">{title}</p>
              <p className="text-xs text-muted-foreground mt-1">{date}</p>
            </div>
          </CardBody>
          <CardBody>
            {project.length > 0 && (
              <div className="space-y-3 mt-2">
                <Typography variant='h6' color="blue-gray">
                  Projects
                </Typography>
                {project.map((proj, idx) => (
                  <div key={idx} className={`project-item ${expandedProjects[idx] && "expanded"}`}>
                    <Typography variant='h6' color="blue-gray">
                      {proj.title}
                    </Typography>
                    <p className={`text-xs text-muted-foreground truncated-text ${expandedProjects[idx] && "expanded"}`}>{proj.description}</p>

                    {needsTruncation(proj.description) && (
                      <button onClick={() => toggleExpand(idx)} className="read-more-btn">
                        {expandedProjects[idx] ? "Show less" : "Read more"}
                        <ChevronDownIcon />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}

            {skills.length > 0 && (
              <div className="timeline-skills-container">
                {skills.map((skill, _) => (
                  <Chip value={skill} />
                ))}
              </div>
            )}
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

export const TimelineExperience: React.FC<TimelineProps> = ({ items }) => {
  const timelineRef = useRef<HTMLDivElement>(null)
  return (
    <div ref={timelineRef} className="timeline-container">
      <div className="timeline-wrapper">
        <h2 className="timeline-title">E X P E R I E N C E S</h2>
        <div className="timeline-wrapper-line"></div>
        <div className="relative">
          {/* Timeline line */}
          <div className="timeline-line"></div>
          {/* Timeline items */}
          <div className="space-y-12">
            {items.map((item, index) => (
              <TimelineItem key={`${item.company}-${index}`} item={item} isEven={index % 2 === 0} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
};