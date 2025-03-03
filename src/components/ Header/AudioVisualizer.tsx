
import React, { useRef, useEffect, useState } from 'react';
import { BackwardIcon, ForwardIcon, PauseIcon, PlayIcon } from "@heroicons/react/24/solid";
import { Slider, IconButton } from "@material-tailwind/react";

interface AudioVisualizerProps {
    musics: Music[];
    profileImageUrl?: string | null;
    profileSize?: number
}

type Music = {
    id: number;
    src: string;
};

const AudioVisualizer: React.FC<AudioVisualizerProps> = ({ musics, profileImageUrl, profileSize = 0.6 }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const getRandomIndex = () => Math.floor(Math.random() * musics.length);
    const [currentIndex, setCurrentIndex] = useState(getRandomIndex);
    const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
    const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);

    // Audio control states
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [paused, setPaused] = useState(true);
    const [isDragging, setIsDragging] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Format time for display (mm:ss)
    const formatTime = (seconds: number) => {
        const minute = Math.floor(seconds / 60);
        const secondLeft = Math.floor(seconds - minute * 60);
        return `${minute}:${secondLeft < 10 ? `0${secondLeft}` : secondLeft}`;
    };

    // Toggle play/pause
    const togglePlay = () => {
        if (audioRef.current) {
            if (paused) {
                initAudio();
                audioRef.current.play();
            } else {
                audioRef.current.pause();
            }
            setPaused(!paused);
        }
    };

    // Next song
    const nextSong = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % musics.length);
        setPaused(true);
    };

    // Previous song
    const prevSong = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? musics.length - 1 : prevIndex - 1
        );
        setPaused(true);
    };

    // Handle slider seeking
    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        if (audioRef.current) {
            const newTime = (value / 100) * duration;
            setCurrentTime(newTime);
            audioRef.current.currentTime = newTime;
        }
    };

    const handleDragStart = () => {
        setIsDragging(true);
    };

    const handleDragEnd = () => {
        setIsDragging(false);
    };

    const initAudio = () => {
        if (!musics[currentIndex]?.src) return;
        // Close previous context if it exists
        if (audioContext) {
            audioContext.close();
        }

        // Create new audio context
        const newAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        const newAnalyser = newAudioContext.createAnalyser();
        newAnalyser.fftSize = 256; // Smaller fftSize for better circular visualization

        // Create and set audio element
        const newAudioElement = new Audio(musics[currentIndex]?.src);
        audioRef.current = newAudioElement;

        // Set up audio context source
        const source = newAudioContext.createMediaElementSource(newAudioElement);
        source.connect(newAnalyser);
        newAnalyser.connect(newAudioContext.destination);

        setAudioContext(newAudioContext);
        setAnalyser(newAnalyser);

        // Reset controls state
        // setPaused(true);
        setCurrentTime(newAudioContext.currentTime);
        // setDuration(newAudioContext.du);
    };

    useEffect(() => {
        if (!musics[currentIndex]?.src) return;

        initAudio();

        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.src = '';
            }
            if (audioContext) {
                audioContext.close();
            }
        };
    }, [currentIndex]);

    // Listen for audio element events
    useEffect(() => {
        const audioElement = audioRef.current;
        if (!audioElement) return;

        const handleMetadata = () => {
            if (audioElement) {
                setDuration(audioElement.duration);
            }
        };

        const handleTimeUpdate = () => {
            if (audioElement && !isDragging) {
                setCurrentTime(audioElement.currentTime);
            }
        };

        audioElement.addEventListener('loadedmetadata', handleMetadata);
        audioElement.addEventListener('timeupdate', handleTimeUpdate);

        return () => {
            audioElement.removeEventListener('loadedmetadata', handleMetadata);
            audioElement.removeEventListener('timeupdate', handleTimeUpdate);
        };
    }, [isDragging, paused, musics]);

    useEffect(() => {
        if (!analyser || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        if (!context) return;

        // Set canvas dimensions
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;

        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = Math.min(centerX, centerY) * 0.6; // Circle radius
        const profileRadius = radius * profileSize; // Profile picture radius

        // Load profile image
        const profileImage = new Image();
        profileImage.src = profileImageUrl || '/assets/profile.jpg'; // Use uploaded image or default asset

        let animationFrameId: number;
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        const draw = () => {
            animationFrameId = requestAnimationFrame(draw);

            // Get frequency data
            analyser.getByteFrequencyData(dataArray);

            // Clear canvas
            context.clearRect(0, 0, canvas.width, canvas.height);

            // Draw background
            // context.fillStyle = 'rgba(30, 30, 47, 0.5)';
            // context.fillRect(0, 0, canvas.width, canvas.height);

            // Draw profile circle
            context.save();
            context.beginPath();
            context.arc(centerX, centerY, profileRadius, 0, Math.PI * 2);
            context.closePath();
            context.clip();

            // Draw the profile image if loaded
            if (profileImage.complete) {
                context.drawImage(
                    profileImage,
                    centerX - profileRadius,
                    centerY - profileRadius,
                    profileRadius * 2,
                    profileRadius * 2
                );
            } else {
                // If image not loaded, draw a placeholder circle
                context.fillStyle = '#666';
                context.fill();
            }
            context.restore();

            // Draw audio waves around the profile picture
            const barCount = bufferLength;
            const angleStep = (2 * Math.PI) / barCount;

            for (let i = 0; i < barCount; i++) {
                const value = dataArray[i];
                const normalized = value / 255; // Normalize 0-255 to 0-1

                // Calculate bar height based on audio data
                const barHeight = normalized * (radius - profileRadius) * 10;

                // Calculate angle for this bar
                const angle = i * angleStep;

                // Inner point (closer to profile picture)
                const innerX = centerX + (profileRadius + 10) * Math.cos(angle);
                const innerY = centerY + (profileRadius + 10) * Math.sin(angle);

                // Outer point (based on audio intensity)
                const outerX = centerX + (profileRadius + 10 + barHeight) * Math.cos(angle);
                const outerY = centerY + (profileRadius + 10 + barHeight) * Math.sin(angle);

                // Draw the line
                context.beginPath();
                context.moveTo(innerX, innerY);
                context.lineTo(outerX, outerY);

                // Color based on frequency intensity
                const hue = (i / barCount) * 360;
                context.strokeStyle = `hsl(${hue}, ${70 + normalized * 30}%, ${40 + normalized * 30}%)`;
                context.lineWidth = 2;
                context.stroke();
            }
        };

        // Start the animation when the image is loaded
        profileImage.onload = () => {
            draw();
        };

        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, [analyser]);

    // Calculate slider percentage
    // const sliderPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

    return (
        <div className="relative flex items-center justify-center w-100 h-100 overflow-hidden">
            {/* Widget */}
            <div className="p-4 rounded-2xl max-w-full mx-auto relative z-[1]" >
                {/* Song info */}
                <div className="flex items-center justify-center h-full w-full">
                    <canvas ref={canvasRef} />
                </div>

                {/* Slider */}
                <div className="relative flex items-center justify-center pt-2 pb-3">
                    <div className="flex w-full">
                        <Slider
                            size="sm"
                            defaultValue={0}
                            value={(currentTime / duration) * 100} // Scale the current time to fit within 0-100
                            min={0}
                            step={0.01}
                            max={100} // Default to 100 if duration is not available
                            onChange={(e) => handleSeek(e)}
                            onPointerDown={handleDragStart}
                            onPointerUp={handleDragEnd}
                            className="text-gray-50"
                            thumbClassName="[&::-moz-range-thumb]:rounded-none [&::-moz-range-thumb]:-mt-[4px] [&::-webkit-slider-thumb]:-mt-[4px]"
                            trackClassName="[&::-webkit-slider-runnable-track]:bg-transparent [&::-moz-range-track]:bg-transparent !bg-gray-50/10 border border-gray-50/20" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
                    </div>
                </div>

                {/* Time Display (Current / Total) */}
                <div className="flex justify-between w-full text-xs text-gray-600 dark:text-gray-300">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                </div>
                {/* Play/Pause buttons */}
                <div className="flex justify-center items-center gap-4">
                    {/* @ts-ignore */}
                    <IconButton variant='text'><BackwardIcon className="w-8 h-8" onClick={prevSong} /></IconButton>
                    <IconButton variant="text"
                        onClick={togglePlay} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}          >
                        {paused ? (
                            <PlayIcon className="w-6 h-6" />
                        ) : (
                            <PauseIcon className="w-6 h-6" />
                        )}
                    </IconButton>
                    {/* @ts-ignore */}
                    <IconButton variant='text' onClick={nextSong}><ForwardIcon className="w-8 h-8" /></IconButton>

                </div>
            </div>
        </div>
    );
};

export default AudioVisualizer;
