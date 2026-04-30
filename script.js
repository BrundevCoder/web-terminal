const inputBar = document.getElementById("inputBar");
const symbol = document.getElementById("symbol");
const commandsInput = document.getElementById("commandInput");
const commandsUl = document.getElementById("commands-ul");
const screen = document.getElementById("terminalScreen")

const avaiableCommands = [
  "uninstall_commands", "drum", "idk",
  "commands", "clear", "meow",
  "number_of_commands", "ls", "explode()", "get_random_letter()", "get_random_number()", "exit()",
  "500_uninstall_commands()", "500_explode()", "reset",
  "blur", "debug", "open",
  "brightness", "invert", "contrast", 
  "sepia", "grayscale", "hue-rotate",
  "remove_filters", "update_filters", "skew",
  "info"
]

const specialCommands = [
  "rotate(degrees)"
]

// get every command from these arrays
const allCommands = [...avaiableCommands, ...specialCommands];

const customCommands = [
  {"name": "drum", "print": '"Drumming!!"'},
  {"name": "idk", "print": '"You Dont Know."'},
  {"name": "ls", "print": 'README.md  index.html  style.css  script.js  author/'},
]

let userHistory = [];
let historyIndex = 0;
let terminalFilters = [];
let debug = false;

// functions
function addUserCommandToList() {
  let userTyped = commandsInput.value;

  const li = document.createElement("li");
  const content = document.createTextNode(`$ ${userTyped}`);
  li.appendChild(content);
  li.classList.add("new");

  commandsUl.appendChild(li);
}

function addCustomLineToList(command="Hello, World!", type="none") {

  const li = document.createElement("li");
  const span = document.createElement("span");
  const content = document.createTextNode(`${command}`);
  span.appendChild(content);
  li.appendChild(span);

  type !== "none" ? li.classList.add(`${type}`) : li.classList.add("none");
  li.classList.add("new");

  commandsUl.appendChild(li);
}

function clear() {
  if (document.getElementById("initMessage")) {
    document.getElementById("initMessage").innerHTML = "";
  }
  commandsUl.innerText = "";
}

function getRandomLetter() {
  const letters = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p',
    'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'z', 'x', 'c', 'v',
    'b', 'n', 'm'
  ];

  return letters[Math.floor(Math.random() * letters.length)];
}

function getRandomNumber() {
  return Math.floor(Math.random() * 100000);
}

function explode() {
  let countdown = 3;
  let code = "";

  let eliminateCommand = allCommands[allCommands.length - 1] 
  allCommands.pop();

  for (let i = 0; i < 6; i++) {
    code += getRandomLetter();
  }

  const timer = setInterval(() => {
    if (countdown === 0) {
      addCustomLineToList(command = `ERROR: 0x${code}. "${eliminateCommand}" command eliminated from your list!`, type = "error");
      clearInterval(timer);
      return;
    }
    addCustomLineToList(command = `Time to explode: ${countdown}s`);
    countdown--;
  }, 1000);

}

function exit() {
  document.body.innerHTML = "exit()";
}

function uninstallCommands() {
  commandsInput.disabled = true;

  let times = allCommands.length - 1;
  let counter = 0;

  const deleting = setInterval(() => {

    if (counter === times) {
      allCommands.pop();
      clearInterval(deleting);

      addCustomLineToList(command=`${allCommands.length !== 0 ? `Available commands: ${allCommands.join(", ")}.` : 'ERROR: NO COMMANDS FOUND'}`, type=`${allCommands.length !== 0 ? "string" : "error"}`)

      inputBar.classList.add("no-commands");
      symbol.classList.add("no-commands")

      return;
    }

    allCommands.pop();
    addCustomLineToList(command=`Available commands: ${allCommands.join(", ")}.`, type="string");
    addCustomLineToList(command=`ERROR: COMMAND DELETED`, type="error");

    counter++;

  }, 750);

}

function five_hundred_uninstallCommands() {

  addCustomLineToList(command="Warning! This might break things and is designed to test the limits.", type="error")

  let countdown = 3;

  const countingDown = setInterval(() => {

    if (countdown === 0) {
      clearInterval(countingDown);
      return;
    }

    addCustomLineToList(command=`Countdown: ${countdown}`);

    countdown--;
  }, 1000);

  setTimeout(() => {
    for (let i = 0; i < 500; i++) {
      console.log(`N: ${i}`);
      uninstallCommands();
    }
  }, 4000);

}

