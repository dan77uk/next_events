import { useRouter } from "next/router";
import { Fragment } from "react";
import EventList from "../../components/events/EventList";
import ResultsTitle from "../../components/events/ResultsTitle";
import ButtonLink from "../../components/ui/ButtonLink";
import { getFilteredEvents } from "./../../helpers/api-utils";
import Head from "next/head";

export default function FilteredEventsPage(props) {
  const router = useRouter();
  const filterData = router.query.slug;

  const pageHead = (
    <Head>
      <title>Filtered Events</title>
      <meta name="description" content="All events" />
    </Head>
  );

  if (!filterData) {
    return (
      <Fragment>
        {pageHead}
        <p className="center">Loading...</p>;
      </Fragment>
    );
  }

  if (props.hasError) {
    return (
      <Fragment>
        {pageHead}
        <p className="center">Invalid filter. Please adjust your values</p>
        <div className="center">
          <ButtonLink link="/events">Show All Events</ButtonLink>
        </div>
      </Fragment>
    );
  }

  const filteredEvents = props.filteredEvents;

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <Fragment>
        {pageHead}
        <p className="center">No events found</p>
        <div className="center">
          <ButtonLink link="/events">Show All Events</ButtonLink>
        </div>
      </Fragment>
    );
  }

  const date = new Date(props.date.year, props.date.month - 1);

  return (
    <Fragment>
      {pageHead}

      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </Fragment>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;

  const filterData = params.slug;

  const filteredYear = Number(filterData[0]);
  const filteredMonth = Number(filterData[1]);

  if (
    isNaN(filteredYear) ||
    isNaN(filteredMonth) ||
    filteredYear > 2030 ||
    filteredYear < 2021 ||
    filteredMonth < 1 ||
    filteredMonth > 12
  ) {
    return {
      props: {
        hasError: true,
      },
    };
  }

  const filteredEvents = await getFilteredEvents({
    year: filteredYear,
    month: filteredMonth,
  });

  return {
    props: {
      filteredEvents: filteredEvents,
      date: { year: filteredYear, month: filteredMonth },
    },
  };
}
