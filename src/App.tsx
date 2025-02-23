
import './App.css'
import { Hero } from './components/Hero';
import {About} from './components/About';
import { Skills } from './components/Skills';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar';
import {Experience} from './components/Experience';

const Portfolio: React.FC = () => {
  return (
    <div className="bg-sky-0 text-white min-h-screen font-sans antialiased">
      <div className="relative">
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-100">
          <source src="/images/assets/background.mp4" type="video/mp4" />
        </video>
      </div>
        <Navbar />
        <Hero />
      </div>
      <About />
      <Skills />
      <Experience />
      <Contact />
      <Footer />
    </div>
  );
};

export default Portfolio;
