import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getFirestore, collection, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

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

const postsContainer = document.getElementById('postsContainer');

const categories = [
  "posts_islamic","posts_ai","posts_tools","posts_laptop","posts_proggraming",
  "posts_designer","posts_marketar","posts_android","posts_sim","posts_keyboard",
  "posts_educations","posts_freelanching","posts_media"
];

async function loadRecentPosts() {
  postsContainer.innerHTML = '<p>Loading...</p>';
  let allPosts = [];

  for (let cat of categories) {
    const colRef = collection(db, cat);
    const q = query(colRef, orderBy('timestamp', 'desc'));
    const snapshot = await getDocs(q);

    snapshot.forEach(doc => {
      allPosts.push({ id: doc.id, category: cat, ...doc.data() });
    });
  }

  // Timestamp অনুযায়ী sort করে recent 10
  allPosts.sort((a, b) => (b.timestamp?.seconds || 0) - (a.timestamp?.seconds || 0));
  const recentPosts = allPosts.slice(0, 10);

  if (recentPosts.length === 0) {
    postsContainer.innerHTML = '<p>No posts found.</p>';
    return;
  }

  postsContainer.innerHTML = '';

  recentPosts.forEach(post => {
    const thumbnail = post.thumbnail || '/blog/assets/toolbd-t.webp';
    const description = post.description ? post.description.substring(0, 100) : "";

    const postCard = document.createElement('div');
    postCard.className = 'post-card';
    postCard.innerHTML = `
      <div class="post-thumb">
        <img src="${thumbnail}" alt="Thumbnail">
        <div class="thumb-overlay">
          <h3 class="post-title">${post.title || "Untitled"}</h3>
        </div>
      </div>
      <div class="post-content">
        <div class="post-user">
          <img src="/blog/assets/default-user.webp" alt="User">
          <div>
            <strong>${post.author || "Anonymous"}</strong><br/>
            <span class="user-role">${post.role || "User"}</span>
          </div>
        </div>
        <p class="post-description">${description}...</p>
        <a href="/blog/post.html?id=${post.id}&cat=${post.category}" class="read-more-btn">Read More</a>
      </div>
    `;
    postsContainer.appendChild(postCard);
  });
}

// Load on page ready
document.addEventListener('DOMContentLoaded', loadRecentPosts);
