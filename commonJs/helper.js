function sum(x, y) {
  return x + y;
} // 0x754
function multi(x, y) {
  return x * y;
}
const xx = 5;
function double(x, multi) {
  return x * multi;
}

function sumAndMultipy(x, y) {
  const result = sum(x, y) + multi(x, y);
  return result;
}

module.exports = {
  multi,
  sum,
  sumAndMultipy,
};
// default export
module.exports = sumAndMultipy;
