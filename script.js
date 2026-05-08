const container = document.getElementById("container");
const addButton = document.getElementById("addButton");
const destinationInput = document.getElementById("destinationInput");
const tripList = document.getElementById("tripList");
const budgetValue = document.getElementById("budgetValue");
const itineraryBox = document.getElementById("itineraryBox");

/* GEMINI API KEY */
const GEMINI_API_KEY = "PASTE_YOUR_API_KEY_HERE";

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

  let x = Math.random() * (window.innerWidth - 300);
  let y = Math.random() * (window.innerHeight - 300);

  let speed = 0.5 + Math.random() * 1.5;
  let angle = Math.random() * 360;

  function animate() {

    y -= speed;

    angle += 0.1;

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

  enableDragging(card);
}

function enableDragging(card) {

  let isDragging = false;

  card.addEventListener("mousedown", () => {
    isDragging = true;
  });

  window.addEventListener("mouseup", () => {
    isDragging = false;
  });

  window.addEventListener("mousemove", (e) => {

    if (!isDragging) return;

    card.style.left = `${e.clientX - 80}px`;
    card.style.top = `${e.clientY - 80}px`;
  });
}

function addTripDestination(name) {

  const item = document.createElement("li");

  item.innerText = name;

  tripList.appendChild(item);
}

function calculateBudget(destination) {

  const randomBudget =
    Math.floor(Math.random() * 50000) + 10000;

  budgetValue.innerText =
    `Estimated Budget for ${destination}: ₹${randomBudget}`;
}

async function generateItinerary(destination) {

  itineraryBox.innerText =
    "Generating AI itinerary...";

  try {

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text:
                    `Create a short 3-day itinerary for ${destination}`
                }
              ]
            }
          ]
        })
      }
    );

    const data = await response.json();

    const text =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "AI itinerary unavailable.";

    itineraryBox.innerText = text;

  } catch (error) {

    itineraryBox.innerText =
      "Unable to generate itinerary.";
  }
}

addButton.addEventListener("click", async () => {

  const value =
    destinationInput.value.trim();

  if (value === "") return;

  createCard(value);

  addTripDestination(value);

  calculateBudget(value);

  await generateItinerary(value);

  destinationInput.value = "";
});

for (let destination of defaultDestinations) {

  createCard(destination);

  addTripDestination(destination);
}
