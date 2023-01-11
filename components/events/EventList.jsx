import EventItem from "./EventItem";
import classes from "./EventList.module.css";

export default function EventList(props) {
  const { items } = props;

  return (
    <ul className={classes.list}>
      {items.map((event) => {
        return (
          <EventItem
            key={event.id}
            id={event.id}
            title={event.title}
            location={event.location}
            date={event.date}
            image={event.image}
          />
        );
      })}
    </ul>
  );
}

// <Link href="/" className="some-class">
// Click me
// </Link>
