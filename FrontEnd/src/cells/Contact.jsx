import { useForm, ValidationError } from "@formspree/react";
import { Github, Linkedin, Mail, Send } from "lucide-react";
import { profile } from "../data/profile.js";

export function Contact({ n }) {
  const [state, handleSubmit] = useForm("xgvwdgbg");
  return (
    <section id="contact" data-cell="contact" className="block block--close" aria-labelledby="contact-title">
      <h2 id="contact-title" className="md__h2">Get in touch</h2>
      <div className={`cell ${n ? "is-run" : ""}`}>
        <div className="cell__in">
          <span className="prompt" aria-hidden="true">In [{n || " "}]</span>
          <div className="cell__src">
            <code>
              <span className="tk-fn">send_message</span>(<span className="tk-arg">to</span>=<span className="tk-str">{'"hassane"'}</span>)
            </code>
          </div>
        </div>
        <div className="cell__out">
          <span className="prompt prompt--out" aria-hidden="true" />
          <div className="cell__body">
            {state.succeeded ? (
              <p className="sent" role="status">
                Sent. Thank you, I read every message and reply from {profile.email}.
              </p>
            ) : (
              <form className="msg" onSubmit={handleSubmit}>
                <label className="field">
                  <span>your email</span>
                  <input type="email" name="email" required autoComplete="email" placeholder="you@company.com" />
                  <ValidationError prefix="Email" field="email" errors={state.errors} className="err" />
                </label>
                <label className="field">
                  <span>message</span>
                  <textarea name="message" required rows={4} placeholder="What are you working on?" />
                  <ValidationError prefix="Message" field="message" errors={state.errors} className="err" />
                </label>
                <button className="btn btn--primary" type="submit" disabled={state.submitting}>
                  {state.submitting ? "Sending…" : "Send"} <Send size={15} aria-hidden="true" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <ul className="direct">
        <li>
          <Mail size={16} aria-hidden="true" />
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
        </li>
        <li>
          <Linkedin size={16} aria-hidden="true" />
          <a href={profile.linkedin} target="_blank" rel="noreferrer">linkedin.com/in/hassane-skikri</a>
        </li>
        <li>
          <Github size={16} aria-hidden="true" />
          <a href={profile.github} target="_blank" rel="noreferrer">github.com/SkikriHassane01</a>
        </li>
      </ul>
      <p className="colophon">
        © {new Date().getFullYear()} Hassane Skikri. Built with React, Vite and a scroll engine that never generates its own DOM.{" "}
        <a href={profile.source} target="_blank" rel="noreferrer">Source</a>.
      </p>
    </section>
  );
}
