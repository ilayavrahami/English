const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

function startGame(test) {
    const randomIndex = Math.floor(Math.random() * letters.length);
    const randomLetter = letters[randomIndex];
    
    if (test) document.getElementById('letter').innerText = randomLetter;
    
    const audioElement = document.getElementById('audio');
    const sourceElement = document.getElementById('audio-source');
    const wavfile = './audio/' + randomLetter.toUpperCase() + '.wav'; 
    sourceElement.src = wavfile; 
    audioElement.load();
    audioElement.play();
    
    window.currentLetter = randomLetter;
}

function examination() {
    const userInput = document.querySelector('input').value.toUpperCase();
    const currentLetter = window.currentLetter;

    if (userInput === currentLetter) {
        document.getElementById('examination').innerHTML = "נכון מאוד!"
    } else {
        document.getElementById('examination').innerHTML = "לֹא נָכוֹן. נסה שוב!"
    }
}
