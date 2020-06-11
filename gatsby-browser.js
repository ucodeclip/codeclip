require("prismjs/themes/prism-solarizedlight.css");

export const onClientEntry = async () => {
  if (!(`IntersectionObserver` in window)) {
    await import(`intersection-observer`);
  }
}