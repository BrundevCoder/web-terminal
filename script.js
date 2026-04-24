const commandsInput = document.getElementById("commandInput");
const commandsUl = document.getElementById("commands-ul");

const avaiableCommands = [
  "drum", "idk", "commands",
  "clear", "meow", "number_of_commands",
  "ls", "explode()", "get_random_letter()",
  "get_random_number()", "exit()"
]

const customCommands = [
  {"name": "drum", "print": '"Drumming!!"'},
  {"name": "idk", "print": '"You Dont Know."'},
  {"name": "meow", "print": '"meowwww 🐈"'},
  {"name": "number_of_commands", "print": `number_of_commands: ${avaiableCommands.length}`},
  {"name": "ls", "print": 'README.md  index.html  style.css  script.js  author/'},
]

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

  let eliminateCommand = avaiableCommands[avaiableCommands.length - 1] 
  avaiableCommands.pop();

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

function handleCommands() {
  addUserCommandToList();

  let userTyped = commandsInput.value;

  // check if the command exists
  if (avaiableCommands.includes(userTyped)) {

    // serach if it is a custom command
    for (let i = 0; i < customCommands.length; i++) {
      if (customCommands[i]["name"] === userTyped) {
        addCustomLineToList(command=customCommands[i]["print"], type="string")
        break;
      }
    }
    
    // clear the terminal for user
    if (userTyped === "clear") {
      clear()
    }

    // show user all the commands
    if (userTyped === "commands") {
      addCustomLineToList(command=`Available commands: ${avaiableCommands.join(", ")}.`, type="string");
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

    // kill the Terminal
    if (userTyped === "exit()") {
      setTimeout(() => {
        exit();
      }, 1000);
    }

    return;
  }

  // if no result, give error message in the terminal
  addCustomLineToList(command=`No command found that was named: "${userTyped}"`, type="error");
  
  commandsInput.focus();

  return;
}

commandsInput.addEventListener("keydown", (e) => {
  if (e.code === "Enter") {
    handleCommands();
    commandsInput.value = "";
  }
})