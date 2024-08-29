import React from 'react'
import './hero.css'
export default function Hero() {
  return (
    <section className='hero flex'>
      <div className="left-section border">

        <div className="parent-avatar flex">
          <img src="./public/TitleImage.png" alt="" className='avatar'/>
          <div className='icon-verified flex'></div>
        </div>

        <h1 className="title">Data Science, Machine learning engineering</h1>

        <p className='subtitle'>I'm Hassane Skikri, a computer Science student with a deep passion for data science and machine learning. I excel at transforming complex data into actionable insights, driving impactful solutions and continuous improvement.</p>

        <div className="all-icons flex">
          <div className="icon icon-twitter"></div>
          <div className="icon icon-instagram"></div>
          <div className="icon icon-github"></div>
          <div className="icon icon-linkedin-square"></div>
        </div>
      </div>
      <div className="right-section animation border">
        animation
      </div>
    </section>
  );
}
