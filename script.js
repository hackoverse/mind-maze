const gameScreen = document.getElementById("gameScreen");
const endScreen = document.getElementById("endScreen");
const endMessage = document.getElementById("endMessage");

const playerDisplay = document.getElementById("playerDisplay");
const timerDisplay = document.getElementById("timer");
const codeProblem = document.getElementById("codeProblem");
const participantCode = document.getElementById("participantCode");
const runBtn = document.getElementById("runBtn");

const outputBox = document.getElementById("outputBox");
const outputDisplay = document.getElementById("outputDisplay");

const lockContainer = document.getElementById("lockContainer");
const coordinatorBtn = document.getElementById("coordinatorBtn");
const solvedCountDisplay = document.getElementById("solvedCount");

let timer;
// 💡 CHANGE HERE: 5 minutes 30 seconds = 330 seconds
let timeLeft = 330; 
let currentStage = 0;
let solvedCount = 0;

// ==========================
// PLAYER NAME
// ==========================
const playerName = localStorage.getItem("playerName") || "Player";
playerDisplay.textContent = `Welcome, ${playerName}`;
gameScreen.classList.remove("hidden");

// ==========================
// STAGES CONFIGURATION (7 PROBLEMS)
// ==========================
const stages = [
  {language:"C Program",
   code:`#include<stdio.h>
 inculde <string.l>
  return 0;
int main( {
    char s1[40];
    char s2[20]="point";
    strcpy(s1, east);
    strcat(s1, s2);
    printf("%s", &s1)
    
}
// 🔍 Hint: “Functions need parenthesis. Remember to use quotes around string literals in strcpy, and 'strcat' requires two string arguments to connect.”`,
   solvedCode:`#include<stdio.h>
#include<string.h>
int main() {
    char s1[40];
    char s2[20] = "point";
    strcpy(s1, "east");
    strcat(s1, s2);
    printf("%s", s1);
    return 0;
}`,
   riddle:"Not every entrance is in the front.",
   coordinatorPassword:"123"
  },
  {language:"Python Program",
   code:`words = [Good", "bad"]
for w word;
    pass
print("".join(words)
# 🔍 Hint: “Lists require quotes around all string items. Loops need the 'in' keyword, a colon, and print statements must be closed.”`,
   solvedCode:`words = ["Good", "bad"]
for w in words:
    pass
print("".join(words))`,
   riddle:"Where greetings begin and journeys start.",
   coordinatorPassword:"123"
  },
  {language:"C Program",
   code:`include <stdioh>
#int main() 
    return 0;
    char clue1[] = "home";
    printf("%d where things %s", clue2, clue1);
    char clue2[] = "town":
}
// 🔍 Hint: “The pound sign (#) is vital for includes and should not prefix the main function. Variables must be declared before they are used.”`,
   solvedCode:`#include <stdio.h>
int main() {
    char clue1[] = "home";
    char clue2[] = "town";
    printf("%s where things %s", clue2, clue1);
    return 0;
}`,
   riddle:"Thunder hums in circle behind closed walls.",
   coordinatorPassword:"123"
  },
  {language:"Python Program",
   code:`for i n  range(1);
    place = sleep";
print("we", "dream", "at", place);
# 🔍 Hint: “The loop needs the 'in' keyword and a colon, not a semicolon. Strings, even variables, need both open and close quotes.”`,
   solvedCode:`for i in range(1):
    place = "sleep"
print("we", "dream", "at", place)`,
   riddle:"I'm home to many, yet owned by none.",
   coordinatorPassword:"123"
  },
  {language:"C Program",
   code:`#include <stdioh>
int mian {
print("odd");
    for (int i = "0"; i < 4; i++) {
        if (i == 2){
            printf("even"):
        else{
            
    }
    return 0;
}
// 🔍 Hint: “Check your headers, function parentheses, and remove that initial print. Loop variables are numbers, not strings, and every statement and block needs proper semicolons and closing braces.”`,
   solvedCode:`#include <stdio.h>
int main() {
    for (int i = 0; i < 4; i++) {
        if (i == 2){
            printf("even");
        } else {
            printf("odd");
        }
    }
    return 0;
}`,
   riddle:"Many run over me, yet i never move an inch.",
   coordinatorPassword:"123"
  },
  {language:"Python Program",
   code:`block = "meet"
if block == meet";
    printf("The block of learning);
else:
    print("Unknown zone")
# 🔍 Hint: “Be sure that every string, whether in a conditional check or a print function, is fully enclosed by quotation marks.”`,
   solvedCode:`block = "meet"
if block == "meet":
    print("The block of learning")
else:
    print("Unknown zone")`,
   riddle:"A place where actual learning begins.",
   coordinatorPassword:"123"
  },
  {language:"C Program",
   code:`#includ <stdio.h>
int main() {
    char place() = "Ground":
    print("where cricket is played: %s", place)
    return 0
}
// 🔍 Hint: “The '#include' keyword is misspelled. Remember that in C, variables, print statements, and return statements all need to be terminated by a semicolon.”`,
   solvedCode:`#include <stdio.h>
int main() {
    char place[] = "Ground";
    printf("where cricket is played: %s", place);
    return 0;
}`,
   riddle:"No counter,no crowd-only the clang of vessels and silence effort.",
   coordinatorPassword:"123"
  }
];

