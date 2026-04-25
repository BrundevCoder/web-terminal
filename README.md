<img width="1365" height="624" alt="image" src="https://github.com/user-attachments/assets/4ea29dd4-eb92-4911-a8ef-24b0364fb930" />

# Web Terminal

Introducing my first web terminal! Although it doesn't work with all command types, I added some really cool custom ones, trying to mimic the aesthetics of a terminal with greenish colors to make it look like an older model :)

## How it works
Basically, the code detects user input and checks if what they typed exists in an array of commands. If it does exist, it moves on to the next check, which is to discover the command and execute it. Otherwise, it throws an error such as:

<img width="367" height="92" alt="image" src="https://github.com/user-attachments/assets/ab56803f-1431-49c9-817f-bb0dc0966886" />

## What does each function in my script.js do?

- `addUserCommandToList`: Adds the command that the user typed to the UI.
- `addCustomLineToList`: Basically, this is where the output is initiated. It takes two parameters: the command to display, and the type... if it's an error, string, int.
- `clear`: This command simply clears the entire terminal.
- `getRandomLetter`: It generates a random number, retrieves the letter from an array, and returns it.
- `getRandomNumber`: Same thing as `getRandomLetter` but for a number.
- `explode`: Here we start the explosion function, basically it performs a 3-second countdown and removes a command from your console :P
- `exit`: It simply clears the entire screen, like exiting a terminal.
- `handleCommands`: This is the main function of the code, it handles the input and decides what to do with it.


## More information:

- If you click "Enter", it automatically sends your input, and at the end of the action, it returns focus to the input so you don't have to click it every time.
