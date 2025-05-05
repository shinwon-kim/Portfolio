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
            <h3 className="flex justify-center items-center mb-3">{project.title}</h3>
            <div className="flex gap-4 justify-center items-center mb-4 text-sm text-grayColor2">
                <p>{project.count}</p>
                <p>{project.period}</p>
            </div>
            <div className="flex flex-col gap-10">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <TiStarburst className="text-blueColor"/>
                        <h4>Project Overview</h4>
                    </div>
                    <p>
                        {project.description}
                    </p>
                </div>

                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <TiStarburst className="text-blueColor"/>
                        <h4>Tech Stack</h4>
                    </div>
                    <TechLogo 
                        logo={project.techStack} 
                        className="!flex !flex-wrap !gap-3"
                        imgClassName="!w-8 !h-8">
                    </TechLogo>
                </div>

                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <TiStarburst className="text-blueColor"/>
                        <h4>My Role</h4>
                    </div>
                    <div>
                        {project.myRole.split('\n').map((line, index) => {
                            const isSubItem = line.trim().startsWith('-');

                            return (
                            <p
                                key={index}
                                className={`py-1 ${isSubItem ? "pl-6 text-sm" : "pt-1"}`}
                            >
                                {line.trim()}
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
                                className="max-w-4xl max-h-[90vh] object-contain rounded-lg shadow-lg"
                                onClick={(e) => e.stopPropagation()} 
                            />

                        </div>
                    )
                }

                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <TiStarburst className="text-blueColor"/>
                        <h4>Screenshots</h4>
                    </div>
                        <Carousel slides={project.screenshots}></Carousel>

                </div>
            </div>
        </>
    )
}

export default ProjectDetail;
