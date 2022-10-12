import styles from '../../../styles/posts-grid.module.css'
import PostItem from './post-item'

function PostGrid(props) {
    const { posts } = props
    
    return (
        <ul className={styles.grid}>
            {posts.map((post) => (
                <PostItem key={post.slug} post={post} />
            ))}
        </ul>
    )
}

export default PostGrid;