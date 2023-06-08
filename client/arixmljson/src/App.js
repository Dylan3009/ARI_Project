import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home';
import Generate from './Pages/Generate';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/generate' element={<Generate />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
