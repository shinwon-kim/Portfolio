import { JSX, useState, useEffect, useCallback } from "react";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";

interface CarouselProps{
    slides: string[];
}

const Carousel = ({slides}: CarouselProps):JSX.Element => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const nextSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
      }, [slides.length]);

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    };

    const goToSlide = (index:number)=>{
        setCurrentSlide(index);
    };

    useEffect(() => {
        const interval = setInterval(() => {
          nextSlide();
        }, 6000); 
    
        return () => clearInterval(interval); 
    }, [nextSlide]); 

    return(
        <div className="relative flex justify-center items-center mx-5">
            <button type="button" onClick={prevSlide} className="cursor-pointer">
                <IoIosArrowDropleft className="text-navyColor text-xl"/>
            </button>

            <div className="w-full m-2 p-1 rounded-5 overflow-hidden">
                <div className="flex transition-transform duration-700 ease-in-out" 
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                    {slides.map((src, index)=>(
                        <div key={index} className="w-full flex-shrink-0 ">
                           <img src={src} 
                                className="w-full h-[260px] lg:h-[290px] object-contain cursor-zoom-in"
                                onClick={() => {
                                    setSelectedImage(src);
                                    setIsModalOpen(true);
                                }}
                           />
                        </div>
                    ))}
                </div>
            </div>

            {isModalOpen && selectedImage && (
                <div 
                    className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
                    onClick={() => setIsModalOpen(false)}
                >
                    <img 
                        src={selectedImage} 
                        className="max-w-base lg:max-w-4xl max-h-[90vh] object-contain rounded-lg shadow-lg"
                        onClick={(e) => e.stopPropagation()} 
                    />
                </div>
            )}

            <button type="button" onClick={nextSlide} className="cursor-pointer">
                <IoIosArrowDropright className="text-navyColor text-xl" />
            </button>

            <div className="absolute z-30 flex -translate-x-1/2 -bottom-3 left-1/2 gap-3 p-2">
                {
                    slides.map((_,index)=>(
                        <button key={index} type="button" 
                            className={`w-2 h-2 rounded-full ${index === currentSlide ? "bg-navyColor/90 w-7" : "bg-navyColor/30"}`}
                            aria-current={index === currentSlide}
                            aria-label={`Slide ${index+1}`}
                            onClick={()=>goToSlide(index)}
                        />

                    ))
                }
            </div>
        </div>
    )
}

export default Carousel;