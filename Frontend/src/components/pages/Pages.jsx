//import { useLocation } from "react-router-dom";
import Header from "../common/header/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../home/Home";
import Footer from "../common/footer/Footer";
import About from "../about/About";
import Pricing from "../pricing/Pricing";
import Blog from "../blog/Blog";
import Sell from "../sell/Sell";
import Contact from "../contact/Contact";
import Login from "../authentication/Login";
import Car from "../Car/Car";

const Pages = () => {
  // const path = useLocation().pathname.split("/")[1];

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="sell" element={<Sell />} />
            <Route path="blog" element={<Blog />} />
            <Route path="pricing" element={<Pricing />} />
            <Route path="contact" element={<Contact />} />
            <Route path="Login" element={<Login />} />
            <Route path="Car">
              <Route path=":id" element={<Car />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
};

export default Pages;
