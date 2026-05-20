import { useEffect, useRef, useState } from "react";
import "./Landing.css";
import hero from "../images/Desktop/hero-desktop.png";
import royceImg from "../images/Desktop/roycedesktop.png";
import kerckhoffImg from "../images/Desktop/kerchoffdesktop.png";
import powellImg from "../images/Desktop/powelldesktop.png";
import medicalImg from "../images/Desktop/medicalbuildingdesktop.png";

const buildings = [
   {
    id: 0,
    name: "",
    blurb: "In comparison with other universities across the nation, UCLA stands on its own architecturally, boasting global movements and influences ranging from Gothic to Mediterranean, Classical to Modern. But behind these remains UCLA’s core, Romanesque heart. What stories can be told in comparing campus’ original architectural purpose with its modern direction?",
    buildingImg: hero,
   }, 
  {
    id: 1,
    name: "Royce Hall",
    blurb: "Royce Hall was built in the Lombard Romanesque-style architecture dating back to 10th-century Europe – a choice made in response to the contemporary 20th-century Gothic revival.",
    buildingImg: royceImg,
  },
  {
    id: 2,
    name: "Powell Library",
    blurb: "Just like Royce Hall, Powell Library was inspired by Milan’s Basilica of Sant’Ambrogio. The pair’s arrangement in Dickson Plaza is even reminiscent of monastic traditions.",
    buildingImg: powellImg,
  },
  {
    id: 3,
    name: "Kerckhoff Hall",
    blurb: "In 1931, Kerckhoff Hall’s Gothic revival style was chosen to evoke a castlelike atmosphere for students, while honoring its founder with equally-Gothic stained glass elements",
    buildingImg: kerckhoffImg,
  },
  {
    id: 4,
    name: "David Geffen School of Medicine",
    blurb: "Before its 1971 completion, the David Geffen School of Medicine had already been hailed in 1951 as the first modern medical center of the atomic age.",
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
                    className={`blurb-card ${i === activeIndex ? "active" : ""} ${i === 0 ? "center" : ""}`}
                >
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

        <div
            className="scroll-step"
            data-index={buildings.length}
            aria-hidden="true"
        />
      </div>

      {/* ── REST OF STORY CONTINUES BELOW ── */}
      <section className="story-body">
        <p>Story content continues here...</p>
      </section>

    </div>
  );
}