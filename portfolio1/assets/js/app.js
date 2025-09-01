// ===== Preferenze di movimento
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ===== Evidenzia link attivo in navbar
(() => {
  const path = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  document.querySelectorAll('a[data-nav]').forEach(a => {
    const href = (a.getAttribute('href') || '').toLowerCase();
    if (href === path) a.classList.add('nav-active');
  });
})();

// ===== Blob che segue il cursore (disattivato se reduced motion)
(() => {
  if (prefersReduced) return;
  const blob = document.getElementById('cursor-blob');
  if (!blob) return;
  let rafId = null;
  const onMove = (e) => {
    const { clientX: x, clientY: y } = e;
    if (rafId) cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(() => {
      blob.style.transform = `translate(${x}px, ${y}px)`;
    });
  };
  window.addEventListener('mousemove', onMove, { passive: true });
})();
