const cube = document.querySelector('.cube');

let isDragging = false;
let startX, startY, prevX, prevY;
let rotationX = 0, rotationY = 0;

// Velocidad de rotación manual (inercia al arrastrar)
let velocityX = 0;
let velocityY = 0;

// Velocidad de rotación automática (siempre presente)
// Ajusta este valor para que rote más rápido o más lento sobre el eje Y
const autoRotateY = 0.1;

// Factores para la inercia
const velocityFactor = 0.2; // Sensibilidad al arrastrar
const friction = 0.95;      // Fricción (cuanto más cerca de 1, más tarda en frenarse)

// Animación continua con requestAnimationFrame
function animate() {
  // Sumamos la inercia del arrastre (velocityX, velocityY) y la rotación automática (autoRotateY)
  rotationX += velocityX;
  rotationY += velocityY + autoRotateY;

  //  fricción para ir reduciendo la velocidad de arrastre gradualmente
  velocityX *= friction;
  velocityY *= friction;

  // Refleje la transformación en el cubo
  cube.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;

  requestAnimationFrame(animate);
}
requestAnimationFrame(animate);

// Evitamos que un clic abra el enlace por accidente
cube.addEventListener('click', (e) => {
  if (e.target.tagName.toLowerCase() === 'a') {
    e.preventDefault();
  }
});

// Con doble dclic, sí abrimos el enlace
cube.addEventListener('dblclick', (e) => {
  e.preventDefault();
  if (e.target.tagName.toLowerCase() === 'a') {
    window.location = e.target.href;
  }
});

// Mousedown: comdenzamos el arrastre
cube.addEventListener('mousedown', (e) => {
  isDragging = true;
  startX = e.clientX;
  startY = e.clientY;
  prevX = e.clientX;
  prevY = e.clientY;
  e.preventDefault();
});

// Mousemove: rotación manual con farrastre
document.addEventListener('mousemove', (e) => {
  if (!isDragging) return;

  const currentX = e.clientX;
  const currentY = e.clientY;
  const deltaX = currentX - prevX;
  const deltaY = currentY - prevY;

  // Ajustamos la velocidad según el movimiento
  velocityY = deltaX * velocityFactor;
  velocityX = -deltaY * velocityFactor;

  // Rotamos el cubo inmediatamenffte para retroalimentación visual en tiempo real
  rotationX += velocityX;
  rotationY += velocityY;

  cube.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;

  prevX = currentX;
  prevY = currentY;
  e.preventDefault();
});

// Cuando elddfdf usuario suelta el ratón, se detiene el arrastre, 
// pero el cubo sigue con la inercia y la rotación automática
document.addEventListener('mouseup', () => {
  if (isDragging) {
    isDragging = false;
  }
});

// Si el mouse sale de la ventana, detenemos el arrastre
document.addEventListener('mouseleave', () => {
  if (isDragging) {
    isDragging = false;
  }
});
