const container = document.getElementById("container");
const addButton = document.getElementById("addButton");
const destinationInput = document.getElementById("destinationInput");
const tripList = document.getElementById("tripList");

const defaultDestinations = [
  "Goa",
  "Tokyo",
  "Paris",
  "Bali",
  "Manali"
];

function createCard(name) {

  const card = document.createElement("div");

  card.classList.add("card");
  card.innerText = name;

  container.appendChild(card);

  let x = Math.random() * (window.innerWidth - 200);
  let y = window.innerHeight + Math.random() * 400;

  let speed = 1 + Math.random() * 2;

  let angle = Math.random() * 360;

  function animate() {

    y -= speed;

    angle += 0.3;

    if (y < -200) {
      y = window.innerHeight + 200;
    }

    card.style.transform = `
      translate(${x}px, ${y}px)
      rotate(${angle}deg)
    `;

    requestAnimationFrame(animate);
  }

  animate();

  addTripDestination(name);

  enableDragging(card);
}

function addTripDestination(name) {

  const item = document.createElement("li");

  item.innerText = name;

  tripList.appendChild(item);
}

function enableDragging(card) {

  let isDragging = false;

  let offsetX = 0;
  let offsetY = 0;

  card.addEventListener("mousedown", (e) => {

    isDragging = true;

    offsetX = e.clientX;
    offsetY = e.clientY;

    card.style.cursor = "grabbing";
  });

  window.addEventListener("mousemove", (e) => {

    if (!isDragging) return;

    const dx = e.clientX - offsetX;
    const dy = e.clientY - offsetY;

    offsetX = e.clientX;
    offsetY = e.clientY;

    const currentTransform =
      getComputedStyle(card).transform;

    card.style.transform +=
      ` translate(${dx}px, ${dy}px)`;
  });

  window.addEventListener("mouseup", () => {

    isDragging = false;

    card.style.cursor = "grab";
  });
}

addButton.addEventListener("click", () => {

  const value = destinationInput.value.trim();

  if (value === "") return;

  createCard(value);

  destinationInput.value = "";
});

for (let destination of defaultDestinations) {
  createCard(destination);
}