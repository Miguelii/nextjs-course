import Link from "next/link";

import style from '../../styles/main-header.module.css'

function MainHeader(props) {
    return (
        <header className={style.header}>
            <div className={style.logo}>
                <Link href="/">NextEvents</Link>
            </div>
            <nav className={style.navigation}>
                <ul>
                    <li>
                        <Link href="/events">Browse ALL Events</Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default MainHeader;