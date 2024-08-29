import './header.css'
import React, {useState} from 'react'
export default function header() {
  const [ShowModal, setShowModal] = useState(false)

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
      <button className='mode'>
        <span className='icon-moon-o'></span>
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
