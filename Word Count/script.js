parent = document.querySelector(".sub-container");
document.querySelector("#input-id").addEventListener("keyup", (event) => {
  if (event.key === "Enter") getResults();
  event.preventDefault();
});
function getResults() {
  const sentence = document.getElementById("input-id").value;
  sentence === "" ? alert("Sentence Cannot be Empty") : checkResults(sentence);
}
function reset() {
  document.getElementById("input-id").value = "";
}
function checkResults(sent) {
  let textArray = [
    ...sent.toLowerCase().replace(".", "").replace(",", "").split(" "),
  ];
  let modArray = [textArray[0]];

  for (let i = 1; i < textArray.length; i++) {
    if (!modArray.includes(textArray[i])) {
      modArray.push(textArray[i]);
    }
  }
  let countArray = new Array(modArray.length).fill(0),
    flag = 0;
  modArray.forEach((element) => {
    textArray.forEach((item) => {
      if (element === item) {
        countArray[flag] += 1;
      }
      // console.log(`textArray: ${item}, modArray: ${element}`);
    });
    flag++;
  });

  const table = document.createElement("table");
  table.innerHTML = `
  <tr> 
    <th>Words</th> 
    <th>Count</th>
  </tr>
      `;
  parent.appendChild(table);

  for (let i = 0; i < modArray.length; i++) {
    addToTable(modArray[i], countArray[i]);
  }
  function addToTable(word, count) {
    const row = document.createElement("tr");
    row.innerHTML = `
    <td>${word}</td> 
    <td>${count}</td>
      `;
    parent.appendChild(row);
  }
}
