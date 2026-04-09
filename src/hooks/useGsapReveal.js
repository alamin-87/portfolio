import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Reveals elements with class `.gsap-reveal` on scroll.
 * Optionally pass a container ref to scope the animation.
 */
export default function useGsapReveal(containerRef) {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".gsap-reveal").forEach((el) => {
        gsap.from(el, {
          y: 60,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            end: "top 50%",
            toggleActions: "play none none reverse",
          },
        });
      });

      gsap.utils.toArray(".gsap-reveal-left").forEach((el) => {
        gsap.from(el, {
          x: -80,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            end: "top 50%",
            toggleActions: "play none none reverse",
          },
        });
      });

      gsap.utils.toArray(".gsap-reveal-right").forEach((el) => {
        gsap.from(el, {
          x: 80,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            end: "top 50%",
            toggleActions: "play none none reverse",
          },
        });
      });

      // Staggered children reveals
      gsap.utils.toArray(".gsap-stagger-parent").forEach((parent) => {
        const children = parent.querySelectorAll(".gsap-stagger-child");
        gsap.from(children, {
          y: 40,
          opacity: 0,
          duration: 0.6,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: parent,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [containerRef]);
}
