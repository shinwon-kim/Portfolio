import { JSX, useState } from "react";
import { MdOutlineEmail } from "react-icons/md";
import { IoLogoGithub } from "react-icons/io";

const ContactBadge=(): JSX.Element =>{
    const [showEmailTooltip, setShowEmailTooltip] = useState(false);
    const [showGithubTooltip, setShowGithubTooltip] = useState(false);
    const [copied, setCopied] = useState(false);
    const email = "shinwonkkim@gmail.com";
    const githubUrl  = "https://github.com/shinwon-kim";
    const userLang = navigator.language.startsWith("ko") ? "ko" : "en";

    const handleCopy = () => {
        navigator.clipboard.writeText(email).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2100);
        })
    }
    
    return(
        <div className="fixed bottom-10 flex flex-col gap-3 lg:gap-4 right-2 md:right-3 lg:right-8 xl:right-32">
            {/* 이메일 아이콘 */}
            <div 
                className="relative"
                onMouseEnter={() => setShowEmailTooltip(true)}
                onMouseLeave={() =>{
                    setShowEmailTooltip(false);
                    setCopied(false);
                }}
            >
                {showEmailTooltip && (
                    <div className="absolute top-1/2 -translate-y-1/2 right-12 lg:right-15 bg-black/75 text-white text-xs px-2 py-1 rounded shadow-lg mb-1 whitespace-nowrap">
                        {copied ? userLang === "ko" ? "이메일이 복사되었습니다": "Email copied!" : email}
                    </div>
                )}
                <button 
                    onClick={handleCopy}
                    className="w-10 h-10 sm:w-11 sm:h-11 lg:w-13 lg:h-13 bg-grayColor/80 rounded-full flex justify-center items-center hover:animate-pulse transition"
                >
                    <MdOutlineEmail className="text-2xl fill-navyColor"></MdOutlineEmail>
                </button>    

            </div>

            {/* 깃허브 아이콘 */}
            <div 
                className="relative"
                onMouseEnter={() => setShowGithubTooltip(true)}
                onMouseLeave={() =>{
                    setShowGithubTooltip(false);
                    setCopied(false);
                }}
            >
                {showGithubTooltip && (
                    <div className="absolute top-1/2 -translate-y-1/2 right-12 lg:right-15 bg-black/75 text-white text-xs px-2 py-1 rounded shadow-lg mb-1 whitespace-nowrap">
                        {"/shinwon-kim"}
                    </div>
                )}
                
                <a 
                    href={githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 sm:w-11 sm:h-11 lg:w-13 lg:h-13 bg-grayColor/80 rounded-full flex justify-center items-center hover:animate-pulse transition"
                >
                    <IoLogoGithub className="text-2xl fill-navyColor"></IoLogoGithub>
                </a>
            </div>
            
        </div>
    )
}

export default ContactBadge;