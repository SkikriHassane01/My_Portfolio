import "./contact.css";
export default function Contact() {
  return (
    <section className="contact-us">
      <h1 className="title">
        <span className="icon-envelope"> </span>
        Contact us
      </h1>
      <p className="subtitle">
        Contact us for more information and Get notified when I publish
        something new.
      </p>
      <div className="flex">
        <form action="">
          <div className="flex">
            <label htmlFor="email">Email Address:</label>
            <input type="email" id="email"required />
          </div>

          <div className="flex" style={{marginTop: "25px"}}>
            <label htmlFor="message">Your message:</label>
            <textarea id="message" required></textarea>
          </div>

          <button className="submit">Submit</button>
        </form>
        <div className="animation">dgs</div>
      </div>
    </section>
  );
}
