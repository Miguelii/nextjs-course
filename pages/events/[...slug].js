import {useRouter} from 'next/router'
import { getFilteredEvents } from '../../helpers/api.utils';
import EventList from '../../components/events/event-list';
import { Fragment, useEffect, useState } from 'react';
import ResultsTitle from '../../components/events/results-title';
import Button from '../../components/ui/button'
import ErrorAlert from '../../components/ui/error-alert'
import useSWR from 'swr';
import Head from 'next/head'

//Client side data fetching, server side redering example in txt file

function FilteredEventsPage(props) {
    const router = useRouter();
    const filterData = router.query.slug;

    const [loadedEvents, setLoadedEvents] = useState();

    const { data, error } = useSWR('https://nextjs-course-b66b9-default-rtdb.firebaseio.com/events.json');

    useEffect(() => {
        if (data) {
          const events = [];
    
          for (const key in data) {
            events.push({
              id: key,
              ...data[key],
            });
          }
    
          setLoadedEvents(events);
        }
    }, [data]);
    
    let pageHeadData = (
        <Head>
            <title>Filtered Events</title>
            <meta 
                name= "Description" 
                content= {`A list of filtered events`}
            />
        </Head>
    )

    if(!loadedEvents) {
        return (
            <Fragment>
                {pageHeadData}
                <p className='center'>Loading...</p>
            </Fragment>
        );
    }
    
    const FilteredYear = filterData[0];
    const FilteredMonth = filterData[1];

    const numYear = +FilteredYear;
    const numMonth = +FilteredMonth;

    pageHeadData = (
        <Head>
            <title>Filtered Events</title>
            <meta 
                name= "Description" 
                content= {`All Events for ${numMonth}/${numYear}.`}
            />
        </Head>
    )

    if(isNaN(numYear) || isNaN(numMonth) || numYear > 2030 || numYear < 2021 || numMonth < 1 || numMonth > 12 || error) {
        return (
            <Fragment>
                {pageHeadData}
                <ErrorAlert>
                    <p>Invalid filter. Please adjust your values!</p>
                </ErrorAlert>
                <div className='center'>
                    <Button link='/events'>Show All Events</Button>
                </div>
            </Fragment>
        );
    }

    const filteredEvents = loadedEvents.filter((event) => {
        const eventDate = new Date(event.date);
        return (
            eventDate.getFullYear() === numYear && eventDate.getMonth() === numMonth - 1
        );
    });

    if(!filteredEvents || filteredEvents.length == 0) {
        return (
            <Fragment>
                {pageHeadData}
                <div className='center'>
                    <p>No events found</p>
                    <Button link='/events'>Show All Events</Button>
                </div>
            </Fragment>
        );
    }

    const date = new Date(numYear,numMonth);

    return (
        <Fragment>
            {pageHeadData}
            <ResultsTitle date={date}/>
            <EventList items={filteredEvents}/>
        </Fragment>
    )
}


export default FilteredEventsPage;