const revealNodes = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealNodes.forEach((node, index) => {
    node.style.transitionDelay = `${index * 80}ms`;
    observer.observe(node);
  });
} else {
  revealNodes.forEach((node) => node.classList.add('is-visible'));
}

const mobileMedia = window.matchMedia('(max-width: 840px)');
const mobileScrollThreshold = 170;

function toggleMobileActions() {
  if (!mobileMedia.matches) {
    document.body.classList.remove('mobile-actions-visible');
    return;
  }

  const shouldShow = window.scrollY > mobileScrollThreshold;
  document.body.classList.toggle('mobile-actions-visible', shouldShow);
}

let scheduled = false;

function onViewportChange() {
  if (scheduled) {
    return;
  }

  scheduled = true;
  window.requestAnimationFrame(() => {
    toggleMobileActions();
    scheduled = false;
  });
}

window.addEventListener('scroll', onViewportChange, { passive: true });
window.addEventListener('resize', onViewportChange, { passive: true });
toggleMobileActions();

const fallbackImages = document.querySelectorAll('img[data-fallback]');

fallbackImages.forEach((img) => {
  img.addEventListener('error', () => {
    const fallbackSrc = img.dataset.fallback;
    if (fallbackSrc && img.src.indexOf(fallbackSrc) === -1) {
      img.src = fallbackSrc;
    }
  });
});
