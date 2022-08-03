import { Routes, Route } from "react-router-dom";
import { Home } from "./Components/Home";
import { Login } from "./Components/Login";
import { Mapview } from "./Components/Mapview";
import { Signup } from "./Components/Signup";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/mapview/:type" element={<Mapview />} />
      </Routes>
    </div>
  );
}

export default App;
