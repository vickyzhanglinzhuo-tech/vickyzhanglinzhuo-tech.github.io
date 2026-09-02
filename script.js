const nav = document.querySelector(".nav");

const onScroll = () => {
  nav.style.borderBottomColor =
    window.scrollY > 12 ? "rgba(239, 232, 220, 0.18)" : "rgba(239, 232, 220, 0.12)";
};

window.addEventListener("scroll", onScroll, { passive: true });
onScroll();
