import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import {
  getFirestore, collection, addDoc, serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";
import {
  getAuth, onAuthStateChanged
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
    window.location.href = "login.html";
  }
});

// ফর্ম সাবমিট হ্যান্ডলার
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  msg.style.color = "black";
  msg.textContent = "Uploading post...";

  const title = document.getElementById("title").value.trim();
  const category = document.getElementById("category").value;
  const description = document.getElementById("description").value.trim();
  const thumbnailURLInput = document.getElementById("thumbnailURL").value.trim();

  // ডিফল্ট থাম্বনেইল
  const defaultThumbnail = "https://i.ibb.co/mT7F2Lb/default-thumbnail.jpg";
  const thumbnailURL = thumbnailURLInput || defaultThumbnail;

  if (!title || !category || !description) {
    msg.style.color = "red";
    msg.textContent = "❌ Please fill all required fields.";
    return;
  }

  try {
    let role = "User";
    const adminEmails = ["shanwebfix@gmail.com"]; // অ্যাডমিন ইমেইল
    if (currentUser && adminEmails.includes(currentUser.email)) {
      role = "Admin";
    }

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
    msg.innerHTML = `✅ Post added! <a href="/blog/post.html?id=${docRef.id}&cat=${category}" target="_blank">View Post</a>`;
    form.reset();

  } catch (err) {
    console.error(err);
    msg.style.color = "red";
    msg.textContent = "❌ Error: " + err.message;
  }
});
