import "./Credits.css";

const GROUP_LABELS = {
  developers: "Developers",
  designers: "Designers",
  photographers: "Photographers",
  videographers: "Videographers",
  illustrators: "Illustrators",
};

const WORD_TO_NUM = {
  one: 1, two: 2, three: 3, four: 4, five: 5,
  six: 6, seven: 7, eight: 8, nine: 9, ten: 10,
};

function parseMembersFromGroup(group) {
  const members = [];

  Object.keys(group)
    .filter((key) => key.startsWith("name_"))
    .sort((a, b) => {
      const aNum = WORD_TO_NUM[a.replace("name_", "")] ?? 99;
      const bNum = WORD_TO_NUM[b.replace("name_", "")] ?? 99;
      return aNum - bNum;
    })
    .forEach((key) => {
      const word = key.replace("name_", "");
      members.push({
        name: group[key],
        position: group[`position_${word}`] || "",
      });
    });

  return members;
}

export default function TeamCredits({ amlData }) {
  if (!amlData?.credits) return null;

  const credits = amlData.credits;

  return (
    <section id = "about" className="team-credits">
      {credits.map((item, idx) => {
        const groupKey = item.type;
        const label = GROUP_LABELS[groupKey] || groupKey;
        const members = parseMembersFromGroup(item.value);

        return (
          <div key={idx} className="team-group">
            <h2 className="team-group__title">{label}</h2>
            <div className="team-grid">
              {members.map((member, i) => (
                <div className="team-card" key={i}>
                  <p className="team-card__name">{member.name}</p>
                  <p className="team-card__position">{member.position}</p>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </section>
  );
}