// @ts-nocheck

import { Button } from "@material-tailwind/react";
import AudioVisualizer from "./AudioVisualizer";

const musicList = [
  { id:1, src: "/musics/At My Worst.mp3"},
  { id: 2, src: "/musics/Save Your Tears.mp3" },
  { id: 3, src: "/musics/comethru.mp3" },
  { id: 4, src: "/musics/tinhdauquachen.mp3" },
  { id: 5, src: "/musics/ikigai.mp3" },
];

export const Hero: React.FC = () => {
  return (
    <section className="relative flex flex-col items-center justify-center px-12 py-16 max-w-7xl mx-auto text-center">
      <div className="relative z-10 flex flex-col items-center">
        <AudioVisualizer musics={musicList} profileImageUrl="/images/assets/profile.jpeg" profileSize={0.9}/>
        <h1 className="text-indigo-200 text-4xl font-bold mt-4">Hello, I'm <span className="text-gray-100">K H A N G</span></h1>
        <p className="text-white text-lg mt-2">SOFTWARE ENGINEER</p>
        <div className="mt-6 flex space-x-4">
          <Button >Download CV </Button>
          <Button>Contact Info </Button>
        </div>
        <div className="mt-4 flex space-x-4">
          <a href="#" className="text-yellow-500 text-2xl"><i className="fab fa-linkedin"></i></a>
          <a href="#" className="text-yellow-500 text-2xl"><i className="fab fa-github"></i></a>
        </div>
      </div>
    </section>
  )
}