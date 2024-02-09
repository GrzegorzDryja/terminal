'use strict';
import { COMMANDS } from './terminal.service.js';

const main = document.getElementsByTagName('main');

const terminal = document.createElement('terminal');
const input = document.createElement('input');

export const list = document.createElement('ul');

input.setAttribute('type', 'text');
input.setAttribute('name', 'terminal');
input.setAttribute('required', 'true');
input.addEventListener('change', async (event) => {
  //User input
  addItem('you', event.target.value);
  const userCommand = event.target.value.toLowerCase();
  input.value = '';

  //Terminal output, first check for math
  const userCommandArray = userCommand.split(' ');
  const userNumber = parseFloat(userCommandArray[1]);

  if (userCommandArray[0] === 'double' && !isNaN(userCommandArray[1]) && !isNaN(userNumber)) {
    const terminalOutput = COMMANDS.double(userNumber);
    addItem('terminal', terminalOutput);
    return;
  }

  if (COMMANDS?.[userCommand]) {
    const terminalOutput = await COMMANDS[userCommand]();
    //Guard For cleaning
    if (!terminalOutput) return;

    addItem('terminal', terminalOutput);
    return
  }

  addItem('terminal', 'Don\'t understand command, try HELP');
});

function addItem(author, text) {
  const item = document.createElement('li');
  item.innerHTML = `${author}: ${text}`;
  list.appendChild(item);
}

terminal.appendChild(input);
terminal.appendChild(list);

main[0].appendChild(terminal);
