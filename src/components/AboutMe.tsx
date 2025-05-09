import { JSX, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import Layout from "./Layout";
import TechLogo from "../common/TechLogo";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const certificate = [
  { name: "프론트엔드 교육 과정", detail: "제로베이스 부트캠프 (2025.03 수료)" },
  { name: "정보처리기사", detail: "한국산업인력공단 (2024.12 취득)" },
  { name: "Toeic Speaking AL", detail: "ETS (2024.03 취득)" },
  { name: "Delf A2", detail: "France Education International (2020.01 취득)" },
];

const AboutMe = (): JSX.Element => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const sections = gsap.utils.toArray<HTMLElement>(".animate-in");

    sections.forEach((el, i) => {
      const direction = i % 2 === 0 ? 100 : -100; // 번갈아 좌우

      gsap.fromTo(
        el,
        { x: direction, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }, { scope: containerRef });

  return (
    <Layout id="aboutMe">
      <h1 className="mb-6 text-center">About Me</h1>
      <div ref={containerRef}>
        <div className="flex flex-col gap-12">
          {/* Education */}
          <div className="grid grid-cols-[1fr_2fr] gap-3.5 animate-in">
            <p className="px-7 py-9 text-xl sm:px-13 sm:text-2xl lg:px-15 lg:py-10 lg:text-3xl font-bold bg-blueColor rounded-sm text-white flex justify-center items-center shadow-lg">
              Education
            </p>
            <div className="flex flex-col justify-center">
              <p className="text-mb font-semibold">아주대학교</p>
              <p className="text-xs lg:text-sm">
                불어불문학과 전공 
                <br/>
                소프트웨어 및 컴퓨터 공학과 복수전공
              </p>
            </div>
          </div>

          {/* Skills & Tools */}
          <div className="grid grid-cols-[2fr_1fr] gap-3.5 animate-in">
            {/* <p className="py-10 px-15 text-3xl font-bold bg-[#343434] rounded-sm text-white flex justify-center items-center order-2 shadow-lg"> */}
            <p className="px-5 py-9 text-xl sm:px-13 sm:text-2xl lg:px-15 lg:py-10 lg:text-3xl font-bold bg-[#132351] rounded-sm text-white flex justify-center items-center order-2 shadow-lg">
              Skills & Tools
            </p>
            <div className="flex justify-end items-center">
              <TechLogo
                logo={[
                  "react.png",
                  "tailwindcss.png",
                  "typescript.png",
                  "javascript.png",
                  "html.png",
                  "css.png",
                  "vite.png",
                  "github.png",
                  "notion.png",
                  "figma.png",
                ]}
              />
            </div>
          </div>

          {/* Certificate */}
          <div className="grid grid-cols-[1fr_2fr] gap-3.5 animate-in">
            <p className="px-7 py-7 text-xl sm:px-13 sm:text-2xl lg:px-15 lg:py-10 lg:text-3xl font-bold bg-grayColor3 rounded-sm flex justify-center items-center shadow-lg">
              Certificate
            </p>
            <div className="">
              {certificate.map((item, index) => (
                <div key={index} className="mb-2">
                  <p className="text-base font-semibold">{item.name}</p>
                  <p className="text-xxs text-grayColor2">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </Layout>
  );
};

export default AboutMe;
