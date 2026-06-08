import { useState } from "react";
import "./StoryBody.css";

// Extract YouTube video ID from various URL formats
function getYouTubeId(url) {
  if (!url) return null;
  // If it's already just an ID (11 chars, no slashes), return as-is
  if (/^[a-zA-Z0-9_-]{11}$/.test(url)) return url;
  // Otherwise try to parse from full URL
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  return match ? match[1] : null;
}

function VideoEmbed({ src, title }) {
  const [playing, setPlaying] = useState(false);
  const ytId = getYouTubeId(src);

  // YouTube video
  if (ytId) {
    const thumbnail = `https://img.youtube.com/vi/${ytId}/maxresdefault.jpg`;
    return (
      <div className="video-embed">
        {playing ? (
          <iframe
            src={`https://www.youtube.com/embed/${ytId}?autoplay=1`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <div
            className="video-embed__thumbnail"
            onClick={() => setPlaying(true)}
            role="button"
            aria-label={`Play ${title}`}
          >
            <img src={thumbnail} alt={`${title} thumbnail`} />
            <div className="video-embed__play-btn" aria-hidden="true">▶</div>
          </div>
        )}
      </div>
    );
  }

  // Fallback: Drive embed or any other iframe src (keeps old videos working)
  return (
    <div className="video-embed">
      <iframe
        src={src}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}

export default function StoryBody({ amlData }) {
  if (!amlData?.article_sections) return null;

  const sections = amlData.article_sections;

  const chunks = [];
  let currentChunk = null;

  sections.forEach((item) => {
    if (item.type !== "text") {
      if (currentChunk) chunks.push(currentChunk);
      currentChunk = {
        title: item.value.section_title,
        images: [item.value.image_one, item.value.image_two].filter(Boolean),
        video: item.value.video || null,
        caption: item.value.caption || null,
        paragraphs: [],
      };
    } else if (currentChunk) {
      currentChunk.paragraphs.push(item.value);
    }
  });

  if (currentChunk) chunks.push(currentChunk);

  return (
    <section className="story-body">
      {chunks.map((chunk, idx) => (
        <article
          key={idx}
          className="story-section"
          id={chunk.title.toLowerCase().replace(/\s+/g, "-")}
        >
          <h2 className="section-title">{chunk.title}</h2>

          {chunk.images.length > 0 && (
            <div className="image-pair">
              {chunk.images.map((src, i) => (
                <div key={i} className="image-pair__item">
                  <img src={src} alt={`${chunk.title} ${i + 1}`} />
                </div>
              ))}
            </div>
          )}

          <div className="story-text">
            {chunk.paragraphs.map((paragraph, i) => (
              <p key={i} className="story-paragraph">
                {paragraph}
              </p>
            ))}
          </div>

          {chunk.video && (
            <VideoEmbed src={chunk.video} title={`${chunk.title} video`} />
          )}

          {chunk.caption && (
            <p className="story-caption">{chunk.caption}</p>
          )}
        </article>
      ))}
    </section>
  );
}