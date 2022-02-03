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
const dateNow = new Date().toISOString().split("T").shift();
dateInput.value = dateNow;
let tempRouteArr = [],
  tempDistArr = [],
  routeArr = [],
  distArr = [],
  newDate;
places.forEach((item) => {
  startInput.innerHTML += `<option value="${item}">${item}</option>`;
  endInput.innerHTML += `<option value="${item}">${item}</option>`;
});
document.querySelector(".go-btn").addEventListener("click", () => {
  const startValue = startInput.value;
  const endValue = endInput.value;
  if (startValue == "" || endValue == "") alert("Please Check Your Inputs!");
  else getResults(startValue, endValue);
});
function getResults(startValue, endValue) {
  checkRoute(startValue, endValue);
  optimizeRoute(routeArr, distArr, endValue);
  displayResults(routeArr, distArr);
}
function reset() {
  location.reload();
}
function checkRoute(startValue, endValue) {
  if (startValue === endValue) {
    tempRouteArr.push(`${startValue}`);
    routeArr.push([...tempRouteArr.reverse()]);
    distArr.push(tempDistArr.reduce((a, b) => a + b, 0));
    tempRouteArr.length = 0;
    tempDistArr.length = 0;
    return;
  }
  for (let i = 0; i < data.length; i++) {
    if (endValue === data[i].end) {
      tempRouteArr.push(`${data[i].end}`);
      tempDistArr.push(data[i].days);
      checkRoute(startValue, data[i].start);
    }
    if (data[i].start !== startValue) {
      if (i === 10) {
        tempRouteArr.pop();
        tempDistArr.pop();
      }
    }
  }
}
function optimizeRoute(routeArr, distArr, endValue) {
  for (let i = 0; i < routeArr.length; i++) {
    if (endValue !== routeArr[i][routeArr[i].length - 1]) {
      data.forEach((item) => {
        if (
          endValue === item.end &&
          item.start === routeArr[i][routeArr[i].length - 1]
        ) {
          routeArr[i].push(item.end);
          distArr[i] = distArr[i] + item.days;
        }
      });
    }
  }
}
function displayResults(routeArr, distArr) {
  if (routeArr.length === 0) {
    result.innerHTML = "Oops!!! No Route Found 😓";
  } else {
    result.innerHTML = "";
    let min = Math.min(...distArr);
    let formattedDate = dateCalculation(min);
    let index = distArr.indexOf(min);

    result.innerHTML += `So the best route is.. <br><br>`;
    for (let i = 0; i < routeArr[index].length; i++) {
      if (routeArr[index].length - 1 === i) {
        result.innerHTML += `${routeArr[index][i]}`;
      } else result.innerHTML += `${routeArr[index][i]} -> `;
    }

    result.innerHTML += ` <br><br> That is going to take ${min} days. So, Will reach there by ${formattedDate}`;
    result.classList.add("result-class");
  }
  function dateCalculation(num) {
    let dateValue = new Date(dateInput.value);
    let dayValue = dateValue.getDay() + 1;
    let numCopy = num;
    while (numCopy >= 0) {
      if (dayValue < 7 && dayValue > 1) {
        newDate = new Date(dateValue.setDate(dateValue.getDate() + 1));
        dayValue = newDate.getDay() + 1;
      } else {
        newDate = new Date(dateValue.setDate(dateValue.getDate() + 2));
        dayValue = newDate.getDay() + 1;
      }
      numCopy--;
    }
    var someFormattedDate = newDate.toLocaleDateString();
    return someFormattedDate;
  }
}
