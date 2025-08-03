import { Link } from 'react-router-dom';
export default function PostCard({ post }) {
  return (
    <div className="post-card">
      <div className="thumb" style={{ backgroundImage: `url(${post.thumbnail})` }}>
        <div className="overlay-title">{post.title}</div>
      </div>
      <div className="author">
        {post.authorName} • <em>{post.authorRole}</em>
      </div>
      <p>{post.content.slice(0,40)}... <Link to={`/post/${post.id}`}>Read more</Link></p>
      <div className="actions">
        👍 {post.likes || 0} 👎 {post.dislikes || 0} 
        <button onClick={() => navigator.share?.({ title: post.title, url: window.location.href })}>🔗 Share</button>
      </div>
    </div>
  );
}
