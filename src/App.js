import logo from './logo.svg';
import './App.css';
import Home from './Home';
import Nav from './Nav';
import Login from './Login';
import Register from './Register';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
function App() {
  return (
    <BrowserRouter>
    <div className="App">
     
        <Nav/>
      <div className="auth-wrapper">
        <div className="auth-inner">
          <Routes>
            <Route exact path="/" element={<Home/>}/>
            <Route exact path="/login" element={<Login/>}/>
            <Route exact path="/register" element={<Register/>}/>
          </Routes>
       
        </div>
      </div>
    </div>
    </BrowserRouter>
  );
}

export default App;
