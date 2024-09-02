import { useState, useEffect } from "react";
import Header from "./components/1-header/Header";
import Hero from "./components/2-hero/Hero";
import Main from "./components/3-main/Main";
import Contact from "./components/4-contact/Contact";
import Footer from "./components/5-footer/Footer";

function App() {
  const [showScrollBtn, setshowScrollBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setshowScrollBtn(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll); // Clean up the event listener
  }, []);

  return (
    <div id="up" className="container">
      <Header></Header>
      <Hero></Hero>
      <div className="divider"></div>
      <Main></Main>
      <div className="divider"></div>
      <Contact></Contact>
      <div className="divider"></div>
      <Footer></Footer>
      {showScrollBtn && (
        <a href="#up">
          <button className={`icon-keyboard_arrow_up scroll2Top ${showScrollBtn ? "visible" : ""}`}></button>
        </a>
      )}
    </div>
  );
}

export default App;
