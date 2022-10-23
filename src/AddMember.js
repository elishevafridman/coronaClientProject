import { useState } from "react"
import { useDispatch } from "react-redux"
import axios from "axios"
import { useNavigate } from "react-router-dom"

function AddMemberComp() {

    const [member, setMember] = useState({ ID:"",
        address:{city:"",
            street:"",
            houseNum:""},
         bornDate:"",
         name:"",
         phone:"",
         mobilePhone:"",
         image:null
    }) 
    const [corona, setCorona] = useState({ID:"",
        vaccination:[{date:"",maker:""}],
        positiveDate:"",
        recoveryDate:""
        })
        const [selectedImage, setSelectedImage] = useState(null)
    const navigate = useNavigate()

    const save = async () => {
        console.log("member",member)
        let { data } = await axios.post(`http://localhost:8000/members/`, member)
        corona.ID=member.ID
         await axios.post(`http://localhost:8000/corona/`, corona)
         console.log("corona",corona);
        console.log("data",data);
console.log("image",selectedImage)
    }

    const cancel = async () => {

        navigate("../")

    }



    return <div>


        Name: <input type="text" onChange={e => setMember({ ...member, name: e.target.value })} /><br />
        ID:<input type="text" onChange={e => setMember({ ...member, ID: e.target.value })} /><br />
        Address:<br />
        city:<input type="text" onChange={e => setMember({  ...member.address, city: e.target.value } )} /><br />
        street:<input type="text" onChange={e => setMember({ ...member.address, street: e.target.value })} /><br />
        houseNum:<input type="text" onChange={e => setMember({ ...member.address, houseNum: e.target.value })} /><br />
        bornDate:<input type="text" onChange={e => setMember({ ...member, bornDate: e.target.value })} /><br />
        phone:<input type="text" onChange={e => setMember({ ...member, phone: e.target.value })} /><br />
        mobilePhone:<input type="text" onChange={e => setMember({ ...member, mobilePhone: e.target.value })} /><br />
        vaccination:<br />
        
        positiveDate:<input type="text" onChange={e => setCorona({ ...corona, positiveDate: e.target.value })} /><br />
        recoveryDate:<input type="text" onChange={e => setCorona({ ...corona, recoveryDate: e.target.value })} /><br />
        <div>
      
      {selectedImage && (
        <div>
        <img alt="not fount" width={"250px"} src={URL.createObjectURL(selectedImage)} />
        <br />
        <button onClick={()=>setSelectedImage(null)}>Remove</button>
        </div>
      )}
      <br />
     
      <br /> 
      <input
        type="file"
        name="myImage"
        onChange={(e) => {
          console.log(e.target.files[0]);
          setMember({...member,image:e.target.files[0]});
        }}
      />
      <br />
    </div>
        <button onClick={save}>Save</button>
        <button onClick={cancel}>cancel</button>

    </div>

}
export default AddMemberComp