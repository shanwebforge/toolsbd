import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import {
  getFirestore, doc, getDoc, updateDoc, increment, onSnapshot
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

    // Listen to realtime updates for likes/dislikes
    onSnapshot(docRef, (docSnap) => {
      if (!docSnap.exists()) {
        postContainer.innerHTML = "<p>❌ Post not found!</p>";
        return;
      }

      const post = docSnap.data();

      // Thumbnail fallback
      const thumbnail = post.thumbnail && post.thumbnail.trim() !== "" 
        ? post.thumbnail 
        : "/blog/assets/default-thumbnail.webp";

      const likes = Number(post.likes) || 0;
      const dislikes = Number(post.dislikes) || 0;

      postContainer.innerHTML = `
        <h1 class="post-title">${post.title}</h1>
        <div class="post-meta">
          <img src="/blog/assets/default-user.webp" alt="Author" />
          <div>
            <strong>${post.author}</strong><br />
            <span class="user-role">${post.role || "User"}</span>
          </div>
        </div>
        <img class="post-thumbnail" src="${thumbnail}" alt="Thumbnail" onerror="this.src='/blog/assets/default-thumbnail.webp'" />
        <p class="post-description">${post.description}</p>
        <div class="post-actions">
          <span id="likeBtn"><i class="fas fa-thumbs-up"></i> <span id="likeCount">${likes}</span></span>
          <span id="dislikeBtn"><i class="fas fa-thumbs-down"></i> <span id="dislikeCount">${dislikes}</span></span>
          <span id="shareBtn"><i class="fas fa-share-alt"></i> Share</span>
        </div>
      `;

      // Add event listeners
      document.getElementById("likeBtn").onclick = async () => {
        await updateDoc(docRef, { likes: increment(1) });
      };

      document.getElementById("dislikeBtn").onclick = async () => {
        await updateDoc(docRef, { dislikes: increment(1) });
      };

      document.getElementById("shareBtn").onclick = () => {
        const shareData = {
          title: post.title,
          text: post.description,
          url: window.location.href
        };
        if (navigator.share) {
          navigator.share(shareData).catch(err => console.error(err));
        } else {
          navigator.clipboard.writeText(window.location.href)
            .then(() => alert("Post URL copied!"))
            .catch(() => alert("Failed to copy URL."));
        }
      };
    });

  } catch (err) {
    console.error(err);
    postContainer.innerHTML = "<p>❌ Failed to load post.</p>";
  }
}

loadPost();
