import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  GoogleAuthProvider, 
  signInWithPopup 
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBTwUExxQBIGW7y9a-FCCeMoT2vHvznwIY",
  authDomain: "toolbd-blog.firebaseapp.com",
  projectId: "toolbd-blog",
  storageBucket: "toolbd-blog.appspot.com",
  messagingSenderId: "14769500623",
  appId: "1:14769500623:web:d2120963ad9123c5f422ba",
  measurementId: "G-8GJSH56WMD"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const form = document.getElementById("loginForm");
const msg = document.getElementById("msg");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  msg.style.color = "black";
  msg.textContent = "Logging in...";

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    msg.style.color = "green";
    msg.textContent = "Login successful! Redirecting...";
    form.reset();

setTimeout(() => {
  window.location.href = "profile.html"; // Login সফল হলে profile.html এ যাবে
}, 1500);

  } catch (error) {
    msg.style.color = "red";
    msg.textContent = "Error: " + error.message;
  }
});

// Google login
document.getElementById("googleLogin").addEventListener("click", async () => {
  msg.style.color = "black";
  msg.textContent = "Redirecting to Google...";

  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    msg.style.color = "green";
    msg.textContent = `Google login success! Welcome ${result.user.displayName}`;
    setTimeout(() => {
      window.location.href = "index.html";
    }, 1500);
  } catch (error) {
    msg.style.color = "red";
    msg.textContent = "Google login error: " + error.message;
  }
});
