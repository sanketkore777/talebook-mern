import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Home from "./components/Home";

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<Signin />}/>
        <Route index path="/signup" element={<Signup />}/>
        <Route path="/*" element={<Home/>} />
      </Routes>
    </BrowserRouter></>
  );
}

export default App;
