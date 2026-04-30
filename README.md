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

## Do you have questions about how some functions work?
### I hope this can help:

- `uninstall_commands`: This command literally deletes all commands from the terminal, so you won't be able to use any more. To revert, simply reset the page!
- `explode()`: If you're encountering errors, it might be due to the '()' characters; they're necessary for the code to function! This command simply deletes your last current command, so you'll lose some. If you want to revert, just refresh the page!
- `get_random_letter()`: It's not working? Maybe it's because the "()" are necessary for it to work!
- `get_random_number()`: It's not working? Maybe it's because the "()" are necessary for it to work!
- `exit()`: It's not working? Maybe it's because the "()" are necessary for it to work! Furthermore, this function literally kills the terminal, so you can only type again when you refresh the page!
- `500_uninstall_commands()`: It's not working? Maybe it's because the "()" are necessary for it to work! Furthermore, this function will also kill your terminal; it was made purely for entertainment and will literally fill your terminal with messages!
- `500_explode()`: same as the previous command.
- `rotate(degrees)`: Did you get an error? You probably forgot the parentheses, or just type something like 'rotate(180)', typing something like 'rotate(180deg)' won't work!
- `debug`: Each time you type this command, it changes to the opposite of the current debug setting; if it was already on, then you will turn it off, and if it was off, then you will turn it on.
- `Filter Functions` like "sepia", "grayscale", "hue-rotate" and more... Not working? To apply the filter you typed (there can be several as well), you need to type: `update_filters` to add them to your terminal. And to remove them? Simple. Just type: `remove_filters`
- `update_filters`: This function updates the filters you selected by typing filter commands! It updates based on an array that stores the filters the user types and applies them!
- `remove_filters`: This function clears the filter array and uses `update_filters` to clear your screen!

## More information:

- If you click "Enter", it automatically sends your input, and at the end of the action, it returns focus to the input so you don't have to click it every time.
- You can use the up and down arrow keys on your keyboard to navigate your typed command history!

# Notes on the new update (April 30, 2026) :
- New commands: open, brightness, invert, contrast, sepia, grayscale, hue-rotate, remove_filters, update_filters, skew, info
- Added **new** sound effect (There wasn't before) to `drum`, `meow` command and when you type a command that doesn't exist
- Terminal Filters
- `open` commands like `open youtube`, they O=open a new tab in your browser with the supposed link. Type: `open youtube` redirects to: `https://www.youtube.com/`

## Notes on the new update (April 28, 2026) :
- New commands: blur, unblur, debug, rotate(degrees)
- Added a **history** of typed commands; simply press the **arrow keys** (up and down) on your keyboard to navigate through the history!

## Notes on the new update (April 25, 2026) :
- New commands: uninstall_commands, 500_explode(), 500_uninstall_commands(), meow
- Added a **history** of typed commands; simply press the **arrow keys** (up and down) on your keyboard to navigate through the history!
