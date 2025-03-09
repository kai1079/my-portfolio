// import React from "react";
// import "../../assets/styles/DashboardGrid.css"
// import TimeWidget from "./TimeWidget";
// import MusicWidget from "./MusicWidget";
// import QuickLinks from "./QuickLinks";
// import StatsOverview from "./StatsOverview";
// import WeatherWidget from "./WeatherWidget";

// export const DashboardGrid: React.FC = () => {
//   return (
//     <div className="dashboard-grid">
//       <TimeWidget />
//       <WeatherWidget />
//       <MusicWidget />
//       <QuickLinks />
//       <StatsOverview />
//     </div>
//   );
// };

import type React from "react"

import { useState, useEffect, useRef, useCallback } from "react"
import {
  MusicalNoteIcon,
  CloudIcon,
  CalendarIcon,
  LinkIcon,
  ChartBarIcon,
  PlayIcon,
  PauseIcon,
  ForwardIcon,
  BackwardIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/solid"
import type { JSX } from "react/jsx-runtime"
import "../../assets/styles/DashboardGrid.css"

export const DashboardGrid : React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTrack, setCurrentTrack] = useState(0)
  const [progress, setProgress] = useState(0)
  const [weatherData, _] = useState({
    temp: 72,
    condition: "Sunny",
    location: "San Francisco",
    high: 78,
    low: 65,
  })

  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [duration, setDuration] = useState(0)
  const [audioCurrentTime, setAudioCurrentTime] = useState(0)
  const [volume, setVolume] = useState(0.7)

  const [isChangingTrack, setIsChangingTrack] = useState(false)
  const [cardsVisible, setCardsVisible] = useState(false)

  // Create audio element on mount
  useEffect(() => {
    audioRef.current = new Audio()
    const audio = audioRef.current

    // Set initial volume
    audio.volume = volume

    return () => {
      audio.pause()
      audio.src = ""
    }
  }, [])

  // Show cards with animation after component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setCardsVisible(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  // Update time every second
  
  useEffect(() => {
    const timer = setInterval(() => {
        setCurrentTime(new Date())
      }, 1000)
  
      return () => clearInterval(timer)
    }, [])

