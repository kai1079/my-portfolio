import { CpuChipIcon } from "@heroicons/react/24/solid";

interface Project {
  title: string;
  description: string;
}

interface TimelineItemData {
  company: string;
  title: string;
  project: Project[],
  date: string;
}

interface TimelineProps {
  items: TimelineItemData[];
}

export function Timeline({ items }: TimelineProps) {
  return (
    <div className="max-w-6xl mx-auto px-16 py-20 relative">
      {/* Vertical line */}
      <div className="absolute left-1/2 top-0 h-full w-[2px] bg-red-300 -translate-x-1/2"></div>

      {items.map((item, index) => {
        const isEven = index % 2 === 0;

        return (
          <div key={index} className="relative flex mb-16 last:mb-0">
            {/* Empty circle on timeline (aligned centrally) */}
            <div className="absolute left-1/2 -translate-x-1/2 top-1/7 -translate-y-1/2 w-4 h-4 rounded-full border-2 border-red-500 bg-white"></div>

            {/* Content container */}
            <div className={`w-1/2 ${isEven ? 'pr-16' : 'pl-16 ml-auto'}`}>
              <div className={`${isEven ? 'text-right' : 'text-left'}`}>
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  {item.company}
                </h2>
                <h2 className="text-md font-bold text-gray-900 mb-2">
                  {item.title}
                </h2>
                {item.project.map((project, _) => {
                  return (
                  <><h3 className="text-[15px] font-bold text-gray-900 mb-2">
                          {project.title}
                      </h3>
                      {/* Displaying description as a list with dot separator */}
                      <div className="flex-col flex gap-1 text-gray-600 text-sm text-[10px]">
                          {project.description.split('.').filter(Boolean).map((desc, _) => (
                          <div className="flex items-start gap-2">
                              <span>
                                  <CpuChipIcon className="w-3 h-5"/>
                                  </span>
                              <span className="leading-relaxed">
                                  {desc.trim()}
                              </span>
                          </div>

                          ))}
                      </div>
                       </>
                  )
                })}

              </div>
            </div>

            {/* Date circle with pointer (now aligned properly) */}
            <div 
              className={`absolute bottom-7 w-[90px] h-[90px] top-1 rounded-full border-2 border-red-500 bg-white flex items-center justify-center
                ${isEven ? 'right-[calc(50%-120px)]' : 'left-[calc(50%-120px)]'} dateCircle`}
            >
              {/* Triangle pointer (moved to connect with empty circle) */}
              <div 
                className={`absolute w-4 h-4 border-4 border-red-500 rotate-45 bg-white
                  ${isEven ? '-left-[9px] border-r-0 border-t-0' : '-right-[9px] border-l-0 border-b-0'}`}
              ></div>

              <div className="text-sm font-medium text-red-500 text-center whitespace-pre-line">
                {item.date}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
