import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getFirestore, collection, getDocs, doc, updateDoc, increment, onSnapshot } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

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

const DEFAULT_USER_IMG = '/blog/assets/default-user.webp';

async function loadSimPosts() {
  const container = document.getElementById("postsContainer");
  container.innerHTML = "<p>Loading posts...</p>";

  const colRef = collection(db, "posts_sim");
  const snapshot = await getDocs(colRef);
  container.innerHTML = "";

  if (snapshot.empty) {
    container.innerHTML = "<p>No sim posts found.</p>";
    return;
  }

  snapshot.forEach(docSnap => {
    const post = docSnap.data();
    const postId = docSnap.id;
    const userImg = post.userImg?.trim() ? post.userImg : DEFAULT_USER_IMG;

    const postCard = document.createElement('div');
    postCard.className = 'post-card';
    postCard.innerHTML = `
      <h2 class="post-title">${post.title || "Untitled"}</h2>
      <p class="post-description">${post.description ? post.description.substring(0,100) + "..." : ""}</p>
      <div class="post-footer">
        <div class="author-info">
          <img class="author-img" src="${userImg}" onerror="this.src='${DEFAULT_USER_IMG}'" alt="User">
          <div class="author-details">
            <strong class="author-name">${post.author || "Anonymous"}</strong>
            <span class="author-role">${post.role || "User"}</span>
          </div>
        </div>
        <div class="post-stats">
          <span class="like" data-id="${postId}"><i class="fas fa-thumbs-up"></i> ${post.likes || 0}</span>
          <span class="dislike" data-id="${postId}"><i class="fas fa-thumbs-down"></i> ${post.dislikes || 0}</span>
          <span class="share" data-url="/blog/post.html?id=${postId}&cat=posts_sim"><i class="fas fa-share-alt"></i></span>
        </div>
      </div>
    `;
    container.appendChild(postCard);

    const docRef = doc(db, "posts_sim", postId);

    // Realtime like/dislike
    onSnapshot(docRef, snapshot => {
      const data = snapshot.data();
      postCard.querySelector('.like').innerHTML = `<i class="fas fa-thumbs-up"></i> ${data.likes || 0}`;
      postCard.querySelector('.dislike').innerHTML = `<i class="fas fa-thumbs-down"></i> ${data.dislikes || 0}`;
    });

    // Full card click
    postCard.addEventListener('click', e => {
      if (!e.target.closest('.like') && !e.target.closest('.dislike') && !e.target.closest('.share')) {
        window.location.href = `/blog/post.html?id=${postId}&cat=posts_sim`;
      }
    });
  });

  // One like/dislike per browser
  function canReact(postId,type){
    const reacted = JSON.parse(localStorage.getItem('postReactions')|| '{}');
    return reacted[postId] !== type;
  }
  function saveReaction(postId,type){
    const reacted = JSON.parse(localStorage.getItem('postReactions')|| '{}');
    reacted[postId] = type;
    localStorage.setItem('postReactions', JSON.stringify(reacted));
  }

  document.querySelectorAll('.like').forEach(btn=>{
    btn.onclick = async e=>{
      e.stopPropagation();
      const postId = btn.dataset.id;
      if(!canReact(postId,'like')) return;
      const ref = doc(db, "posts_sim", postId);
      await updateDoc(ref,{likes:increment(1)});
      saveReaction(postId,'like');
    };
  });

  document.querySelectorAll('.dislike').forEach(btn=>{
    btn.onclick = async e=>{
      e.stopPropagation();
      const postId = btn.dataset.id;
      if(!canReact(postId,'dislike')) return;
      const ref = doc(db, "posts_sim", postId);
      await updateDoc(ref,{dislikes:increment(1)});
      saveReaction(postId,'dislike');
    };
  });

  document.querySelectorAll('.share').forEach(btn=>{
    btn.onclick = e=>{
      e.stopPropagation();
      const url = window.location.origin + btn.dataset.url;
      if(navigator.share){
        navigator.share({title:'Check this post',url});
      } else {
        navigator.clipboard.writeText(url).then(()=> alert('Post URL copied!'));
      }
    };
  });
}

document.addEventListener("DOMContentLoaded", loadSimPosts);
