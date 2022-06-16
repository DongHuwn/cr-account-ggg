import { uniqBy } from 'lodash';

export const wait = (ms: number): Promise<void> => {
  return new Promise(function (resolve, reject) {
    setTimeout(resolve, ms);
  });
};

export const shuffleArray = (array: Array<any>): Array<any> => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};
export function isNumeric(value: string) {
  return /^-?\d+$/.test(value);
}

export const removeDuplicates = (arr: string[]): string[] => {
  return uniqBy([...arr], (e) => e);
};

export function randomInteger(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
export function randomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min);
}
export function formatted_date() {
  let result = '';
  const d = new Date();
  result += `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}`;
  return result;
}

export function randomshiftCanVas() {
  return Math.floor(Math.random() * 10) - 5;
}

export function randomWEbgl() {}
