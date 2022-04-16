function isValidDegenerate(x1, y1, x2, y2, x3, y3) {
  if ((y1 == y2) == y3 || (x1 == x2) == x3) {
    return false;
  }
  let ab = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
  let bc = Math.sqrt(Math.pow(x2 - x3, 2) + Math.pow(y2 - y3, 2));
  let ac = Math.sqrt(Math.pow(x1 - x3, 2) + Math.pow(y1 - y3, 2));

  if (ab + bc > ac && bc + ac > ab && ab + ac > bc) {
    return true;
  }
  return false;
}
function pBelonging(minXaxis, maxXaxis, minYaxis, maxYaxis, xp, yp, xq, yq) {
  if (xp >= minXaxis && xp <= maxXaxis && yp >= minYaxis && yp <= maxYaxis) {
    return true;
  }
  return false;
}
function qBelonging(minXaxis, maxXaxis, minYaxis, maxYaxis, xp, yp, xq, yq) {
  if (xq >= minXaxis && xq <= maxXaxis && yq >= minYaxis && yq <= maxYaxis) {
    return true;
  }
  return false;
}
function pointsBelong(x1, y1, x2, y2, x3, y3, xp, yp, xq, yq) {
  // Write your code here
  if (!isValidDegenerate(x1, y1, x2, y2, x3, y3)) {
    return 0;
  }
  let minXaxis = Math.min(x1, x2, x3);
  let maxXaxis = Math.max(x1, x2, x3);

  let minYaxis = Math.min(y1, y2, y3);
  let maxYaxis = Math.max(y1, y2, y3);

  let isPBelong = pBelonging(
    minXaxis,
    maxXaxis,
    minYaxis,
    maxYaxis,
    xp,
    yp,
    xq,
    yq
  );

  let isQBelong = qBelonging(
    minXaxis,
    maxXaxis,
    minYaxis,
    maxYaxis,
    xp,
    yp,
    xq,
    yq
  );
  if (isPBelong && isQBelong) {
    return 3;
  }
  if (isPBelong && !isQBelong) {
    return 1;
  }
  if (isQBelong && !isPBelong) {
    return 2;
  }
  if (!isPBelong && !isQBelong) {
    return 4;
  }
}
