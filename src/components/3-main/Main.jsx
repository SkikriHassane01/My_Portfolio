import "./main.css";
export default function Main() {
  const list = [1,2,3]
  return (
    <main className="flex">
      <section className="left-section flex">
        <button className="active">All projects</button>
        <button>ML Classification</button>
        <button>ML Regression</button>
        <button>Deep Learning</button>
        <button>NLP projects</button>
        <button>Top Projects</button>

      </section>

      <section className="right-section flex">

      {/* list of cards */} 
      {list.map((item) => {
        return(
        <article key={item} className="card">
          <img src="./home image.png" width={266} alt="" />
          <div className="box" style={{width: "266px"}}>
            <h1 className="title">hello</h1>
            <p className="subtitle">Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio sapiente sequi incidunt repellendus rem? Eius beatae illo magnam! Labore aspernatur, aperiam quaerat voluptatum atque dolores magnam natus ab nam error.</p>
            <div className="icons flex">
              <div className="flex" style={{gap:"11px"}}>
                <div className="icon-link"></div>
                <div className="icon-github"></div>
              </div>
              <a className="link flex" href="">more <span className="icon-arrow-right" style={{alignSelf:"end"}}></span></a>
            </div>
            </div>
        </article>
        );
      })}


        
      </section>
    </main>
  );
}
