import classes from "./newsletterRegistration.module.css";
import { useRef, useContext } from "react";
const axios = require("axios");
import NotificationContext from "../../store/notificationContext";

export default function NewsletterRegistration() {
  const emailRef = useRef();
  const notificationCTX = useContext(NotificationContext);

  function registrationHandler(event) {
    event.preventDefault();

    const signUpEmail = emailRef.current.value;
    notificationCTX.showNotification({
      title: "Signing up...",
      message: "Registering for newsletter",
      status: "pending",
    });
    emailRef.current.value = "";

    axios
      .post("/api/newsletter", { email: signUpEmail })
      .then((response) => {
        notificationCTX.showNotification({
          title: "Success",
          message: "You have registered for our newsletter",
          status: "success",
        });
      })
      .catch((error) => {
        notificationCTX.showNotification({
          title: "Error",
          message: error.message || "Apologies, something went wrong",
          status: "error",
        });
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