function five_hundred_explosions() {

  addCustomLineToList(command="Warning! This might break things and is designed to test the limits.", type="error")

  let countdown = 3;

  const countingDown = setInterval(() => {

    if (countdown === 0) {
      clearInterval(countingDown);
      return;
    }

    addCustomLineToList(command=`Countdown: ${countdown}`);

    countdown--;
  }, 1000);

  setTimeout(() => {
    for (let i = 0; i < 500; i++) {
      console.log(`N: ${i}`);
      explode();
    }
  }, 4000);

}

function controllBlur(amount) {
  terminalFilters.push(`blur(${amount}px)`);
}

function controlFilters() {
  let filters = terminalFilters.join(" ");

  document.body.style.filter = filters;
}

function handleDebug() {
  // change debug current state
  debug = !debug;

  addCustomLineToList(`DEBUG ${debug ? "on" : "off"}`, "string")
  addCustomLineToList(`--------------->DEBUG<---------------`, "string")
  addCustomLineToList(`While debugging is enabled, you can see some real-time data from the code.`, "string")
  addCustomLineToList(`///////////////<DEBUG>///////////////`, "string")

}

function addToUiDebug(message, type="message") {

  if (type === "opening") {
    addCustomLineToList("--------------->DEBUG<---------------", "string");
  }

  if (type === "message") {
    addCustomLineToList(`${message}`, "string");
  }

  if (type === "closing") {
    addCustomLineToList("///////////////DEBUG>///////////////", "string");
  }
}

