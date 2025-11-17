const newsData = [
  {
    title: "Global Markets Surge Amid Tech Rally",
    img: "https://images.unsplash.com/photo-1518779578993-ec3579fee39f",
    desc: "Stock markets worldwide experienced a significant boost today as major tech companies reported record profits."
  },
  {
    title: "New AI Breakthrough Announced",
    img: "https://images.unsplash.com/photo-1581091012184-5c1d5f99ed5a",
    desc: "Researchers have developed an advanced AI system capable of understanding human emotions with surprising accuracy."
  },
  {
    title: "Sports Update: Championship Finals Tonight",
    img: "https://images.unsplash.com/photo-1517649763962-0c623066013b",
    desc: "Fans are gearing up for one of the most anticipated games of the decade as two top teams face off in the finals."
  }
];

const container = document.getElementById("news-container");

newsData.forEach(article => {
  const card = document.createElement("div");
  card.className = "card";

  card.innerHTML = `
    <img src="${article.img}" alt="news image">
    <h3>${article.title}</h3>
    <p>${article.desc}</p>
  `;

  container.appendChild(card);
});
