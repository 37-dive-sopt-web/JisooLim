const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const isCoarsePointer = window.matchMedia('(pointer: coarse)');

if (!isCoarsePointer.matches && !prefersReducedMotion.matches) {
    const sparkleLayer = document.createElement('div');
    sparkleLayer.className = 'cursor-sparkle-layer';
    sparkleLayer.setAttribute('aria-hidden', 'true');
    document.body.appendChild(sparkleLayer);

    const sparkleThemes = [
        {
            gradient: 'radial-gradient(circle at center, rgba(255, 255, 255, 0.9) 0%, rgba(174, 255, 197, 0.75) 45%, rgba(34, 197, 94, 0.35) 100%)',
            shadow: '0 0 1.8rem rgba(34, 197, 94, 0.45)'
        },
        {
            gradient: 'radial-gradient(circle at center, rgba(255, 255, 255, 0.9) 0%, rgba(255, 200, 200, 0.75) 45%, rgba(239, 68, 68, 0.35) 100%)',
            shadow: '0 0 1.8rem rgba(239, 68, 68, 0.45)'
        },
        {
            gradient: 'radial-gradient(circle at center, rgba(255, 255, 255, 0.9) 0%, rgba(174, 255, 197, 0.7) 35%, rgba(239, 68, 68, 0.4) 100%)',
            shadow: '0 0 1.8rem rgba(80, 200, 120, 0.45)'
        }
    ];

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

        sparkleLayer.appendChild(sparkle);
        sparkle.addEventListener('animationend', () => {
            sparkle.remove();
        });
    };

    let lastSparkleTime = 0;
    const sparkleInterval = 55;

    window.addEventListener('mousemove', (event) => {
        const now = performance.now();
        if (now - lastSparkleTime > sparkleInterval) {
            spawnSparkle(event.clientX, event.clientY);
            lastSparkleTime = now;
        }
    });

    window.addEventListener('mousedown', (event) => {
        for (let i = 0; i < 3; i += 1) {
            spawnSparkle(event.clientX, event.clientY);
        }
    });

    window.addEventListener('mouseleave', () => {
        sparkleLayer.innerHTML = '';
    });
}
