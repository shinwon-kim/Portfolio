import { JSX, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { TiStarburst } from "react-icons/ti";
import { careerTrans } from "./CareerTrans";
import Layout from "./Layout";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Career = (): JSX.Element => {
    const containerRef = useRef<HTMLDivElement>(null);
    const userLang = navigator.language.startsWith("ko") ? "ko" : "en";
    const t = careerTrans[userLang]; 

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
                {t.map((item, index) => (
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
