import ButtonLink from "../ui/ButtonLink";
import classes from "./resultsTitle.module.css";

export default function ResultsTitle(props) {
  const { date } = props;

  const humanReadableDate = new Date(date).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <section className={classes.title}>
      <h1>Events in {humanReadableDate}</h1>
      <ButtonLink link="/events">Show all events</ButtonLink>
    </section>
  );
}
