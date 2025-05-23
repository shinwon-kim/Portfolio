import { JSX, useState } from "react";
import { Link } from "react-scroll";
const Nav = (): JSX.Element => {
    const [activeLink, setActiveLink] = useState<string>("home");

    const handleClick = (id: string) => {
        setActiveLink(id);
    };

    return (
        <nav className="fixed flex justify-end w-full gap-4 p-4 xl:pr-32 py-2 text-sm font-bold cursor-pointer z-50 text-navyColor bg-whiteColor/80 backdrop-blur">
            {activeLink !== "home" && (
                <Link to="home" smooth={true} duration={500} spy={true} onSetActive={() => setActiveLink("home")} 
                    className={`hover:bg-grayColor/60 hover:text-blueColor px-1 rounded-sm ${activeLink==="home" ? "text-blueColor": ""}`} onClick={()=>handleClick("home")}> Home
                </Link>
            )}
            <Link to="aboutMe" smooth={true} duration={500} spy={true} onSetActive={() => setActiveLink("aboutMe")} 
                className={`hover:bg-grayColor/60 hover:text-blueColor px-1 rounded-sm ${activeLink==="aboutMe"  ? "text-blueColor underline underline-offset-5 decoration-2": ""}`} 
                onClick={()=>handleClick("aboutMe")} > About me
            </Link>
            <Link to="projects" smooth={true} duration={500} spy={true} onSetActive={() => setActiveLink("projects")} 
                className={`hover:bg-grayColor/60 hover:text-blueColor px-1 rounded-sm  ${activeLink==="projects"  ? "text-blueColor underline underline-offset-5 decoration-2": ""}`} 
                onClick={()=>handleClick("projects")}> Projects
            </Link>
            <Link to="career" smooth={true} duration={500} spy={true} onSetActive={() => setActiveLink("career")}
                className={ `hover:bg-grayColor/60 hover:text-blueColor px-1 rounded-sm ${activeLink==="career"  ? "text-blueColor underline underline-offset-5 decoration-2": ""}`} 
                onClick={()=>handleClick("career")}> Career
            </Link>
            {/* <Link to="contact" smooth={true} duration={500} spy={true} onSetActive={() => setActiveLink("contact")}
                className={ `hover:bg-grayColor/60 px-1 rounded-sm ${activeLink==="contact"  ? "text-blueColor underline underline-offset-5 decoration-2": ""}`} 
                onClick={()=>handleClick("contact")}> Contact
            </Link> */}
        </nav>
    )
}

export default Nav;