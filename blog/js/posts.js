import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

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

// Helper: truncate description to 30 words
function truncateWords(str, numWords) {
  const words = str.split(/\s+/);
  if (words.length <= numWords) return str;
  return words.slice(0, numWords).join(' ') + '...';
}

async function loadPostsFromCollection(collectionName) {
  const container = document.getElementById('postsContainer');
  container.innerHTML = "<p>Loading...</p>";

  const colRef = collection(db, collectionName);
  const snapshot = await getDocs(colRef);

  container.innerHTML = ""; // Clear

  if (snapshot.empty) {
    container.innerHTML = "<p>No posts found in this category.</p>";
    return;
  }

  snapshot.forEach(doc => {
    const post = doc.data();
    const description = post.description ? truncateWords(post.description, 30) : "";

    const postHTML = `
      <div class="post-card" onclick="window.location.href='/blog/post.html?id=${doc.id}&cat=${collectionName}'">
        <h2 class="post-title">${post.title || "Untitled"}</h2>
        <p class="post-description">${description}</p>
        <div class="post-footer">
          <div class="author-info">
            <img class="author-img" src="/blog/assets/default-user.webp" alt="User">
            <div class="author-details">
              <strong class="author-name">${post.author || "Anonymous"}</strong>
              <span class="author-role">${post.role || "User"}</span>
            </div>
          </div>
          <div class="post-stats">
            <span class="like"><i class="fas fa-thumbs-up"></i> ${post.likes || 0}</span>
            <span class="dislike"><i class="fas fa-thumbs-down"></i> ${post.dislikes || 0}</span>
            <span class="share"><i class="fas fa-share-alt"></i></span>
          </div>
        </div>
      </div>
    `;

    container.innerHTML += postHTML;
  });
}

// Attach click listeners
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('.cat-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const collectionName = btn.dataset.collection;
      loadPostsFromCollection(collectionName);
    });
  });

  // Load default category
  loadPostsFromCollection('posts_html');
});
