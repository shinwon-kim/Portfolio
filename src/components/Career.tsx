import { JSX, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { TiStarburst } from "react-icons/ti";
import Layout from "./Layout";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const careerData = [
    { date: "2023.01 ~ 2023.02", companyName: "바로에이아이", position: "현장실습 인턴: 시스템 소프트웨어 팀", detail: "서버 모니터링 서비스 백엔드 프로젝트 참여" },
    { date: "2022.07 ~ 2022.09", companyName: "Advanced Warehouse USA", position: "해외 인턴: IT팀", detail: "IT 지원 및 시스템 구축 전반을 담당하며, WMS·API 개발 보조와 네트워크 및 업무 환경 세팅을 수행" },
    { date: "2021.09 ~ 2022.07", companyName: "Royal Sovereign International USA", position: "해외 인턴: IT팀", detail: "사용자 지원 및 보안 관리를 중심으로, 매뉴얼 작성·교육, 기술 지원, AD 관리, ERP 개발 보조 업무 수행" },
];

const Career = (): JSX.Element => {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const cards = gsap.utils.toArray<HTMLDivElement>(".career-card");
        cards.forEach((card, i) => {
            gsap.fromTo(
                card,
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: card,
                        start: "top 85%",
                        toggleActions: "play none none reverse",
                    },
                    delay: i * 0.1,
                }
            );
        });
    }, { scope: containerRef });

    return (
        <Layout id="career">
            <h1 className="mb-6 text-center">Career</h1>
            <div ref={containerRef} className="flex flex-col items-center gap-4">
                {careerData.map((item, index) => (
                    <div
                        key={index}
                        className="career-card w-full lg:max-w-4xl bg-white shadow-xl p-3 lg:p-6 rounded-lg grid grid-cols-[1fr_4fr] gap-4"
                    >
                        <div className="flex items-center gap-3">
                            <TiStarburst className="text-mb text-blueColor"/>
                            <p className="text-xs font-medium text-grayColor2">{item.date}</p>
                        </div>
                        <div className="space-y-1">
                            <h4 className="text-base lg:text-lg font-semibold text-blackColor">{item.companyName}</h4>
                            <p className="text-xs lg:text-sm font-medium text-blueColor ">{item.position}</p>
                            <p className="text-xs lg:text-sm text-grayColor2">{item.detail}</p>
                        </div>
                    </div>
                ))}
            </div>
        </Layout>
    );
};

export default Career;
