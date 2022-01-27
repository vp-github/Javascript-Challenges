"use strict";
const parent = document.querySelector(".sub-container");
const hobbies = {
  steve: ["Fashion", "Piano", "Reading"],
  Patty: ["Dancing", "Magic", "Pets"],
  Chad: ["Puzzles", "Pets", "Yoga"],
};
const arr = [];
function reset() {
  document.getElementById("input-id").value = "";
  location.reload();
}
document.querySelector("#input-id").addEventListener("keyup", (event) => {
  if (event.key === "Enter") getResults();
  event.preventDefault();
});
function getResults() {
  const userInput = document.querySelector("#input-id").value;
  const answer = getKeyByValue(hobbies, userInput);
  const result = document.createElement("div");
  answer.length !== 0
    ? (result.innerHTML = `
    <div class="result-display">
      ${answer}
    </div>
      `)
    : (result.innerHTML = `
    <div class="result-display">
      Sorry, It's no one's hobby.
    </div>
      `);
  parent.appendChild(result);
}
function getKeyByValue(object, value) {
  const keyList = Object.keys(object);
  for (let i = 0; i < keyList.length; i++) {
    if (object[keyList[i]].find((item) => item === value)) {
      arr.push(keyList[i]);
    }
  }
  return arr;
}
