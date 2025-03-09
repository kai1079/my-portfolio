// @ts-nocheck

import './App.css'
import { About } from './components/About';
import Contact from './components/Contact';
import { Footer } from './components/Footer';
// import { Header } from './components/ Header Copy/Header';
// import { SkillRadar } from './components/Skill/SkillRadarChart';
import { timelineData } from './data/TimelineData';
import { TimelineExperience } from './components/Experience';
import { ContactInfo } from './data/ContactData';
// import { Header } from './components/Header Bk/Header';
// import DashboardGrid from './components/Header Bk/DashboardGrid';
import { Header } from './components/Header/Header';
import { SkillRadar } from './features/skills/SkillRadar';
import { DashboardGrid } from './features/dashboard/DashboardGrid';
// import { DashboardGrid } from './features/dashboard/DashboardGrid';

const Portfolio: React.FC = () => {
  return (
    <div className="font-sans">
      <Header />
      <DashboardGrid />
      <About />
      <SkillRadar />
      <TimelineExperience items={timelineData} />
      <Contact {...ContactInfo}/>
      <Footer />
    </div>
  );
};

export default Portfolio;
