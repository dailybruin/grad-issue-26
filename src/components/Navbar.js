import "./Navbar.css";
import { useEffect, useRef } from "react";

const NAV_LINKS = [
    {label: "Title", id: "title"},
    {label: "Royce", id: "royce-hall"},
    {label: "Powell", id: "powell-library"},
    {label: "Geffen", id: "david-geffen-school-of-medicine"},
    {label: "Kerckhoff", id: "kerckhoff-hall"},
];

export default function Navbar() {
    const navRef = useRef(null);

    useEffect(() => {
        const header = document.querySelector("header") // or whatever your Header's element is;
        if (header && navRef.current) {
        const headerHeight = header.getBoundingClientRect().height;
        navRef.current.style.top = `${headerHeight}px`;
        }
    }, []);

    const handleClick = (e, id) => {
        e.preventDefault();

        const el = document.getElementById(id);
        if (!el) return;

        const scrollContainer = document.querySelector(".scroll-container");
        const navbar = document.querySelector(".navbar");
        const header = document.getElementById("db-header");
        const offset = (navbar?.offsetHeight || 0) + (header?.offsetHeight || 0);
        const currentScrollY = window.scrollY;

        if (scrollContainer) {
            const containerTop = scrollContainer.getBoundingClientRect().top + currentScrollY;
            const containerBottom = scrollContainer.getBoundingClientRect().bottom + currentScrollY;
            const userIsInsideContainer = currentScrollY >= containerTop && currentScrollY <= containerBottom;
            const targetIsInStoryBody = !!el.closest(".story-body, .story-section");
            const targetY = el.getBoundingClientRect().top + currentScrollY - offset;

           if (targetIsInStoryBody) {
                if (userIsInsideContainer || currentScrollY < containerTop) {
                    // Only do the instant jump if target is actually below where we'd land
                    if (targetY - window.innerHeight > currentScrollY) {
                    window.scrollTo({ top: targetY - window.innerHeight, behavior: "instant" });
                    }
                }
                requestAnimationFrame(() => {
                    window.scrollTo({ top: targetY, behavior: "smooth" });
                });
            } else {
                // Don't do jump to second screen if we're already on title card
                if (window.scrollY > window.innerHeight) {
                    window.scrollTo({ top: window.innerHeight, behavior: "instant" });
                }
                requestAnimationFrame(() => {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                });
            }
        }
    };

    return (
        <nav className="navbar">
            <ul className="nav-list">
                {NAV_LINKS.map(({label, id}) => (
                    <li key={id} className="nav-item">
                        <a href={`#${id}`}
                        className = "nav-link"
                        onClick={(e) => handleClick(e, id)}
                        >
                        {label}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}