// Set up audio event listeners
useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      setAudioCurrentTime(audio.currentTime)
      setProgress((audio.currentTime / duration) * 100)
      if (audio.duration > 0) {
        setProgress((audio.currentTime / audio.duration) * 100)
      }
    }

    const handleLoadedMetadata = () => {
      setDuration(audio.duration)
    }

    const handleEnded = () => {
        handleNextTrack()
    }

    audio.addEventListener("timeupdate", handleTimeUpdate)
    audio.addEventListener("loadedmetadata", handleLoadedMetadata)
    audio.addEventListener("ended", handleEnded)

    // Load the initial track
    loadTrack(currentTrack)

    return () => {
      // Clean up event listeners
      audio.removeEventListener("timeupdate", handleTimeUpdate)
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata)
      audio.removeEventListener("ended", handleEnded)
    }
  }, [])

 // Load track function
 const loadTrack = useCallback(
    (trackIndex: number) => {
      const audio = audioRef.current
      if (!audio) return

      setIsChangingTrack(true)

      // First pause the current audio
      audio.pause()

      // Set the new source
      audio.src = musicTracks[trackIndex].audio

      // Reset progress
      setProgress(0)
      setAudioCurrentTime(0)

      // Load the audio
      audio.load()

      // Only play after the audio is loaded
      const playWhenReady = () => {
        if (isPlaying) {
          audio
            .play()
            .then(() => {
              setIsChangingTrack(false)
            })
            .catch((error) => {
              console.error("Error playing audio:", error)
              setIsPlaying(false)
              setIsChangingTrack(false)
            })
        } else {
          setIsChangingTrack(false)
        }

        // Remove the event listener after it's used
        audio.removeEventListener("canplaythrough", playWhenReady)
      }

      audio.addEventListener("canplaythrough", playWhenReady)
    },
    [isPlaying],
  )

  // Toggle play/pause
  const togglePlay = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.pause()
    } else {
      audio.play().catch((error) => {
        console.error("Error playing audio:", error)
      })
    }

    setIsPlaying(!isPlaying)
  }, [isPlaying])

  // Handle next track
  const handleNextTrack = useCallback(() => {
    const nextTrack = (currentTrack + 1) % musicTracks.length
    setCurrentTrack(nextTrack)
  }, [currentTrack])

  // Handle previous track
  const handlePrevTrack = useCallback(() => {
    const prevTrack = currentTrack === 0 ? musicTracks.length - 1 : currentTrack - 1
    setCurrentTrack(prevTrack)
  }, [currentTrack])

  // Update track when currentTrack changes
  useEffect(() => {
    loadTrack(currentTrack)
  }, [currentTrack, loadTrack])

  
  // Handle seeking
  const handleSeek = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current
    if (!audio) return

    const progressBar = e.currentTarget
    const rect = progressBar.getBoundingClientRect()
    const percent = (e.clientX - rect.left) / rect.width
    const seekTime = percent * audio.duration

    audio.currentTime = seekTime
    setAudioCurrentTime(seekTime)
    setProgress(percent * 100)
  }, [])

  // Handle volume change
  const handleVolumeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number.parseFloat(e.target.value)
    setVolume(newVolume)

    const audio = audioRef.current
    if (audio) {
      audio.volume = newVolume
    }
  }, [])

  // Format audio time
  const formatAudioTime = useCallback((time: number) => {
    if (!time || isNaN(time)) return "0:00"

    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
  }, [])

  // Format date
  const formatDate = useCallback((date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    })
  }, [])

  // Format time
  const formatTime = useCallback((date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    })
  }, [])

  return (
    <div className="dashboard-container">
      <div className="dashboard-wrapper">
        <div className={`dashboard-grid ${cardsVisible ? "cards-visible" : ""}`}>
          {/* Music Player Card */}
          <div className="dashboard-card dashboard-music-card" data-aos="fade-up" data-aos-delay="100">
            <div className="dashboard-card-header">
              <h3 className="dashboard-card-title">
                <MusicalNoteIcon className="dashboard-card-icon" />
                Now Playing
              </h3>
            </div>
            <div className="dashboard-card-content">
              <div className="music-player">
                <div className={`music-album-art ${isChangingTrack ? "changing-track" : ""}`}>
                  <img
                    src={musicTracks[currentTrack].cover || "/placeholder.svg"}
                    alt={musicTracks[currentTrack].title}
                    className="music-album-image"
                  />
                  <div className={`music-playing-indicator ${isPlaying && !isChangingTrack ? "animate-pulse" : ""}`}>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
                <div className="music-info">
                  <h4 className="music-title">{musicTracks[currentTrack].title}</h4>
                  <p className="music-artist">{musicTracks[currentTrack].artist}</p>
                </div>
                <div className="music-time-display">
                  <span className="music-current-time">{formatAudioTime(audioCurrentTime)}</span>
                  <span className="music-duration">{formatAudioTime(duration)}</span>
                </div>
                <div className="music-progress" onClick={handleSeek}>
                  <div className="music-progress-bar">
                    <div className="music-progress-fill" style={{ width: `${progress}%` }}></div>
                    <div className="music-progress-handle" style={{ left: `${progress}%` }}></div>
                  </div>
                </div>
                <div className="music-volume-control">
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="music-volume-slider"
                  />
                </div>
                <div className="music-controls">
                  <button className="music-control-button" onClick={handlePrevTrack} disabled={isChangingTrack}>
                    <BackwardIcon className="h-4 w-4" />
                  </button>
                  <button className={`music-control-button music-play-button ${isChangingTrack ? "disabled" : ""}`}
                    onClick={togglePlay}
                    disabled={isChangingTrack}>
                    {isPlaying ? <PauseIcon className="h-5 w-5" /> : <PlayIcon className="h-5 w-5" />}

                  </button>
                  <button className="music-control-button" onClick={handleNextTrack} disabled={isChangingTrack}>
                    <ForwardIcon className="h-4 w-4" />
                  </button>
                </div>
                <div className="music-playlist">
                  <h5 className="music-playlist-title">Playlist</h5>
                  <div className="music-playlist-tracks">
                    {musicTracks.map((track, index) => (
                      <div
                        key={index}
                        className={`music-playlist-track ${currentTrack === index ? "active" : ""}`}
                        onClick={() => setCurrentTrack(index)}
                      >
                        <div className="music-playlist-track-number">{index + 1}</div>
                        <div className="music-playlist-track-info">
                          <div className="music-playlist-track-title">{track.title}</div>
                          <div className="music-playlist-track-artist">{track.artist}</div>
                        </div>
                        {currentTrack === index && isPlaying && (
                          <div className="music-playlist-track-playing">
                            <span></span>
                            <span></span>
                            <span></span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Weather Card */}
          <div className="dashboard-card dashboard-weather-card">
            <div className="dashboard-card-header">
              <h3 className="dashboard-card-title">
                <CloudIcon className="dashboard-card-icon" />
                Weather
              </h3>
              <button className="dashboard-card-action">
                <ArrowPathIcon className="h-4 w-4" />
              </button>
            </div>
            <div className="dashboard-card-content">
              <div className="weather-content">
                <div className="weather-main">
                  <div className="weather-icon">{weatherIcons[weatherData.condition]}</div>
                  <div className="weather-temp">
                    <span className="weather-temp-value">{weatherData.temp}°</span>
                    <span className="weather-condition">{weatherData.condition}</span>
                  </div>
                </div>
                <div className="weather-details">
                  <div className="weather-location">{weatherData.location}</div>
                  <div className="weather-high-low">
                    <span className="weather-high">H: {weatherData.high}°</span>
                    <span className="weather-low">L: {weatherData.low}°</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Date & Time Card */}
          <div className="dashboard-card dashboard-date-card" data-aos="fade-up" data-aos-delay="300">
            <div className="dashboard-card-header">
              <h3 className="dashboard-card-title">
                <CalendarIcon className="dashboard-card-icon" />
                Date & Time
              </h3>
            </div>
            <div className="dashboard-card-content">
              <div className="date-time-content">
                <div className="current-time">{formatTime(currentTime)}</div>
                <div className="current-date">{formatDate(currentTime)}</div>
                <div className="clock-face">
                  <div
                    className="clock-hand clock-hand-hour"
                    style={{
                      transform: `rotate(${(currentTime.getHours() % 12) * 30 + currentTime.getMinutes() * 0.5}deg)`,
                    }}
                  ></div>
                  <div
                    className="clock-hand clock-hand-minute"
                    style={{
                      transform: `rotate(${currentTime.getMinutes() * 6}deg)`,
                    }}
                  ></div>
                  <div
                    className="clock-hand clock-hand-second"
                    style={{
                      transform: `rotate(${currentTime.getSeconds() * 6}deg)`,
                    }}
                  ></div>
                  <div className="clock-center"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links Card */}
          <div className="dashboard-card dashboard-links-card">
            <div className="dashboard-card-header">
              <h3 className="dashboard-card-title">
                <LinkIcon className="dashboard-card-icon" />
                Quick Links
              </h3>
            </div>
            <div className="dashboard-card-content">
              <div className="quick-links">
                {quickLinks.map((link, index) => (
                  <a key={index} href={link.url} className="quick-link-item" target="_blank" rel="noopener noreferrer">
                    <div className="quick-link-icon" style={{ backgroundColor: link.color }}>
                      {link.icon}
                    </div>
                    <span className="quick-link-text">{link.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Stats Card */}
          <div className="dashboard-card dashboard-stats-card">
            <div className="dashboard-card-header">
              <h3 className="dashboard-card-title">
                <ChartBarIcon className="dashboard-card-icon" />
                Stats
              </h3>
            </div>
            <div className="dashboard-card-content">
              <div className="stats-grid">
                {stats.map((stat, index) => (
                  <div key={index} className="stat-item">
                    <div className="stat-value" style={{ color: stat.color }}>
                      {stat.value}
                    </div>
                    <div className="stat-label">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Music tracks data
const musicTracks = [
  {
    title: "At My Worst",
    artist: "Pink Sweats",
    cover: "/images/musics/at_my_worst.jpeg?height=80&width=80",
    audio: "/musics/At My Worst.mp3",
  },
  {
    title: "Comethru",
    artist: "Jeremy Zucker",
    cover: "/images/musics/comethru.jpeg?height=80&width=80",
    audio: "/musics/comethru.mp3",
  },
  {
    title: "Ho Yeu Ai Mat Roi",
    artist: "Doan Hieu",
    cover: "/images/musics/hoyeuaimatroi.jpg?height=80&width=80",
    audio: "/musics/HoYeuAiMatRoi.mp3",
  },
  {
    title: "Ikigai",
    artist: "Tang Duy Tan",
    cover: "/images/musics/ikigai.jpg?height=80&width=80",
    audio: "/musics/ikigai.mp3",
  },
  {
    title: "Save Your Tears",
    artist: "Boyce Avenue Cover",
    cover: "/images/musics/save_your_tears.jpeg?height=80&width=80",
    audio: "/musics/Save Your Tears.mp3",
  },
]

// Weather icons
const weatherIcons: Record<string, JSX.Element> = {
  Sunny: (
    <svg
      className="h-12 w-12 text-yellow-500"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
        clipRule="evenodd"
      />
    </svg>
  ),
  Cloudy: (
    <svg className="h-12 w-12 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path d="M5.5 16a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 16h-8z" />
    </svg>
  ),
  Rainy: (
    <svg className="h-12 w-12 text-blue-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path d="M5.5 16a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 16h-8z" />
      <path d="M9 17a1 1 0 11-2 0 1 1 0 012 0zm4 0a1 1 0 11-2 0 1 1 0 012 0zm-8-1a1 1 0 11-2 0 1 1 0 012 0z" />
    </svg>
  ),
}

// Quick links data
const quickLinks = [
  {
    name: "GitHub",
    url: "https://github.com",
    icon: (
      <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
    color: "#24292e",
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com",
    icon: (
      <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    ),
    color: "#0077b5",
  },
  {
    name: "Twitter",
    url: "https://twitter.com",
    icon: (
      <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
      </svg>
    ),
    color: "#1da1f2",
  },
  {
    name: "Portfolio",
    url: "#",
    icon: (
      <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
        <path d="M4 5h16v2H4zm0 6h16v2H4zm0 6h16v2H4z" />
      </svg>
    ),
    color: "#6366f1",
  },
]

// Stats data
const stats = [
  {
    label: "Projects",
    value: "24",
    color: "#3b82f6",
  },
  {
    label: "Clients",
    value: "12",
    color: "#10b981",
  },
  {
    label: "Awards",
    value: "5",
    color: "#f43f5e",
  },
  {
    label: "Experience",
    value: "8 yrs",
    color: "#8b5cf6",
  },
]
