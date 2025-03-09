import { BackgroundVideo } from "./BackgroundVideo";
import { Hero } from "./Hero";
import { Navbar } from "./Navbar";

export const Header: React.FC = () => (
    <section className="relative">
        <BackgroundVideo />
        <Navbar />
        <Hero />
    </section>
)