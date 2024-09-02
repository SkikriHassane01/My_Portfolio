import './header.css'
import React, {useEffect, useState} from 'react'
export default function header() {
  const [ShowModal, setShowModal] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("currentMode") ?? "dark");
  useEffect(
    () =>{
      document.body.classList.add(theme)
      if (theme === "light"){
        document.body.classList.remove("dark");
        document.body.classList.add("light");
      }
      else{
        document.body.classList.remove("light");
        document.body.classList.add("dark");
      }
    }

  ,[theme]);
  function changeTheme(){
    // send the value to LS
    localStorage.setItem("currentMode", theme === "dark" ? "light" : "dark")

    // get value from LS
    setTheme(localStorage.getItem("currentMode"))


  }
  return (
    <header className='flex'>
      <button className='menu icon-menu' onClick={() => {setShowModal(true)}}></button>
      <div/>
      <nav>
        <ul className='flex'>
          <li><a href="">About</a></li>
          <li><a href="">Articles</a></li>
          <li><a href="">Projects</a></li>
          <li><a href="">Speaking</a></li>
          <li><a href="">Contact</a></li>
        </ul>
      </nav>
      <button onClick={() => {
        changeTheme()
      }
      } className='mode flex'>
        {
          theme === "dark" ? (<span className='icon-moon-o'></span>) : (<span className='icon-sun'></span>)
        }
      </button>


      {/* if the user press of the show modal bottom */}
      {
        ShowModal && (
          <div className="fixed">
              <ul className="modal">
                <li><button className="icon-close" onClick={() => {setShowModal(false)}}></button></li>
                <li><a href="">About</a></li>               
                <li><a href="">Articles</a></li>
                <li><a href="">Projects</a></li>
                <li><a href="">Speaking</a></li>
                <li><a href="">Contact</a></li>
              </ul>
          </div>
        )
      }
    </header>
  );
}
