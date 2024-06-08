const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

let points = 0
document.getElementById('points').innerHTML = points

function play(level, test) {
    if (level == 'new') {
        resetGame();
    } else {
        resetLevel();
    }
    const randomIndex = Math.floor(Math.random() * letters.length);
    const randomLetter = letters[randomIndex];
    
    if (test) document.getElementById('letter').innerText = randomLetter;

    const wavfile = './audio/' + randomLetter.toUpperCase() + '.wav'; 
    playAudio(wavfile);
    
    window.currentLetter = randomLetter;
}

function examination() {
    const userInput = document.getElementById('inputLetter').value = document.getElementById('inputLetter').value.toUpperCase();
    const currentLetter = window.currentLetter;
    document.getElementById('inputLetter').disabled = true;
    document.getElementById('resultMessage').hidden = false;
    if (userInput === currentLetter) {
        document.getElementById('examination').innerHTML = "נכון מאוד!"
        console.log(currentLetter);
        rightAnswer(currentLetter);
    } else {
        document.getElementById('examination').innerHTML = "לֹא נָכוֹן. נסה שוב!"
        wrongAnswer(currentLetter)
    }

    play('level');
}

function rightAnswer(letter) {
    points++;
    document.getElementById('points').innerHTML = points;
    
    document.getElementById('rightLetters').innerHTML +=  ", " + letter + "-" + letter.toLowerCase();
}

function wrongAnswer(letter) {
    document.getElementById('wrongLetters').innerHTML +=  ", " + letter + "-" + letter.toLowerCase();
}

function playAudio(audioFile) {
    const audioElement = document.getElementById('audio');
    const sourceElement = document.getElementById('audio-source');
    sourceElement.src = audioFile; 
    audioElement.load();
    audioElement.play();
}

function resetLevel(){
    document.getElementById('inputLetter').value = ""
    document.getElementById('resultMessage').hidden = true;
    document.getElementById('inputLetter').disabled = false;
}

function resetGame(){
    document.getElementById('inputLetter').value = ""
    document.getElementById('resultMessage').hidden = true;
    document.getElementById('inputLetter').disabled = false;

    points = 0
    document.getElementById('points').innerHTML = points;

    document.getElementById('rightLetters').value = "";
    document.getElementById('wrongLetters').value = "";
}


const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
const container = document.getElementById('letterContainer');
const input = document.getElementById('inputLetter');

alphabet.forEach(letter => {
  const div = document.createElement('div');
  div.textContent = letter;
  div.classList.add('letter');
  div.addEventListener('click', () => {
    input.value = letter; // קביעת ערך ה-input לאות הנלחצת
    examination(); // קריאה לפונקציה examination() ישירות
  });
  container.appendChild(div);
});
