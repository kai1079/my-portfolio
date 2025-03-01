import { BackwardIcon, ForwardIcon, PauseIcon, PlayIcon, SpeakerWaveIcon, SpeakerXMarkIcon } from "@heroicons/react/24/solid";
import { Typography, Slider, IconButton, Button } from "@material-tailwind/react";
import { useState, useRef, useEffect } from "react";

const CoverImage: React.FC = () => (
  <div className="w-[100px] h-[100px] overflow-hidden flex-shrink-0 rounded-lg bg-black/10">
    <img src="/images/assets/profile.jpeg" alt="Profile" className="w-full object-cover" />
  </div>
)

type MusicSlideProps = {
  value: number,
  min: number,
  max: number,
  step: number,
  onChange: (value: number) => void,
  ariaLabel: string
}

const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};


const ProfilePicture: React.FC = () => {
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [paused, setPaused] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  function formatDuration(value: number) {
    const minute = Math.floor(value / 60);
    const secondLeft = value - minute * 60;
    return `${minute}:${secondLeft < 10 ? `0${secondLeft}` : secondLeft}`;
  }

  const togglePlay = () => {
    if (audioRef.current) {
      if (paused) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
      setPaused(!paused);
    }
  };


  useEffect(() => {
    const audioElement = audioRef.current;

    const handleMetadata = () => {
      if (audioElement) {
        if (!isDragging) {
          setDuration(audioElement.duration);
        }
      }

    };

    const handleTimeUpdate = () => {
      if (audioElement) {
        if (!isDragging) {
          setCurrentTime(audioElement.currentTime);
        }
      };
    }

    if (audioElement) {
      audioElement.addEventListener('loadedmetadata', handleMetadata);
      audioElement.addEventListener('timeupdate', handleTimeUpdate);
    }


    if (audioElement) {
      return () => {
        audioElement.removeEventListener('loadedmetadata', handleMetadata);
        audioElement.removeEventListener('timeupdate', handleTimeUpdate);
      };
    }

  }, []);

  // Get song duration when metadata loads
  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  // Handle slider change (seek currentTime)
  const handleSeek = (event) => {
    if (audioRef.current) {
      const newTime = (event.target.value / 100) * duration; // Scale the new time      setCurrentTime(newTime);
      audioRef.current.currentTime = newTime;
    }
  };

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };


  return (
    <div className="relative flex items-center justify-center w-200 h-full overflow-hidden">
      {/* Widget */}
      <div className="p-4 rounded-2xl max-w-full mx-auto relative z-[1] bg-white/10 backdrop-blur-[2px] dark:bg-black/60 overflow-hidden" >
        {/* Song info */}
        <div className="flex items-center">
          <CoverImage />
          <div className="ml-10 min-w-0">
            <Typography variant="small" color="red" className="font-medium">
              At My Worst
            </Typography>
            <Typography color="red" className="whitespace-nowrap font-bold">
              Pink Sweats
            </Typography>
            <Typography color="red" className="whitespace-nowrap tracking-[-0.25px]">
              PINK PLANET
            </Typography>
          </div>
        </div>

        {/* Slider */}
        <div className="relative flex items-center justify-center pt-5 pb-3">
          <div className="flex w-full">
            <Slider
              size="sm"
              defaultValue={0}
              value={(currentTime / duration) * 100} // Scale the current time to fit within 0-100
              min={0}
              step={0.01}
              max={100} // Default to 100 if duration is not available
              onChange={handleSeek}
              onPointerDown={handleDragStart}
              onPointerUp={handleDragEnd}
              className="text-gray-50"
              thumbClassName="[&::-moz-range-thumb]:rounded-none [&::-moz-range-thumb]:-mt-[4px] [&::-webkit-slider-thumb]:-mt-[4px]"
              trackClassName="[&::-webkit-slider-runnable-track]:bg-transparent [&::-moz-range-track]:bg-transparent !bg-gray-50/10 border border-gray-50/20"
            />
          </div>
        </div>

        {/* Time Display (Current / Total) */}
        <div className="flex justify-between w-full text-xs text-gray-600 dark:text-gray-300">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
        {/* Play/Pause buttons */}
        <div className="flex justify-center items-center gap-4">
          <BackwardIcon className="w-8 h-8" />
          <IconButton variant="text"
            onClick={togglePlay}
          >
            {paused ? (
              <PlayIcon className="w-6 h-6" />
            ) : (
              <PauseIcon className="w-6 h-6" />
            )}
            {/* Hidden Audio Element */}
            <audio ref={audioRef} src="/musics/Pink Sweat$ - At My Worst (Lyrics).mp3" onLoadedMetadata={handleLoadedMetadata} />
          </IconButton>
          <ForwardIcon className="w-8 h-8" />
        </div>

        { /* Volume */}
        <div className="flex relative mt-5 justify-center items-center space-x-2 mb-1 px-1">
          <SpeakerXMarkIcon className="w-6 h-6" color="gray" />
          <Slider
            size="sm"
            defaultValue={0}
            min={0}
            step={1}
            max={100}
            className="text-gray-50 w-6"
            // barClassName="rounded-none bg-[#2ec946]"
            thumbClassName="[&::-moz-range-thumb]:rounded-none [&::-moz-range-thumb]:-mt-[4px] [&::-webkit-slider-thumb]:-mt-[4px]"
            trackClassName="[&::-webkit-slider-runnable-track]:bg-transparent [&::-moz-range-track]:bg-transparent !bg-gray-50/10 border border-gray-50/20"
          />
          <SpeakerWaveIcon className="w-6 h-6" color="gray" />
        </div>
      </div>
    </div>
  )
}

export const Hero: React.FC = () => {
  return (
    <section className="relative flex flex-col items-center justify-center px-12 py-16 max-w-7xl mx-auto text-center">
      <div className="relative z-10 flex flex-col items-center">
        <ProfilePicture />
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
    </section>
  )
}