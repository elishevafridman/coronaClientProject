import { useLocation } from 'react-router-dom';
import {useState}from "react"
import Member from './Member';
function AllMembersComp(){
    let location = useLocation();
       
    const [corona, setCorona] = useState(location.state)

    const [refresh, setRefresh] = useState(false)
   
    return (
        <div>
                 {members.name}
          {
                members.map((member, index) => {
                    return < Member member={member} key={index} />
                })
            }
        </div>
    )
}export default AllMembersComp