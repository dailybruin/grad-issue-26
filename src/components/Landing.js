import { useEffect, useRef, useState } from "react";
import "./Landing.css";
import StoryBody from "./StoryBody";

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(null); 

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint}px)`);
    setIsMobile(mq.matches);
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [breakpoint]);

  return isMobile;
}

export default function Scrollytelling({ amlData }) {
  const [heroStep, setHeroStep] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const isMobile = useIsMobile();

  const introItem = amlData.Scroll_sequence[0].value;
  const buildings = amlData.Scroll_sequence.slice(1).map((item) => item.value);

  useEffect(() => {
    const steps = document.querySelectorAll(".hero-step");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setHeroStep(Number(entry.target.dataset.index));
          }
        });
      },
      { threshold: 0, rootMargin: "-40% 0px -59% 0px" }
    );
    steps.forEach((step) => observer.observe(step));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const steps = document.querySelectorAll(".scroll-step");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveIndex(Number(entry.target.dataset.index));
          }
        });
      },
      { threshold: 0, rootMargin: "-40% 0px -59% 0px" }
    );
    steps.forEach((step) => observer.observe(step));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="scrollytelling">

      <div className="hero-sticky-wrapper" id="title">
        <div className="hero-sticky">
          <img
            src={amlData.background_image}
            alt={amlData.background_image_alt}
            className="hero-img"
          />
          <div className="hero-overlay-dim" />

          <div className={`hero-text ${heroStep === 1 ? "hidden" : ""}`}>
            <h1 className="hero-title">{amlData.headline}</h1>
            <p className="hero-byline">{amlData.byline}</p>
            <p className="scroll-prompt">Scroll to continue</p>
          </div>

          <div className={`blurb-card center ${heroStep === 1 ? "active" : ""}`}>
            <p className="blurb-text">{introItem.blurb}</p>
          </div>
        </div>

        <div className="hero-step" data-index="0" aria-hidden="true" />
        <div className="hero-step" data-index="1" aria-hidden="true" />
      </div>

      <div className="scroll-container">
        <div className="sticky-scene">

          {buildings.map((b, i) => (
            <div
              key={i}
              className={`building-bg ${i === activeIndex ? "active" : ""}`}
            >
              <img
                src={
                  (isMobile === true)
                    ? (b.image_mobile || b.image_desktop)
                    : (b.image_desktop)
                }
                alt={b.image_alt}
              />
            </div>
          ))}

          {buildings.map((b, i) => (
            <div
              key={i}
              className={`blurb-card ${i === activeIndex ? "active" : ""}`}
            >
              <h2 className="blurb-title">{b.title}</h2>
              <p className="blurb-text">{b.blurb}</p>
            </div>
          ))}

        </div>

        {buildings.map((_, i) => (
          <div
            key={i}
            className="scroll-step"
            data-index={i}
            aria-hidden="true"
          />
        ))}
      </div>
    </div>
  );
}