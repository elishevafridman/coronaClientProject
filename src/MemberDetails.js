import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"


function MemberDetails() {

    const [MemberDetails, setMemberDetails] = useState({})
    

    const navigate = useNavigate()

    const params = useParams()

    

    const getMember = async () => {

        let { data } = await axios.get(`http://localhost:8000/member/${params.id}`)
        console.log(params.id)
        console.log("data:",data);
        setMemberDetails(data)
        //setMemberDetails({vaccination: [1,2,3]})
        console.log("data",data)
        console.log("member",MemberDetails)
       
    }
    // const getCorona = async () => {

    //     let { x } = await axios.get(`http://localhost:8000/corona/${MemberDetails.ID}`)
    //     console.log(MemberDetails.ID)

    //     setCorona(x)
    //     console.log(corona)

    // }


    useEffect(() => {

        getMember()

    }, [])


    const edit = async () => {

        navigate(`../editMember/${params.id}`)

    }
    const deleteMember = async () => {

        let { data } = await axios.delete(`http://localhost:8000/members/${params.id}`)
        let {coronaData} = await axios.delete(`http://localhost:8000/corona/${params.id}`)
        navigate("../")

    }
    



    return <div>
        <h3> {MemberDetails && MemberDetails.name}</h3>

        Name: {MemberDetails.name} <br />
        ID:{MemberDetails.ID} <br />
        Address:<br />
        {/* city:<span>{MemberDetails.address.city}</span>
        street:<span>{MemberDetails.address.street}</span>
        houseNum:<span>{MemberDetails.address.houseNum}</span> */}
        bornDate:<span>{MemberDetails.bornDate} </span><br />
        phone:<span>{MemberDetails.phone}</span> <br />
        mobilePhone:<span>{MemberDetails.mobilePhone}</span> <br />
         vaccination:<br />
        {MemberDetails.vaccination && MemberDetails.vaccination.map((x, index) => {
                        return({
                       date: <span key={index}>{x.date}</span>
                        // <span key={index}>{x.maker}</span>
                    })
                    
        })}
        
        
        positiveDate:<span>{MemberDetails.positiveDate}</span><br />
      recoveryDate:  <span>{MemberDetails.recoveryDate}</span><br />
        
        <button onClick={edit}>Edit</button>
        <button onClick={deleteMember}>Delete</button>

    </div>

}
export default MemberDetails