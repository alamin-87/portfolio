import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);
  const [hovering, setHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;

    const moveCursor = (e) => {
      // Small core dot follows mouse closely
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power2.out",
      });
      // Larger trailing ring has more "inertia"
      gsap.to(follower, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.35,
        ease: "power3.out",
      });
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const addHover = () => setHovering(true);
    const removeHover = () => setHovering(false);

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    // Watch for hoverable elements
    const updateTargets = () => {
      const hoverTargets = document.querySelectorAll(
        "a, button, .magnetic-btn, [data-cursor-hover], input, textarea"
      );
      hoverTargets.forEach((el) => {
        el.addEventListener("mouseenter", addHover);
        el.addEventListener("mouseleave", removeHover);
      });
    };
    
    updateTargets();
    
    // Check for new elements if project re-renders
    const observer = new MutationObserver(updateTargets);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className={`custom-cursor-core ${isClicking ? "clicking" : ""}`}
      />
      <div
        ref={followerRef}
        className={`custom-cursor-follower ${hovering ? "hovering" : ""} ${
          isClicking ? "clicking" : ""
        }`}
      />
    </>
  );
}
