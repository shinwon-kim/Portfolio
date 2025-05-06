import { JSX, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from '@gsap/react';
import { FaAnglesDown } from "react-icons/fa6";
import Layout from "./Layout";
import BubbleButton from "./BubbleButton";
gsap.registerPlugin(useGSAP);

const Home = (): JSX.Element => {
  const containerRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLSpanElement>(null);
  const nameSpans = useRef<HTMLSpanElement[]>([]); 
  const ballRef = useRef<HTMLSpanElement>(null);  

  useGSAP(() => {
    // const length = pathRef.current?.getTotalLength()  || 0;
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
        <h1 className="text-2xl lg:text-3xl mt-5 font-bold">
          프론트엔드 개발자{" "}
          <span className="relative inline-flex" ref={nameRef}>
            {["김", "신", "원"].map((char, i) => (
              <span
                key={i}
                className="relative inline-block transition-colors duration-100"
                ref={(el: HTMLSpanElement | null) => {
                  if (el) nameSpans.current[i] = el;
                }}
              >
                {char}
              </span>
            ))}
            <span
              ref={ballRef}
              className="absolute w-3 h-3 lg:w-4 lg:h-4 opacity-0 bg-[#0061FF] rounded-full bottom-7 lg:bottom-8 left-0 z-10"
            />
          </span>
          입니다
        </h1>

        <BubbleButton></BubbleButton>

        {/* <img src="/profile.png" alt="Profile Img" className="w-100 z-1" /> */}
        <p className="mt-3 p-2 text-center text-sm lg:text-lg font-semibold break-keep whitespace-pre-line">
          무언가를 만드는 것이 좋아 프로그래밍을 시작했으며, 사용자가 직접 마주하는 화면을 설계하고 구현하는 과정에 흥미를 느끼게 되었습니다. 
          <br/>
          직관적인 디자인과 뛰어난 사용자 경험을 고민하며, 최고의 UI/UX를 실현하는 프론트엔드 개발자가 목표입니다.
        </p>
        
        {/* <p>#문제해결 능력 #커뮤니케이션 능력 #책임감 #끈기 #성실</p> */}
        <div className="absolute left-1/2 transform -translate-x-1/2 bottom-[-80px]">
          <FaAnglesDown className="text-2xl m-2 animate-bounce text-blueColor"/>
        </div>

      </div>
    </Layout>
  );
};

export default Home;
