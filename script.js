const container =
  document.getElementById("container");

const addButton =
  document.getElementById("addButton");

const destinationInput =
  document.getElementById("destinationInput");

const tripList =
  document.getElementById("tripList");

/* DEFAULT DESTINATIONS */

const defaultDestinations = [
  "Goa",
  "Tokyo",
  "Paris",
  "Bali",
  "Manali"
];

/* CREATE FLOATING CARD */

function createCard(name) {

  const card =
    document.createElement("div");

  card.classList.add("card");

  card.innerText = name;

  container.appendChild(card);

  /* RANDOM POSITION */

  let x =
    Math.random() *
    (window.innerWidth - 300);

  let y =
    Math.random() *
    (window.innerHeight - 300);

  /* FLOATING SPEED */

  let speed =
    0.5 + Math.random() * 1.5;

  /* ROTATION */

  let angle =
    Math.random() * 360;

  /* FLOAT ANIMATION */

  function animate() {

    y -= speed;

    angle += 0.1;

    /* RESET POSITION */

    if (y < -200) {
      y = window.innerHeight + 100;
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

/* ADD TO TRIP LIST */

function addTripDestination(name) {

  const item =
    document.createElement("li");

  item.innerText = name;

  tripList.appendChild(item);
}

/* DRAG FUNCTIONALITY */

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

    const dx =
      e.clientX - offsetX;

    const dy =
      e.clientY - offsetY;

    offsetX = e.clientX;
    offsetY = e.clientY;

    card.style.left =
      `${card.offsetLeft + dx}px`;

    card.style.top =
      `${card.offsetTop + dy}px`;
  });

  window.addEventListener("mouseup", () => {

    isDragging = false;

    card.style.cursor = "grab";
  });
}

/* BUTTON CLICK */

addButton.addEventListener("click", () => {

  const value =
    destinationInput.value.trim();

  if (value === "") return;

  createCard(value);

  destinationInput.value = "";
});

/* ENTER KEY SUPPORT */

destinationInput.addEventListener("keypress", (e) => {

  if (e.key === "Enter") {

    addButton.click();
  }
});

/* LOAD DEFAULT DESTINATIONS */

defaultDestinations.forEach((destination) => {

  createCard(destination);
});