
export const Contact: React.FC = () => (
  <section className="max-w-6xl mx-auto px-16 py-20 relative">
    <div className="flex flex-col items-end justify-end relative text-right mb-8 w-full">
      <h2 className="text-4xl font-bold text-black mb-2">CONTACT</h2>
      <div className="w-20 h-0.5 bg-yellow-500"></div>
    </div>
    <div className="container px-6 py-12 mx-auto">
      <div className="lg:flex lg:items-center lg:-mx-6">
        <div className="lg:w-1/2 lg:mx-6">
          <h1 className="text-xl font-semibold text-gray-800 capitalize lg:text-3xl text-left">
            Contact us for <br /> more info
          </h1>

          <div className="mt-6 space-y-8 md:mt-8 text-left">
            <p className="flex items-start -mx-2">
              <img src="/images/assets/icons/social/email.png" className="w-6 h-6 mx-2 text-blue-500 " />
              <span className="mx-2 text-gray-700 truncate w-72 text-left">
                phanchikhang7@gmail.com
              </span>
            </p>

            <p className="flex items-start -mx-2">
              <img src="/images/assets/icons/social/linkedin.png" className="w-6 h-6 mx-2 text-blue-500" />
              <span className="mx-2 text-gray-700 truncate w-72 text-left">
                <a href="https://www.linkedin.com/in/phankhang107">https://www.linkedin.com/in/phankhang107</a>
              </span>
            </p>

            <p className="flex items-start -mx-2">
              <img src="/images/assets/icons/social/skype.png" className="w-6 h-6 mx-2 text-blue-500" />
              <span className="mx-2 text-gray-700 truncate w-72 text-left">live:phanchikhang7</span>
            </p>
          </div>
        </div>

        <div className="mt-8 lg:w-1/2 lg:mx-6">
          <div className="w-full px-8 py-10 mx-auto overflow-hidden bg-white rounded-lg shadow-2xl lg:max-w-xl shadow-gray-300/50">
            <h1 className="text-lg font-medium text-gray-700 text-left">What do you want to ask</h1>

            <form className="mt-6 text-left">
              <div className="flex-1">
                <label className="block mb-2 text-sm text-gray-600">Full Name</label>
                <input type="text" placeholder="John Doe" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
              </div>

              <div className="flex-1 mt-6">
                <label className="block mb-2 text-sm text-gray-600">Email address</label>
                <input type="email" placeholder="johndoe@example.com" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
              </div>

              <div className="w-full mt-6">
                <label className="block mb-2 text-sm text-gray-600">Message</label>
                <textarea className="block w-full h-32 px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md md:h-48 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Message"></textarea>
              </div>

              <button className="w-full px-6 py-3 mt-6 text-sm font-medium tracking-wide text-gray-600 capitalize transition-colors duration-300 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                Get in touch
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>


);


