import { useState } from "react";
import "./main.css";
import { ListProjects } from "./ProjectsData";
import { AnimatePresence, motion } from "framer-motion";

export default function Main() {
  const [currentActive, setCurrentActive] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 8;

  const filteredProjects =
    currentActive === "all"
      ? ListProjects
      : ListProjects.filter((project) =>
          project.category.includes(currentActive)
        );

  const totalProjects = filteredProjects.length;
  const totalPages = Math.ceil(totalProjects / projectsPerPage);

  const currentProjects = filteredProjects.slice(
    (currentPage - 1) * projectsPerPage,
    currentPage * projectsPerPage
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
    { key: "computervision", label: "Computer Vision" }
  ];

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <main className="flex">
      <section className="left-section flex">
        {categories.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => {
              setCurrentActive(key);
              setCurrentPage(1); // Reset to first page when category changes
            }}
            className={currentActive === key ? "active" : null}
          >
            {label}
          </button>
        ))}
      </section>

      <section className="right-section flex">
        <div className="cards-wrapper">
          <AnimatePresence>
            {currentProjects.map((item) => (
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
        </div>
        
        <div className="pagination flex">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="pagination-btn"
          >
            Previous
          </button>
          <span className="pagination-info">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="pagination-btn"
          >
            Next
          </button>
        </div>
      </section>
    </main>
  );
}