// main function
function handleCommands() {
  addUserCommandToList();

  historyIndex = userHistory.length;

  let userTyped = commandsInput.value;

  if (debug) {
    addToUiDebug("", "opening");
    addToUiDebug(`User Typed: ${userTyped}`, "message");
    addToUiDebug(`All Commands: ${allCommands.join(", ")}`, "message");
    addToUiDebug(`User History: ${userHistory}`, "message");
    addToUiDebug("", "closing");
  }

  // check if the command exists
  if (allCommands.includes(userTyped)) {

    // serach if it is a custom command
    for (let i = 0; i < customCommands.length; i++) {
      if (customCommands[i]["name"] === userTyped) {
        addCustomLineToList(command=customCommands[i]["print"], type="string")

        if (customCommands[i]["name"] === "drum") {
          new Audio("audios/drums.mp3").play()
        }
        break;
      }
    }
    
    // clear the terminal for user
    if (userTyped === "clear") {
      clear()
    }

    // show user all the commands
    if (userTyped === "commands") {
      addCustomLineToList(command=`Available commands: ${allCommands.join(", ")}.`, type="string");
    }

    // explode for user
    if (userTyped === "explode()") {
      explode()
    }

    // get a random letter and show it
    if (userTyped === "get_random_letter()") {
      addCustomLineToList(command=`Letter: ${getRandomLetter()}`, type="string")
    }

    // get a random number and show it
    if (userTyped === "get_random_number()") {
      addCustomLineToList(command=`${getRandomNumber()}`, type="int")
    }

    // show number of commands avaible
    if (userTyped === "number_of_commands") {
      addCustomLineToList(command=`number_of_commands: ${allCommands.length}`, type="string")
    }

    if (userTyped === "uninstall_commands") {
      uninstallCommands()
    }

    // meow with random 'w' length
    if (userTyped === "meow") {
      addCustomLineToList(command=`"meow${'w'.repeat(Math.floor(Math.random() * 15))} 🐈"`, type="string")
      new Audio("audios/cat.mp3").play()
    }

    // uninstall commands 500 times
    if (userTyped === "500_uninstall_commands()") {
      five_hundred_uninstallCommands()
    }

    // explode commands 500 times
    if (userTyped === "500_explode()") {
      five_hundred_explosions()
    }

    if (userTyped === "reset") {
      location.reload()
    }

    if (userTyped === "blur") {
      controllBlur(5)
      addCustomLineToList("To Apply the filter you need to run 'update_filters' !", "string")
      addCustomLineToList("To remove filters, type: 'remove_filters'' !", "string")
    }

    if (userTyped === "brightness") {
      terminalFilters.push(`brightness(2)`);
      addCustomLineToList("To Apply the filter you need to run 'update_filters' !", "string")
      addCustomLineToList("To remove filters, type: 'remove_filters'' !", "string")
    }

    if (userTyped === "invert") {
      terminalFilters.push(`invert()`);
      addCustomLineToList("To Apply the filter you need to run 'update_filters' !", "string")
      addCustomLineToList("To remove filters, type: 'remove_filters'' !", "string")
    }

    if (userTyped === "contrast") {
      terminalFilters.push(`contrast(10)`);
      addCustomLineToList("To Apply the filter you need to run 'update_filters' !", "string")
      addCustomLineToList("To remove filters, type: 'remove_filters'' !", "string")
    }

    if (userTyped === "sepia") {
      terminalFilters.push(`sepia()`);
      addCustomLineToList("To Apply the filter you need to run 'update_filters' !", "string")
      addCustomLineToList("To remove filters, type: 'remove_filters'' !", "string")
    }

    if (userTyped === "grayscale") {
      terminalFilters.push(`grayscale(0.7)`);
      addCustomLineToList("To Apply the filter you need to run 'update_filters' !", "string")
      addCustomLineToList("To remove filters, type: 'remove_filters'' !", "string")
    }

    if (userTyped === "hue-rotate") {
      terminalFilters.push(`hue-rotate(90deg)`);
      addCustomLineToList("To Apply the filter you need to run 'update_filters' !", "string")
      addCustomLineToList("To remove filters, type: 'remove_filters'' !", "string")
    }

    if (userTyped === "skew") {
      document.body.classList.toggle("skew");
      addCustomLineToList("To activate/deactivate, simply type 'skew' again!", "string")
    }

    if (userTyped === "debug") {
      handleDebug()
    }

    if (userTyped === "open") {

      const openCommands = ["portolfio", "guess-the-number", "guess-the-word", "portolfio2", "excuse-generator", "cat-gallery", "temperature-converter", "new-terminal", "youtube", "spotify"]

      addCustomLineToList(`To open other projects you can use the command: "open project_name", for example: "open portolfio". Here is a list of what you can use with "open":`, "string");

      for (let i = 0; i < openCommands.length; i++) {
        addCustomLineToList(`$ 'open ${openCommands[i]}' `, "string")
      }

    }

    // add filters to the screen
    if (userTyped === "update_filters") {
      if (terminalFilters.length === 0) {
        addCustomLineToList("It looks like you haven't added any filters yet! Try typing something like 'brightness' (we have more filters) and try again.", "error")
        return
      }
      controlFilters();
    }

    if (userTyped === "remove_filters") {
      // remove all filters at once
      terminalFilters = [];
      controlFilters();
    }

    if (userTyped === "info") {
      addCustomLineToList("Updated April 30, 2026, created by Bruno with 💖", "string")
    }

    // kill the Terminal
    if (userTyped === "exit()") {
      setTimeout(() => {
        exit();
      }, 1000);
    }

    return;
  }

  // redirecting websites made by me here
  if (userTyped === "open portolfio") {

    setTimeout(() => {
      addCustomLineToList("Redirecting to portfolio", "string")
    }, 1000);

    setTimeout(() => {
      open("https://brundevcoder.github.io/portfolio/", "_blank")
    }, 2000);

    return;
  }
  else if (userTyped === "open guess-the-number") {

    setTimeout(() => {
      addCustomLineToList("Redirecting to guess-the-number", "string")
    }, 1000);

    setTimeout(() => {
      open("https://brundevcoder.github.io/guess-the-number-web/", "_blank")
    }, 2000);

    return;
  }
  else if (userTyped === "open guess-the-word") {
    
    setTimeout(() => {
      addCustomLineToList("Redirecting to guess-the-word", "string")
    }, 1000);

    setTimeout(() => {
      open("https://brundevcoder.github.io/guess-the-word/", "_blank")
    }, 2000);

    return;
  }
  else if (userTyped === "open portolfio2") {
    
    setTimeout(() => {
      addCustomLineToList("Redirecting to portolfio2", "string")
    }, 1000);

    setTimeout(() => {
      open("https://brundevcoder.github.io/school-web/", "_blank")
    }, 2000);

    return;
  }
  else if (userTyped === "open excuse-generator") {
    
    setTimeout(() => {
      addCustomLineToList("Redirecting to excuse-generator", "string")
    }, 1000);

    setTimeout(() => {
      open("https://brundevcoder.github.io/excuse-teacher-generator/", "_blank")
    }, 2000);

    return;
  }
  else if (userTyped === "open cat-gallery") {
    
    setTimeout(() => {
      addCustomLineToList("Redirecting to cat-gallery", "string")
    }, 1000);

    setTimeout(() => {
      open("https://brundevcoder.github.io/cat-gallery/", "_blank")
    }, 2000);

    return;
  }
  else if (userTyped === "open temperature-converter") {
    
    setTimeout(() => {
      addCustomLineToList("Redirecting to temperature-converter", "string")
    }, 1000);

    setTimeout(() => {
      open("https://brundevcoder.github.io/temperature-converter/", "_blank")
    }, 2000);

    return;
  }
  else if (userTyped === "open new-terminal") {
    
    setTimeout(() => {
      addCustomLineToList("Redirecting to new-terminal", "string")
    }, 1000);

    setTimeout(() => {
      open("https://brundevcoder.github.io/web-terminal/", "_blank")
    }, 2000);

    return;
  }
  else if (userTyped === "open youtube") {
    
    setTimeout(() => {
      addCustomLineToList("Redirecting to youtube", "string")
    }, 1000);

    setTimeout(() => {
      open("https://www.youtube.com/", "_blank")
    }, 2000);

    return;
  }
  else if (userTyped === "open spotify") {
    
    setTimeout(() => {
      addCustomLineToList("Redirecting to spotify", "string")
    }, 1000);

    setTimeout(() => {
      open("https://open.spotify.com/", "_blank")
    }, 2000);

    return;
  }

  // check for others commands
  // special commands
  if (userTyped.startsWith("rotate")) {
    
    if (userTyped.endsWith(")")) {
      // get the first part of the input
      let deg = userTyped.split("(")[1];
      // get the number from the input
      deg = Number(deg.split(")")[0]);

      // apply to the body
      document.body.style.rotate = `${deg}deg`;

      addCustomLineToList(command=`Rotated ${deg}deg! If you want it back to normal, you may reset or rotate to '0'deg`, type="string");
      return;
    }
    else {
      addCustomLineToList(command=`It seems you forgot the ')', it's necessary!`, type="error");
      addCustomLineToList(command=`It works like this: 'rotate(degrees)'`, type="error");
      return;
    }

  }

  // if no result, give error message in the terminal
  addCustomLineToList(command=`No command found that was named: "${userTyped}"`, type="error");
  new Audio("audios/error.mp3").play()
  
  commandsInput.focus();

  return;
}

