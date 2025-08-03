import React, { useState } from "react";
import { db, auth } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function NewPost() {
  const [title, setTitle] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (!auth.currentUser) {
      setError("You must be logged in to post.");
      return;
    }
    try {
      await addDoc(collection(db, "posts"), {
        title,
        thumbnail,
        content,
        category,
        authorId: auth.currentUser.uid,
        authorName: auth.currentUser.email,
        authorRole: "user",
        createdAt: serverTimestamp(),
        likes: 0,
        dislikes: 0,
      });
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "600px", margin: "auto" }}>
      <h2>New Post</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input
        type="text"
        placeholder="Post Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
      /><br />
      <input
        type="text"
        placeholder="Thumbnail Image URL"
        value={thumbnail}
        onChange={e => setThumbnail(e.target.value)}
        required
      /><br />
      <textarea
        placeholder="Post content"
        value={content}
        onChange={e => setContent(e.target.value)}
        rows={8}
        required
      ></textarea><br />
      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={e => setCategory(e.target.value)}
        required
      /><br />
      <button type="submit">Publish</button>
    </form>
  );
}
