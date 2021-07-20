require("prismjs/themes/prism-solarizedlight.css");

// IntersectionObserver polyfill (Safari, IE)
export const onClientEntry = async () => {
  if (typeof IntersectionObserver === `undefined`) {
    await import(`intersection-observer`);
  }
};
