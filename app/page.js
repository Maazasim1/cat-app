'use client'
import React, { Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState, suspense } from 'react';
import { cats } from '@/Data/cats';


export default function CatPlayer() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [audioElement, setAudioElement] = useState(null);
  const searchParams = useSearchParams()

  // Get current cat from URL
  // useEffect(() => {
  //   const cat = searchParams.get('cat');

  //   if (cat) {
  //     const catIndex = cats.findIndex(c => c.slug === cat);
  //     if (catIndex !== -1) {
  //       setCurrentIndex(catIndex);
  //     }
  //   }

  // }, []);

  // Update URL when track changes
  const updateURL = (index) => {
    const cat = cats[index];
    router.push(`/?cat=${cat.slug}`, undefined, { shallow: true });
  };

  // Load track and update URL
  const loadTrack = (index) => {
    setCurrentIndex(index);
    updateURL(index);
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const togglePlay = () => {
    if (audioElement) {
      if (isPlaying) {
        audioElement.pause();
      } else {
        audioElement.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const previousTrack = () => {
    const newIndex = (currentIndex - 1 + cats.length) % cats.length;
    loadTrack(newIndex);
  };

  const nextTrack = () => {
    const newIndex = (currentIndex + 1) % cats.length;
    loadTrack(newIndex);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const currentCat = cats.find((cat, index) => cat.slug === searchParams.get('cat')) || cats[0];

  return (
    <>


      <Suspense fallback={<div className="text-center text-gray-500">Loading...</div>}>
        <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex items-center justify-center p-5">
          <div className="bg-white/95 backdrop-blur-lg rounded-3xl p-8 max-w-md w-full shadow-2xl border-2 border-white/30 relative overflow-hidden">

            {/* Animated background shimmer */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-pink-100/20 to-transparent -skew-x-12 animate-pulse"></div>

            {/* Hearts decoration */}
            <div className="absolute top-4 right-6 text-2xl animate-bounce">💕</div>

            <div className="relative z-10">
              <h1 className="text-3xl font-bold text-pink-500 text-center mb-6 ">
                Alishba's Meow Music Player 🎵
              </h1>

              {/* Current cat display */}
              <div className="text-center mb-8">
                <div className="relative inline-block">
                  <img
                    src={currentCat.image}
                    alt={currentCat.name}
                    className="w-48 h-48 rounded-full object-cover border-4 border-pink-400 shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer animate-float"
                    onClick={() => {
                      // Fun click animation
                      const img = document.querySelector('.animate-float');
                      img.style.transform = 'scale(1.1) rotate(5deg)';
                      setTimeout(() => {
                        img.style.transform = '';
                      }, 300);
                    }}
                  />
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-pink-500 text-white px-4 py-1 rounded-full text-sm shadow-lg">
                    {currentCat.name}
                  </div>
                </div>
                <p className="text-gray-600 mt-4 text-lg">{currentCat.description}</p>
              </div>

              {/* Controls */}
              <div className="flex justify-center items-center gap-4 mb-6">
                <button
                  onClick={previousTrack}
                  className="bg-gradient-to-r from-pink-400 to-pink-500 hover:from-pink-500 hover:to-pink-600 rounded-full w-14 h-14 flex items-center justify-center text-white text-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061A1.125 1.125 0 0 1 21 8.689v8.122ZM11.25 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061a1.125 1.125 0 0 1 1.683.977v8.122Z" />
                  </svg>

                </button>

                <button
                  onClick={togglePlay}
                  className="bg-gradient-to-r from-pink-500 to-red-400 hover:from-pink-600 hover:to-red-500 rounded-full w-20 h-20 flex items-center justify-center text-white text-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  {isPlaying ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
                  </svg>
                    :
                    (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-8">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
                    </svg>
                    )}
                </button>

                <button
                  onClick={nextTrack}
                  className="bg-gradient-to-r from-pink-400 to-pink-500 hover:from-pink-500 hover:to-pink-600 rounded-full w-14 h-14 flex items-center justify-center text-white text-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061A1.125 1.125 0 0 1 3 16.811V8.69ZM12.75 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061a1.125 1.125 0 0 1-1.683-.977V8.69Z" />
                  </svg>

                </button>
              </div>

              {/* Progress bar */}
              <div className="mb-6">
                <div className="w-full bg-pink-200 rounded-full h-3 mb-2 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-pink-400 to-red-400 h-full transition-all duration-100 ease-out"
                    style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>{formatTime(currentTime)}</span>
                  <span className={`text-lg ${isPlaying ? 'animate-bounce' : ''}`}>
                    {isPlaying ? '🎵' : '🎶'}
                  </span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              {/* Track list */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-700 mb-3">All Cats:</h3>
                {cats.map((cat, index) => (
                  <div
                    key={cat.id}
                    onClick={() => loadTrack(index)}
                    className={`flex items-center gap-4 p-3 rounded-xl cursor-pointer transition-all duration-300 ${index === currentIndex
                      ? 'bg-gradient-to-r from-pink-400 to-red-400 text-white scale-105'
                      : 'bg-white/80 hover:bg-pink-100 hover:translate-x-2'
                      } border-2 ${index === currentIndex ? 'border-pink-300' : 'border-transparent hover:border-pink-200'}`}
                  >
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-pink-300"
                    />
                    <div className="flex-1">
                      <div className="font-semibold">{cat.name}</div>
                      <div className={`text-sm ${index === currentIndex ? 'text-pink-100' : 'text-gray-500'}`}>
                        {cat.description}
                      </div>
                    </div>
                    {index === currentIndex && (
                      <div className="text-xl animate-pulse">🎵</div>
                    )}
                  </div>
                ))}
              </div>

              {/* URL for QR code */}

            </div>

            {/* Audio element */}
            <audio
              ref={(audio) => {
                if (audio) {
                  setAudioElement(audio);
                  audio.addEventListener('timeupdate', () => setCurrentTime(audio.currentTime));
                  audio.addEventListener('loadedmetadata', () => setDuration(audio.duration));
                  audio.addEventListener('ended', nextTrack);
                }
              }}
              src={currentCat.audio}
              preload="metadata"
            />
          </div>
        </div>

        <style jsx>{`
        .font-comic {
          font-family: 'Comic Sans MS', cursive, sans-serif;
          }
          
          .animate-float {
            animation: float 3s ease-in-out infinite;
            }
            
            @keyframes float {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-10px); }
              }
              `}</style>
      </Suspense>
    </>
  );
}
