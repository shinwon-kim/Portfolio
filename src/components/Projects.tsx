import { JSX, useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { getProjects } from "../api/projects";
import Layout from "./Layout"
import TechLogo from "../common/TechLogo";
import ProjectDetail from "./ProjectDetail";
import { ProjectsData } from "../types/projectData"; 
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(useGSAP, ScrollTrigger);

// gsap.registerPlugin(useGSAP);

const Projects = (): JSX.Element => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [projects, setProjects] = useState<ProjectsData[]>([]);
    const [selectedProject, setSelectedProject] = useState<ProjectsData | null>(null); // 선택된 프로젝트 데이터 상태 추가

    useEffect(()=>{
        const fetchData = async () => {
            const data = await getProjects();
            setProjects(data);
        };
        fetchData();
    }, [])


    useGSAP(() => {
        if (!containerRef.current) return;
        const cards = gsap.utils.toArray<HTMLElement>(".project-card");
    
        if (cards.length > 0) {
          gsap.fromTo(
            cards,
            { y: 20, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                stagger: 0.1,
                duration: 0.5,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                    toggleActions: "play none none reverse", // 한 번만 실행
              },
            }
          );
        }
      }, { scope: containerRef, dependencies: [projects] }); 

    const handleProjectClick = (project: ProjectsData) => {
        setSelectedProject(project); 
    };


    return (
        <Layout id="projects" className="">
            <div className="mb-6 text-center">
                <h1 className="mb-2">Projects</h1>
                <p className="text-xs text-grayColor2">클릭 시 세부 내용을 확인 할  수 있습니다.</p>
            </div>
            <div className="w-full flex justify-center">

                <div ref={containerRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {
                        projects.map((project) => (
                            <div
                                key={project.id}
                                className="project-card flex flex-col justify-between text-center w-full sm:w-[350px] h-60 bg-white border-2 border-gray-100 rounded-lg px-2 py-3 transition-all duration-300 cursor-pointer shadow-xl hover:-translate-y-1 hover:border-blueColor"
                                onClick={() => handleProjectClick(project)}
                            >
                                <div>
                                    <h4 className="mb-4">{project.title}</h4>
                                    <p className="text-sm">{project.preview}</p>
                                </div>
                                    
                                <TechLogo 
                                    logo={project.techStack} 
                                    className="!flex !flex-wrap !gap-1 self-center"
                                    imgClassName="!w-6 !h-6 lg:!w-7 lg:!h-7 !shadow-md">
                                </TechLogo>
                            </div>
                        ))
                    }
                </div>
            </div>
            {
                selectedProject  && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur">
                        <div className="bg-white py-3 lg:py-6 px-1 rounded-lg overflow-hidden w-full max-w-[1000px] mx-3 sm:mx-10 max-h-[90vh] shadow-xl relative">

                            <div className="overflow-y-auto max-h-[calc(90vh-48px)] px-3 lg:px-5 pb-8">
                                <button
                                    onClick={() => setSelectedProject(null)} 
                                    className="absolute top-0 right-4 text-grayColor2 hover:text-black text-2xl"
                                >
                                    &times;
                                </button>
                                <ProjectDetail project={selectedProject}/>
                            </div>
                        </div>
                    </div>
                )
            }

        </Layout>
    )
}

export default Projects;