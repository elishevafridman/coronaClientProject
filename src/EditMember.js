import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"


function EditMember() {

    const [member, setMember] = useState({})
    const [corona, setCorona] = useState({})

    const navigate = useNavigate()

    const params = useParams()

    

    const getMemberDetails = async () => {

        let { data } = await axios.get(`http://localhost:8000/member/${params.id}`)
        setMember({ID:data.ID,
        city:data.city,
        street:data.street,
        houseNum:data.houseNum,
         bornDate:data.bornDate,
         name:data.name,
         phone:data.phone,
         mobilePhone:data.mobilePhone,
         image:data.image})
        setCorona({ID:data.ID,
            vaccination:data.vaccination,
            positiveDate:data.positiveDate,
            recoveryDate:data.recoveryDate})
            console.log(member)
            console.log(corona)
console.log(data.address)
    }


    useEffect(() => {

        getMemberDetails()

    }, [])


    const update = async () => {

        let { data } = await axios.put(`http://localhost:8000/members/${member._id}`, member)
        console.log(data);

    }

    const cancel = async () => {

        navigate(`../member/${params.id}`)

    }



    return <div>
        <h3>Edit member: {member && member.name}</h3>

        Name: <input type="text" value={member.name} onChange={e => setMember({ ...member, name: e.target.value })} /><br />
        ID:<input type="text" value={member.ID} onChange={e => setMember({ ...member, ID: e.target.value })} /><br />
        Address:<br />
        city:<input type="text"value={member.city} onChange={e => setMember({  ...member, city: e.target.value } )} /><br />
        street:<input type="text" value={member.street}onChange={e => setMember({ ...member, street: e.target.value })} /><br />
        houseNum:<input type="text"value={member.houseNum} onChange={e => setMember({ ...member, houseNum: e.target.value })} /><br />
        bornDate:<input type="text" value={member.bornDate} onChange={e => setMember({ ...member, bornDate: e.target.value })} /><br />
        phone:<input type="text" value={member.phone} onChange={e => setMember({ ...member, phone: e.target.value })} /><br />
        mobilePhone:<input type="text" value={member.mobilePhone} onChange={e => setMember({ ...member, mobilePhone: e.target.value })} /><br />
        Image url:<input type="img" value={member.image} onChange={e => setCorona({ ...corona, image: e.target.value })} /><br />
        
        positiveDate:<input type="text" onChange={e => setCorona({ ...corona, positiveDate: e.target.value })} /><br />
        recoveryDate:<input type="text" onChange={e => setCorona({ ...corona, recoveryDate: e.target.value })} /><br />

        <button onClick={update}>Update</button>
        <button onClick={cancel}>Cancle</button>

    </div>

}
export default EditMember