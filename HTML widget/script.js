"use strict";
const stars = document.querySelectorAll(".fa-star");
//console.log(stars);

stars.forEach((star) => {
  star.addEventListener("click", function (event) {
    stars.forEach((str) => str.classList.remove("rated"));
    selection(event.target.id);
  });
});
function selection(n) {
  for (let i = 0; i <= n; i++) {
    stars[i].classList.add("rated");
  }
}
