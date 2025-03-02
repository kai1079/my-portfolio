
import './App.css'
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { Experience } from './components/Experience';
import { Header } from './components/ Header/Header';
import { SkillRadar } from './components/Skill/SkillRadarChart';

const Portfolio: React.FC = () => {
  return (
    <div className="bg-sky-0 text-white min-h-screen font-sans ">
      <Header />
      <About />
      <SkillRadar />
      <Experience />
      <Contact />
      <Footer />
    </div>
  );
};

export default Portfolio;
