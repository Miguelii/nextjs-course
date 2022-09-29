import Link from 'next/link'
import {getAllEvents} from '../dummy-data'
import EventList from '../components/events/event-list';

function HomePage() {

    const getFeature = getAllEvents();
    
    return (
        <div>
            <EventList items={getFeature} />
        </div>
    );
}

export default HomePage;