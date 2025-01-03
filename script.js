const cube = document.querySelector('.cube');

let isDragging = false;
let startX, startY, prevX, prevY;
let rotationX = 0, rotationY = 0;

// Manejo de la animación continua con requestAnimationFrame
let isAnimating = true;  // El cubo está girando al inicio
let autoRotateSpeed = 0.2;  // Velocidad de la rotación automática

// Ajusta la velocidad de rotación automática si lo deseas
function animate() {
  // Mientras isAnimating sea true, el cubo se sigue rotando solo en Y (por ejemplo)
  if (isAnimating) {
    rotationY += autoRotateSpeed;
  }
  cube.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
  requestAnimationFrame(animate);
}
requestAnimationFrame(animate);

// Doble clic para navegar al enlace de la cara
cube.addEventListener('dblclick', (e) => {
  e.preventDefault();
  // Si el target es una etiqueta <a>, redireccionamos
  if (e.target.tagName.toLowerCase() === 'a') {
    window.location = e.target.href;
  }
});

// Mousedown: iniciamos el arrastre
cube.addEventListener('mousedown', (e) => {
  isAnimating = false; // Pausamos la rotación automática mientras arrastramos
  isDragging = true;
  startX = e.clientX;
  startY = e.clientY;
  prevX = e.clientX;
  prevY = e.clientY;
  e.preventDefault();
});

// Mousemove: rotación manual durante el arrastre
document.addEventListener('mousemove', (e) => {
  if (!isDragging) return;

  const currentX = e.clientX;
  const currentY = e.clientY;

  const deltaX = currentX - prevX;
  const deltaY = currentY - prevY;

  rotationY += deltaX * 0.2;
  rotationX -= deltaY * 0.2;

  cube.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;

  prevX = currentX;
  prevY = currentY;

  e.preventDefault();
});

// Mouseup: dejamos de arrastrar y reanudamos la rotación automática
document.addEventListener('mouseup', (e) => {
  if (isDragging) {
    isDragging = false;
    isAnimating = true; // Se retoma la animación
  }
});

// Si el ratón sale de la ventana, detenemos el arrastre
document.addEventListener('mouseleave', () => {
  if (isDragging) {
    isDragging = false;
    isAnimating = true;
  }
});
