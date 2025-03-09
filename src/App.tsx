// @ts-nocheck

import './App.css'
import { About } from './components/About';
import Contact from './components/Contact';
import { Footer } from './components/Footer';
import { timelineData } from './assets/data/TimelineData';
import { TimelineExperience } from './components/Experience';
import { ContactInfo } from './assets/data/ContactData';
import { Header } from './components/Header/Header';
import { SkillRadar } from './features/skills/SkillRadar';
import { DashboardGrid } from './features/dashboard/DashboardGrid';

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
