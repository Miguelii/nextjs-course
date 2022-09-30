
/*
We cant pre-rendered this page like [pid].js because we dont know which users will have a advance
*/
function UserProfilePage(props) {
    return (
        <h1>{props.username}</h1>
    );
}

export default UserProfilePage;

//Its not statically pre-generated, only executes on the server after deployment
export async function getServerSideProps(context) {
    //req and res -> default node.js objects
    const {params, req, res} = context;

    return {
        props: {
            username : 'Miguel'
        }
    };
}