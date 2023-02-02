import { useRouter } from "next/router";
import { Fragment } from "react";
import EventList from "../../components/events/EventList";
import ResultsTitle from "../../components/events/ResultsTitle";
import ButtonLink from "../../components/ui/ButtonLink";
import { getFilteredEvents } from "./../../helpers/api-utils";

export default function FilteredEventsPage(props) {
  const router = useRouter();
  const filterData = router.query.slug;

  if (!filterData) {
    return <p className="center">Loading...</p>;
  }

  const filteredYear = Number(filterData[0]);
  const filteredMonth = Number(filterData[1]);

  if (props.hasError) {
    return (
      <Fragment>
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
        <p className="center">No events found</p>
        <div className="center">
          <ButtonLink link="/events">Show All Events</ButtonLink>
        </div>
      </Fragment>
    );
  }

  const date = new Date(props.date.filteredYear, props.date.filteredMonth - 1);
  return (
    <Fragment>
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
