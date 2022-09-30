import { Fragment } from "react"
import fs from 'fs/promises'
import path from 'path'


function ProductDetailPage(props) {
    const {loadedProduct} = props;

    //If fallback is set to true:
    if(!loadedProduct) {
        return <p>Loading...</p>
    }

    return (
        <Fragment>
            <h1>{loadedProduct.title}</h1>
            <p>{loadedProduct.description}</p>
        </Fragment>
    )
}

async function getData() {
    const filepath = path.join(process.cwd(), 'data', 'dummy-backend.json')
    const jsonData = await fs.readFile(filepath)
    const data = JSON.parse(jsonData)

    return data;
}

export async function getStaticProps(context) {
    const {params} = context;
    const productId = params.pid;

    const data = await getData();

    const product = data.products.find(product => product.id == productId);

    if(!product) {
        return {
            notFound: true
        };
    }

    return {
        props: {
            loadedProduct: product
        }
    };
}

/*
Function to tell next.js which param values pages should be pre-generated

We also need this function when using getStaticProps (code above) on a dynamic page or we'll get an error

getStaticPaths returns an object with a paths key which holds an array of param objects in the end, where
we basically just make Next.js aware of all the parameter values of this dynamic page that should be used
for pre-rendering a paga
*/
export async function getStaticPaths() {
    const data = await getData();

    const ids = data.products.map((product) => product.id)

    const paramsWithparams = ids.map((id) => ({params: {pid: id}}))

    return {
        paths: paramsWithparams,
        fallback: true,
    };
}

export default ProductDetailPage;