import { useState } from "react";
import "./main.css";
import { ListProjects } from "./ProjectsData";
import { AnimatePresence, motion, spring } from "framer-motion";

export default function Main() {
  const [currentActive, setCurrentActive] = useState("all");

  const filteredProjects =
    currentActive === "all"
      ? ListProjects
      : ListProjects.filter((project) =>
          project.category.includes(currentActive)
        );

  const categories = [
    { key: "all", label: "All projects" },
    { key: "classification", label: "ML Classification" },
    { key: "regression", label: "ML Regression" },
    { key: "deepLearning", label: "Deep Learning" },
    { key: "NLP", label: "NLP projects" },
    { key: "Python", label: "Python projects" },
    { key: "C/C++/java", label: "C/C++/Java" },
    { key: "WebDevelopment", label: "Web Development" },
    { key: "Top", label: "Top Projects" },
  ];

  return (
    <main className="flex">
      <section className="left-section flex">
        {categories.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setCurrentActive(key)}
            className={currentActive === key ? "active" : null}
          >
            {label}
          </button>
        ))}
      </section>

      <section className="right-section flex">
        <AnimatePresence>
          {filteredProjects.map((item) => (
            <motion.article
              key={`${item.imgPath}-${item.projectTitle}`}
              layout
              initial={{ transform: "scale(0.4)" }}
              animate={{ transform: "scale(1)" }}
              transition={{
                type: "spring",
                damping: 8,
                stiffness: 50,
              }}
              className="card"
            >
              <img
                src={item.imgPath}
                width={266}
                height={180}
                alt={item.projectTitle}
              />
              <div className="box" style={{ width: "266px" }}>
                <h1 className="title">{item.projectTitle}</h1>
                <p className="sub-title">{item.subtitle}</p>
                <div className="icons flex">
                  <div className="flex" style={{ gap: "11px" }}>
                    <div className="icon-link"></div>
                    <div className="icon-github"></div>
                  </div>
                  <a className="link flex" href={item.link}>
                    more{" "}
                    <span
                      className="icon-arrow-right"
                      style={{ alignSelf: "end" }}
                    ></span>
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </section>
    </main>
  );
}
