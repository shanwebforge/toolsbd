import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBTwUExxQBIGW7y9a-FCCeMoT2vHvznwIY",
  authDomain: "toolbd-blog.firebaseapp.com",
  projectId: "toolbd-blog",
  storageBucket: "toolbd-blog.appspot.com",
  messagingSenderId: "14769500623",
  appId: "1:14769500623:web:d2120963ad9123c5f422ba",
  measurementId: "G-8GJSH56WMD"
};

// Initialize Firebase app only once
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Get post ID and category from URL parameters
const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const cat = params.get("cat");

const postContainer = document.getElementById("postView");

async function loadPost() {
  if (!id || !cat) {
    postContainer.innerHTML = "<p>❌ Invalid post ID or category.</p>";
    return;
  }

  try {
    const docRef = doc(db, cat, id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      postContainer.innerHTML = "<p>❌ Post not found!</p>";
      return;
    }

    const post = docSnap.data();

    postContainer.innerHTML = `
      <h1 class="post-title">${post.title}</h1>
      <div class="post-meta">
        <img src="/blog/assets/default-user.png" alt="Author" />
        <div>
          <strong>${post.author}</strong><br />
          <span class="user-role">${post.role}</span>
        </div>
      </div>
      <img class="post-thumbnail" src="${post.thumbnail}" alt="Thumbnail" />
      <p class="post-description">${post.description}</p>
      <div class="post-actions">
        <span><i class="fas fa-thumbs-up"></i> ${post.likes || 0}</span>
        <span><i class="fas fa-thumbs-down"></i> ${post.dislikes || 0}</span>
        <span><i class="fas fa-share-alt"></i> Share</span>
      </div>
    `;
  } catch (err) {
    console.error(err);
    postContainer.innerHTML = "<p>❌ Failed to load post.</p>";
  }
}

loadPost();
