import fs from 'fs/promises'
import Link from 'next/link';
import path from 'path'

function HomePage(props) {

    const {products} = props;

    return (
        <ul>
            {products.map((product) => 
                <li key={product.id}>
                    <Link href={`/products/${product.id}`}>
                        {product.title}
                    </Link>
                </li>
            )}
        </ul>
    );
}

/*
During the build process, this data is pre-fetched and available for the page when its pre-rendered,
so that the pre-rendered page contains pre-fetched data.

Since getStaticProps executes during the build process we can execute node.js code in there, which wouldnt
run in the browser
*/
export async function getStaticProps() {
    const filepath = path.join(process.cwd(), 'data', 'dummy-backend.json')
    const jsonData = await fs.readFile(filepath)
    const data = JSON.parse(jsonData)

    if(!data) {
        return {
            redirect: {
                destination: '/no-data'
            }
        }
    }

    if(data.products.length == 0) {
        return {notFound: true};
    }

    return {
        props: {
            products : data.products,
        },
        //Data can get outdated after the pages were pre-generated so we use revalidate key
        revalidate: 10,
    };
}
 
export default HomePage;