// game over status
const gameStatus = document.querySelector("#gameStatus");
// declaring Querries 
        let currentNumber = document.querySelector("#currentNumber");
        let generateNumberBtn = document.querySelector("#generateNumberBtn");
        let resetBtn = document.querySelector("#resetBtn");
        let numberHistory = document.querySelector("#history");
        let container = document.querySelector("#container");
        
        // Generating Numbers 
        const celebrationMusic = new Audio("./celebrationMusic.mp3");
        celebrationMusic.volume = 0.5;
        const victoryMusic = new Audio("./victoryMusic.mp3");

        let calledNumbers = new Set();
        generateNumberBtn.addEventListener("click",(event)=>{
       if(calledNumbers.size === 90) {
        return
       }
         let randomNumber =   Math.floor(Math.random() * 90) + 1
         // while loop for making unique Numbers
         while (calledNumbers.has(randomNumber)){
         randomNumber =   Math.floor(Math.random() * 90) + 1
        
        }
        // adding random number to set i.e calledNumber
         calledNumbers.add(randomNumber)

         currentNumber.innerText = randomNumber;

         announceNumber(randomNumber);
         if (calledNumbers.size === 7) {
         celebrationMusic.currentTime = 0;
          celebrationMusic.play().catch(console.error);
        }
        if (calledNumbers.size === 8) {
         celebrationMusic.pause();
        celebrationMusic.currentTime = 0;
        }
        if (calledNumbers.size === 90) {
         gameStatus.innerText = "🎉 GAME COMPLETED! ALL 90 NUMBERS CALLED! 🏆";
        gameStatus.classList.add("game-completed");

        victoryMusic.currentTime = 0;
        victoryMusic.play().catch(console.error);
        }

         //  saving history

         let spanOfNumbers = document.createElement("span");

         spanOfNumbers.innerText = randomNumber;

         numberHistory.append(spanOfNumbers);


        let selectedNumber = document.querySelector(`#number-${randomNumber}`)
        selectedNumber.style.backgroundColor = "var(--ocean)";
        })
        function announceNumber(number) {
         speechSynthesis.cancel();

         let voice = new SpeechSynthesisUtterance(`Number ${number}`);

         voice.lang = "en-GB";
          voice.rate = 0.9;
         voice.pitch = 1;

    speechSynthesis.speak(voice);
}
        // Game Board Generation 
         for (let i = 1 ; i<=90 ; i++){
        let allNumbers = document.createElement("p")
        allNumbers.id = `number-${i}`
        allNumbers.innerText = i;

        container.append(allNumbers)
        }
        // lets reset the game
            resetBtn.addEventListener("click",(event)=>{
                calledNumbers.clear()
                currentNumber.innerText = "--";
                numberHistory.innerText = "";
                for (let i = 1 ; i<=90 ; i++){
                let selectedNumber = document.querySelector(`#number-${i}`)
                selectedNumber.style.backgroundColor = "";
                }
                speechSynthesis.cancel();
                celebrationMusic.pause();
                celebrationMusic.currentTime = 0;
                victoryMusic.pause();
                victoryMusic.currentTime = 0;
                gameStatus.innerText = "Ready to play? Let's go!";
                gameStatus.classList.remove("game-completed");
            })
