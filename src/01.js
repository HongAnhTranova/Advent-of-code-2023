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

// 1abc2
// pqr3stu8vwx
// a1b2c3d4e5f
// treb7uchet

// In this example, the calibration values of these four lines are 12, 38, 15, and 77. Adding these together produces 142.

// Consider your entire calibration document. What is the sum of all of the calibration values?

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
  const digitNestedArray = textArr.map((element) => {
    const elementArrx = Object.entries(wordNumber).forEach(([key, value]) => {
      const newElement = element;
      if (element.includes(key)) {
        newElement.replaceAll(key, value);
      }

      console.log(element.includes(key), element);
      return newElement;
    });

    const elementArr = element.split("");

    // replaceAll(elementArr, wordNumber);

    const result = [];
    elementArr.forEach((char) => {
      if (isDigit(char)) {
        result.push(char);
      }
    });

    return result;
  });

  const result = digitNestedArray.reduce((acc, element) => {
    const elementNumber = +(element.at(0) + element.at(element.length - 1));
    return acc + elementNumber;
  }, 0);

  console.log(result);
  return result;
}

// count(readInputLines("01"));
// count(readInputLines("011"));

// count(" 1abc2\npqr3stu8vwx\na1b2c3d4e5f\ntreb7uchet");
count(
  "two1nine\neightwothree\nabcone2threexyz\nxtwone3four\n4nineeightseven2\nzoneight234\n7pqrstsixteen"
);
