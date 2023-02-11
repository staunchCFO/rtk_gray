
import './App.css';
import PostLists from './app/features/post/PostLists';
import AddPostForm from './app/features/post/AddPostForm';

function App() {
  return (
    <main className="App">
      <AddPostForm />
      <PostLists />
    </main>
  );
}

export default App;
