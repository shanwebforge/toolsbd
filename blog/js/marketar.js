import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import {
  getFirestore, collection, getDocs
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

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

async function loadmarketerPosts() {
  const container = document.getElementById("postsContainer");
  container.innerHTML = "<p>Loading posts...</p>";

  const colRef = collection(db, "posts_marketer");
  const snapshot = await getDocs(colRef);

  container.innerHTML = "";

  if (snapshot.empty) {
    container.innerHTML = "<p>No marketer posts found.</p>";
    return;
  }

  snapshot.forEach(doc => {
    const post = doc.data();
    const postId = doc.id;
    const postHTML = `
      <div class="post-card">
        <div class="post-thumb">
          <img src="${post.thumbnail}" alt="Thumbnail" />
          <div class="thumb-overlay">
            <h3 class="post-title">${post.title}</h3>
          </div>
        </div>
        <div class="post-content">
          <div class="post-user">
            <img src="/blog/assets/default-user.png" alt="User">
            <div>
              <strong>${post.author}</strong><br/>
              <span class="user-role">${post.role}</span>
            </div>
          </div>
          <p class="post-description">${post.description.substring(0, 100)}...</p>
          <button class="read-more-btn" onclick="window.location.href='/blog/post.html?id=${postId}&cat=posts_marketer'">Read More</button>
          <div class="post-actions-line">
            <div class="reactions">
              <span><i class="fas fa-thumbs-up"></i> ${post.likes || 0}</span>
              <span><i class="fas fa-thumbs-down"></i> ${post.dislikes || 0}</span>
              <span><i class="fas fa-share-alt"></i> Share</span>
            </div>
            <button class="nice-post-btn">Nice Post লিখুন</button>
          </div>
        </div>
      </div>
    `;
    container.innerHTML += postHTML;
  });
}

document.addEventListener("DOMContentLoaded", loadmarketerPosts);
