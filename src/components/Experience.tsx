import { Timeline } from "./Timeline";

const timelineItems = [
  {
    company: "THOUGHTWORKS",
    title: "SOFTWARE ENGINEERING CONSULTANT",
    project: [
      {
        title: "Project: Global Mosquito-Borne Disease Protection Initiative",
        description: "Improved and designed CI/CD pipelines using GoCD to ensure efficient build and deployment processes integrated with AWS EC2. Enhanced automation and reliability of the deployment pipeline to support global health initiatives.",
      },
      {
        title: "Project: Accounting Software for Australian SME Clients",
        description: "Maintained, developed, and improved the database management service (REST API) for accounting software supporting small and medium-sized businesses. Developed the proxy gateway service that integrated with cloud finance reporting third party Silverfin to generate financial reporting. Collaborated in the design, development, and implementation of new features, improving software functionality and user experience. Provided technical solutions and consulting to optimize system performance and address client needs"
      }
    ],
    date: "NOV 2022 - PRESENT",
    logo: "/images/assets/tw.png"
  },
  {
    company: "TIKI CORPORATION ",
    title: "BACKEND DEVELOPER - CORE PLATFORM",
    project: [
      {
        title: "Project: Core Architect Platform",
        description: "Contributed to the development and enhancement of Tiki E-commerce platform by coding and optimizing backend services. Developed and maintained REST APIs using Java and Spring Boot, ensuring efficient, secure communication between services. Implemented Multi-Factor Authentication (MFA) solutions, including SMS, OTP, and Email, to enhance platform security. Leveraged technologies such as Kafka for messaging, Redis for caching, and RabbitMQ for event-driven architecture to improve system scalability and performance. Worked with MySQL to design and optimize databases, ensuring high performance and reliability. Developed secure APIs with JWT and OAuth for authentication and authorization. Conducted thorough API testing using Postman to ensure functionality and performance"
      }
    ],
    date: "JAN 2022 - NOV 2022",
    logo: "/images/assets/tiki.png"
  },
  {
    company: "DEK - ENDAVA",
    title: "SOFTWARE ENGINEERING CONSULTANT",
    project: [
      {
        title: "Project: CBA (Component-Based Architecture)",
        description: "Contributed to the development of core middleware components bridging the application layer and the operating system layer in a distributed, cluster-based environment. \
Participated in the full software development lifecycle, including feature study, design, \
implementation, testing, and documentation. \
Worked with OpenSAF, an open-source platform for automating development, scaling, and \
ensuring high availability in system operations. \
Developed and implemented network avoidance solutions utilizing TCP (client-server) and \
ETCD (Raft Algorithm) for enhanced system performance and reliability. \
Packaged source code using Autotools and Makefile for efficient build processes. \
Collaborated in Agile environments with tools like Scrum, Jira, Jenkins, Confluence, Git, and \
Gerrit for code review and version control.",
      }
    ],
    date: "JAN 2019 - JAN 2022",
    logo: "/images/assets/dek.jpg"
  }
];


//   export default Experience;

export const Experience: React.FC = () => (
  <section className="skills-radar-container max-wxl mx-auto px-16 py-20 relative">
    <div className="flex flex-col items-start justify-start relative text-right mb-8 w-full">
      <h2 className="text-4xl font-bold text-black mb-2">EXPERIENCE</h2>
      <div className="w-20 h-0.5 bg-yellow-500"></div>
    </div>
    <Timeline items={timelineItems} />
  </section>
)
