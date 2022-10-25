import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"


function EditMember() {

    const [member, setMember] = useState({})
    const [corona, setCorona] = useState({})
    const [rows, setRows] = useState([
        { id: "", date: "", maker: "" },
    ]);
  
    const navigate = useNavigate()

    const params = useParams()



    const getMemberDetails = async () => {

        let { data } = await axios.get(`http://localhost:8000/member/${params.id}`);
        console.log("new data", data)
        setMember({
            ID: data.ID,
            city: data.city,
            street: data.street,
            houseNum: data.houseNum,
            bornDate: data.bornDate,
            name: data.name,
            phone: data.phone,
            mobilePhone: data.mobilePhone,
            image: data.image
        });
        console.log("new member", member)
        setCorona({
            ID: data.ID,
            vaccination: data.vaccination,
            positiveDate: data.positiveDate,
            recoveryDate: data.recoveryDate
        })
        console.log("setmember", member)
        console.log("setcorona", corona)

    }


    useEffect(() => {

        getMemberDetails();

    }, [])
    const deleteVac =async (index) => {
        var array = [...corona.vaccination]; // make a separate copy of the array
    if (index !== -1) {
      array.splice(index, 1);
      setCorona({...corona,vaccination: array});
    }
        // return setCorona([...corona.vaccination.filter((vac) => vac._id !== id)]);
      };
      
      
    const update = async () => {
        console.log(rows)
// setMember(...member,vaccination:rows)
        let { data } = await axios.put(`http://localhost:8000/members/${member._id}`, member)
        console.log(data);

    }

    const cancel = async () => {

        navigate(`../member/${params.id}`)

    }
   const createVac=async()=>{
    // var newV=new corona.vaccination()
   
    //   var array = [...corona.vaccination]
    //   console.log(array)
    //   console.log(newVac)
    //   array.push(...newV)
    //    setCorona ({...corona.vaccination,array});
    };
   


    return <div>
        vac:{member.vaccination}
        <h3>Edit member: {member && member.name}</h3>

        Name: <input type="text" value={member.name} onChange={e => setMember({ ...member, name: e.target.value })} /><br />
        ID:<input type="text" value={member.ID} onChange={e => setMember({ ...member, ID: e.target.value })} /><br />
        Address:<br />
        city:<input type="text" value={member.city} onChange={e => setMember({ ...member, city: e.target.value })} /><br />
        street:<input type="text" value={member.street} onChange={e => setMember({ ...member, street: e.target.value })} /><br />
        houseNum:<input type="text" value={member.houseNum} onChange={e => setMember({ ...member, houseNum: e.target.value })} /><br />
        bornDate:<input type="text" value={member.bornDate} onChange={e => setMember({ ...member, bornDate: e.target.value })} /><br />
        phone:<input type="text" value={member.phone} onChange={e => setMember({ ...member, phone: e.target.value })} /><br />
        mobilePhone:<input type="text" value={member.mobilePhone} onChange={e => setMember({ ...member, mobilePhone: e.target.value })} /><br />
        Image url:<input type="img" value={member.image} onChange={e => setMember({ ...member, image: e.target.value })} /><br />

        positiveDate:<input type="text" value={corona.positiveDate} onChange={e => setCorona({ ...corona, positiveDate: e.target.value })} /><br />
          recoveryDate:<input type="text" value={corona.recoveryDate} onChange={e => setCorona({ ...corona, recoveryDate: e.target.value })} /><br />
         

        {<table border={"1"}>
            <tbody>
                <tr><th>חיסון מספר</th><th>מועד קבלת החיסון</th><th>יצרן</th></tr>
                {corona.vaccination && corona.vaccination.map((vac, index) => {
                    return (<tr key={index}>
                        <td >{index + 1}</td><td><input type="text" value={vac.date} onChange={e => setCorona({ ...rows[index], date: e.target.value })}   /></td><td><input type="text" value={vac.maker}  onChange={e => setCorona({ ...rows[index], maker: e.target.value })}/></td>
                        <button onClick={() => deleteVac(index)}>Delete</button>
                    </tr>)
                })}
            </tbody>
        </table>
        }
 <div>
      <button onClick={createVac}>הוסף חיסון</button>
     
    </div>


        
        <button onClick={update}>Update</button>
        <button onClick={cancel}>Cancle</button>

    </div>
    
}
export default EditMember