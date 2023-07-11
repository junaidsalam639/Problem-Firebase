// SING IN 
const sing = document.getElementById("sing");
console.log(sing);
sing.addEventListener('click', () => {
    alert("WELCOME TO SING IN")
    window.location.href = './singin.html'
})


// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getAuth , signInWithEmailAndPassword, createUserWithEmailAndPassword , sendEmailVerification ,GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyDnQAk5ONtVrlVukJNA1ah4dt0kZVCpzBk",
    authDomain: "save-be155.firebaseapp.com",
    projectId: "save-be155",
    storageBucket: "save-be155.appspot.com",
    messagingSenderId: "863459774933",
    appId: "1:863459774933:web:a3f93c5c1e9c547212ad5c",
    measurementId: "G-RJZGW4XBQG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const google = new GoogleAuthProvider()

// SING IN KA FUNCTION
const btn = document.getElementById("btn");
console.log(btn);
btn.addEventListener('click', () => {

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    console.log(email, password);
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user);
            if (user.emailVerified == true) {
                alert("SING IN SUCCESSFULLY");
                window.location.href = './index.html'
                sing.innerHTML = 'Log out'
                
            } else {
                alert("Please verified Your Email!");
            }
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert("Ap singUp krlo Phele");
            window.location.href = './singup.html'
        });
});

// SING UP KA FUNCTION
const btn1 = document.getElementById("btn1")
btn1.addEventListener('click', () => {

    let email = document.getElementById("email1").value;
    let password = document.getElementById("password1").value;
    console.log(email, password);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        alert("SING UP SUCCESSFULLY");

        sendEmailVerification(auth.currentUser)
          .then(() => {
            alert("Email sent Check Your Gmail!");
          });

        const user = userCredential.user;
        console.log(user);
        setTimeout(() => {
          window.location.href = './singin.html'
        }, 8000);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  });



// Google Sing-In
let google_Sing = document.getElementById("google");
google_Sing.addEventListener('click', (e) => {
    signInWithPopup(auth, google)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            window.location.href = './index.html'
        })
}).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
});