import { useState, useEffect } from "react";
import Header from "./components/1-header/Header";
import Hero from "./components/2-hero/Hero";
import Main from "./components/3-main/Main";
import Contact from "./components/4-contact/Contact";
import Footer from "./components/5-footer/Footer";
import Certificate from "./components/6-certificate/certificate";
import ChatIcon from "./components/ChatIcon/ChatIcon";
import Chatbox from './components/ChatBox/Chatbox';
import '../public/style.css';

function App() {
  const [showScrollBtn, setshowScrollBtn] = useState(false);
  const [isChatboxVisible, setIsChatboxVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setshowScrollBtn(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll); // Clean up the event listener
  }, []);

  const toggleChatbox = () => {
    setIsChatboxVisible(prevState => !prevState);
  };

  return (
    <div id="up" className="container">
      <Header></Header>
      <div id="about">
        <Hero></Hero>
      </div>
      <div className="divider"></div>
      <div id="Project">
        <Main></Main>
      </div>
      <div className="divider"></div>
      <div id="certificates">
        <Certificate />
      </div>
      <div className="divider"></div>
      <div id="contact">
        <Contact></Contact>
      </div>
      <div className="divider"></div>
      <Footer></Footer>
      {showScrollBtn && (
        <a href="#up">
          <button
            className={`icon-keyboard_arrow_up scroll2Top ${
              showScrollBtn ? "visible" : ""
            }`}
          ></button>
        </a>
      )}
      <ChatIcon onClick={toggleChatbox} />
      <Chatbox onClose={toggleChatbox} isVisible={isChatboxVisible} />
    </div>
  );
}

export default App;
