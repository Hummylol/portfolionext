import React, { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Data for your tiles
const tileData = [
  {
    id: 'school',
    title: 'School',
    shortInfo: 'Early education journey and foundation.',
    longInfo:
      'My journey began at [School Name], where I developed a strong foundation in various subjects. I actively participated in [mention specific activities/achievements, e.g., debate club, science fairs, sports], learning the importance of [e.g., teamwork, critical thinking]. This period laid the groundwork for my future endeavors, fostering a deep curiosity and a strong work ethic. I particularly enjoyed [favorite subject] and found great satisfaction in [a specific achievement].',
  },
  {
    id: 'college',
    title: 'College',
    shortInfo: 'Higher education and specialized learning.',
    longInfo:
      'I pursued my [Degree] in [Major] at [University Name]. This period was pivotal for deep-diving into [mention key subjects/areas, e.g., software engineering, design principles, data structures]. I worked on several impactful projects, including [mention a notable project or two, e.g., a real-time chat application, an AI-powered recommendation system], which honed my skills in [e.g., full-stack development, machine learning, software architecture]. I also enjoyed [a specific course or academic group].',
  },
  {
    id: 'internship',
    title: 'Internship',
    shortInfo: 'Practical experience and industry insights.',
    longInfo:
      'My internship at [Company Name] as a [Your Role] provided invaluable real-world experience. I contributed to [mention specific projects/tasks, e.g., developing a new feature for their flagship product, optimizing existing code for performance, conducting user research for a new initiative]. This role significantly expanded my understanding of [e.g., agile methodologies, collaborative problem-solving in a corporate environment, scalable systems design]. I particularly enjoyed [a specific aspect or challenge].',
  },
  {
    id: 'extraCurricular',
    title: 'Extra Curricular',
    shortInfo: 'Passions beyond academics and professional life.',
    longInfo:
      'Outside of my formal education and work, I am passionate about [mention a hobby/activity, e.g., photography, volunteering for environmental causes, competitive coding, playing a musical instrument, graphic design]. These activities allow me to [mention what you gain, e.g., express creativity in a different medium, give back to the community, stay sharp and analytical, unwind and explore new forms of expression]. I believe they contribute significantly to my holistic development and perspective.',
  },
];

// Helper to store initial positions, calculated once
const initialTileProperties = new Map<string, { x: number; y: number; width: number; height: number }>();

const About = () => {
  const topRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const leftDrawerRef = useRef<HTMLDivElement>(null);
  const rightDrawerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const gridContainerRef = useRef<HTMLDivElement>(null);
  const tileRefs = useRef<(HTMLDivElement | null)[]>([]);

  // State to manage which tile is expanded
  const [expandedTileId, setExpandedTileId] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  // Memoized callback to get initial tile positions when they first render
  const initializeTilePositions = useCallback(() => {
    if (tileRefs.current.length > 0 && !initialTileProperties.size) {
      tileRefs.current.forEach((tileEl) => {
        if (tileEl && tileEl.dataset.id) {
          const rect = tileEl.getBoundingClientRect();
          initialTileProperties.set(tileEl.dataset.id, {
            x: rect.left,
            y: rect.top,
            width: rect.width,
            height: rect.height,
          });
        }
      });
    }
  }, []);

  useEffect(() => {
    // Call this after tiles are rendered to capture their initial states
    initializeTilePositions();

    const mainTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=100%',
        scrub: 1,
        pin: true,
      },
    });

    mainTl.to(topRef.current, {
      yPercent: -101,
      ease: 'none',
    }).to(
      bottomRef.current,
      {
        yPercent: 101,
        ease: 'none',
      },
      '<',
    );

    mainTl.to(
      leftDrawerRef.current,
      {
        xPercent: -101,
        ease: 'power2.out',
      },
      '0.2',
    ).to(
      rightDrawerRef.current,
      {
        xPercent: 101,
        ease: 'power2.out',
      },
      '<',
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      initialTileProperties.clear(); // Clear cached properties on unmount
    };
  }, [initializeTilePositions]); // Dependency on initializeTilePositions

  // Effect for tile expansion animation
  useEffect(() => {
    if (!gridContainerRef.current || initialTileProperties.size === 0) {
      return;
    }

    const gridRect = gridContainerRef.current.getBoundingClientRect();
    const targetPadding = 16;
    const targetWidth = gridRect.width - targetPadding * 2;
    const targetHeight = gridRect.height - targetPadding * 2;
    const targetXOffset = gridRect.left + targetPadding;
    const targetYOffset = gridRect.top + targetPadding;

    if (expandedTileId) {
      setIsAnimating(true);
      const targetTileEl = tileRefs.current.find(
        (el) => el && el.dataset.id === expandedTileId,
      );
      const otherTileEls = tileRefs.current.filter(
        (el) => el && el.dataset.id !== expandedTileId,
      );

      if (targetTileEl && targetTileEl.dataset.id) {
        const initialProps = initialTileProperties.get(targetTileEl.dataset.id);
        if (!initialProps) return;

        // Animate the expanded tile
        gsap.to(targetTileEl, {
          x: targetXOffset - initialProps.x,
          y: targetYOffset - initialProps.y,
          width: targetWidth,
          height: targetHeight,
          duration: 0.6,
          ease: 'power3.inOut',
          zIndex: 50,
          onStart: () => {
            // Show expanded content at the start of expansion
            gsap.set(targetTileEl.querySelector('.expanded-content'), {
              autoAlpha: 1,
              pointerEvents: 'auto',
            });
          },
          onComplete: () => {
            setIsAnimating(false);
          },
        });

        // Hide other tiles
        gsap.to(otherTileEls, {
          opacity: 0,
          scale: 0.9,
          duration: 0.3,
          ease: 'power2.out',
          pointerEvents: 'none',
        });

        // Hide short content
        gsap.set(targetTileEl.querySelector('.short-content'), {
          autoAlpha: 0,
        });
      }
    } else {
      // Restore all tiles to their initial state
      setIsAnimating(true);
      tileRefs.current.forEach((tileEl) => {
        if (tileEl && tileEl.dataset.id) {
          const initialProps = initialTileProperties.get(tileEl.dataset.id);
          if (initialProps) {
            // Hide expanded content before starting the minimize animation
            gsap.set(tileEl.querySelector('.expanded-content'), {
              autoAlpha: 0,
              pointerEvents: 'none',
            });

            gsap.to(tileEl, {
              x: 0,
              y: 0,
              width: initialProps.width,
              height: initialProps.height,
              opacity: 1,
              scale: 1,
              duration: 0.6,
              ease: 'power3.inOut',
              zIndex: 1,
              pointerEvents: 'auto',
              onComplete: () => {
                gsap.set(tileEl, { clearProps: 'x,y,width,height,opacity,scale,zIndex,pointerEvents' });
                gsap.set(tileEl.querySelector('.short-content'), {
                  autoAlpha: 1,
                });
                setIsAnimating(false);
              },
            });
          }
        }
      });
    }
  }, [expandedTileId]);

  const handleTileClick = (id: string) => {
    if (!isAnimating) {
      if (expandedTileId === id) {
        setExpandedTileId(null);
      } else {
        setExpandedTileId(id);
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className="h-screen w-full dark:bg-black bg-white dark:text-white text-black relative overflow-hidden"
    >
      <div
        ref={topRef}
        className="h-1/2 w-screen dark:bg-black bg-white absolute z-40 flex justify-center items-end"
      >
        <div className="h-[15vw] md:h-[25vw] overflow-hidden">
          <div className="text-[15vw] md:text-[25vw] dark:text-white text-black leading-none -translate-y-[-50%]">
            ABOUT
          </div>
        </div>
      </div>

      <div className="h-full w-full absolute dark:bg-black bg-white flex justify-center items-center p-8 overflow-hidden z-0">
        <div
          ref={leftDrawerRef}
          className="absolute inset-y-0 left-0 w-1/2 bg-black dark:bg-white z-30"
        ></div>

        <div
          ref={rightDrawerRef}
          className="absolute inset-y-0 right-0 w-1/2 bg-black dark:bg-white z-30"
        ></div>

        {/* This is the grid container for your tiles */}
        <div
          ref={gridContainerRef}
          className="relative w-[100%] h-[70%] lg:w-[70%] lg:h-[80%]
                     grid grid-cols-2 grid-rows-2 gap-[1vw]"
        >
          {tileData.map((tile, index) => (
            <div
              key={tile.id}
              data-id={tile.id}
              ref={(el) => {
                if (el) {
                  tileRefs.current[index] = el;
                }
              }}
              className={`
                relative flex flex-col justify-center items-center p-2 rounded-xl shadow-lg
                cursor-pointer overflow-hidden transition-colors duration-300 ease-in-out
                ${
                  expandedTileId === tile.id
                    ? 'z-50 bg-black dark:bg-white'
                    : 'z-10 bg-black dark:bg-white'
                }
                ${
                  expandedTileId && expandedTileId !== tile.id
                    ? 'pointer-events-none'
                    : 'pointer-events-auto'
                }
                ${expandedTileId === tile.id ? 'text-white dark:text-black' : 'text-white dark:text-black'}
              `}
              onClick={() => handleTileClick(tile.id)}
            >
              <div
                className={`short-content text-2xl lg:text-6xl text-center
                  ${expandedTileId === tile.id ? 'opacity-0' : 'opacity-100'}
                  transition-opacity duration-300`}
              >
                {tile.title}
              </div>
              <div
                className={`expanded-content absolute inset-0 flex flex-col justify-center items-center p-2 text-center overflow-y-scroll
                  ${expandedTileId === tile.id ? 'opacity-100' : 'opacity-0 pointer-events-none'}
                  transition-opacity duration-150`}
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setExpandedTileId(null);
                  }}
                  className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full
                           bg-white dark:bg-black text-black dark:text-white hover:opacity-80
                           transition-opacity duration-200 z-50"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
                <h3 className="text-sm md:text-5xl font-bold mb-4">
                  {tile.title}
                </h3>
                <p className="text-sm md:text-xl leading-relaxed">
                  {tile.longInfo}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        ref={bottomRef}
        className="h-1/2 w-screen dark:bg-black bg-white absolute bottom-0 z-40 flex justify-center items-start"
      >
        <div className="h-[15vw] md:h-[25vw] overflow-hidden">
          <div className="text-[15vw] md:text-[25vw] dark:text-white text-black leading-none translate-y-[-50%]">
            ABOUT
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;