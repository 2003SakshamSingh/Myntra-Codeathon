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


const loginoutbtn = document.querySelector('#loginout');

async function signout(){
  await firebase.auth().signOut();
  location.replace("Login.html");
}


firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    loginoutbtn.innerText = "SignOut";

    loginoutbtn.addEventListener('click', signout);
    

    var uid = user.uid;
    // ...
  } else {
    // User is signed out
    // ...


    loginoutbtn.innerText = "Login/Register";
    loginoutbtn.addEventListener('click', ()=>{location.replace("Login.html");})
  }
});

const cartCountInfo = document.getElementById("cart-count-info");
let count = JSON.parse(localStorage.getItem("cart"));
cartCountInfo.textContent = count.length;
