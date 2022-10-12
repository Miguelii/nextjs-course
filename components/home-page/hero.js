import styles from '../../styles/hero.module.css'
import Image from 'next/image'

function Hero() {
    return (
        <section className={styles.hero}>
            <div className={styles.image}>
                <Image src="/images/site/max.png" alt="Image showing miguel" width={300} height={300} />
            </div>
            <h1>Hi! I'm Migueli</h1>
            <p>I blog about cenas e coisas</p>
        </section>
    )
}

export default Hero;