import { useEffect, useState } from "react";
import userSWR from 'swr'


/*
-- Exemple of cliente side data fetching with Next.js --
We dont wanna add getStaticProps or getServerSideProps here, because we dont want to pre-fetch 
the data on the server or during the build time, but there is an exemple at the end of the code.

Note: Next.js still pre-render this page but without the data
*/
function LastSalesPage(props) {
    const [sales, setSales] = useState(props.sales);

    //We can use SWR Hook insted of useEffect -> Read docs to find more
    const {data, error} = userSWR('https://nextjs-course-b66b9-default-rtdb.firebaseio.com/sales.json');

    //Using useEffect here not for sending the request (like the code below) but for transforming the data
    useEffect(() => {
        if (data) {
          const transformedSales = [];
    
          for (const key in data) {
            transformedSales.push({
              id: key,
              username: data[key].username,
              volume: data[key].volume,
            });
          }
    
          setSales(transformedSales);
        }
      }, [data]);

    /*
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetch('https://nextjs-course-b66b9-default-rtdb.firebaseio.com/sales.json')
        .then(response => response.json())
        .then(data => {
            const transformedSales = [];
            
            //Take data object and transform into an array
            for(const key in data) {
                transformedSales.push({
                    id: key, 
                    username: data[key].username,
                    volume: data[key].volume,
                });
            }
            
            setSales(transformedSales);
            setLoading(false);
        });
    }, [])

    if(isLoading) {
        return <p>Loading...</p>
    }

    //We need this condition because react only runs useEffect after the whole component is loaded
    if(!sales) {
        return <p>No data yet</p>
    }
    */

    if(error) {
        return <p>Failed to load</p>
    }

    if(!data && !sales) {
        return <p>Loading...</p>
    }


    return (
        <ul>
            {sales.map((sale) => (
                <li key={sale.id}>
                    {sale.username} - ${sale.volume}
                </li>
            ))}
        </ul>
    )
}

//EXTRA: combine client-side data fetching with server-side pre-rendering
export async function getStaticProps() {
    return fetch('https://nextjs-course-b66b9-default-rtdb.firebaseio.com/sales.json')
        .then(response => response.json())
        .then(data => {
            const transformedSales = [];
            
            //Take data object and transform into an array
            for(const key in data) {
                transformedSales.push({
                    id: key, 
                    username: data[key].username,
                    volume: data[key].volume,
                });
            }

            return {
                props: { sales: transformedSales},
                revalidate: 10
            };
        });
}

export default LastSalesPage;