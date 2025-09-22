import React, { useEffect, useRef, useState } from 'react';
import Button from './Button';
import { TiLocationArrow } from 'react-icons/ti';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const totalVideos = 3;

  const [currentIndex, setCurrentIndex] = useState(1);
  const [hasClicked, setHasClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedVideos, setLoadedVideos] = useState(0);

  // Video sources, initially null for lazy loading
  const [videoSrcs, setVideoSrcs] = useState(Array(totalVideos).fill(null));

  const videoRefs = useRef([]);
  videoRefs.current = [];

  const addToRefs = (el) => {
    if (el && !videoRefs.current.includes(el)) videoRefs.current.push(el);
  };

  // Compute mini video index correctly
  const upcomingIndex = (currentIndex % totalVideos) + 1;

  // Lazy load video by index
  const lazyLoadVideo = (index) => {
    if (!videoSrcs[index]) {
      setVideoSrcs((prev) => {
        const copy = [...prev];
        copy[index] = `videos/hero-${index + 1}.mp4`;
        return copy;
      });
    }
  };

  // Preload main + mini video for instant experience
  useEffect(() => {
    lazyLoadVideo(currentIndex - 1);
    lazyLoadVideo(upcomingIndex - 1);
  }, [currentIndex]);

  const handleVideoLoad = () => setLoadedVideos((prev) => prev + 1);

  const handleMiniVdClick = () => {
    setHasClicked(true);
    setCurrentIndex(upcomingIndex);
  };

  useEffect(() => {
    if (loadedVideos >= 1) setIsLoading(false);
  }, [loadedVideos]);

  // GSAP animations
  useEffect(() => {
    if (hasClicked && videoRefs.current[1]) {
      gsap.set(videoRefs.current[1], { visibility: 'visible' });
      gsap.to(videoRefs.current[1], {
        transformOrigin: 'center center',
        scale: 1,
        width: '100%',
        height: '100%',
        duration: 1,
        ease: 'power1.inOut',
        onStart: () => videoRefs.current[1].play(),
      });

      gsap.from(videoRefs.current[0], {
        transformOrigin: 'center center',
        scale: 0,
        duration: 1.5,
        ease: 'power1.inOut',
      });
    }

    gsap.set('#video-frame', {
      clipPath: 'polygon(15% 0%, 72% 0%, 90% 90%, 0% 100%)',
      borderRadius: '0 0 40% 10%',
    });

    gsap.from('#video-frame', {
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      borderRadius: '0 0 0 0',
      ease: 'power1.inOut',
      scrollTrigger: {
        trigger: '#video-frame',
        start: 'center center',
        end: 'bottom center',
        scrub: true,
      },
    });
  }, [currentIndex, hasClicked]);

  return (
    <div className="relative h-dvh w-screen overflow-x-hidden">
      {/* Placeholder for instant FCP */}
      {isLoading && (
        <div className="absolute z-[100] h-dvh w-screen bg-violet-50 flex items-center justify-center">
          <div className="three-body">
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
          </div>
        </div>
      )}

      <div id="video-frame" className="relative z-10 h-dvh w-screen overflow-x-hidden rounded-lg bg-blue-75">
        {/* Mini / preview video */}
        <div className="absolute-center size-64 cursor-pointer overflow-hidden rounded-lg z-50">
          <div
            onClick={handleMiniVdClick}
            className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100"
          >
            <video
              ref={addToRefs}
              src={videoSrcs[upcomingIndex - 1]}
              loop
              muted
              poster={`img/hero-${upcomingIndex}-poster.png`}
              className="size-64 origin-center scale-150 object-cover object-center"
              onLoadedData={handleVideoLoad}
            />
          </div>
        </div>

        {/* Next video for animation */}
        <video
          ref={addToRefs}
          src={videoSrcs[currentIndex - 1]}
          loop
          muted
          
          className="absolute-center invisible absolute z-20 size-64 object-cover object-center"
          onLoadedData={handleVideoLoad}
        />

        {/* Main video */}
        <video
          src={videoSrcs[currentIndex - 1]}
          autoPlay
          loop
          muted
          
          className="absolute left-0 top-0 size-full object-cover object-center"
          onLoadedData={handleVideoLoad}
        />

        <h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75">
          G<b>a</b>ming
        </h1>

        <div className="absolute left-0 top-0 z-40 size-full">
          <div className="mt-24 px-5 sm:px-10">
            <h1 className="special-font hero-heading text-blue-100">redefi<b>n</b>e</h1>
            <p className="mb-5 max-w-64 font-robert-medium text-blue-100">
              Enter the Metagame Layer <br /> Unleash the Play Economy
            </p>

            <Button
              id="watch-trailer"
              title="Watch Trailer"
              leftIcon={<TiLocationArrow />}
              containerClass="!bg-yellow-300 flex-center gap-1"
            />
          </div>
        </div>
      </div>

      <h1 className="special-font hero-heading absolute bottom-5 right-5 text-black">
        G<b>a</b>ming
      </h1>
    </div>
  );
};

export default Hero;
