"use strict";
const data = [
  { start: "Tirunelveli", end: "Madurai", days: 2 },
  { start: "Madurai", end: "Trichy", days: 2 },
  { start: "Trichy", end: "Chennai", days: 3 },
  { start: "Madurai", end: "Coimbatore", days: 3 },
  { start: "Coimbatore", end: "Chennai", days: 3 },
  { start: "Madurai", end: "Salem", days: 3 },
  { start: "Salem", end: "Bangalore", days: 2 },
  { start: "Chennai", end: "Bangalore", days: 2 },
  { start: "Bangalore", end: "Mumbai", days: 3 },
  { start: "Chennai", end: "Mumbai", days: 5 },
  { start: "Coimbatore", end: "Bangalore", days: 3 },
];

const places = [
  "Tirunelveli",
  "Chennai",
  "Coimbatore",
  "Salem",
  "Trichy",
  "Madurai",
  "Bangalore",
  "Mumbai",
];
const startInput = document.querySelector(".start");
const endInput = document.querySelector(".end");
const dateInput = document.querySelector(".date");
const result = document.querySelector(".result-div");
let tempRouteArr = [],
  tempDistArr = [],
  routeArr = [],
  distArr = [],
  count = 0;
places.forEach((item) => {
  startInput.innerHTML += `<option value="${item}">${item}</option>`;
  endInput.innerHTML += `<option value="${item}">${item}</option>`;
});

document.querySelector(".go-btn").addEventListener("click", () => {
  getResults();
});
function reset() {
  location.reload();
}

function getResults() {
  const startValue = startInput.value;
  const endValue = endInput.value;

  checkRoute(startValue, endValue);
  displayResults(routeArr, distArr);
}

function checkRoute(startValue, endValue) {
  for (let i = 0; i < data.length; i++) {
    if (startValue === endValue) {
      tempRouteArr.push(`${startValue}`);
      routeArr[count] = [...tempRouteArr.reverse()];
      distArr[count] = tempDistArr.reduce((a, b) => a + b, 0);
      count++;
      tempRouteArr.length = 0;
      tempDistArr.length = 0;
      return;
    }
    if (endValue === data[i].end) {
      tempRouteArr.push(`${data[i].end}`);
      tempDistArr.push(data[i].days);
      checkRoute(startValue, data[i].start);
    }
  }
}
function displayResults(routeArr, distArr) {
  let index = distArr.indexOf(Math.min(...distArr));
  let dateValue = new Date(dateInput.value);
  let newDate = new Date(
    dateValue.setDate(dateValue.getDate() + Math.min(...distArr))
  );

  var someFormattedDate = newDate.toLocaleDateString();
  result.innerHTML += `So the best route is..`;
  for (let i = 0; i < routeArr.length; i++) {
    if (i === routeArr.length - 1) {
      result.innerHTML += ` ${routeArr[index][i]}!`;
    } else result.innerHTML += ` ${routeArr[index][i]} -> `;
  }
  result.innerHTML += `  That is going to take ${Math.min(
    ...distArr
  )} days. So, You will reach there by ${someFormattedDate}`;
  result.classList.add("result-class");
}
