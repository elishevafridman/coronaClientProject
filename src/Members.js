import axios from "axios"
import { useEffect } from "react"
import { Outlet, useLocation, useNavigate } from "react-router-dom"
function Members(){
    const navigate = useNavigate()
    useEffect(()=>{
        allMembers()
       },[])
        const allMembers=async()=>{
            try{
         let maxs=await axios.get("http://localhost:8000/members")
         let caxs=await axios.get("http://localhost:8000/corona")
            navigate("./allMembers",{state:maxs.data},{state:caxs.data})
            
      }catch(err)
    {
        return err
    }
        }
        const addMember=()=>{
            navigate("./addMember")
        }
        
    return(
       <div style={{ "border": "3px solid green" }}>
        <h1>Members </h1>
        <button  onClick={allMembers}>All members</button>
        <button  onClick={addMember}>Add member</button>
                 
        
      
                    
                    <Outlet />
       </div>
    )
}export default Members