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
         let axs=await axios.get("http://localhost:8000/members")
            navigate("./allMembers",{state:axs.data})
            
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