import Head from "next/head";
import EventList from "../components/events/EventList";
import { getFeaturedEvents } from "../helpers/api-utils";

export default function Homepage(props) {
  const featuredEvents = getFeaturedEvents();

  return (
    <>
      <Head>
        <title>Next Events | Developed by Dan Phillips</title>
        <meta
          name="description"
          content="The best events for the type of people who attend these events"
        />
      </Head>
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
