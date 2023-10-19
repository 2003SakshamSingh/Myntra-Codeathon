var firebaseConfig = {
    apiKey: "AIzaSyD09nDzD73ieZzOvpLTj2H5nL9Ncrn9bVg",
  authDomain: "myntra-codeathon.firebaseapp.com",
  projectId: "myntra-codeathon",
  storageBucket: "myntra-codeathon.appspot.com",
  messagingSenderId: "796268558165",
  appId: "1:796268558165:web:4dcc91ef4727dbeec0e1dc",
  measurementId: "G-3N3QT2B8GB"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  const db = firebase.firestore();
