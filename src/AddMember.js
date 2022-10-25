import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import axios from "axios"
import { useNavigate } from "react-router-dom"

function AddMemberComp() {

    const [member, setMember] = useState({ ID:"",
        city:"",
            street:"",
            houseNum:"",
         bornDate:"",
         name:"",
         phone:"",
         mobilePhone:"",
         image:null
    }) 
    const [corona, setCorona] = useState({ID:"",
        vaccination:[],
        positiveDate:"",
        recoveryDate:""
        })
        const [selectedImage, setSelectedImage] = useState(null)
        const [vaccination,setVac]=useState([{"date":"",maker:""}])
    const navigate = useNavigate()

    const save = async () => {
      console.log("member",member)

        let { data } = await axios.post(`http://localhost:8000/members/`, member)
         await axios.post(`http://localhost:8000/corona/`, corona)
         console.log("corona",corona);
        console.log("data",data);
console.log("image",selectedImage)
  console.log("memberDate",member.bornDate)
    }

    const cancel = async () => {

        navigate("../")

    }
const addID=async(id)=>{
  setMember({ ...member, ID: id })
  setCorona({ ...corona, ID: id })
}
const deleteVac =async (index) => {
  var array = [...vaccination.vac]; // make a separate copy of the array
if (index !== -1) {
array.splice(index, 1);
setVac({...vaccination,vac: array});
}
  // return setCorona([...corona.vaccination.filter((vac) => vac._id !== id)]);
};
const createVac = () => {
  var array = [...vaccination]
  // const newVac =new vaccination {
  //   date: "",
  //   maker: "",
  // };
 
  // array.push(...newVac)
// setVac({...vaccination:newVac})

// console.log(newVac)
// console.log(vaccination.vac)
}
    return <div>


        Name: <input type="text" onChange={e => setMember({ ...member, name: e.target.value })} /><br />
        ID:<input type="text" onChange={e=>addID(e.target.value)} /><br />
        Address:<br />
        city:<input type="text" onChange={e => setMember({  ...member, city: e.target.value } )} /><br />
        street:<input type="text" onChange={e => setMember({ ...member, street: e.target.value })} /><br />
        houseNum:<input type="text" onChange={e => setMember({ ...member, houseNum: e.target.value })} /><br />
       {/* bornDate: <DatePicker selected={new Date()} onChange={e => setMember({ ...member, bornDate: e.target })}/> */}
       
       bornDate:<input type="text" onChange={e => setMember({ ...member, bornDate: e.target.value })}/>
        phone:<input type="text" onChange={e => setMember({ ...member, phone: e.target.value })} /><br />
        mobilePhone:<input type="text" onChange={e => setMember({ ...member, mobilePhone: e.target.value })} /><br />
        vaccination:<br />
        {<table border={"1"}>
            <tbody>
                <tr><th>חיסון מספר</th><th>מועד קבלת החיסון</th><th>יצרן</th></tr>
                {vaccination &&  vaccination.map((vac, index) => {
                    return (<tr key={index}>
                        <td >{index + 1}</td><td><input type="text"   /></td><td><input type="text"  /></td>
                        <button onClick={() => deleteVac(index)}>Delete</button>
                    </tr>)
                })}
            </tbody>
        </table>
        }
 <div>
      <button onClick={createVac}>הוסף חיסון</button>
     
    </div>

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
        < button onClick={save}>Save</button>
        <button onClick={cancel}>cancel</button>

    </div>

}
export default AddMemberComp