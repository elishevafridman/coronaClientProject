import { Outlet, Link } from "react-router-dom";
import { useEffect } from "react"

function Member(props) {
    useEffect(() => {
        console.log(props.member._id)
    }, [])
    return (
        <>

            <ul>
                <Link to={{ pathname: `../member/${props.member.ID}` }} >{props.member.name}</Link>      </ul>
        </>

    );
    <Outlet />
}




export default Member
