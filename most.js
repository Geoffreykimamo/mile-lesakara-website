
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').style.opacity = '0';
    document.getElementById('loader').style.pointerEvents = 'none';
    document.getElementById('main-content').style.opacity = '1';
    
    setTimeout(() => {
      document.getElementById('loader').style.display = 'none';
    }, 1000);
    
    // Scroll to top of home page after loader
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, 5000);
});

// Intersection Observer for scroll animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
    }
  });
}, {
  threshold: 0.1
});

document.querySelectorAll('.animate-on-scroll').forEach((el) => observer.observe(el));

// Adding to existing script
document.querySelectorAll('.service-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.setProperty('--x', `${x}px`);
    card.style.setProperty('--y', `${y}px`);
    card.style.setProperty('--rotation', `${(x - rect.width/2) * 0.05}deg`);

    card.style.transform = `
      perspective(1000px)
      rotateY(${(x - rect.width/2) * 0.05}deg)
      rotateX(${(y - rect.height/2) * -0.05}deg)
      translateZ(20px)
    `;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// Particle animation in hero section
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
document.querySelector('.hero').appendChild(canvas);

canvas.style.position = 'absolute';
canvas.style.top = '0';
canvas.style.left = '0';
canvas.style.width = '100%';
canvas.style.height = '100%';
canvas.style.pointerEvents = 'none';

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

const particles = [];
for(let i = 0; i < 100; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 2 + 1,
    speedX: Math.random() * 2 - 1,
    speedY: Math.random() * 2 - 1
  });
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach(particle => {
    particle.x += particle.speedX;
    particle.y += particle.speedY;

    if(particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
    if(particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;

    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(229,190,236,0.5)';
    ctx.fill();
  });

  requestAnimationFrame(animate);
}

animate();

// Performance Chart
const ctxChart = document.getElementById('performanceChart').getContext('2d');
new Chart(ctxChart, {
    type: 'line',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
            label: 'Performance Growth',
            data: [65, 78, 90, 85, 92, 88],
            borderColor: '#E5BEEC',
            tension: 0.4,
            fill: true,
            backgroundColor: 'rgba(229,190,236,0.1)'
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    color: 'rgba(255,255,255,0.1)'
                },
                ticks: {
                    color: '#FDE2F3'
                }
            },
            x: {
                grid: {
                    color: 'rgba(255,255,255,0.1)'
                },
                ticks: {
                    color: '#FDE2F3'
                }
            }
        },
        plugins: {
            legend: {
                labels: {
                    color: '#FDE2F3'
                }
            }
        }
    }
});
