parent = document.querySelector(".table-div");
document.querySelector("#input-id").addEventListener("keyup", (event) => {
  if (event.key === "Enter") getResults();
});
function getResults() {
  const sentence = document.getElementById("input-id").value;
  sentence === ""
    ? alert("Sentence Cannot be Empty")
    : parent.innerHTML.length === 0
    ? checkResults(sentence)
    : (parent.innerHTML = "");
}
function reset() {
  document.getElementById("input-id").value = "";
  location.reload();
}
function checkResults(sent) {
  let textArray = [
    ...sent.toLowerCase().replace(".", "").replace(",", "").split(" "),
  ];
  let mod = {};
  textArray.forEach((x) => {
    mod[x] = (mod[x] || 0) + 1;
  });
  // console.log(mod);

  // let modArray = [textArray[0]];
  // for (let i = 1; i < textArray.length; i++) {
  //   if (!modArray.includes(textArray[i])) {
  //     modArray.push(textArray[i]);
  //   }
  // }
  // let countArray = new Array(modArray.length).fill(0),
  //   flag = 0;
  // modArray.forEach((element) => {
  //   textArray.forEach((item) => {
  //     if (element === item) {
  //       countArray[flag] += 1;
  //     }
  //     // console.log(`textArray: ${item}, modArray: ${element}`);
  //   });
  //   flag++;
  // });

  const table = document.createElement("table");
  table.innerHTML = `
  <tr>
    <th>Words</th>
    <th>Count</th>
  </tr>
      `;
  parent.appendChild(table);
  addToTable(mod);
  //   for (let i = 0; i < modArray.length; i++) {
  //     addToTable(modArray[i], countArray[i]);
  //   }
  function addToTable(object) {
    const keyList = Object.keys(mod);
    const valueList = Object.values(mod);
    for (let i = 0; i < keyList.length; i++) {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${keyList[i]}</td>
        <td>${valueList[i]}</td>
          `;
      parent.appendChild(row);
    }
  }
}
