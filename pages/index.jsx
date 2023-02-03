import Head from "next/head";
import EventList from "../components/events/EventList";
import NewsletterRegistration from "../components/input/newsletterRegistration";
import { getFeaturedEvents } from "../helpers/api-utils";
import Head from "next/head";

export default function Homepage(props) {
  const featuredEvents = getFeaturedEvents();

  return (
    <>
        <title>Event Homepage</title>
        <meta
          name="description"
          content="Some page description to be decided"
        />
      </Head>
      <NewsletterRegistration />
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
