import AudioVisualizer from "./AudioVisualizer";

export const Hero: React.FC = () => {
  return (
    <section className="relative flex flex-col items-center justify-center px-12 py-16 max-w-7xl mx-auto text-center">
      <div className="relative z-10 flex flex-col items-center">
        <AudioVisualizer audioUrl="/musics/Pink Sweat$ - At My Worst (Lyrics).mp3" profileImageUrl="/images/assets/profile.jpeg" profileSize={0.9}/>
        <h1 className="text-indigo-200 text-4xl font-bold mt-4">Hello, I'm <span className="text-yellow-400">KHANG</span></h1>
        <p className="text-lg mt-2">SOFTWARE ENGINEER</p>
        <div className="mt-6 flex space-x-4">
          <button className="px-6 py-2 border border-yellow-500 text-indigo-700 rounded hover:bg-yellow-500 hover:text-indigo-500">Download CV</button>
          <button className="px-6 py-2 border border-yellow-500 text-indigo-700 rounded hover:bg-yellow-500 hover:text-indigo-500">Contact Info</button>
        </div>
        <div className="mt-4 flex space-x-4">
          <a href="#" className="text-yellow-500 text-2xl"><i className="fab fa-linkedin"></i></a>
          <a href="#" className="text-yellow-500 text-2xl"><i className="fab fa-github"></i></a>
        </div>
      </div>
    </section>
  )
}