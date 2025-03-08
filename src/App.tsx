// @ts-nocheck

import './App.css'
import { About } from './components/About';
import Contact from './components/Contact';
import { Footer } from './components/Footer';
import { Header } from './components/ Header/Header';
import { SkillRadar } from './components/Skill/SkillRadarChart';
import { timelineData } from './data/TimelineData';
import { TimelineExperience } from './components/Experience';
import { ContactInfo } from './data/ContactData';

const Portfolio: React.FC = () => {
  return (
    <div className="h-full font-sans">
      <Header />
      <About />
      <SkillRadar />
      <TimelineExperience items={timelineData} />
      <Contact {...ContactInfo}/>
      <Footer />
    </div>
  );
};

export default Portfolio;
