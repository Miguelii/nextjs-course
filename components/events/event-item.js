import Link from "next/link";
import styles from '../../styles/event-item.module.css';
import Button from '../ui/button';
import DateIcon from '../icons/date-icon'
import AdressIcon from '../icons/address-icon'
import ArrowRightIcon from '../icons/arrow-right-icon'
import Image from 'next/image'

function EventItem(props) {

    const {title,image,date,location,id} = props;

    const dateFormat = new Date(date).toLocaleString('en-US' , {
        dat: 'numeric',
        month: 'long',
        year: 'numeric',
    });

    const addressFormat = location.replace(',','\n');

    const exploreLink = `/events/${id}`

    return (
        <li className={styles.item}>
            <Image src={'/' + image} alt={title} width={250} height={160}  />
            <div className={styles.summary}>
                <h2>{title}</h2>
                <div className={styles.date}>
                    <DateIcon />
                    <time>{dateFormat}</time>
                </div>
                <div className={styles.address}>
                    <AdressIcon />
                    <address>{addressFormat}</address>
                </div>
            </div>

            <div className={styles.actions}>
                <Button link={exploreLink}>
                    <span>Explore Event</span>
                    <span className={styles.icon}>
                        <ArrowRightIcon />
                    </span>
                </Button>
            </div>
        </li>
    )
}

export default EventItem;