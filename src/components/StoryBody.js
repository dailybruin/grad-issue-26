import "./StoryBody.css";

// Temporary hardcoded video
const DUMMY_VIDEO =
  "https://www.youtube.com/embed/w6uX9jamcwQ";

  
export default function StoryBody({ amlData }) {
  if (!amlData?.article_sections) return null;

  const sections = amlData.article_sections;

  // Build section chunks
  const chunks = [];
  let currentChunk = null;

  sections.forEach((item) => {
    // Building section start
    if (item.type !== "text") {
      // Push previous section
      if (currentChunk) {
        chunks.push(currentChunk);
      }

      // Start new section
      currentChunk = {
        title: item.value.section_title,
        images: [
          item.value.image_one,
          item.value.image_two,
        ].filter(Boolean),
        paragraphs: [],
      };
    }

    // Body paragraph
    else if (currentChunk) {
      currentChunk.paragraphs.push(item.value);
    }
  });

  // Push final chunk
  if (currentChunk) {
    chunks.push(currentChunk);
  }

  return (
    <section className="story-body">
      {chunks.map((chunk, idx) => (
        <article key={idx} className="story-section" id = {chunk.title.toLowerCase().replace(/\s+/g, '-')}> {/* Add id based on title */}
          {/* TITLE */}
          <h2 className="section-title">{chunk.title}</h2>

          {/* IMAGES */}
          {chunk.images.length > 0 && (
            <div className="image-pair">
              {chunk.images.map((src, i) => (
                <div key={i} className="image-pair__item">
                  <img
                    src={src}
                    alt={`${chunk.title} ${i + 1}`}
                  />
                </div>
              ))}
            </div>
          )}

          {/* PARAGRAPHS */}
          <div className="story-text">
            {chunk.paragraphs.map((paragraph, i) => (
              <p key={i} className="story-paragraph">
                {paragraph}
              </p>
            ))}
          </div>

          {/* VIDEO */}
          <div className="video-embed">
            <iframe
              src={DUMMY_VIDEO}
              title={`${chunk.title} video`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </article>
      ))}
    </section>
  );
}