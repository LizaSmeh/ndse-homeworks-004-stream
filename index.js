#!/usr/bin/env node

const fs = require('fs').promises;
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

function randomNumber() {
    return Math.trunc(Math.random() * 2 + 1)
};

const ask = (question) => new Promise((resolve) => {
    rl.question(question, resolve);
});

const hiddenNumber = randomNumber();
console.log('Загадано число в диапазоне от 1 до 2');

const dataLog = new Date().toISOString();

const guessNumber = async () => {
    try {
      const answer = await ask('Введите число: ');
      const num = Number(answer);
  
      const dir = path.join(__dirname, 'logs');
      await fs.mkdir(dir, { recursive: true });
      console.log('Папка "logs" создана');
  
      const file = path.join(dir, `${dataLog}log.txt`);
  
      console.log(`Файл "${dataLog}.txt" создан`);
  
      if (isNaN(num)) {
        console.log('Введите число!');
        await fs.appendFile(file, 'введено не число\n');
        await guessNumber();
      } else if (num === hiddenNumber) {
        console.log('Вы угадали!');
        await fs.appendFile(file, `Введено:${num}. Победа`);
        rl.close();
      } else {
        console.log('Вы не угадали!');
        await fs.appendFile(file, `Введено:${num}. Не верно! \n`);
        await guessNumber();
      }
    } catch (error) {
      console.error('Произошла ошибка:', error);
    }
  };
  
  guessNumber();

