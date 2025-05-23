import { JSX, useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { getProjects } from "../api/projects";
import Layout from "./Layout"
import TechLogo from "../common/TechLogo";
import ProjectDetail from "./ProjectDetail";
import { ProjectsData } from "../types/projectData"; 
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaLink , FaGithub } from "react-icons/fa";
gsap.registerPlugin(useGSAP, ScrollTrigger);

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

    useEffect(() =>{
        const handlekeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setSelectedProject(null);
            }
        };

        window.addEventListener("keydown", handlekeyDown);
        
        return () => {
            window.removeEventListener("keydown", handlekeyDown);
        }
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

                <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {
                        projects.map((project) => (
                            <div
                                key={project.id}
                                className="project-card flex flex-col justify-between text-center w-full h-48 xl:h-52 bg-white border-2 border-gray-100 rounded-lg px-2 py-3 transition-all duration-300 cursor-pointer shadow-xl hover:-translate-y-1 hover:border-blueColor"
                                onClick={() => handleProjectClick(project)}
                            >
                                <div>
                                    <p className="mt-1 mb-4 text-mb xl:text-lg font-bold">{project.title}</p>
                                    <p className="text-xs xl:text-sm">{project.preview}</p>
                                </div>
                                    
                                <TechLogo 
                                    logo={project.techStack} 
                                    className="!flex !flex-wrap !gap-0 self-center"
                                    imgClassName="!size-6 xl:!size-7 !shadow-md">
                                </TechLogo>
                            </div>
                        ))
                    }
                </div>
            </div>
            {
                selectedProject  && (
                    <div 
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur"
                        onClick = {() => {
                            if (window.innerWidth >= 640) setSelectedProject(null);
                        }}
                    >
                        <div 
                            className="bg-white py-8 px-1 sm:rounded-lg overflow-hidden w-full max-w-[1000px] h-screen sm:mx-10 sm:max-h-[90vh] shadow-xl relative"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="overflow-y-auto max-h-[calc(90vh-4px)] sm:max-h-[calc(90vh-48px)] px-3 lg:px-5">
                                <div className="flex gap-4 absolute top-2.5 left-4.5 text-blueColor text-lg lg:text-xl">
                                    {selectedProject?.demo && (
                                        <a className="hover:text-black" href={selectedProject.demo} target="_blank" rel="noopener noreferrer" title="Demo Link">
                                            <FaLink />
                                        </a>
                                    )}
                                    { selectedProject?.github && (

                                        <a className="hover:text-black" href={selectedProject.github} target="_blank" rel="noopener noreferrer" title="Github Link ">
                                            <FaGithub  /> 
                                        </a>
                                    )}
                                </div>
                                <button
                                    onClick={() => setSelectedProject(null)} 
                                    className="absolute top-0 right-4 text-grayColor2 hover:text-black text-xl sm:text-2xl"
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