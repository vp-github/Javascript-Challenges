"use strict";
const fromDropdown = document.querySelector(".from-select");
const toDropdown = document.querySelector(".to-select");
const inputBox = document.querySelector(".input-class");
const result = document.querySelector(".result-div");
const key = `2a49d69efa60953b762da37c`;
const url =
  " https://v6.exchangerate-api.com/v6/2a49d69efa60953b762da37c/latest/INR";
fromDropdown.innerHTML = `<option> Select </option>`;
toDropdown.innerHTML = `<option> Select </option>`;
let fromValue = "";
let toValue = "";
function reset() {
  location.reload();
}
function callApi() {
  const response = fetch(url)
    .then((data) => data.json())
    .then((result) =>
      Object.keys(result.conversion_rates).forEach((item) => {
        fromDropdown.innerHTML += `<option value="${item}">${item}</option>`;
        toDropdown.innerHTML += `<option value="${item}">${item}</option>`;
      })
    )
    .catch((error) => console.log(error));
}
fromDropdown.addEventListener("change", function () {
  fromValue = this.value;
});
toDropdown.addEventListener("change", function () {
  toValue = this.value;
});
function convert() {
  const userInput = inputBox.value;
  // console.log(userInput);
  const getUrl = `https://v6.exchangerate-api.com/v6/2d0e548ecb8d80c5f5c6f30c/latest/${fromValue}`;
  fetch(getUrl)
    .then((data) => data.json())
    .then((response) => {
      calculate(response.conversion_rates[toValue], userInput);
    })
    .catch((error) => console.log(error));
}
callApi();
function calculate(oneValue, input) {
  const finalResult = (oneValue * input).toFixed(3);
  result.innerHTML = `<h6>Converted!  ${input} ${fromValue} = ${finalResult} ${toValue}</h6>
                      <p>Note: 1 ${fromValue} =  ${oneValue} ${toValue}</p>
                      <div class="reset"><button type="reset" onclick="reset();" class="btn">Reset</button></div>`;
}
