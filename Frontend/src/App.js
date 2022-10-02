import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login/login";
import Signup from "./pages/signup/signup";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
        <Route index element={<Login />} />
        <Route path="signup" element={<Signup/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
