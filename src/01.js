#!/usr/bin/env node

import * as fs from "node:fs";
import path from "node:path";

const wordNumber = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

export function readInputLines(name) {
  const dirname = new URL(".", import.meta.url).pathname;
  const dir = path.dirname(dirname);

  return fs.readFileSync(path.join(dir, "input", name + ".txt"), "utf-8");
}

/** @param {string} text */

function isDigit(char) {
  return (
    typeof char === "number" ||
    (typeof char === "string" &&
      char.replaceAll(" ", "") !== "" &&
      !isNaN(+char))
  );
}

function count(text) {
  const textArr = text.split("\n").filter((element) => element !== "");

  /** @var {string[]} digitNestedArray */

  const digitNestedArray = textArr.map((line) => {
    const lineArr = [];
    const elementArr = line.split("");

    for (let i = 0; i < line.length; i++) {
      Object.entries(wordNumber).forEach(([key, value]) => {
        const index = line.indexOf(key, i);

        if (index != -1) {
          lineArr.push({ value: String(value), index });
        }
      });
    }

    elementArr.forEach((char, index) => {
      if (isDigit(char) && char !== "0") {
        lineArr.push({ value: char, index: index });
      }
    });

    lineArr.sort((a, b) => a.index - b.index);

    return lineArr.map((element) => element.value);
  });

  const result = digitNestedArray.reduce((acc, element) => {
    const elementNumber = +(element.at(0) + element.at(element.length - 1));
    return acc + elementNumber;
  }, 0);

  console.log(result);
  return result;
}

count(
  "two1nine\neightwothree\nabcone2threexyz\nxtwone3four\n4nineeightseven2\nzoneight234\n7pqrstsixteen"
);

count(readInputLines("01"));
