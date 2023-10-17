import { navbar } from "../Component/navbar.js";
import { footer } from "../Component/footer.js";
let header = document.getElementById("Home-headerEl");
header.innerHTML = navbar();
let footerEl = document.getElementById("home-footer");
footerEl.innerHTML = footer();
/* BANNER SLIDESHOW IMAGE DISPLAY FUNCTION */
var counter1 = 1;
setInterval(function () {
  document.getElementById("radio" + counter1).checked = true;
  counter1++;
  if (counter1 > 5) {
    counter1 = 1;
  }
}, 4000);

/* FIRST PURCHASE SUCCESS STORIES SLIDESHOW IMAGE DISPLAY FUNCTION */
var counter2 = 6;
setInterval(function () {
  document.getElementById("radio" + counter2).checked = true;
  counter2++;
  if (counter2 > 10) {
    counter2 = 6;
  }
}, 3000);

const cartCountInfo = document.getElementById("cart-count-info");
let count = JSON.parse(localStorage.getItem("cart"));
cartCountInfo.textContent = count.length;
