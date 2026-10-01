export const profile = {
  name: "Hassane Skikri",
  role: "Machine learning engineer",
  based: "Fès, Morocco",
  school: "ENSA Fès, State Engineer in Computer Science",
  focus: "LLM systems, computer vision, data products",
  email: "hassaneskikri@gmail.com",
  github: "https://github.com/SkikriHassane01",
  linkedin: "https://www.linkedin.com/in/hassane-skikri",
  source: "https://github.com/SkikriHassane01/My_Portfolio",
};

// Newest first. `project` links a role to its row in projects.js.
export const experience = [
  {
    id: "lear",
    when: "2026",
    role: "Final-year engineering internship (PFE)",
    org: "Lear Corporation",
    place: "Meknès",
    project: "lear-assistant",
    did: "Built a local LLM assistant that answers questions over industrial Excel KPI data, routing between RAG and a Pandas engine.",
  },
  {
    id: "technocolabs",
    when: "Aug to Oct 2025",
    role: "Deep learning intern",
    org: "Technocolabs",
    place: "Remote",
    project: "virtual-try-on",
    did: "Virtual try-on: DeepLab body segmentation and Stable Diffusion garment generation behind a Django app.",
  },
  {
    id: "capgemini",
    when: "Jun to Jul 2025",
    role: "Data analysis intern",
    org: "Capgemini",
    place: "Fès",
    project: "pta-compare",
    did: "A Streamlit tool that detects and visualises changes between versions of automotive spring PTA files.",
  },
  {
    id: "ensaf",
    when: "Jul to Oct 2024",
    role: "Machine learning intern",
    org: "ENSA Fès",
    place: "Fès",
    project: "health-ai",
    did: "HealthAI: six disease-detection models, Flask and React, Docker, per-patient diagnostic history.",
  },
];

export const education = [
  { when: "2021 to 2026", what: "State Engineer degree, Computer Science", where: "ENSA Fès (National School of Applied Sciences)" },
  { when: "2019 to 2021", what: "Baccalaureate, Mathematical Sciences A", where: "Lalla Salma High School, Rissani" },
];

export const credentials = [
  { name: "Data Scientist: Machine Learning, Professional Certification", issuer: "Codecademy", year: 2024, verify: "https://www.codecademy.com/profiles/HassaneSkikri/certificates/8e9e59de3f924b33ad2371faf667129b" },
  { name: "Machine Learning Specialization", issuer: "DeepLearning.AI and Stanford, Coursera", year: 2023, verify: "https://www.coursera.org/account/accomplishments/verify/3VXZF58EYKMR", verifyNote: "course 1" },
  { name: "IBM Data Science Professional", issuer: "IBM, Coursera", year: 2024, verify: "https://www.coursera.org/account/accomplishments/verify/9FA7AQBB3CFZ", verifyNote: "methodology course" },
  { name: "Data Science, ML, DL and NLP Bootcamp", issuer: "Krish Naik, Udemy" },
  { name: "GitHub Foundations", issuer: "GitHub" },
  { name: "SQL Associate", issuer: "DataCamp" },
  { name: "Excel for Business", issuer: "Macquarie University, Coursera", verify: "https://www.coursera.org/account/accomplishments/verify/CVL3U8PS8XBE" },
];

export const languages = [
  { name: "Arabic", level: "Native" },
  { name: "French", level: "B2" },
  { name: "English", level: "B2" },
];

// Passages the router's document engine retrieves from. Short, factual,
// one topic each, so the best-scoring passage is a complete answer.
export const passages = [
  { id: "about", source: "profile", text: "Hassane Skikri is a machine learning engineer from Morocco, based in Fès. He builds systems that answer questions about data: LLM assistants with retrieval, computer vision pipelines, and data products." },
  { id: "education", source: "profile.education", text: "He studied computer science engineering at ENSA Fès, the National School of Applied Sciences of Fez, from 2021 to 2026, after a Baccalaureate in Mathematical Sciences A at Lalla Salma High School in Rissani." },
  { id: "lear", source: "experience.lear", text: "For his final-year engineering internship (PFE) at Lear Corporation in Meknès he built an industrial AI assistant. Engineers ask questions in natural language about complex Excel KPI files. A cognitive router sends each question either to document retrieval (RAG with ChromaDB) or to a Pandas data engine so calculations are exact. The LLM is Mistral 7B served by Ollama, everything runs 100% locally for confidentiality, and a recommendation module generates personalised dashboards. The front end is React." },
  { id: "router", source: "experience.lear", text: "Why route instead of letting the LLM answer everything? Language models are unreliable at arithmetic over tables. Routing numeric questions to a Pandas engine means the figures are computed, and the model only phrases the answer. This page's ask cell is a miniature of that idea." },
  { id: "technocolabs", source: "experience.technocolabs", text: "At Technocolabs, remotely, from August to October 2025, he was a deep learning intern and built a virtual try-on system: DeepLab body segmentation with auto-correction, Stable Diffusion text-to-image clothing generation, and a Django web app where users upload a photo and a description." },
  { id: "capgemini", source: "experience.capgemini", text: "At Capgemini in Fès, June to July 2025, as a data analysis intern, he developed a PTA file comparison tool that automatically detects changes in automotive springs between versions, with statistical analyses, interactive visualisations and a Streamlit interface for import, comparison and export." },
  { id: "healthai", source: "experience.ensaf", text: "At ENSA Fès, July to October 2024, as a machine learning intern, he built HealthAI: a medical diagnosis platform integrating six disease-detection models, a Flask backend and React frontend containerised with Docker, and a diagnostic history for each patient." },
  { id: "skills", source: "profile.skills", text: "Languages: Python, SQL, Java, C#. Machine learning: supervised and unsupervised learning, ensemble models, Optuna, MLflow. Deep learning: TensorFlow, Keras, PyTorch, CNNs, RNNs, Transformers, OpenCV, YOLOv8. LLMs: LangChain, RAG, Ollama, ChromaDB. Data: Pandas, NumPy, Power BI, Tableau, Plotly. Apps: Flask, Django, FastAPI, React, Streamlit, .NET. Ops: Docker, Git, AWS, Azure, Heroku." },
  { id: "languages", source: "profile.languages", text: "He speaks Arabic natively, and French and English at B2 level." },
  { id: "certs", source: "credentials", text: "Certifications include the Codecademy Data Scientist: Machine Learning professional certification, the Machine Learning Specialization by Andrew Ng (DeepLearning.AI and Stanford), the IBM Data Science Professional certificate, Krish Naik's DS, ML, DL and NLP bootcamp, GitHub Foundations, DataCamp SQL Associate and Excel for Business." },
  { id: "contact", source: "profile.contact", text: "You can reach him by email at hassaneskikri@gmail.com, on LinkedIn at linkedin.com/in/hassane-skikri, or through the message cell at the bottom of this page. His code is on GitHub at github.com/SkikriHassane01." },
  { id: "vision", source: "projects", text: "His computer vision work includes number plate recognition with YOLOv8 and EasyOCR, a car counter, object detection with YOLO, face recognition with a real-time database, hand tracking, a gesture-controlled calculator, a poker hand detector and OCR text extraction." },
  { id: "chatbot", source: "projects.portfolio", text: "This portfolio's backend is a Flask service with a fine-tuned transformer intent classifier for the chatbot. When it is not confident it falls back to a hosted language model. The site itself is React and Vite, and both ship as one Docker image." },
  { id: "workstyle", source: "profile", text: "His work style is analytical: he breaks problems down into manageable parts. He is comfortable working independently and thrives in teams, and keeps learning through courses and personal projects." },
];
