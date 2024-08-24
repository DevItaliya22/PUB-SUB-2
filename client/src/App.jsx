import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Join from './components/Join';
import Create from './components/Create';
import Game from './components/Game'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/join" element={<Join />} />
        <Route path="/create" element={<Create />} />
        <Route path="/:gameid" element={<Game />} />
      </Routes>
    </Router>
  );
}

export default App;
