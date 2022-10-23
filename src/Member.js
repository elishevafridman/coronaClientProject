import { Outlet, Link } from "react-router-dom";
import { useEffect } from "react"

function Member(props){
    useEffect(()=>{
        console.log(props.member._id)
       },[])
    return (
        <div style={{"border":"3px solid green"}}>
           
           <span>name:</span>
            <h2></h2><br/>
            {/* <Link to="member/"  params={{ id: props.member._id }}>{props.member.name}</Link> */}
            <Link to={{pathname: `../member/${props.member.ID}`}} >{props.member.name}</Link>
            {/* <span>city:</span>
            <span>{props.member.address.city}</span><br/> */}
                 <Outlet />

          </div>
        
        
        
     
      
)

}
export default Member
