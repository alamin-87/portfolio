import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Splits text into individual characters and animates them in.
 * Good for headings and hero text.
 */
export default function TextReveal({
  children,
  className = "",
  as: Tag = "h1",
  delay = 0,
  stagger = 0.03,
  useScrollTrigger = false,
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const text = el.textContent;
    el.innerHTML = "";

    // Create word spans
    const words = text.split(" ");
    words.forEach((word, wi) => {
      const wordSpan = document.createElement("span");
      wordSpan.style.display = "inline-block";
      wordSpan.style.whiteSpace = "nowrap";

      [...word].forEach((char) => {
        const charSpan = document.createElement("span");
        charSpan.textContent = char;
        charSpan.style.display = "inline-block";
        charSpan.classList.add("char-reveal");
        wordSpan.appendChild(charSpan);
      });

      el.appendChild(wordSpan);

      // Add space between words
      if (wi < words.length - 1) {
        const space = document.createElement("span");
        space.innerHTML = "&nbsp;";
        space.style.display = "inline-block";
        el.appendChild(space);
      }
    });

    const chars = el.querySelectorAll(".char-reveal");

    const animConfig = {
      y: 50,
      opacity: 0,
      rotationX: -60,
      duration: 0.8,
      stagger: stagger,
      ease: "back.out(1.7)",
      delay: delay,
    };

    if (useScrollTrigger) {
      gsap.from(chars, {
        ...animConfig,
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    } else {
      gsap.from(chars, animConfig);
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === el) t.kill();
      });
    };
  }, [children, delay, stagger, useScrollTrigger]);

  return (
    <Tag ref={containerRef} className={className} style={{ perspective: 400 }}>
      {children}
    </Tag>
  );
}
