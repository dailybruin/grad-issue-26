import { useEffect, useRef, useState } from "react";
import "./Landing.css";
import StoryBody from "./StoryBody";

export default function Scrollytelling({amlData}) {
  const [activeIndex, setActiveIndex] = useState(0); // -1 = hero visible
  const stepsRef = useRef([]);
  

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const i = Number(entry.target.dataset.index);

            setActiveIndex(i);
          }
        });
      },
      { threshold: 0,
        rootMargin: "-40% 0px -59% 0px"
       }
    );

    const steps = document.querySelectorAll(".scroll-step");
    steps.forEach((step) => observer.observe(step));

    return () => observer.disconnect();
  }, []);

  const buildings = amlData.Scroll_sequence.map((item) => item.value);

  const activeBuilding = activeIndex >= 0 ? buildings[activeIndex] : null;

  return (
    <div className="scrollytelling">

      {/* ── HERO ── */}
      <section className="hero" id = "title">
        <img
          src={amlData.background_image}
          alt={amlData.background_image_alt}
          className="hero-img"
        />
        <div className="hero-overlay">
          <h1 className="hero-title">{amlData.headline}</h1>
          <p className="hero-byline">
            {amlData.byline}
          </p>
        </div>
      </section>

      {/* ── SCROLLYTELLING SECTION ── */}
      <div className="scroll-container">

        {/* sticky scene — stays on screen while user scrolls */}
        <div className="sticky-scene">
  
           {/* full background images — all stacked, active one shows */}
            {buildings.map((b, i) => (
                <div
                key={i}
                className={`building-bg ${i === activeIndex ? "active" : ""}`}
                >
                  {activeIndex === 0 && (
                  <div className="intro-overlay" />
                  )}
                <img src={b.image || b.image_desktop} alt={b.image_alt} />
            </div>
            ))}    

            {/* blurb overlaid on top right */}
                {buildings.map((b, i) => (
                <div
                    key={i}
                    className={`blurb-card ${i === activeIndex ? "active" : ""} ${i === 0 ? "center" : ""}`}
                >
                <h2 className="blurb-title">{b.title}</h2>
                <p className="blurb-text">{b.blurb}</p>
                </div>
            ))}

        </div>

        {/* invisible scroll spacers — one per building */}
        {buildings.map((b, i) => (
          <div
            key={i}
            className={`scroll-step`}
            data-index={i}
            aria-hidden="true"
          />
        ))}

      </div>

      {/* ── REST OF STORY CONTINUES BELOW ── 
        MOVE STORY CHUNKS TO DIFF FILES */}
    </div>
  );
}