commandsInput.addEventListener("keydown", (e) => {

  if (e.code === "Enter") {
    userHistory.push(commandsInput.value);
    handleCommands();
    commandsInput.value = "";
  }

  // check for the history (up key)
  if (e.code === "ArrowUp") {
    console.log("detected ArrowUp!");

    if (userHistory.length > 0) {
      console.log("History higher than 0");

      if (userHistory.length === 1) {
        commandsInput.value = userHistory[0];
        console.log(userHistory)
        console.log(historyIndex)
        return;
      }

      if (historyIndex > userHistory.length) {
        console.log("No More!")
        console.log(userHistory)
        console.log(historyIndex)
        historyIndex = userHistory.length - 1;
        return;
      }
      
      if (historyIndex - 1 < 0) {
        return;
      }

      historyIndex--;

      if (!userHistory[historyIndex]) {
        commandsInput.value = userHistory[0];
        console.log(userHistory)
        console.log(historyIndex)
        return;
      }

      commandsInput.value = userHistory[historyIndex];

    }

  }

  // check for the history (down key)
  if (e.code === "ArrowDown") {
    console.log("detected! ArrowDown");

    if (userHistory.length > 0) {
      console.log("History higher than 0");

      if (userHistory.length === 1) {
        return;
      }

      if (historyIndex > userHistory.length) {
        console.log("No More!")
        historyIndex = userHistory.length - 1;
        return;
      }

      if (historyIndex + 1 > userHistory.length - 1) {
        return;
      }
      
      historyIndex++;

      if (!userHistory[historyIndex]) {
        commandsInput.value = userHistory[userHistory.length - 1];
        return;
      }

      commandsInput.value = userHistory[historyIndex];

    }

  }

})