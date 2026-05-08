const container =
  document.getElementById("container");

const addButton =
  document.getElementById("addButton");

const destinationInput =
  document.getElementById("destinationInput");

const tripList =
  document.getElementById("tripList");

const budgetValue =
  document.getElementById("budgetValue");

const itineraryBox =
  document.getElementById("itineraryBox");

/* REAL GEMINI API KEY */

const GEMINI_API_KEY =
  "AIzaSyDxWFh_kUh9PLQKZ6-Ik92kHSIG3qldr-0";

/* DEFAULT DESTINATIONS */

const defaultDestinations = [
  "Goa 🌴",
  "Tokyo 🗼",
  "Paris ✨",
  "Bali 🌊",
  "Manali 🏔️"
];

/* CREATE FLOATING CARD */

function createCard(name) {

  const card =
    document.createElement("div");

  card.classList.add("card");

  card.innerText = name;

  container.appendChild(card);

  let x =
    Math.random() *
    (window.innerWidth - 300);

  let y =
    Math.random() *
    (window.innerHeight - 300);

  let speed =
    0.5 + Math.random() * 1.5;

  let angle =
    Math.random() * 360;

  function animate() {

    y -= speed;

    angle += 0.08;

    if (y < -220) {

      y = window.innerHeight + 120;
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

/* DRAGGING */

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

    card.style.left =
      `${e.clientX - 80}px`;

    card.style.top =
      `${e.clientY - 80}px`;
  });
}

/* ADD DESTINATION TO PANEL */

function addTripDestination(name) {

  const item =
    document.createElement("li");

  item.innerText = name;

  tripList.appendChild(item);
}

/* BUDGET ESTIMATION */

function calculateBudget(destination) {

  const randomBudget =
    Math.floor(
      Math.random() * 50000
    ) + 10000;

  budgetValue.innerText =
    `Estimated Budget for ${destination}: ₹${randomBudget}`;
}

/* REAL GEMINI AI */

async function generateItinerary(destination) {

  itineraryBox.innerText =
    "Generating Gemini AI itinerary...";

  try {

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
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
                    `Create a fun 3-day travel itinerary for ${destination}. Include attractions, food recommendations, nightlife, and cultural experiences.`
                }
              ]
            }
          ]
        })
      }
    );

    console.log("Gemini Response:", response);

    const data =
      await response.json();

    console.log("Gemini Data:", data);

    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (text) {

      itineraryBox.innerText = text;

    } else {

      itineraryBox.innerText =
        "Gemini AI could not generate itinerary.";
    }

  } catch (error) {

    console.error(error);

    itineraryBox.innerText =
      "Error connecting to Gemini AI.";
  }
}

/* BUTTON CLICK */

addButton.addEventListener(
  "click",
  async () => {

    let value =
      destinationInput.value.trim();

    /* FRIENDLY TEXT FORMAT */

    value =
      value
        .toLowerCase()
        .split(" ")
        .map(word =>
          word.charAt(0).toUpperCase() +
          word.slice(1)
        )
        .join(" ");

    if (value === "") return;

    createCard(value);

    addTripDestination(value);

    calculateBudget(value);

    await generateItinerary(value);

    destinationInput.value = "";
  }
);

/* ENTER KEY SUPPORT */

destinationInput.addEventListener(
  "keypress",
  async (e) => {

    if (e.key === "Enter") {

      addButton.click();
    }
  }
);

/* LOAD DEFAULT DESTINATIONS */

for (let destination of defaultDestinations) {

  createCard(destination);

  addTripDestination(destination);
}

/* INITIAL MESSAGE */

itineraryBox.innerText =
  "Gemini AI travel itineraries will appear here.";