#!/usr/bin/env node

import * as fs from "node:fs";
import path from "node:path";

export function readInputLines(name) {
  const dirname = new URL(".", import.meta.url).pathname;
  const dir = path.dirname(dirname);

  return fs.readFileSync(path.join(dir, "input", name + ".txt"), "utf-8");
}

function count1(input) {
  const ballsInBag = {
    red: 12,
    green: 13,
    blue: 14,
  };

  const games = input.split("\n").filter((element) => element !== "");

  let result = 0;

  const validGames = games.map((game) => {
    let isGameValid = true;

    const [title, rounds] = game.split(":");

    const gameTitleIndex = +title.split(" ").at(1);

    const roundArray = rounds.split(";").map((roundItem) => roundItem.trim());

    const formattedRounds = roundArray.flatMap((round) => {
      const formattedResult = [];

      const roundItemArray = round.split(",");

      roundItemArray.forEach((item) => {
        const [numberOfBalls, coulorOfBalls] = item.trim().split(" ");

        formattedResult.push({ [`${coulorOfBalls}`]: +numberOfBalls });
      });

      return formattedResult;
    });

    Object.entries(ballsInBag).forEach(([color, limitNumber]) => {
      formattedRounds.forEach((roundItem) => {
        if (color in roundItem && roundItem[color] > limitNumber) {
          isGameValid = false;
        }
      });
    });

    return { id: gameTitleIndex, game, valid: isGameValid };
  });

  validGames.forEach((game) => {
    if (game.valid) {
      result = result + game.id;
    }
  });

  console.log("part one: ", result);

  return result;
}

// count1(
//   "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green\nGame 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue\nGame 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red\nGame 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red\nGame 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green"
// );

// count1(readInputLines("02"));

function count2(input) {
  const colors = ["red", "blue", "green"];
  const games = input.split("\n").filter((element) => element !== "");

  let result = 0;

  for (const game of games) {
    const pickedGameBalls = {};
    const [_title, rounds] = game.split(":");

    const roundArray = rounds.split(";").map((roundItem) => roundItem.trim());

    for (const round of roundArray) {
      const roundItemArray = round.split(",").map((item) => item.trim());

      for (const item of roundItemArray) {
        const [numberOfBalls, colorOfBalls] = item.split(" ");
        if (
          colorOfBalls === "red" ||
          colorOfBalls === "blue" ||
          colorOfBalls === "green"
        ) {
          if (!pickedGameBalls[colorOfBalls]) {
            pickedGameBalls[colorOfBalls] = [+numberOfBalls];
          } else {
            pickedGameBalls[colorOfBalls].push(+numberOfBalls);
          }
        }
      }
    }

    for (const color of colors) {
      pickedGameBalls[color].sort((a, b) => b - a);
    }

    let colorsMultiplied = 1;

    for (const color of colors) {
      colorsMultiplied *= pickedGameBalls[color].at(0);
    }

    result += colorsMultiplied;
  }

  console.log(result);

  return result;
}

count2(
  "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green\nGame 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue\nGame 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red\nGame 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red\nGame 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green"
);

count2(readInputLines("02"));
