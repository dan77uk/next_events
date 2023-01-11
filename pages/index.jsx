import EventList from "../components/events/EventList";
import { getFeaturedEvents } from "../dummy-data";

export default function Homepage() {
  const featuredEvents = getFeaturedEvents();

  return (
    <>
      <EventList items={featuredEvents} />
    </>
  );
}
