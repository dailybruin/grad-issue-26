import { useEffect, useRef, useState } from "react";
import "./Landing.css";
import StoryBody from "./StoryBody";

export default function Scrollytelling({ amlData }) {
  const [heroStep, setHeroStep] = useState(0); // 0 = title, 1 = intro blurb
  const [activeIndex, setActiveIndex] = useState(0);

  const introItem = amlData.Scroll_sequence[0].value;
  const buildings = amlData.Scroll_sequence.slice(1).map(item => item.value);

  // Observer for hero steps (title vs intro blurb)
  useEffect(() => {
    const steps = document.querySelectorAll(".hero-step");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setHeroStep(Number(entry.target.dataset.index));
          }
        });
      },
      { threshold: 0, rootMargin: "-40% 0px -59% 0px" }
    );
    steps.forEach(step => observer.observe(step));
    return () => observer.disconnect();
  }, []);

  // Observer for 4 buildings
  useEffect(() => {
    const steps = document.querySelectorAll(".scroll-step");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveIndex(Number(entry.target.dataset.index));
          }
        });
      },
      { threshold: 0, rootMargin: "-40% 0px -59% 0px" }
    );
    steps.forEach(step => observer.observe(step));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="scrollytelling">

      {/* ── SECTION 1: HERO + INTRO (same sticky background) ── */}
      <div className="hero-sticky-wrapper" id="title">
        <div className="hero-sticky">

          {/* background collage — stays put the whole time */}
          <img
            src={amlData.background_image}
            alt={amlData.background_image_alt}
            className="hero-img"
          />
          <div className="hero-overlay-dim" />

          {/* title + byline — fade out when intro blurb appears */}
          <div className={`hero-text ${heroStep === 1 ? "hidden" : ""}`}>
            <h1 className="hero-title">{amlData.headline}</h1>
            <p className="hero-byline">{amlData.byline}</p>
          </div>

          {/* intro blurb — fades in on step 1 */}
          <div className={`blurb-card center ${heroStep === 1 ? "active" : ""}`}>
            <p className="blurb-text">{introItem.blurb}</p>
          </div>

        </div>

        {/* step 0: user lands, sees title */}
        <div className="hero-step" data-index="0" aria-hidden="true" />
        {/* step 1: scroll down, intro blurb fades in, title fades out */}
        <div className="hero-step" data-index="1" aria-hidden="true" />
      </div>

      {/* ── SECTION 2: 4 BUILDINGS ── */}
      <div className="scroll-container">
        <div className="sticky-scene">

          {buildings.map((b, i) => (
            <div key={i} className={`building-bg ${i === activeIndex ? "active" : ""}`}>
              <img src={b.image_desktop || b.image} alt={b.image_alt} />
            </div>
          ))}

          {buildings.map((b, i) => (
            <div key={i} className={`blurb-card ${i === activeIndex ? "active" : ""}`}>
              <h2 className="blurb-title">{b.title}</h2>
              <p className="blurb-text">{b.blurb}</p>
            </div>
          ))}

        </div>

        {buildings.map((b, i) => (
          <div key={i} className="scroll-step" data-index={i} aria-hidden="true" />
        ))}
      </div>

      {/* ── SECTION 3: REST OF ARTICLE ── */}
      <StoryBody amlData={amlData} />

    </div>
  );
}