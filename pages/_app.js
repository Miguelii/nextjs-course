import '../styles/globals.css'
<<<<<<< HEAD
import Layout from '../components/layout/layout'

function MyApp({Component, pageProps}) {
    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    );
}

export default MyApp;
=======

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
>>>>>>> Section-6
