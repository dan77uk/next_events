import EventList from "../../components/events/EventList";
import EventsSearch from "../../components/events/EventsSearch";
import { Fragment } from "react";
import { useRouter } from "next/router";
import { getAllEvents } from "./../../helpers/api-utils";

export default function AllEvents(props) {
  const router = useRouter();

  function findEventsHandler(year, month) {
    const path = `/events/${year}/${month}`;
    router.push(path);
  }

  return (
    <Fragment>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={props.events} />
    </Fragment>
  );
}

export async function getStaticProps(context) {
  const allEvents = await getAllEvents();

  return {
    props: {
      events: allEvents,
    },
  };
}
