import { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { SlowMo, Elastic } from "gsap/all";
gsap.registerPlugin(SlowMo, Elastic);

const BubbleButton = () => {
  const effectRef = useRef<HTMLDivElement>(null);
  const topLeftCircles = useRef<HTMLSpanElement[]>([]);
  const bottomRightCircles = useRef<HTMLSpanElement[]>([]);
  const [isHovered, setIsHovered] = useState(false);
  const mainTlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (!effectRef.current) return;

    const $circlesTopLeft = topLeftCircles.current;
    const $circlesBottomRight = bottomRightCircles.current;
    const $effectButton = effectRef.current;

    const tl1 = gsap.timeline();
    const tl2 = gsap.timeline();
    const mainTl = gsap.timeline();

    // Top Left Circle Animation
    tl1.to($circlesTopLeft, {
      duration: 1,
      x: () => window.innerWidth < 768 ? -10 : -25,
      y: () => window.innerWidth < 768 ? 30 : 25,
      ease: Elastic.easeOut.config(0.1, 0.7),
    })
      .to($circlesTopLeft[0], { scale: 0.2, x: "+=2", y: "-=15", duration: 0.1 })
      .to($circlesTopLeft[1], { scale: 0.5, x: "-=8", y: "-=10", duration: 0.1 }, "-=0.1")
      .to($circlesTopLeft[2], { scale: 0.3, x: "-=20", y: "-=15", duration: 0.1 }, "-=0.1")
      .to(topLeftCircles.current[0], { scale: 0, x: "-=5", y: "-=15", opacity: 0, duration: 1 })
      .to(topLeftCircles.current[1], { scale: 0.4, x: "-=10", y: "-=10", opacity: 0, duration: 1 }, "-=1")
      .to(topLeftCircles.current[2], { scale: 0, x: "-=15", y: "+=5", opacity: 0, duration: 1 }, "-=1");

    // Bottom Right Circle Animation
    tl2.to($circlesBottomRight, {
      duration: 1,
      x: () => window.innerWidth < 768 ? 17 : 20,
      y: () => window.innerWidth < 768 ? 20 : 30,
      ease: Elastic.easeOut.config(0.1, 0.7),
    })
      .to($circlesBottomRight[0], { scale: 0.7, x: "-=6", y: "+=8", duration: 0.1 })
      .to($circlesBottomRight[1], { scale: 0.9, x: "+=7", y: "+=1", duration: 0.1 }, "-=0.1")
      .to($circlesBottomRight[2], { scale: 0.5, x: "+=25", y: "+=16", duration: 0.1 }, "-=0.2")
      .to(bottomRightCircles.current[0], { scale: 0, x: "+=5", y: "+=15", opacity: 0, duration: 1 })
      .to(bottomRightCircles.current[1], { scale: 0.4, x: "+=7", y: "+=7", opacity: 0, duration: 1 }, "-=1")
      .to(bottomRightCircles.current[2], { scale: 0, x: "+=15", y: "-=5", opacity: 0, duration: 1 }, "-=1");

    mainTl
      .add(tl1)
      .to($effectButton, { duration: 1.8 }, 0.1)
      .add(tl2, 0.2)
      .to($effectButton, {
        scale: 1,
        ease: Elastic.easeOut.config(1.2, 0.4),
        duration: 1.8,
      }, 1.2)
      .call(() => {
        topLeftCircles.current.forEach((el) => {
          el.style.opacity = "0";
          el.style.visibility = "hidden";
        });
        bottomRightCircles.current.forEach((el) => {
          el.style.opacity = "0";
          el.style.visibility = "hidden";
        });
      });

    mainTl.timeScale(1.6);
    mainTlRef.current = mainTl;

    playAnimation();

    return () => {
      mainTl.kill();
      topLeftCircles.current = [];
      bottomRightCircles.current = [];
    };
    
  }, []);

  useEffect(() => {
    if (isHovered) {
      playAnimation();
    }
  }, [isHovered]);

  const playAnimation = () => {
    if (!mainTlRef.current) return;

    // 요소 초기화
    topLeftCircles.current.forEach((el) => {
      
      gsap.set(el, {
        x: 0,
        y: 0,
        scale: 1,
        opacity: 1,
        visibility: "visible",
        top: "-140px",  
        left: "-3px"
      });
    });
    bottomRightCircles.current.forEach((el) => {
      gsap.set(el, {
        x: 0,
        y: 0,
        scale: 1,
        opacity: 1,
        visibility: "visible",
        bottom: "-100px",
        right: "-30px"
      });
    });

    // 애니메이션 재생
    mainTlRef.current.invalidate().restart();

  };

  const createCircles = (refArray: React.MutableRefObject<HTMLSpanElement[]>, className: string) =>
    [...Array(3)].map((_, i) => (
      <span
        key={i}
        className={`absolute w-[20px] h-[20px] z-10 rounded-full bg-blueColor transition-all ${className}`}
        ref={(el) => {
          if (el) refArray.current[i] = el;
        }}
      />
    ));

  const handleEnter = () => setIsHovered(true);
  const handleLeave = () => setIsHovered(false);

  return (
    <div
      className="relative h-[300px] w-full flex justify-center items-center"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onTouchStart={handleEnter}
      onTouchEnd={() => setTimeout(handleLeave, 300)}
    >
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" className="absolute w-0 h-0">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -7"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>

      <p
        className="absolute flex items-center justify-center text-7xl sm:text-8xl lg:text-9xl text-white/90 font-bold text-center z-10"
        style={{
          textShadow: "-.02em .02em #D0D1D4",
        }}
      >
        FrontEnd
      </p>

      <div className="relative">
        <span
          className="absolute top-0 left-0 w-[200%] h-[400%] pointer-events-none"
          style={{
            filter: "url(#goo)",
            WebkitFilter: "url(#goo)",
          }}
        >

          {createCircles(topLeftCircles, `absolute -top-[140px] -left-[3px] ${isHovered ? "opacity-100" : "opacity-0"}`)}
          <div
            ref={effectRef}
            className="absolute top-1/2 left-1/2 w-[270px] h-[270px] sm:w-[285px] sm:h-[285px] lg:w-[300px] lg:h-[300px] -translate-x-1/2 -translate-y-1/2"
          >
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <g transform="translate(100 100)">
                <path
                  fill="#0061FF"
                  d="M47.6,-58.9C58.4,-47.7,61.5,-29.6,60.1,-14.1C58.7,1.4,52.7,14.2,46,27.4C39.4,40.6,32,54.2,20.8,59.2C9.6,64.1,-5.5,60.4,-23.3,57C-41.1,53.6,-61.6,50.5,-74.4,38.2C-87.2,25.8,-92.5,4.3,-85.3,-11.3C-78.1,-26.9,-58.5,-36.6,-42.2,-46.8C-25.9,-57,-13,-67.6,2.7,-70.8C18.4,-74.1,36.9,-70,47.6,-58.9Z"
                />
              </g>
            </svg>
          </div>

          {createCircles(bottomRightCircles, `absolute -bottom-[100px] -right-[30px] ${isHovered ? "opacity-100" : "opacity-0"}`)}
        </span>
      </div>
    </div>
  );
};

export default BubbleButton;