// Vertical percentage root margins are relative to viewport width, not height.
// Use pixels and rebuild only when the viewport changes.
export function observeViewportBand(
  targets: Element[],
  callback: IntersectionObserverCallback,
  top: number,
  bottom: number,
) {
  let observer: IntersectionObserver;
  const observe = () => {
    observer?.disconnect();
    observer = new IntersectionObserver(callback, {
      rootMargin: `${-innerHeight * top}px 0px ${-innerHeight * bottom}px 0px`,
    });
    targets.forEach(target => observer.observe(target));
  };
  observe();
  addEventListener("resize", observe);
  return () => {
    observer.disconnect();
    removeEventListener("resize", observe);
  };
}
