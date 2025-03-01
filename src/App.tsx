
import './App.css'
import { Hero } from './components/ Header/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { Navbar } from './components/ Header/Navbar';
import { Experience } from './components/Experience';
import { BackgroundVideo } from './components/ Header/BackgroundVideo';
import { Header } from './components/ Header/Header';

const Portfolio: React.FC = () => {
  return (
    <div className="bg-sky-0 text-white min-h-screen font-sans ">
      {/* <div className="relative">
        <BackgroundVideo />
        <Navbar />
        <Hero />
      </div> */}
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
