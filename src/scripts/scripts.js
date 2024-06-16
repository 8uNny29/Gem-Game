document.addEventListener("DOMContentLoaded", function () {
  const images = [
    "../src/assets/images/gems/amber.png",
    "../src/assets/images/gems/amethyst.png",
    "../src/assets/images/gems/diamond.png",
    "../src/assets/images/gems/emerald.png",
    "../src/assets/images/gems/sapphire.png",
    "../src/assets/images/gems/stone.png",
  ];

  const imageScores = {
    "amber.png": 10,
    "amethyst.png": 50,
    "diamond.png": 20,
    "emerald.png": 25,
    "sapphire.png": 30,
    "stone.png": -30,
  };

  let score = 0;
  let timeLeft = 15;
  let maxGems = 5; // Default
  let difficulty = "easy"; // Default difficulty
  const scoreElement = document.getElementById("score");
  const timeElement = document.getElementById("time");
  const gameplayArea = document.querySelector(".gameplay");
  const gameOverUI = document.querySelector(".game-over");
  const finalScoreElement = document.getElementById("final-score");
  const restartButton = document.getElementById("restart-button");
  const startGameBtn = document.getElementById("startGameBtn");
  const creditsBtn = document.getElementById("creditsBtn");
  const backBtn = document.getElementById("backBtn");
  const backButton = document.getElementById("back-button");
  const backMainMenuButton = document.getElementById("backMainMenuBtn");
  const nav = document.querySelector("nav");
  const mainMenu = document.querySelector(".main-menu");
  const creditsPage = document.querySelector(".credits-page");
  const difficultySelection = document.getElementById("difficulty-selection");
  const easyBtn = document.getElementById("easyBtn");
  const mediumBtn = document.getElementById("mediumBtn");
  const hardBtn = document.getElementById("hardBtn");

  function getRandomImage() {
    return images[Math.floor(Math.random() * images.length)];
  }

  function updateScore(value) {
    score += value;
    scoreElement.textContent = score;
  }

  function randomPosition(element) {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const maxLeft = windowWidth - element.offsetWidth;
    const maxTop = windowHeight - element.offsetHeight;
    const left = Math.floor(Math.random() * maxLeft);
    const top = Math.floor(Math.random() * maxTop);
    element.style.left = `${left}px`;
    element.style.top = `${top}px`;
  }

  function displayRandomImage() {
    if (timeLeft <= 0 || gameplayArea.querySelectorAll("img").length >= maxGems)
      return;

    const src = getRandomImage();
    const img = document.createElement("img");
    img.src = src;
    img.alt = "Gem";
    img.classList.add("fade-in");
    img.style.position = "absolute";

    randomPosition(img);

    img.addEventListener("click", function handleClick() {
      const imgName = src.split("/").pop();
      updateScore(imageScores[imgName]);
      img.classList.remove("fade-in");
      img.classList.add("fade-out");
      setTimeout(() => {
        img.remove();
      }, 300);

      img.removeEventListener("click", handleClick);

      displayRandomImage();
    });

    gameplayArea.appendChild(img);

    setTimeout(
      () => {
        if (gameplayArea.contains(img)) {
          img.classList.remove("fade-in");
          img.classList.add("fade-out");
          setTimeout(() => {
            img.remove();
            displayRandomImage();
          }, 300);
        }
      },
      difficulty === "easy" ? 3000 : difficulty === "medium" ? 2000 : 1000
    ); // Adjust timing based on difficulty
  }

  function displayInitialGems() {
    for (let i = 0; i < maxGems; i++) {
      displayRandomImage();
    }
  }

  function startGameLogic() {
    score = 0;
    timeLeft = difficulty === "easy" ? 20 : difficulty === "medium" ? 15 : 10; // Adjust time based on difficulty
    scoreElement.textContent = score;
    timeElement.textContent = timeLeft;
    gameOverUI.classList.add("hidden");
    nav.classList.remove("hidden");
    gameplayArea.classList.remove("hidden");
    mainMenu.classList.add("hidden");
    creditsPage.classList.add("hidden");
    difficultySelection.classList.add("hidden");
    gameplayArea.innerHTML = "";

    displayInitialGems();

    const timerInterval = setInterval(() => {
      if (timeLeft > 0) {
        timeLeft--;
        timeElement.textContent = timeLeft;
      } else {
        clearInterval(timerInterval);
        showGameOverUI();
      }
    }, 1000);
  }

  function showGameOverUI() {
    finalScoreElement.textContent = score;
    gameOverUI.classList.remove("hidden");
    nav.classList.add("hidden");
    gameplayArea.classList.add("hidden");
    gameplayArea.innerHTML = "";
  }

  function showMainMenu() {
    mainMenu.classList.remove("hidden");
    creditsPage.classList.add("hidden");
    gameOverUI.classList.add("hidden");
    nav.classList.add("hidden");
    gameplayArea.classList.add("hidden");
    difficultySelection.classList.add("hidden");
  }

  function showCreditsPage() {
    creditsPage.classList.remove("hidden");
    mainMenu.classList.add("hidden");
    gameOverUI.classList.add("hidden");
    nav.classList.add("hidden");
    gameplayArea.classList.add("hidden");
    difficultySelection.classList.add("hidden");
  }

  function showDifficultySelection() {
    difficultySelection.classList.remove("hidden");
    mainMenu.classList.add("hidden");
  }

  function setDifficulty(level) {
    difficulty = level;
    maxGems = difficulty === "easy" ? 5 : difficulty === "medium" ? 7 : 10; // Adjust max gems based on difficulty
    startGameLogic();
  }

  startGameBtn.addEventListener("click", showDifficultySelection);
  creditsBtn.addEventListener("click", showCreditsPage);
  backBtn.addEventListener("click", showMainMenu);
  backButton.addEventListener("click", showMainMenu);
  backMainMenuButton.addEventListener("click", showMainMenu);
  restartButton.addEventListener("click", startGameLogic);
  easyBtn.addEventListener("click", () => setDifficulty("easy"));
  mediumBtn.addEventListener("click", () => setDifficulty("medium"));
  hardBtn.addEventListener("click", () => setDifficulty("hard"));

  showMainMenu();
});
