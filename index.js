const row1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
const row2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
const row3 = ["Z", "X", "C", "V", "B", "N", "M"];
const letters = [...row1, ...row2, ...row3];
let currentLetter = "";
let points = 0; // מספר האותיות הנכונות שהוזנו על ידי המשתמש

document.getElementById("points").innerHTML = points;


function play(level, letter, test) {
  if (level == "new") {
    resetGame();
    timeLeft = 20;
  } else {
    resetLevel();
  }

  if (letter) currentLetter = letter;
  else {
    const randomIndex = Math.floor(Math.random() * letters.length);
    currentLetter = letters[randomIndex];
  }
  if (test) document.getElementById("letter").innerText = currentLetter;

  const wavfile = "./audio/" + currentLetter.toUpperCase() + ".wav";
  playAudio(wavfile);

  examination(timer);
}

function examination(timer) {
  if (timeLeft <= 0) return; // אם הזמן נגמר, אל תבצע את הפונקציה

  const userInput = document.getElementById("inputLetter").value.toUpperCase();
  if (!letters.includes(userInput)) return; // אם לא הקיש אות מהרשימה אז אל תעשה כלום

  document.getElementById("resultMessage").hidden = false;
  if (userInput === currentLetter) {
    document.getElementById("examination").innerHTML = "נכון מאוד!";
    rightAnswer(currentLetter);
    play('level'); // קריאה לפונקציה play() כדי להכין את האות הבאה
    return; // יציאה מהפונקציה אם התשובה היא נכונה
  } else {
    document.getElementById("examination").innerHTML = "לֹא נָכוֹן. נסה שוב!";
    wrongAnswer(currentLetter);
    play('level', currentLetter);
  }

  if (points === 20 || timeLeft <= 0) {
    // בדיקה האם המשתמש הזין 20 אותיות נכונות או שהזמן נגמר
    clearInterval(timer); // עצירת הטיימר
    const score = calculateScore();
    alert("הניקוד שלך: " + score);
  }
}

function calculateScore() {
  const wrongLettersCount =
    document.getElementById("wrongLetters").innerHTML.split(",").length - 1;
  return 20 * points - wrongLettersCount; // חישוב הניקוד על פי מספר האותיות הנכונות והלא נכונות
}

function rightAnswer(letter) {
  points++;
  document.getElementById("points").innerHTML = calculateScore();

  document.getElementById("rightLetters").innerHTML +=
    ", " + letter + "-" + letter.toLowerCase();
}

function wrongAnswer(letter) {
  document.getElementById("wrongLetters").innerHTML +=
    ", " + letter + "-" + letter.toLowerCase();
}

function playAudio(audioFile) {
  const audioElement = document.getElementById("audio");
  const sourceElement = document.getElementById("audio-source");
  sourceElement.src = audioFile;
  audioElement.load();
  audioElement.play();
}

function resetLevel() {
  document.getElementById("inputLetter").value = "";
  document.getElementById("resultMessage").hidden = true;
  document.getElementById("inputLetter").disabled = false;
}

function resetGame() {
  document.getElementById("inputLetter").value = "";
  document.getElementById("resultMessage").hidden = true;
  document.getElementById("inputLetter").disabled = false;

  points = 0;
  document.getElementById("points").innerHTML = points;

  document.getElementById("rightLetters").value = "";
  document.getElementById("wrongLetters").value = "";
}

const input = document.getElementById("inputLetter");
const container = document.getElementById("letterContainer");
[row1, row2, row3].forEach((letters) => {
  const rowDiv = document.createElement("div");
  rowDiv.classList.add("row");
  letters.forEach((letter) => {
    const div = document.createElement("div");
    div.textContent = letter;
    div.classList.add("letter");
    div.addEventListener("click", () => {
      input.value = letter;
      examination();
    });
    rowDiv.appendChild(div);
  });
  container.appendChild(rowDiv);    
});

timer = setInterval(() => {
    timeLeft--;
    if (timeLeft <= 0) {
      timeLeft = 0;
      clearInterval(timer);
      const score = calculateScore();
      alert("הניקוד שלך: " + score);
    } else {
      document.getElementById("timer").innerText =
        "זמן נותר: " + timeLeft + " שניות";
    }
  }, 1000);
