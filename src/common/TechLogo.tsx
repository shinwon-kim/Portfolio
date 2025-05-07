import { JSX } from "react";

interface LogoProps {
    logo: string[];
    className?: string;
    imgClassName?: string;
};

const TechLogo = ({ logo, className, imgClassName }: LogoProps):JSX.Element => {
    const techStack = logo || [];

    return(
        <div className={`grid grid-cols-6 gap-4 justify-center items-center w-fit ${className}`}>
            {
                techStack.map((logo, index)=> {
                    const name = logo.split(".")[0];
                    return (
                        <div key={index} className="relative group aspect-square w-9 h-9 lg:w-10 lg:h-10">
                            <img 
                                src={`/program_logo/${logo}`} 
                                className={`w-full h-full object-contain bg-white rounded-sm shadow-xl ${imgClassName}`} 
                                alt={name}>
                            </img>
                            <div className="absolute top-full mt-1 z-1 px-2 text-xxs text-white bg-zinc-700 rounded opacity-0 group-hover:opacity-80 transition-opacity">
                                {name}
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
};

export default TechLogo;