// modal add
const addModal = document.querySelector('.add-modal');

const btnAdd = document.querySelector('.btn-add');

const tableUsers = document.querySelector('.carousel-inner');

const addModalForm = document.querySelector('.formcard')



// click submit in add modal form
addModalForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById("email").value;
   const password = document.getElementById("password").value;
   firebase
     .auth()
     .createUserWithEmailAndPassword(email, password)
});

// changing the webpage on authorization
 firebase.auth().onAuthStateChanged((user) => {
   if (user) {
     console.log(user);
    firebase.firestore().collection('users').doc(user.uid).get().then(doc=>{
      if(doc.exists){location.replace("home.html");}
      else{
        firebase.firestore().collection('users').doc(user.uid).set({
          name: addModalForm.username.value,
          email: addModalForm.email.value
        })
        .then(() => {
          console.log(`Firestore document created for user: ${user.uid}`);
          location.replace("home.html");
        })
        .catch((error) => {
          console.error(`Error creating Firestore document: ${error}`);
        });
      }
    });
   }
 })