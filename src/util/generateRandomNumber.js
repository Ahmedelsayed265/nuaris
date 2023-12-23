function generateRandomNumber() {
  let randomNumbers = [];
  for (let i = 0; i < 6; i++) {
    let randomNumber = Math.floor(Math.random() * 10);
    randomNumbers.push(randomNumber);
  }
  return randomNumbers.join("");
}

export default generateRandomNumber;
