const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const isCoarsePointer = window.matchMedia('(pointer: coarse)');

const sparkleThemes = [
  {
    gradient:
      'radial-gradient(circle at center, rgba(255, 255, 255, 0.9) 0%, rgba(174, 255, 197, 0.75) 45%, rgba(34, 197, 94, 0.35) 100%)',
    shadow: '0 0 1.8rem rgba(34, 197, 94, 0.45)',
  },
  {
    gradient:
      'radial-gradient(circle at center, rgba(255, 255, 255, 0.9) 0%, rgba(255, 200, 200, 0.75) 45%, rgba(239, 68, 68, 0.35) 100%)',
    shadow: '0 0 1.8rem rgba(239, 68, 68, 0.45)',
  },
  {
    gradient:
      'radial-gradient(circle at center, rgba(255, 255, 255, 0.9) 0%, rgba(174, 255, 197, 0.7) 35%, rgba(239, 68, 68, 0.4) 100%)',
    shadow: '0 0 1.8rem rgba(80, 200, 120, 0.45)',
  },
];

let teardownSparkles = null;

const activateSparkles = () => {
  if (teardownSparkles) return;

  const layer = document.createElement('div');
  layer.className = 'cursor-sparkle-layer';
  layer.setAttribute('aria-hidden', 'true');
  document.body.appendChild(layer);

  const spawnSparkle = (x, y) => {
    const sparkle = document.createElement('span');
    sparkle.className = 'cursor-sparkle';
    const size = 6 + Math.random() * 8;
    const angle = Math.random() * Math.PI * 2;
    const distance = 12 + Math.random() * 14;
    const tx = Math.cos(angle) * distance;
    const ty = Math.sin(angle) * distance;
    const scale = 1 + Math.random() * 0.4;
    const theme = sparkleThemes[Math.floor(Math.random() * sparkleThemes.length)];

    sparkle.style.width = `${size}px`;
    sparkle.style.height = `${size}px`;
    sparkle.style.left = `${x}px`;
    sparkle.style.top = `${y}px`;
    sparkle.style.setProperty('--sparkle-tx', `${tx}px`);
    sparkle.style.setProperty('--sparkle-ty', `${ty}px`);
    sparkle.style.setProperty('--sparkle-scale', `${scale}`);
    sparkle.style.background = theme.gradient;
    sparkle.style.boxShadow = theme.shadow;

    layer.appendChild(sparkle);
    sparkle.addEventListener(
      'animationend',
      () => {
        sparkle.remove();
      },
      { once: true },
    );
  };

  let lastSparkleTime = 0;
  const interval = 55;

  const handleMove = (event) => {
    const now = performance.now();
    if (now - lastSparkleTime > interval) {
      spawnSparkle(event.clientX, event.clientY);
      lastSparkleTime = now;
    }
  };

  const handleDown = (event) => {
    for (let i = 0; i < 3; i += 1) {
      spawnSparkle(event.clientX, event.clientY);
    }
  };

  const handleLeave = () => {
    layer.replaceChildren();
  };

  window.addEventListener('mousemove', handleMove);
  window.addEventListener('mousedown', handleDown);
  window.addEventListener('mouseleave', handleLeave);

  teardownSparkles = () => {
    window.removeEventListener('mousemove', handleMove);
    window.removeEventListener('mousedown', handleDown);
    window.removeEventListener('mouseleave', handleLeave);
    layer.replaceChildren();
    layer.remove();
    teardownSparkles = null;
  };
};

const deactivateSparkles = () => {
  if (teardownSparkles) {
    teardownSparkles();
  }
};

const shouldEnableSparkles = () =>
  !prefersReducedMotion.matches && !isCoarsePointer.matches && !document.hidden;

const refreshSparkles = () => {
  if (shouldEnableSparkles()) {
    activateSparkles();
  } else {
    deactivateSparkles();
  }
};

const watchMedia = (query) => {
  const handler = () => refreshSparkles();
  if (typeof query.addEventListener === 'function') {
    query.addEventListener('change', handler);
  } else if (typeof query.addListener === 'function') {
    query.addListener(handler);
  }
};

watchMedia(prefersReducedMotion);
watchMedia(isCoarsePointer);
document.addEventListener('visibilitychange', refreshSparkles);

refreshSparkles();
