import {useRouter} from 'next/router'
import { Fragment } from 'react';
import { getEventById, getAllEvents, getFeaturedEvents } from '../../helpers/api.utils'
import EventSummary from '../../components/event-detail/event-summary'
import EventLogistics from '../../components/event-detail/event-logistics'
import EventContent from '../../components/event-detail/event-content'
import ErrorAlert from '../../components/ui/error-alert'

function EventDetailPage(props) {

    const event = props.selectedEvent;

    if(!event) {
        return (
            <div className='center'>
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <Fragment>
            <EventSummary title={event.title} />
            <EventLogistics 
                date={event.date} 
                address={event.location}
                image={event.image}
                imageAlt={event.title}
            />
            <EventContent>
                <p>{event.description}</p>
            </EventContent>
        </Fragment>
    )
}

export async function getStaticProps(context) {

    const eventID = context.params.eventId

    const event = await getEventById(eventID)

    return {
        props: {
            selectedEvent: event
        },
        revalidate: 30
    }
}

export async function getStaticPaths() {

    //Como é muito overkill dar pre-render a todos os eventos, damos apenas ao eventos featured pois
    // são os mais provável de ser visitados muitas vezes
    const events = await getFeaturedEvents()

    const paths = events.map(event => (
        { params: {eventId: event.id} }
    ));

    return {
        paths: paths,
        fallback: 'blocking'
    }
}

export default EventDetailPage;