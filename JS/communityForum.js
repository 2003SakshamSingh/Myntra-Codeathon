// for(let i=1; i<=5; i++){
//   document.getElementById("comm"+i).addEventListener("click", (e)=>{
//     document.getElementById("community-name").innerHTML=document.getElementById("comm"+i).textContent;
//   });
// }

/* BANNER SLIDESHOW IMAGE DISPLAY FUNCTION */
var slideCounter = 1;
      setInterval(function () {
        document.getElementById("radio" + slideCounter).checked = true;
        slideCounter++;
        if (slideCounter > 5) {
          slideCounter = 1;
        }
      }, 4000);