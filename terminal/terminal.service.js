'use strict';
import { list } from './script.js';

const QUOTE_API_URL = 'https://dummyjson.com/quotes/random';

const BUILD_IN_COMMANDS = {
  clear: clearChat,
  help: getHelp,
  quote: getQuote,
  double: double,
};

const CUSTOM_COMMANDS = {
  hello: {
    msg: 'Hello :)'
  }
}

export const COMMANDS = Object.assign(BUILD_IN_COMMANDS, CUSTOM_COMMANDS)

async function getQuote() {
  try {
    const response = await fetch(QUOTE_API_URL);

    if (response.ok) {
      const answer = await response.json();
      return `<i>${answer.quote}</i> ${answer.author}`;
    }
  } catch (error) {
    console.warn(error);
  }
}

function getHelp() {
  return Object.getOwnPropertyNames(COMMANDS).toString();
}

function clearChat() {
  list.querySelectorAll('li').forEach((li) => li.remove());
  return null;
}

function double(value) {
  return value * 2;
}
