import "./contact.css";
import { useForm, ValidationError } from "@formspree/react";
import Lottie from "lottie-react";
import doneAnimation from "../../animation/done.json";
import contactAnimation from "../../animation/contactus.json"
export default function Contact() {
  const [state, handleSubmit] = useForm("xgvwdgbg");
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
      <div className="flex" style={{justifyContent:"space-between"}}>
        <form onSubmit={handleSubmit}>
          <div className="flex">
            <label htmlFor="email">Email Address:</label>
            <input type="email" id="email" name="email" required />
            <ValidationError
              prefix="Email"
              field="email"
              errors={state.errors}
            />
          </div>

          <div className="flex" style={{ marginTop: "25px" }}>
            <label htmlFor="message">Your message:</label>
            <textarea id="message" name="message" required></textarea>
            <ValidationError
              prefix="Message"
              field="message"
              errors={state.errors}
            />
          </div>

          <button className="submit" type="submit" disabled={state.submitting}>
            {state.submitting ? "Submitting ..." : "Submit"}
          </button>
          {state.succeeded && (
            <p className="flex"
              style={{
                fontSize: "16px",
                marginTop: "1.7rem",
                color: "var(--title)",
              }}
            >
             <Lottie loop={false} className="flex" style={{height:35}} animationData={doneAnimation} />
              Your message has been sent successfully 👌
            </p>
          )}
        </form>
        <div className="animation">
          <Lottie className="flex contact-animation" style={{height:300}} animationData={contactAnimation} />
        </div>
      </div>
    </section>
  );
}
