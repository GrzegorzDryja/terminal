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
  const userCommand = event.target.value.toLowerCase();
  const item = document.createElement('li');
  item.innerText = `you: ${userCommand}`;
  list.appendChild(item);

  if (COMMANDS?.[userCommand]) {
    const itemChat = document.createElement('li');
    const text = await COMMANDS[userCommand]();
    if (!text) return;

    itemChat.innerHTML = `terminal: ${text}`;
    list.appendChild(itemChat);
    return;
  }

  const errorChat = document.createElement('li');
  errorChat.innerText = `terminal: I can't understand You. Type HELP for available commands or add new custom once`;
  list.appendChild(errorChat);
});

terminal.appendChild(input);
terminal.appendChild(list);

main[0].appendChild(terminal);
