
export const Hero: React.FC = () => (
    <header className="relative flex flex-col items-center justify-center px-12 py-16 max-w-7xl mx-auto text-center">
      {/* <div className="absolute inset-0 w-full h-full overflow-hidden">
        <video autoPlay loop muted className="w-full h-full object-cover opacity-30">
          <source src="/images/assets/background.mp4" type="video/mp4" />
        </video>
      </div> */}
      <div className="relative z-10 flex flex-col items-center">
        <img src="/images/assets/profile.jpeg" alt="Profile" className="w-40 h-40 rounded-full shadow-lg" />
        <h1 className="text-yellow-500 text-4xl font-bold mt-4">Hello, I'm <span className="text-yellow-500">KHANG</span></h1>
        <p className="text-lg mt-2">SOFTWARE ENGINEER</p>
        <div className="mt-6 flex space-x-4">
          <button className="px-6 py-2 border border-yellow-500 text-gray-900 rounded hover:bg-yellow-500 hover:text-yellow-500">Download CV</button>
          <button className="px-6 py-2 border border-yellow-500 text-gray-900 rounded hover:bg-yellow-500 hover:text-yellow-500">Contact Info</button>
        </div>
        <div className="mt-4 flex space-x-4">
          <a href="#" className="text-yellow-500 text-2xl"><i className="fab fa-linkedin"></i></a>
          <a href="#" className="text-yellow-500 text-2xl"><i className="fab fa-github"></i></a>
        </div>
      </div>
    </header>
  );
  