// ==========================
// SHUFFLE STAGES FOR PARTICIPANT
// ==========================
let participantStages = [];
function shuffleStages() {
  const temp = [...stages];
  while(temp.length > 0) {
    const rand = Math.floor(Math.random()*temp.length);
    participantStages.push(temp.splice(rand,1)[0]);
  }
}
shuffleStages(); // Random non-repeating

// ==========================
// SHOW CURRENT STAGE
// ==========================
function showStage() {
  // Present the corrupted/shuffled code to the participant
  codeProblem.innerHTML = `<strong>${participantStages[currentStage].language}</strong>\n\n${participantStages[currentStage].code}`;
  participantCode.value = "";
  outputBox.classList.add("hidden");
  lockContainer.classList.add("hidden");
  outputDisplay.textContent = "";
  solvedCountDisplay.textContent = `${solvedCount}/7`;
}

// ==========================
// TIMER
// ==========================
function startTimer() {
  // 💡 CHANGE HERE: Reset to 330 seconds for the new stage
  timeLeft = 330; 
  timerDisplay.textContent = formatTime(timeLeft);
  timer = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = formatTime(timeLeft);
    if(timeLeft <=0) {
      clearInterval(timer);
      endGame(false);
    }
  }, 1000);
}

function formatTime(sec){
  const m = Math.floor(sec/60).toString().padStart(2,'0');
  const s = (sec%60).toString().padStart(2,'0');
  return `${m}:${s}`;
}

// ==========================
// TEXTAREA CONTROLS (Paste Prevention & Auto-Indentation)
// ==========================
participantCode.addEventListener('paste', e => e.preventDefault()); // Prevent copy-paste

participantCode.addEventListener('keydown', function(e) {
  if (e.key === 'Enter') {
    e.preventDefault(); 
    const start = this.selectionStart;
    const end = this.selectionEnd;
    const value = this.value;

    const lineStart = value.lastIndexOf('\n', start - 1) + 1;
    const currentLine = value.substring(lineStart, start);

    const leadingWhitespaceMatch = currentLine.match(/^(\s*)/);
    let currentIndentation = leadingWhitespaceMatch ? leadingWhitespaceMatch[0] : '';
    let newIndentation = currentIndentation;

    // Auto-increase indentation for C/JS style braces and Python style colons
    if (currentLine.trim().endsWith('{') || currentLine.trim().endsWith(':')) {
      newIndentation += '  '; // Add two spaces
    } 
    
    // Insert the newline and the new indentation
    const newValue = value.substring(0, start) + '\n' + newIndentation + value.substring(end);
    this.value = newValue;

    // Set cursor position
    this.selectionEnd = start + 1 + newIndentation.length;
  }
});


// ==========================
// RUN BUTTON (Robust and Case-Insensitive comparison)
// ==========================
runBtn.addEventListener("click", () => {
  const userCode = participantCode.value;
  const solved = participantStages[currentStage].solvedCode;
  
  // Robust normalization: Remove all whitespace AND convert to lowercase for flexible comparison
  const normalizeRobust = str => str.replace(/\s/g, '').toLowerCase(); 

  // 🔥 FIX: Complete state reset on every run: clear content and remove all state classes
  outputDisplay.textContent = ""; 
  lockContainer.classList.add("hidden"); 
  outputBox.classList.remove("correct", "incorrect");
  outputBox.classList.add("hidden"); 

  if(normalizeRobust(userCode) === normalizeRobust(solved)) {
    // Stop the timer immediately when the code is solved
    clearInterval(timer); 
    
    outputBox.classList.add("correct");
    outputDisplay.textContent = participantStages[currentStage].riddle;
    outputBox.classList.remove("hidden"); // Show box with correct output
    lockContainer.classList.remove("hidden"); // Show lock
  } else {
    outputBox.classList.add("incorrect");
    outputDisplay.textContent = "Output incorrect. Try again!";
    outputBox.classList.remove("hidden"); // Show box with incorrect message
  }
});

// ==========================
// COORDINATOR UNLOCK
// ==========================
coordinatorBtn.addEventListener("click", () => {
  let pass = prompt("Enter Coordinator Password:");
  if(pass === participantStages[currentStage].coordinatorPassword) {
    solvedCount++;
    currentStage++;
    // The timer is cleared here to start a fresh one for the next stage
    clearInterval(timer); 
    if(solvedCount >= 7) {
      endGame(true);
    } else {
      showStage();
      startTimer();
    }
  } else {
    prompt("Wrong Password! (Click OK to close)", "Error"); 
  }
});

// ==========================
// END GAME
// ==========================
function endGame(win) {
  gameScreen.classList.add("hidden");
  endScreen.classList.remove("hidden");
  endMessage.textContent = win ? "Congratulations! You solved all problems!" : "Thank you for participating!";
}

// ==========================
// START FIRST STAGE
// ==========================
showStage();

startTimer();
