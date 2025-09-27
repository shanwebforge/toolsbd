// /blog/js/addpost.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import {
  getFirestore, collection, addDoc, serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";
import {
  getAuth, onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";

// Firebase config
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
const db = getFirestore(app);
const auth = getAuth(app);

const form = document.getElementById("addPostForm");
const msg = document.getElementById("msg");
const authorInput = document.getElementById("author");

let currentUser = null;

// ইউজার লগইন চেক
onAuthStateChanged(auth, user => {
  if (user) {
    currentUser = user;
    authorInput.value = user.displayName || user.email;
  } else {
    alert("Please login first!");
    window.location.href = "/blog/login.html";
  }
});

// ফর্ম সাবমিট হ্যান্ডলার
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  msg.style.color = "black";
  msg.textContent = "পোস্ট আপলোড হচ্ছে...";

  const title = document.getElementById("title").value.trim();
  const category = document.getElementById("category").value;
  const description = document.getElementById("description").value.trim();

  // Optional thumbnail from description (copy-paste auto detect)
  let thumbnailURL = "";
  const imgMatch = description.match(/(https?:\/\/.*\.(?:png|jpg|jpeg|webp))/i);
  if (imgMatch) thumbnailURL = imgMatch[0];
  if (!thumbnailURL) thumbnailURL = "/blog/assets/default-thumbnail.webp";

  if (!title || !category || !description) {
    msg.style.color = "red";
    msg.textContent = "❌ Please fill all required fields.";
    return;
  }

  try {
    let role = "User";
    const adminEmails = ["shantool@gmail.com"]; // Admin emails
    if (currentUser && adminEmails.includes(currentUser.email)) role = "Admin";

    const docRef = await addDoc(collection(db, category), {
      title,
      author: currentUser.displayName || currentUser.email,
      role,
      category,
      thumbnail: thumbnailURL,
      description,
      likes: 0,
      dislikes: 0,
      timestamp: serverTimestamp()
    });

    msg.style.color = "green";
    msg.innerHTML = `✅ পোস্ট সফলভাবে যোগ হয়েছে! <a href="/blog/post.html?id=${docRef.id}&cat=${category}" target="_blank">View Post</a>`;
    form.reset();

  } catch (err) {
    console.error(err);
    msg.style.color = "red";
    msg.textContent = "❌ কিছু ভুল হচ্ছে: " + err.message;
  }
});
