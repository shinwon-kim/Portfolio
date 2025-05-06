import { JSX, useState } from "react";
import { TiStarburst } from "react-icons/ti";
import TechLogo from "../common/TechLogo";
import Carousel from "../common/Carousel";
import { ProjectsData } from "../types/projectData"; 

interface ProjectDetailProps{
    project: ProjectsData;
}

const ProjectDetail = ({project}: ProjectDetailProps):JSX.Element =>{
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    return(
        <>
            <h3 className="flex justify-center items-center mb-3 mt-1 text-base lg:text-xl">{project.title}</h3>
            <div className="flex gap-4 justify-center items-center mb-4 text-xs lg:text-sm text-grayColor2">
                <p>{project.count}</p>
                <p>{project.period}</p>
            </div>
            <div className="flex flex-col gap-8 lg:gap-10">
                <div>
                    <div className="flex items-center gap-2 lg:gap-3 mb-2">
                        <TiStarburst className="text-blueColor"/>
                        <h4 className="text-base lg:text-lg text-navyColor">Project Overview</h4>
                    </div> 
                    <p className="text-sm lg:text-base">
                        {project.description}
                    </p>
                </div>

                <div>
                    <div className="flex items-center gap-2 lg:gap-3 mb-2">
                        <TiStarburst className="text-blueColor"/>
                        <h4 className="text-base lg:text-lg text-navyColor">Tech Stack</h4>
                    </div>
                    <TechLogo 
                        logo={project.techStack} 
                        className="!flex !flex-wrap !gap-2 lg:!gap-3"
                        imgClassName="!w-7 !h-7 lg:!w-8 lg:!h-8">
                    </TechLogo>
                </div>

                <div>
                    <div className="flex items-center gap-2 lg:gap-3 mb-2">
                        <TiStarburst className="text-blueColor"/>
                        <h4 className="text-base lg:text-lg text-navyColor">Role & Responsibilities</h4>
                    </div>
                    <div className="text-sm lg:text-base">
                        {project.myRole.split('\n').map((line, index) => {
                            const isSubItem = line.trim().startsWith('-');

                            const match = line.trim().match(/^(-|\d+\.)\s?(.*)$/);
                            const prefix = match ? match[1] : null;
                            const content = match ? match[2] : line;

                            return (
                            <p
                                key={index}
                                className={`py-1 ${isSubItem ? "pl-6 text-xs lg:text-sm" : "pt-1"}`}
                            >
                                {prefix && (
                                <span className="text-blueColor font-semibold mr-1">
                                    {prefix}
                                </span>
                                )}
                                {content}
                            </p>
                            );
                        })}
                    </div>

                    {
                        project.img && (
                            <div className="flex flex-col justify-center items-center w-full">
                                <img src={`${project.img}`} 
                                    className="my-1 w-[500px] cursor-zoom-in"
                                    onClick={()=>{
                                        setIsModalOpen(true);
                                        setSelectedImage(`${project.img}`);
                                    }}
                                    />
                                <p className="text-xxs">{project.imgDescription}</p>
                            </div>
                        )
                    }

                </div>
                {
                    isModalOpen && selectedImage && (
                        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
                            onClick={()=>setIsModalOpen(false)}
                        >
                            <img 
                                src={selectedImage} 
                                className="max-w-base lg:max-w-4xl max-h-[90vh] object-contain rounded-lg shadow-lg"
                                onClick={(e) => e.stopPropagation()} 
                            />

                        </div>
                    )
                }

                <div>
                    <div className="flex items-center gap-2 lg:gap-3 mb-2">
                        <TiStarburst className="text-blueColor"/>
                        <h4 className="text-base lg:text-lg text-navyColor">Screenshots</h4>
                    </div>
                        <Carousel slides={project.screenshots}></Carousel>

                </div>
            </div>
        </>
    )
}

export default ProjectDetail;
