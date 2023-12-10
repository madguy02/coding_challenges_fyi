/*
How to parse a json file

1. tokenizing
2. parsing

first step would be to check if all types can be broken into simple understandable fragments
second step would be to try and make sense out of these broken pieces

*/

import { Token } from "./types";
import { isNumber } from "./utils";


export const tokenizer = (input: string): Token[] => {
  let current = 0;
  const tokens: Token[] = [];

  while (current < input.length) {
    let char = input[current];

    if (char === "{") {
      tokens.push({ type: "BraceOpen", value: char });
      current++;
      continue;
    }

    if (char === "}") {
      tokens.push({ type: "BraceClose", value: char });
      current++;
      continue;
    }

    if (char === "[") {
      tokens.push({ type: "BracketOpen", value: char });
      current++;
      continue;
    }
    if (char === "]") {
      tokens.push({ type: "BracketClose", value: char });
      current++;
      continue;
    }

    if (char === ":") {
      tokens.push({ type: "Colon", value: char });
      current++;
      continue;
    }

    if (char === ",") {
      tokens.push({ type: "Comma", value: char });
      current++;
      continue;
    }

    if (char === '"') {
      let value = "";
      char = input[++current];
      while (char !== '"') {
        value += char;
        char = input[++current];
      }
      current++;
      tokens.push({ type: "String", value });
      continue;
    }

    if (/[\d\w]/.test(char)) {
      let value = "";
      while (/[\d\w]/.test(char)) {
        value += char;
        char = input[++current];
      }

      if (isNumber(value)) tokens.push({ type: "Number", value });
      else {
        throw new Error("Unexpected value: " + value);
      }
      

      continue;
    }

    if (/\s/.test(char)) {
      current++;
      continue;
    }

    throw new Error("Unexpected character: " + char);
  }

  return tokens;
};
