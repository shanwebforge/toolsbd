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
const thumbnailFileInput = document.getElementById('thumbnailFile');
const thumbnailPreview = document.getElementById('thumbnailPreview');

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

// ফাইল সিলেক্ট করলে প্রিভিউ দেখাবে
thumbnailFileInput.addEventListener('change', () => {
  const file = thumbnailFileInput.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = e => {
      thumbnailPreview.src = e.target.result;
      thumbnailPreview.style.display = 'block';
    };
    reader.readAsDataURL(file);
  } else {
    thumbnailPreview.src = '';
    thumbnailPreview.style.display = 'none';
  }
});

// FreeImage.host এ ছবি আপলোড করার ফাংশন
async function uploadImageToFreeImageHost(file) {
  const formData = new FormData();
  formData.append('source', file);

  // API key url এ যোগ করা লাগতে পারে, নিচের লাইন পরিবর্তন করে তোমার key যোগ করো যদি লাগে
  const response = await fetch('https://freeimage.host/api/1/upload?key=6d207e02198a847aa98d0a2a901485a5', {
    method: 'POST',
    body: formData
  });
  const data = await response.json();

  if (data.status_code === 200) {
    return data.image.display_url;  // পাবলিক URL রিটার্ন করবে
  } else {
    throw new Error('Image upload failed: ' + (data.error?.message || 'Unknown error'));
  }
}

// ফর্ম সাবমিট হ্যান্ডলার
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  msg.style.color = "black";
  msg.textContent = "Uploading post...";

  const title = document.getElementById("title").value.trim();
  const category = document.getElementById("category").value;
  const description = document.getElementById("description").value.trim();
  const file = thumbnailFileInput.files[0];

  if (!title || !category || !description) {
    msg.style.color = "red";
    msg.textContent = "❌ Please fill all fields.";
    return;
  }

  if (!file) {
    msg.style.color = "red";
    msg.textContent = "❌ Please upload a thumbnail image.";
    return;
  }

  try {
    msg.textContent = "Uploading image...";
    const thumbnailURL = await uploadImageToFreeImageHost(file);

    let role = "User";
    const adminEmails = ["youradminemail@gmail.com"]; // এখানে তোমার অ্যাডমিন ইমেইল বসাও
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
    thumbnailPreview.src = '';
    thumbnailPreview.style.display = 'none';

  } catch (err) {
    console.error(err);
    msg.style.color = "red";
    msg.textContent = "❌ Error: " + err.message;
  }
});
