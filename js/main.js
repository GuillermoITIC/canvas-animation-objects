// Obtiene el elemento del canvas del DOM y lo almacena en la variable 'canvas'
const canvas = document.getElementById("canvas");
// Obtiene el contexto 2D del canvas para dibujar
let ctx = canvas.getContext("2d");

// Obtiene el cuerpo de la tabla para mostrar las coordenadas
const coordinatesTableBody = document.getElementById("coordinatesTableBody");

// Define las dimensiones del canvas
const window_height = "300";
const window_width = "500";

// Establece la altura y el ancho del canvas
canvas.height = window_height;
canvas.width = window_width;

// Establece el color de fondo del canvas
canvas.style.backgroundColor = "#b7f7ed";

// Clase que representa un círculo
class Circle {
  // Constructor para inicializar las propiedades del círculo
  constructor(x, y, radius, color, text, backcolor, speed) {
    this.posX = x;         // Posición X del círculo
    this.posY = y;         // Posición Y del círculo
    this.radius = radius;  // Radio del círculo
    this.color = color;    // Color del borde del círculo
    this.text = text;      // Texto dentro del círculo
    this.backcolor = backcolor; // Color de fondo del círculo
    this.speed = speed;    // Velocidad del círculo
    this.dx = 1 * this.speed;   // Dirección X del movimiento
    this.dy = 1 * this.speed;   // Dirección Y del movimiento
  }

  // Método para dibujar el círculo en el canvas
  draw(context) {
    context.beginPath();
    context.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2, false);
    context.fillStyle = this.backcolor;
    context.fill();

    // Dibuja el borde del círculo
    context.lineWidth = 5;
    context.strokeStyle = this.color;
    context.stroke();

    // Dibuja el texto en el centro del círculo
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.font = "bold 20px cursive";
    context.fillStyle = "white";
    context.fillText(this.text, this.posX, this.posY);

    context.closePath();
  }

  // Método para actualizar la posición del círculo
  update(context) {
    this.draw(context);

    // Cambia la dirección en el eje X si el círculo toca el borde derecho o izquierdo
    if (this.posX + this.radius > window_width || this.posX - this.radius < 0) {
      this.dx = -this.dx;
    }

    // Cambia la dirección en el eje Y si el círculo toca el borde superior o inferior
    if (this.posY + this.radius > window_height || this.posY - this.radius < 0) {
      this.dy = -this.dy;
    }

    // Actualiza la posición del círculo
    this.posX += this.dx;
    this.posY += this.dy;
  }
}

// Genera un radio aleatorio para el círculo entre 20 y 80
let randomRadius = Math.floor(Math.random() * 60 + 20);

// Genera posiciones X e Y aleatorias para el círculo dentro de los límites del canvas
let randomX = Math.random() * window_width;
let randomY = Math.random() * window_height;

// Genera colores de fondo y de borde aleatorios para el círculo
let randomBackcolor = "rgb(" + Math.random() * 255 + "," + Math.random() * 255 + "," + Math.random() * 255 + ")";
let randomStrokecolor = "rgb(" + Math.random() * 255 + "," + Math.random() * 255 + "," + Math.random() * 255 + ")";

// Ajusta la posición X para asegurarse de que el círculo no se dibuje fuera del borde del canvas
randomX = randomX < randomRadius ? randomRadius : randomX > window_width - randomRadius ? window_width - randomRadius : randomX;

// Ajusta la posición Y para asegurarse de que el círculo no se dibuje fuera del borde del canvas
randomY = randomY < randomRadius ? randomRadius : randomY > window_height - randomRadius ? window_height - randomRadius : randomY;

// Crea una nueva instancia de Circle con las propiedades generadas aleatoriamente
let miCirculo = new Circle(randomX, randomY, randomRadius, randomStrokecolor, "1", randomBackcolor, 2);
/*
// Dibuja el círculo en el canvas
miCirculo.draw(ctx);

// Función para actualizar continuamente la animación del círculo
let updateCircle = function () {
  // Solicita que el navegador vuelva a dibujar la animación
  requestAnimationFrame(updateCircle);

  // Limpia el canvas antes de redibujar
  ctx.clearRect(0, 0, window_width, window_height);

  // Actualiza y redibuja el círculo
  miCirculo.update(ctx);

  // Actualiza el contenido del elemento para mostrar las coordenadas
  coordinatesDisplay.textContent = `X: ${Math.round(miCirculo.posX)}, Y: ${Math.round(miCirculo.posY)}`;
};

// Inicia la animación del círculo
updateCircle();
*/
const nCircles = 10;
let circles = [];
for (let i = 0; i < nCircles; i++) {

  let randomRadius = Math.floor(Math.random() * 30 + 20);
  let randomX = Math.random() * window_width;
  let randomY = Math.random() * window_height;

  // Con transparencia en base a un porcentaje

  // para que la transparencia sea aleatoria
  let randomBackcolor = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, ${Math.random()})`;
  let randomStrokecolor = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, ${Math.random()})`;

  let ramdomSpeed = Math.random() * 3 + 0.5;

  randomX = randomX < randomRadius ? randomRadius : randomX > window_width - randomRadius ? window_width - randomRadius : randomX;
  randomY = randomY < randomRadius ? randomRadius : randomY > window_height - randomRadius ? window_height - randomRadius : randomY;

  let miCirculo = new Circle(randomX, randomY, randomRadius, randomStrokecolor, i+1, randomBackcolor, ramdomSpeed);
  circles.push(miCirculo);
}

let updateCoordinatesTable = function () {
  coordinatesTableBody.innerHTML = "";
  circles.forEach((circle, index) => {
    let row = document.createElement("tr");
    row.innerHTML = `<td>${index + 1}</td><td>${Math.round(circle.posX)}</td><td>${Math.round(circle.posY)}</td>`;
    coordinatesTableBody.appendChild(row);
  });
};

let updateCircle = function () {
  requestAnimationFrame(updateCircle);
  ctx.clearRect(0, 0, window_width, window_height);
  circles.forEach((circle) => {
    circle.update(ctx);
  });
  updateCoordinatesTable();
};
updateCircle();
