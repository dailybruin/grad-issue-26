import { useEffect, useRef, useState } from "react";
import "./Landing.css";
import hero from "../images/Desktop/hero-desktop.png";
import royceImg from "../images/Desktop/roycedesktop.png";
import kerckhoffImg from "../images/Desktop/kerchoffdesktop.png";
import powellImg from "../images/Desktop/powelldesktop.png";
import medicalImg from "../images/Desktop/medicalbuildingdesktop.png";

const buildings = [
  {
    id: 1,
    name: "Royce Hall",
    blurb: "Built in 1929, Royce Hall was one of the first four buildings on UCLA's Westwood campus, modeled after the Basilica of Sant'Ambrogio in Milan.",
    buildingImg: royceImg,
  },
  {
    id: 2,
    name: "Kerckhoff Hall",
    blurb: "Completed in 1931, Kerckhoff Hall has served as the heart of student life at UCLA for nearly a century.",
    buildingImg: kerckhoffImg,
  },
  {
    id: 3,
    name: "Powell Library",
    blurb: "Powell Library opened in 1929 as UCLA's first library, its rotunda dome becoming one of the most iconic silhouettes on campus.",
    buildingImg: powellImg,
  },
  {
    id: 4,
    name: "Medical Building",
    blurb: "Haines Hall, part of the original 1929 campus construction, reflects the Romanesque Revival architecture that defines UCLA's historic core.",
    buildingImg: medicalImg,
  },
];

export default function Scrollytelling() {
  const [activeIndex, setActiveIndex] = useState(-1); // -1 = hero visible
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
      { threshold: 0.3 }
    );

    const steps = document.querySelectorAll(".scroll-step");
    steps.forEach((step) => observer.observe(step));

    return () => observer.disconnect();
  }, []);

  const activeBuilding = buildings[activeIndex];

  return (
    <div className="scrollytelling">

      {/* ── HERO ── */}
      <section className="hero">
        <img
          src={hero}
          alt="UCLA campus aerial view"
          className="hero-img"
        />
        <div className="hero-overlay">
          <h1 className="hero-title">UCLA History, Brick by Brick</h1>
        </div>
      </section>

      {/* ── SCROLLYTELLING SECTION ── */}
      <div className="scroll-container">

        {/* sticky scene — stays on screen while user scrolls */}
        <div className="sticky-scene">
  
           {/* full background images — all stacked, active one shows */}
            {buildings.map((b, i) => (
                <div
                key={b.id}
                className={`building-bg ${i === activeIndex ? "active" : ""}`}
                >
                <img src={b.buildingImg} alt={b.name} />
            </div>
            ))}    

            {/* blurb overlaid on top right */}
                {buildings.map((b, i) => (
                <div
                    key={b.id}
                    className={`blurb-card ${i === activeIndex ? "active" : ""}`}
                >
                <span className="blurb-number">0{b.id}</span>
                <h2 className="blurb-title">{b.name}</h2>
                <p className="blurb-text">{b.blurb}</p>
                </div>
            ))}

        </div>

        {/* invisible scroll spacers — one per building */}
        {buildings.map((b, i) => (
          <div
            key={b.id}
            className="scroll-step"
            data-index={i}
            aria-hidden="true"
          />
        ))}

        <div className="scroll-step" aria-hidden="true" />
      </div>

      {/* ── REST OF STORY CONTINUES BELOW ── */}
      <section className="story-body">
        <p>Story content continues here...</p>
      </section>

    </div>
  );
}