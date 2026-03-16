import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ScrollStory = () => {
  const imageRef = useRef<HTMLImageElement>(null);

  // Load all frames from your folder
  const frames = Object.values(
    import.meta.glob(
      "../assets/ezgif-63b0b332ebec4ad4-jpg/ezgif-frame-*.jpg",
      { eager: true, import: "default" }
    )
  );

  const frameCount = frames.length;

  useEffect(() => {
    const img = imageRef.current;

    const obj = { frame: 0 };

    gsap.to(obj, {
      frame: frameCount - 1,
      snap: "frame",
      ease: "none",
      scrollTrigger: {
        scrub: true,
        start: "top top",
        end: "5000",
      },
      onUpdate: () => {
        if (img) {
          img.src = frames[Math.floor(obj.frame)] as string;
        }
      },
    });
  }, [frames]);

  return (
    <section className="relative h-[5000px] bg-black">
      <div className="sticky top-0 h-screen flex items-center justify-center">
        <img
          ref={imageRef}
          src={frames[0] as string}
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  );
};

export default ScrollStory;