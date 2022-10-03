import { getAllEvents } from "../../helpers/api.utils";
import EventList from "../../components/events/event-list";
import EventsSearch from "../../components/events/events-search";
import { Fragment } from "react";
import { useRouter } from 'next/router'
import Head from 'next/head'


function AllEventsPage(props) {

    const router = useRouter();
    const { events } = props;

    function findEventHandler(year,month) {
        const fullPath = `/events/${year}/${month}`

        router.push(fullPath);
     }

    return (
        <Fragment>
            <Head>
                <title>
                    All Events
                </title>
                <meta 
                    name= "Description" 
                    content= "Umas coisas bunitas"
                />
            </Head>
            <EventsSearch onSearch={findEventHandler} />
            <EventList items={events}/>
        </Fragment>
    )
}

export async function getStaticProps() {

    const events = await getAllEvents();

    return {
        props: {
            events: events
        },
        revalidate: 60
    }
}


export default AllEventsPage;