import EventList from "../components/events/EventList";
import { getFeaturedEvents } from "../helpers/api-utils";

export default function Homepage(props) {
  const featuredEvents = getFeaturedEvents();

  return (
    <>
      <EventList items={props.events} />
    </>
  );
}

export async function getStaticProps(context) {
  const featuredEvents = await getFeaturedEvents();
  return {
    props: {
      events: featuredEvents,
    },
  };
}
