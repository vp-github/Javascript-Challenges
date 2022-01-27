"use strict";
document.querySelector("#input-id").addEventListener("keyup", (event) => {
  if (event.key !== "Enter") return;
  document.querySelector("#check-btn").click();
  event.preventDefault();
});
function getResults() {
  const statement = document.getElementById("input-id").value;
  statement === ""
    ? alert("Expression Cannot be Empty")
    : checkResults(statement);
}
function checkResults(str) {
  let flower = 0,
    square = 0,
    curved = 0;
  for (let i = 0; i < str.length; i++) {
    switch (str[i]) {
      case "{":
        flower++;
        break;
      case "}":
        flower--;
        break;
      case "[":
        square++;
        break;
      case "]":
        square--;
        break;
      case "(":
        curved++;
        break;
      case ")":
        curved--;
        break;
    }
  }
  flower === 0 && square === 0 && curved === 0
    ? alert("True!! The Expression is correct.")
    : alert("False!! Check the Paranthesis.");
}
