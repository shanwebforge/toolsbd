import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";

export default function PostPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    async function fetchPost() {
      const docRef = doc(db, "posts", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setPost({ id: docSnap.id, ...docSnap.data() });
      } else {
        setPost(null);
      }
    }
    fetchPost();
  }, [id]);

  if (!post) return <p>Loading or Post not found...</p>;

  return (
    <div style={{ maxWidth: "800px", margin: "auto" }}>
      <h1>{post.title}</h1>
      <img src={post.thumbnail} alt={post.title} style={{ width: "100%", maxHeight: "400px", objectFit: "cover" }} />
      <p><strong>Category:</strong> {post.category}</p>
      <p>{post.content}</p>
      <p><em>Author:</em> {post.authorName} ({post.authorRole})</p>
    </div>
  );
}
