import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getFirestore, collection, getDocs, query, orderBy, doc, updateDoc, increment, onSnapshot } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

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

const categories = [
  "posts_islamic","posts_ai","posts_tools","posts_laptop","posts_proggraming",
  "posts_designer","posts_marketar","posts_android","posts_sim","posts_keyboard",
  "posts_educations","posts_freelanching","posts_media"
];

function truncateWords(str, numWords) {
  const words = str.split(/\s+/);
  if (words.length <= numWords) return str;
  return words.slice(0, numWords).join(' ') + '...';
}

async function loadRecentPosts() {
  const container = document.getElementById("postsContainer");
  container.innerHTML = "<p>Loading...</p>";

  let allPosts = [];
  for (let cat of categories) {
    const colRef = collection(db, cat);
    const q = query(colRef, orderBy('timestamp', 'desc'));
    const snapshot = await getDocs(q);
    snapshot.forEach(docSnap => {
      allPosts.push({ id: docSnap.id, category: cat, ...docSnap.data() });
    });
  }

  if (allPosts.length === 0) {
    container.innerHTML = "<p>No posts found.</p>";
    return;
  }

  allPosts.sort((a,b)=> (b.timestamp?.seconds || 0) - (a.timestamp?.seconds ||0));
  const recentPosts = allPosts.slice(0,10);
  container.innerHTML = "";

  recentPosts.forEach(post => {
    const description = post.description ? truncateWords(post.description,30) : "";
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
          <span class="like" title="Like this post" data-id="${post.id}"><i class="fas fa-thumbs-up"></i> ${post.likes || 0}</span>
          <span class="dislike" title="Dislike this post" data-id="${post.id}"><i class="fas fa-thumbs-down"></i> ${post.dislikes || 0}</span>
          <span class="share" title="Share this post" data-url="/blog/post.html?id=${post.id}&cat=${post.category}"><i class="fas fa-share-alt"></i></span>
        </div>
      </div>
    `;
    container.appendChild(postCard);

    const docRef = doc(db, post.category, post.id);

    // Realtime like/dislike
    onSnapshot(docRef, snapshot => {
      const data = snapshot.data();
      postCard.querySelector('.like').innerHTML = `<i class="fas fa-thumbs-up"></i> ${data.likes || 0}`;
      postCard.querySelector('.dislike').innerHTML = `<i class="fas fa-thumbs-down"></i> ${data.dislikes || 0}`;
    });

    // Card click to post
    postCard.addEventListener('click', e => {
      if (!e.target.closest('.like') && !e.target.closest('.dislike') && !e.target.closest('.share')) {
        window.location.href = `/blog/post.html?id=${post.id}&cat=${post.category}`;
      }
    });
  });

  // Helper: one reaction per browser
  function canReact(postId,type){
    const reacted = JSON.parse(localStorage.getItem('postReactions')|| '{}');
    return reacted[postId] !== type;
  }
  function saveReaction(postId,type){
    const reacted = JSON.parse(localStorage.getItem('postReactions')|| '{}');
    reacted[postId] = type;
    localStorage.setItem('postReactions',JSON.stringify(reacted));
  }

  // Like/Dislike events
  document.querySelectorAll('.like').forEach(btn=>{
    btn.onclick = async e=>{
      e.stopPropagation();
      const postId = btn.dataset.id;
      if(!canReact(postId,'like')) return;
      const ref = doc(db, btn.dataset.url.split('cat=')[1], postId);
      await updateDoc(ref,{likes:increment(1)});
      saveReaction(postId,'like');
    };
  });

  document.querySelectorAll('.dislike').forEach(btn=>{
    btn.onclick = async e=>{
      e.stopPropagation();
      const postId = btn.dataset.id;
      if(!canReact(postId,'dislike')) return;
      const ref = doc(db, btn.dataset.url.split('cat=')[1], postId);
      await updateDoc(ref,{dislikes:increment(1)});
      saveReaction(postId,'dislike');
    };
  });

  // Share
  document.querySelectorAll('.share').forEach(btn=>{
    btn.onclick = e=>{
      e.stopPropagation();
      const url = window.location.origin + btn.dataset.url;
      if(navigator.share){
        navigator.share({title:'Check this post',url});
      }else{
        navigator.clipboard.writeText(url).then(()=> alert('Post URL copied!'));
      }
    };
  });
}

document.addEventListener("DOMContentLoaded", loadRecentPosts);
