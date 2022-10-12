import styles from '../../../styles/post-item.module.css'
import Link from 'next/link';
import Image from 'next/image';

function PostItem(props) {

    const { image, title, excerpt, date, slug } = props.post;

    //Format date to a more readble form
    const formattedDate = new Date(date).toLocaleDateString('en-US', {
        dat: 'numeric',
        month: 'long',
        year: 'numeric'
    })

    const imagePath = `/images/posts/${slug}/${image}`
    const linkPath = `/posts/${slug}`

    return (
        <li className={styles.post}>
            <Link href={linkPath}>
                <a>
                    {/* Top div will contain the image */}
                    <div className={styles.image}>
                        <Image src={imagePath} alt={title} width={300} height={200} layout='responsive' />
                    </div>
                    {/* Lower div will hold the content */}
                    <div className={styles.content}>
                        <h3>{title}</h3>
                        <time>{formattedDate}</time>
                        <p>{excerpt}</p>
                    </div>
                </a>
            </Link>
        </li>
    )
}

export default PostItem;