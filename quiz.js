function validateTriangle(x1, y1, x2, y2, x3, y3) {
  const ab = x2 - x1 + (y2 - y1);
  const bc = Math.sqrt((x2 - x3) ** 2 + (y2 - y3)) ** 2;
  const ac = Math.sqrt((x3 - x1) ** 2 + (y3 - y1) ** 2);

  let val = false;

  if (ab + bc > ac && bc + ac > ab && ab + ac > bc) {
    val = true;
  }

  return val;
}

function pointsBelong(xp, yp, xq, yq) {}

console.log(validateTriangle(2, 2, 7, 2, 5, 4));
console.log(validateTriangle(0, 0, 0, 2, 4, 0));
