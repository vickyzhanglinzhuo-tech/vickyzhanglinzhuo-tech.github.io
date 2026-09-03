const nav = document.querySelector(".nav");

const onScroll = () => {
  nav.style.borderBottomColor =
    window.scrollY > 12 ? "rgba(176, 122, 138, 0.32)" : "rgba(176, 122, 138, 0.22)";
};

window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

const track = document.querySelector(".project-track");
const cards = [...document.querySelectorAll(".project")];

if (track && cards.length) {
  const setActive = () => {
    const mid = track.getBoundingClientRect().left + track.clientWidth / 2;
    let best = cards[0];
    let bestDist = Infinity;

    cards.forEach((card) => {
      const rect = card.getBoundingClientRect();
      const dist = Math.abs(rect.left + rect.width / 2 - mid);
      if (dist < bestDist) {
        bestDist = dist;
        best = card;
      }
    });

    cards.forEach((card) => {
      card.classList.toggle("is-active", card === best);
    });

    const index = cards.indexOf(best);
    document.querySelectorAll(".project-timeline-points li").forEach((item, i) => {
      item.classList.toggle("is-current", i === index);
    });
    const fill = document.querySelector(".project-timeline-fill");
    if (fill && cards.length > 1) {
      fill.style.width = `${(index / (cards.length - 1)) * 100}%`;
    }
  };

  const go = (dir) => {
    const index = cards.findIndex((card) => card.classList.contains("is-active"));
    const next = cards[Math.min(cards.length - 1, Math.max(0, index + dir))];
    next.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  };

  const featured = document.querySelector(".project-featured") || cards[2] || cards[0];

  const revealFeatured = () => {
    featured.scrollIntoView({ inline: "center", block: "nearest" });
    setActive();
  };

  track.addEventListener("scroll", setActive, { passive: true });
  window.addEventListener("resize", setActive);

  document.querySelectorAll(".project-arrow").forEach((button) => {
    button.addEventListener("click", () => go(Number(button.dataset.dir)));
  });

  document.querySelectorAll(".project-timeline-points button").forEach((button) => {
    button.addEventListener("click", () => {
      const index = Number(button.dataset.index);
      cards[index]?.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    });
  });

  revealFeatured();
  requestAnimationFrame(revealFeatured);
  window.addEventListener("load", revealFeatured);
}
