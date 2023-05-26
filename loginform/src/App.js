import Login from "./components/Login";
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from "./components/Home";
import Navbar from "./components/Navbar";


function App() {
  return (
    <BrowserRouter >
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
      </Routes> 
    </BrowserRouter>
  );
}

export default App;
