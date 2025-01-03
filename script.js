const cube = document.querySelector('.cube');

let isDragging = false;
let startX, startY, prevX, prevY;
let rotationX = 0, rotationY = 0;

// Velocidad en los ejes X e Y (rotación).
let velocityX = 0;
let velocityY = 0;

// Factor que multiplica el delta del mouse para convertirlo en velocidad de giro.
const velocityFactor = 0.2;

// Factor de fricción para que la inercia se vaya reduciendo con el tiempo.
// Ajusta este valor para incrementar o reducir la desaceleración.
const friction = 0.95; 

// Animación continua via requestAnimationFrame
function animate() {
  // Actualizamos la rotación con la velocidad actual
  rotationX += velocityX;
  rotationY += velocityY;
  
  // Aplicamos fricción a la velocidad para ir reduciéndola gradualmente.
  velocityX *= friction;
  velocityY *= friction;
  
  // Aplicamos la transformación al cubo
  cube.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;

  requestAnimationFrame(animate);
}

// Iniciamos la animación
requestAnimationFrame(animate);

// Doble clic para navegar al enlace de la cara
cube.addEventListener('dblclick', (e) => {
  e.preventDefault();
  if (e.target.tagName.toLowerCase() === 'a') {
    window.location = e.target.href;
  }
});

// Al presionar el ratón, comenzamos el arrastre
cube.addEventListener('mousedown', (e) => {
  isDragging = true;
  startX = e.clientX;
  startY = e.clientY;
  prevX = e.clientX;
  prevY = e.clientY;

  // Detenemos el impulso anterior (si queremos que inicie nuevo arrastre
  // sin sumar la velocidad antigua, podemos poner velocityX=0, velocityY=0)
  // velocityX = 0;
  // velocityY = 0;

  e.preventDefault();
});

// Durante el arrastre (mousemove), calculamos cuánto se mueve el cursor
document.addEventListener('mousemove', (e) => {
  if (!isDragging) return;

  const currentX = e.clientX;
  const currentY = e.clientY;
  
  const deltaX = currentX - prevX;
  const deltaY = currentY - prevY;

  // Actualizamos la velocidad (que luego aplicaremos en el bucle de animación)
  velocityY = deltaX * velocityFactor;
  velocityX = -deltaY * velocityFactor;

  // Actualizamos las rotaciones inmediatamente para que el usuario
  // vea el movimiento en tiempo real
  rotationX += velocityX;
  rotationY += velocityY;
  
  // Asignamos la transformación resultante al cubo
  cube.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;

  prevX = currentX;
  prevY = currentY;

  e.preventDefault();
});

// Cuando el usuario suelta el ratón (mouseup), dejamos de arrastrar.
// Pero el cubo sigue rotando con la inercia registrada (velocityX, velocityY).
document.addEventListener('mouseup', (e) => {
  if (isDragging) {
    isDragging = false;
  }
});

// Si el ratón sale de la ventana, dejamos de arrastrar
document.addEventListener('mouseleave', () => {
  if (isDragging) {
    isDragging = false;
  }
});
