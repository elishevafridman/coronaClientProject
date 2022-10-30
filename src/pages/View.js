import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const View = () => {
  const [patient, setPatient] = useState({
    firstName: "",
  lastName: "",
  IDp: "",
  address: {
    city: "",
    street: "",
    building: 7,
  },
  birthDate: new Date(),
  phoneNumber: "0504131215",
  phoneMobileNumber: "0504132115",
  vaccinations: [
    { date: new Date(), manufacturer: "DSGG" },
    { date: new Date(), manufacturer: "CXZC" },
    { date: new Date(), manufacturer: "FSA" },
    { date: new Date(), manufacturer: "SA" },
  ],
  recoveryDate: new Date(),
  positiveResult: new Date(),});
  const { id } = useParams();
  const f = async () => {
    const response = await axios.get(`http://localhost:8000/api/members/${id}`);
    console.log(response.data)
    setPatient(response.data)
  };
  useEffect(() => {
     f();
  }, []);

  return (
    <div style={{ marginTop: "50px" }}>
      <div className="card">
        <div className="card-header">
          <h2>Patient Information</h2>
        </div>
        <div className="container">
          <strong>ID : </strong>
          <span>{id}</span>
          <br />
          <br />
          <strong>First Name : </strong>
          <span>{patient?.firstName}</span>
          <br />
          <br />
          <strong>Last Name : </strong>
          <span>{patient?.lastName}</span>
          <br />
          <br />
          <strong>City : </strong>
          <span>{patient?.address?.city}</span>
          <br />
          <br />
          <strong>Street : </strong>
          <span>{patient?.address?.street}</span>
          <br />
          <br />
          <strong>Building : </strong>
          <span>{patient?.address?.building}</span>
          <br />
          <br />
          <strong>Birth Date : </strong>
          <span>{patient?.birthDate.toString()}</span>
          <br />
          <br />
          <strong>Phone : </strong>
          <span>{patient?.phoneNumber}</span>
          <br />
          <br />
          <strong>CellPhone : </strong>
          <span>{patient?.phoneMobileNumber}</span>
          <br />
          <br />
          {patient?.vaccinations?.map((vac) => {
            <>
              <strong>vaccinationDate : </strong>
              <span>{vac.date.toString()}</span>
              <br />
              <br />
              <strong>vaccinationmanufacturer : </strong>
              <span>{vac.manufacturer}</span>
              <br />
              <br />
            </>;
          })}

          <strong>positiveResultDate : </strong>
          <span>{patient?.positiveResult.toString()}</span>
          <br />
          <br />
          <strong>recoveryDate : </strong>
          <span>{patient?.recoveryDate.toString()}</span>
          <br />
          <br />
          <Link to="/">
            <button class="btn btn-secondary">Go Back</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default View;
