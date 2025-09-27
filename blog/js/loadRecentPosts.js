import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getFirestore, collection, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

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
const postsContainer = document.getElementById('postsContainer');

const categories = [
  "posts_islamic","posts_ai","posts_tools","posts_laptop","posts_proggraming",
  "posts_designer","posts_marketar","posts_android","posts_sim","posts_keyboard",
  "posts_educations","posts_freelanching","posts_media"
];

// Helper: truncate description to 30 words
function truncateWords(str, numWords) {
  const words = str.split(/\s+/);
  if (words.length <= numWords) return str;
  return words.slice(0, numWords).join(' ') + '...';
}

// Load recent posts
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

  // Sort all posts by timestamp
  allPosts.sort((a, b) => (b.timestamp?.seconds || 0) - (a.timestamp?.seconds || 0));
  const recentPosts = allPosts.slice(0, 10);
  postsContainer.innerHTML = '';

  if (recentPosts.length === 0) {
    postsContainer.innerHTML = '<p>No posts found.</p>';
    return;
  }

  recentPosts.forEach(post => {
    const description = post.description ? truncateWords(post.description, 30) : "";
    const postCard = document.createElement('div');
    postCard.className = 'post-card';
    postCard.innerHTML = `
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
          <span class="like" title="Like this post"><i class="fas fa-thumbs-up"></i> ${post.likes || 0}</span>
          <span class="dislike" title="Dislike this post"><i class="fas fa-thumbs-down"></i> ${post.dislikes || 0}</span>
          <span class="share" title="Share this post"><i class="fas fa-share-alt"></i></span>
        </div>
      </div>
    `;

    // Full card click to post
    postCard.addEventListener('click', (e) => {
      if (!e.target.closest('.like') && !e.target.closest('.dislike') && !e.target.closest('.share')) {
        window.location.href = `/blog/post.html?id=${post.id}&cat=${post.category}`;
      }
    });

    // Like button
    const likeBtn = postCard.querySelector('.like');
    likeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      let likedPosts = JSON.parse(localStorage.getItem('likedPosts') || '[]');
      if (likedPosts.includes(post.id)) {
        alert('You have already liked this post!');
        return;
      }
      post.likes = (post.likes || 0) + 1;
      likeBtn.innerHTML = `<i class="fas fa-thumbs-up"></i> ${post.likes}`;
      likedPosts.push(post.id);
      localStorage.setItem('likedPosts', JSON.stringify(likedPosts));
    });

    // Dislike button
    const dislikeBtn = postCard.querySelector('.dislike');
    dislikeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      let dislikedPosts = JSON.parse(localStorage.getItem('dislikedPosts') || '[]');
      if (dislikedPosts.includes(post.id)) {
        alert('You have already disliked this post!');
        return;
      }
      post.dislikes = (post.dislikes || 0) + 1;
      dislikeBtn.innerHTML = `<i class="fas fa-thumbs-down"></i> ${post.dislikes}`;
      dislikedPosts.push(post.id);
      localStorage.setItem('dislikedPosts', JSON.stringify(dislikedPosts));
    });

    // Share button
    const shareBtn = postCard.querySelector('.share');
    shareBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const postUrl = `${window.location.origin}/blog/post.html?id=${post.id}&cat=${post.category}`;
      if (navigator.share) {
        navigator.share({ title: post.title, url: postUrl }).catch(err => console.log(err));
      } else {
        navigator.clipboard.writeText(postUrl).then(() => {
          alert('Post URL copied to clipboard!');
        });
      }
    });

    postsContainer.appendChild(postCard);
  });
}

document.addEventListener('DOMContentLoaded', loadRecentPosts);
