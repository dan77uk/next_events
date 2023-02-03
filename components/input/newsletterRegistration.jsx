import classes from "./newsletterRegistration.module.css";
import { useRef } from "react";
const axios = require("axios");

export default function NewsletterRegistration() {
  const emailRef = useRef();
  function registrationHandler(event) {
    event.preventDefault();

    const signUpEmail = emailRef.current.value;
    emailRef.current.value = "";

    axios
      .post("/api/newsletter", { email: signUpEmail })
      .then(({ data, status }) => {
        console.log(data.message, status);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
            required
            ref={emailRef}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}
