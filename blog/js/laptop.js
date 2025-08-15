import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getFirestore, collection, getDocs, doc, updateDoc, increment, onSnapshot } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

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

const DEFAULT_THUMBNAIL = '/blog/assets/default-thumbnail.webp';
const DEFAULT_USER_IMG = '/blog/assets/default-user.webp';

async function loadlaptopPosts() {
  const container = document.getElementById("postsContainer");
  container.innerHTML = "<p>Loading posts...</p>";

  const colRef = collection(db, "posts_laptop");
  const snapshot = await getDocs(colRef);

  container.innerHTML = "";

  if (snapshot.empty) {
    container.innerHTML = "<p>No laptop posts found.</p>";
    return;
  }

  snapshot.forEach(docSnap => {
    const post = docSnap.data();
    const postId = docSnap.id;

    const thumbnail = post.thumbnail && post.thumbnail.trim() !== "" ? post.thumbnail : DEFAULT_THUMBNAIL;
    const userImg = post.userImg && post.userImg.trim() !== "" ? post.userImg : DEFAULT_USER_IMG;

    const postCard = document.createElement('div');
    postCard.className = 'post-card';
    postCard.innerHTML = `
      <div class="post-thumb">
        <img src="${thumbnail}" onerror="this.src='${DEFAULT_THUMBNAIL}'" alt="Thumbnail" />
        <div class="thumb-overlay"><h3 class="post-title">${post.title}</h3></div>
      </div>
      <div class="post-content">
        <div class="post-user">
          <img src="${userImg}" onerror="this.src='${DEFAULT_USER_IMG}'" alt="User">
          <div><strong>${post.author}</strong><br/><span>${post.role}</span></div>
        </div>
        <p>${post.description.substring(0,100)}...</p>
        <button class="read-more-btn" onclick="window.location.href='/blog/post.html?id=${postId}&cat=posts_laptop'">Read More</button>
        <div class="post-actions-line">
          <div class="reactions">
            <span class="likeBtn" data-id="${postId}"><i class="fas fa-thumbs-up"></i> <span class="likeCount">${post.likes || 0}</span></span>
            <span class="dislikeBtn" data-id="${postId}"><i class="fas fa-thumbs-down"></i> <span class="dislikeCount">${post.dislikes || 0}</span></span>
            <span class="shareBtn" data-title="${post.title}" data-desc="${post.description}" data-url="/blog/post.html?id=${postId}&cat=posts_laptop"><i class="fas fa-share-alt"></i> Share</span>
          </div>
          <button class="nice-post-btn">Nice Post লিখুন</button>
        </div>
      </div>
    `;
    container.appendChild(postCard);

    const docRef = doc(db, "posts_laptop", postId);

    // Realtime like/dislike count
    onSnapshot(docRef, snapshot => {
      const data = snapshot.data();
      postCard.querySelector('.likeCount').innerText = data.likes || 0;
      postCard.querySelector('.dislikeCount').innerText = data.dislikes || 0;
    });
  });

  // Attach events
  document.querySelectorAll('.likeBtn').forEach(btn => {
    btn.onclick = async () => {
      const ref = doc(db, "posts_laptop", btn.dataset.id);
      await updateDoc(ref, { likes: increment(1) });
    };
  });

  document.querySelectorAll('.dislikeBtn').forEach(btn => {
    btn.onclick = async () => {
      const ref = doc(db, "posts_laptop", btn.dataset.id);
      await updateDoc(ref, { dislikes: increment(1) });
    };
  });

  document.querySelectorAll('.shareBtn').forEach(btn => {
    btn.onclick = () => {
      const shareData = {
        title: btn.dataset.title,
        text: btn.dataset.desc,
        url: window.location.origin + btn.dataset.url
      };
      if (navigator.share) {
        navigator.share(shareData).catch(console.error);
      } else {
        navigator.clipboard.writeText(shareData.url).then(() => alert("URL copied"));
      }
    };
  });
}

document.addEventListener("DOMContentLoaded", loadlaptopPosts);
