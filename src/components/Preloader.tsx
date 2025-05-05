import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const Preloader = ({ onLoaded }: { onLoaded: () => void }) => {
  const [percent, setPercent] = useState(0);
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 숫자 애니메이션
    gsap.to({ val: 0 }, {
      val: 100,
      duration: 5,
      ease: "power2.out",
      onUpdate: function () {
        setPercent(Math.floor(this.targets()[0].val));
      },
      onComplete: () => {
        // 로딩 끝 → 로딩화면 숨기기
        gsap.to(loaderRef.current, {
          opacity: 0,
          duration: 0.8,
          onComplete: onLoaded
        });
      }
    });
  }, [onLoaded]);

  return (
    <div ref={loaderRef} className="fixed inset-0 bg-[#0061FF] text-white flex items-center justify-center z-50">
      <div className="text-4xl font-bold">
        {percent}%
      </div>
    </div>
  );
};

export default Preloader;
