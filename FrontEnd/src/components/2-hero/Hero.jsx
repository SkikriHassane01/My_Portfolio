import './hero.css'
import Lottie from "lottie-react";
import MlAnimation from "../../animation/ML.json"
import { useRef } from 'react';
import { motion } from 'framer-motion';
export default function Hero() {
  const lottieRef = useRef();
  return (
    <section className='hero flex'>
      <div className="left-section">

        <div className="parent-avatar flex">
          <motion.img
            initial = {{transform:"scale(0)"}}
            animate = {{ transform:"scale(1.1)"}}
            transition={{damping:6, type:"spring", stiffness:"100"}}
           src="./images/TitleImage.png" alt="" className='avatar'/>
          <div className='icon-verified flex'></div>
        </div>

        <h1 className="title">Data Science, Machine learning engineering</h1>

        <p className='subtitle'>I'm Hassane Skikri, a computer Science student with a deep passion for data science and machine learning. I excel at transforming complex data into actionable insights, driving impactful solutions and continuous improvement.</p>

        <div className="all-icons flex">
          
          <div className="icon icon-twitter"></div>
          <div className="icon icon-instagram"></div>
          <a href="https://github.com/HassaneSkikri/HassaneSkikri"><div className="icon icon-github"></div></a>
          <a href="https://www.linkedin.com/in/hassane-skikri-8b25b9308/"><div className="icon icon-linkedin-square"></div></a>
        </div>
      </div>
      <div className="right-section animation">
        <Lottie lottieRef={lottieRef} onLoadedImages={() => {
          // @ts-ignore
          lottieRef.current.setSpeed(1.5);
        }} animationData={MlAnimation} />
      </div>
    </section>
  );
}
