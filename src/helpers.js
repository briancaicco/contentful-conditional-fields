function toTitleCase(str) {
  const [firstLetter, ...rest] = str;
  const newStr = [firstLetter.toUpperCase(), ...rest].join('');
  return newStr;
}

function unslugify(str) {
  const newStr = toTitleCase(str).replace('_', ' ');
  return newStr;
}

export { toTitleCase, unslugify };
