import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  updateProfile, 
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

const form = document.getElementById("registerForm");
const msg = document.getElementById("msg");
const googleBtn = document.getElementById("googleRegister");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  msg.style.color = "black";
  msg.textContent = "Registering...";

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  if (!name || !email || !password) {
    msg.style.color = "red";
    msg.textContent = "Please fill in all fields.";
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    await updateProfile(userCredential.user, { displayName: name });

    msg.style.color = "green";
    msg.textContent = "Registration successful! Redirecting to login...";
    form.reset();

setTimeout(() => {
  window.location.href = "profile.html"; // Register সফল হলে profile.html এ যাবে
}, 2000);

  } catch (error) {
    msg.style.color = "red";
    msg.textContent = "Error: " + error.message;
  }
});

googleBtn.addEventListener("click", async () => {
  msg.style.color = "black";
  msg.textContent = "Redirecting to Google...";

  const provider = new GoogleAuthProvider();

  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // Optionally update displayName from Google if needed
    if (!user.displayName) {
      await updateProfile(user, { displayName: user.displayName || user.email });
    }

    msg.style.color = "green";
    msg.textContent = `Google signup success! Welcome ${user.displayName || user.email}`;

    setTimeout(() => {
      window.location.href = "index.html";
    }, 1500);
  } catch (error) {
    msg.style.color = "red";
    msg.textContent = "Google signup error: " + error.message;
  }
});
