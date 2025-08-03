import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import PostCard from "../components/PostCard";

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      const postsCol = collection(db, "posts");
      const q = query(postsCol, orderBy("createdAt", "desc"), limit(10));
      const snapshot = await getDocs(q);
      const postsList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPosts(postsList);
    }
    fetchPosts();
  }, []);

  return (
    <div>
      <h2>Recent Posts</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {posts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
