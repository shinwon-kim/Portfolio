import { JSX, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from '@gsap/react';
import { FaAnglesDown } from "react-icons/fa6";
import { homeTrans } from "./HomeTrans";
import Layout from "./Layout";
import BubbleButton from "./BubbleButton";
gsap.registerPlugin(useGSAP);

const Home = (): JSX.Element => {
  const lang = navigator.language.startsWith("ko") ? "ko" : "en";
  const t = homeTrans[lang];
  const containerRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLSpanElement>(null);
  const nameSpans = useRef<HTMLSpanElement[]>([]); 
  const ballRef = useRef<HTMLSpanElement>(null);  

  useGSAP(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current.children,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, stagger: 0.3, duration: 1, ease: "power3.out"}
      );
    }

    const spans = nameSpans.current;
    const ball = ballRef.current;
    if (!ball || spans.length < 3 || !nameRef.current) return;

    const parentRect = nameRef.current.getBoundingClientRect();

    setTimeout(()=>{
      const timeline = gsap.timeline();
      spans.forEach((span, i) => {
        const rect = span.getBoundingClientRect();
        const x = rect.left - parentRect.left + rect.width / 2 - 8; // ball 중심 위치
        const yPeak = -20 - i * 10; // 포물선의 최고점 y값 (위로 튀게 음수)
        
        timeline.set(ball, { opacity: 1, scale: 1 });
  
        timeline.to(ball, {
          duration: 0.4,
          x: x,
          y: yPeak,
          ease: "power2.out",
        }).to(ball, {
          duration: 0.4,
          y: 0,
          ease: "bounce.out",
          onComplete: () => {
            gsap.to(spans[i], { color: "#0061FF", duration: 0.1 });
          }
        });
      });
      timeline.to(ball, {
        duration: 0.3,
        opacity: 0,
        scale: 0.5,
        ease: "power2.inOut",
      });

    }, 3000);
  }, {scope: containerRef});

  return (
    <Layout id="home">
      <div ref={containerRef}
        className="relative flex flex-col gap-5 justify-center items-center"
      >
        <h1 className="text-xl sm:text-3xl mt-5 font-bold text-nowrap">
          {t.role}{" "}
          <span className="relative inline-flex" ref={nameRef}>
            {t.name.map((char, i) => (
              <span
                key={i}
                 className={`relative inline-block transition-colors duration-100 ${i < t.name.length - 1 ? "mr-0.5 lg:mr-1" : ""}`}
                // className="relative inline-block transition-colors duration-100"
                ref={(el: HTMLSpanElement | null) => {
                  if (el) nameSpans.current[i] = el;
                }}
              >
                {char}
              </span>
            ))}
            <span
              ref={ballRef}
              className="absolute size-3 lg:size-4 opacity-0 bg-[#0061FF] rounded-full bottom-7 lg:bottom-8 left-0 z-10"
            />
          </span>
          {t.nameSuffix}
        </h1>

        <BubbleButton></BubbleButton>

        {/* <img src="/profile.png" alt="Profile Img" className="w-100 z-1" /> */}
        <p className="mt-3 p-2 text-center text-sm lg:text-lg font-semibold break-keep whitespace-pre-line">
            {t.intro}
        </p>
        
        <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-[75px]">
          <FaAnglesDown className="text-2xl m-2 animate-bounce text-blueColor"/>
        </div>

      </div>
    </Layout>
  );
};

export default Home;
