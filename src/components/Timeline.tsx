import { Avatar, Card, CardBody, CardHeader, Chip, Typography } from "@material-tailwind/react";

interface Project {
  title: string;
  description: string;
}

interface TimelineItemData {
  company: string;
  title: string;
  project: Project[],
  date: string;
  logo: string;
}

interface TimelineProps {
  items: TimelineItemData[];
}

export function Timeline({ items }: TimelineProps) {
  return (
    <div className="max-w-6xl mx-auto px-16 py-20 relative">
      {/* Vertical line */}
      <div className="absolute left-1/2 top-0 h-full w-[2px] bg-amber-500 -translate-x-1/2"></div>

      {items.map((item, index) => {
        const isEven = index % 2 === 0;

        return (
          <div key={index} className="relative flex mb-16 last:mb-0">
            {/* Empty circle on timeline (aligned centrally) */}
            <div className="absolute left-1/2 -translate-x-1/2 top-1/7 -translate-y-1/2 w-4 h-4 rounded-full border-2 border-amber-500 bg-white"></div>

            {/* Content container */}
            <div className={`w-1/2 ${isEven ? 'pr-16' : 'pl-16 ml-auto'}`}>
              <div className={`${isEven ? 'text-left' : 'text-left'}`}>
                {/* @ts-ignore */}
                <Card color="transparent" shadow={false} className="w-full max-w-[26rem]">
                  {/* @ts-ignore */}
                  <CardHeader
                    color="transparent"
                    floated={false}
                    shadow={false}
                    className="mx-0 flex items-center gap-4 pt-0 pb-8"
                  >
                    {/* @ts-ignore */}
                    <Avatar
                      size="lg"
                      variant="circular"
                      src={item.logo}
                      alt="tania andrew"
                    />
                    <div className="flex w-full flex-col gap-0.5">
                      <div className="flex items-center justify-between">
                        {/* @ts-ignore */}
                        <Typography variant="h5">
                          {item.company}
                        </Typography>
                        <div className="5 flex items-center gap-0">
                          <Chip color="amber" value={item.date} />
                        </div>
                      </div>
                      {/* @ts-ignore */}
                      <Typography>{item.title}</Typography>
                    </div>
                  </CardHeader>
                  {/* @ts-ignore */}
                  <CardBody className="mb-6 p-0">
                    {/* @ts-ignore */}
                    <Typography>
                      {item.project.map((project, _) => {
                        return (
                          <>
                            <div className="mb-2"><h2 className="mb-1">
                              {project.title}
                            </h2>
                              {/* Displaying description as a list with dot separator */}
                              <div className="flex-col flex gap-1 text-[12px]">
                                {project.description.split('.').filter(Boolean).map((desc, _) => (
                                  <div className="flex items-start gap-2">
                                    <span className="leading-relaxed">
                                      &quot;{desc.trim()}&quot;
                                    </span>
                                  </div>

                                ))}
                              </div>
                            </div>
                          </>
                        )
                      })}
                    </Typography>
                  </CardBody>
                </Card>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
