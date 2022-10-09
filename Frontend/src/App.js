import "./App.css"
import Header from "./components/common/header/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import Footer from "./components/common/footer/Footer";
import About from "./components/about/About";
import Pricing from "./components/pricing/Pricing";
import Blog from "./components/blog/Blog";
import Sell from "./components/sell/Sell";
import Contact from "./components/contact/Contact";
import Login from "./components/authentication/Login";

function App() {
  return (
    <> 
    <BrowserRouter>
    <Header /> 
     <Routes>
     <Route path="/">
       <Route index element={<Home/>} />
       <Route  path="about" element={<About/>} />
       <Route  path="sell" element={<Sell/>} />
       <Route  path="blog" element={<Blog/>} />
       <Route  path="pricing" element={<Pricing/>} />
       <Route  path="contact" element={<Contact/>} />
       <Route  path="Login" element={<Login/>} />
       </Route>
     </Routes>
     </BrowserRouter>
     <Footer />
     </>
  )
}

export default App
