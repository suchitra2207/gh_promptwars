const cards = document.querySelectorAll(".card");

cards.forEach((card, index) => {

  let x = 100 + index * 180;
  let y = window.innerHeight - 200;

  let speed = 1 + Math.random() * 2;

  function animate() {

    y -= speed;

    if (y < -150) {
      y = window.innerHeight;
    }

    card.style.transform =
      `translate(${x}px, ${y}px)`;

    requestAnimationFrame(animate);
  }

  animate();
});