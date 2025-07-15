import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './Pages/Home/Home';
import Navigation from './Components/Navigationbar/Navigation';
import Login from './Pages/Users/Login';


function App() {
  return (
    <div className="App">
      <Navigation/>
      <Router>
        <Routes>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/' element={<Home/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
