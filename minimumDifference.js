function closestNumbers(_numbers) {
  // Write your code here
  let numbers = [...new Set(_numbers)];
  let result = [];

  let min = Number.MAX_VALUE;
  numbers.sort((a, b) => a - b);

  for (let i = 0; i < numbers.length - 1; i++) {
    min = Math.min(min, Math.abs(numbers[i + 1] - numbers[i]));
  }
  for (let i = 0; i < numbers.length - 1; i++) {
    if (Math.abs(numbers[i + 1] - numbers[i]) == min) {
      //let combo = [];
      // combo.push(numbers[i]);
      //combo.push(numbers[i+1]);
      let combo = numbers[i] + ' ' + numbers[i + 1];
      result.push(combo);
    }
  }
  result.forEach((element) => {
    console.log(element);
  });
}

// closestNumbers([4, 4, -2, -1, 3]);
// console.log(closestNumbers([6, 2, 4, 10]));
console.log(closestNumbers([4, 4, -2, -1, 3]));
