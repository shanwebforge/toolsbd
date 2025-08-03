import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import NewPost from './pages/NewPost';
import PostPage from './pages/PostPage';


function App() {
  return (
    <BrowserRouter basename="/blog">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/new" element={<NewPost />} />
        <Route path="/post/:id" element={<PostPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
