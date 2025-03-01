
import './App.css'
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { Experience } from './components/Experience';
import { Header } from './components/ Header/Header';

const Portfolio: React.FC = () => {
  return (
    <div className="bg-sky-0 text-white min-h-screen font-sans ">
      <Header />
      <About />
      <Skills />
      <Experience />
      <Contact />
      <Footer />
    </div>
  );
};

export default Portfolio;
