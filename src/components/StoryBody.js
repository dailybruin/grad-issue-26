import "./StoryBody.css";

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
          {/* TITLE */}
          <h2 className="section-title">{chunk.title}</h2>

          {/* IMAGES */}
          {chunk.images.length > 0 && (
            <div className="image-pair">
              {chunk.images.map((src, i) => (
                <div key={i} className="image-pair__item">
                  <img src={src} alt={`${chunk.title} ${i + 1}`} />
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
          {chunk.video && (
            <div className="video-embed">
              <iframe
                src={chunk.video}
                title={`${chunk.title} video`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}
        </article>
      ))}
    </section>
  );
}