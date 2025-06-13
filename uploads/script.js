// Canvas Animation
let canvas, ctx;

function initCanvas() {
  canvas = document.getElementById('introduction-canvas');
  if (!canvas) return;
  ctx = canvas.getContext('2d');

  const nodes = [];
  const nodeCount = 25;
  const maxDist = 200;

  function resizeCanvas() {
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = Math.max(document.getElementById('introduction').offsetHeight, 400);
  }

  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(resizeCanvas, 100);
  });

  resizeCanvas();

  for (let i = 0; i < nodeCount; i++) {
    nodes.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 1,
      vy: (Math.random() - 0.5) * 1
    });
  }

  let animationFrameId;

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw connections
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < maxDist) {
          ctx.strokeStyle = `rgba(39,174,96,${1 - dist / maxDist})`;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
        }
      }
    }

    // Move nodes
    nodes.forEach(node => {
      node.x += node.vx;
      node.y += node.vy;
      if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
      if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

      ctx.beginPath();
      ctx.arc(node.x, node.y, 2, 0, 2 * Math.PI);
      ctx.fillStyle = '#27ae60';
      ctx.fill();
    });

    animationFrameId = requestAnimationFrame(animate);
  }

  animate();

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      cancelAnimationFrame(animationFrameId);
    } else {
      animate();
    }
  });
}

window.addEventListener('load', initCanvas);

// Modal Script
const modal = document.getElementById('modal');
const infoModal = document.getElementById('info-modal');
const getStartedBtn = document.getElementById('get-started-btn');
const logoTitle = document.getElementById('logo-title');
const closeButtons = document.querySelectorAll('.close-btn');

getStartedBtn.addEventListener('click', () => modal.style.display = 'block');
logoTitle.addEventListener('click', () => infoModal.style.display = 'block');

closeButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    modal.style.display = 'none';
    infoModal.style.display = 'none';
  });
});

window.addEventListener('click', e => {
  if (e.target === modal) modal.style.display = 'none';
  if (e.target === infoModal) infoModal.style.display = 'none';
});

window.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    modal.style.display = 'none';
    infoModal.style.display = 'none';
  }
});

// Tab Script
const tabLinks = document.querySelectorAll('.tab-link');
const tabContents = document.querySelectorAll('.tab-content');

tabLinks.forEach(link => {
  link.addEventListener('click', () => {
    tabLinks.forEach(l => l.classList.remove('active'));
    tabContents.forEach(c => c.classList.remove('active'));
    const tabId = link.getAttribute('data-tab');
    document.getElementById(tabId).classList.add('active');
    link.classList.add('active');
  });
});

document.querySelector('.tab-link').classList.add('active');
document.querySelector('.tab-content').classList.add('active');