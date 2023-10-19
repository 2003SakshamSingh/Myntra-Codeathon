const addModal = document.querySelector('.add-modal');

const btnAdd = document.querySelector('.btn-add');

const tableUsers = document.querySelector('.carousel-inner');

const addModalForm = document.querySelector('.formcard')

// login_btn.addEventListener("click", loginData);

addModalForm.addEventListener('submit', e => {
  e.preventDefault();
  const email = document.getElementById("email").value;
 const password = document.getElementById("password").value;
 firebase.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    alert("Invalid Login Credentials");
  });
});

// changing the webpage on authorization
firebase.auth().onAuthStateChanged((user) => {
 if (user) {
   location.replace("home.html");
 }
})


// function loginData() {
//   let e = email.value;
//   let p = psswrd.value;

//   if (e.length == 0) {
//     alert("Please Enter UserName");
//   } else if (p.length == 0) {
//     alert("Please Enter Password");
//   } else {
//     loadData(e, p);
//   }
// }

// async function loadData(e, p) {
//   var result = JSON.parse(localStorage.getItem("id-details"));
//   if (e == result.email && p == result.password) {
//     alert("Login Successfull!");
//     window.location.href = "../HTML/home.html";
//     email.value = "";
//     psswrd.value = "";
//   } else {
//     alert("No Account Found! Sign In Again !!");
//     email.value = "";
//     psswrd.value = "";
//   }
// }
