import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  firstName: "",
  lastName: "",
  IDp: "",
  address: {
    city: "",
    street: "",
    building: 7,
  },
  birthDate: null,
  phoneNumber: "",
  phoneMobileNumber: "",
  vaccinations: [
    { date: new Date(), manufacturer: "hjsx" },
    { date: new Date(), manufacturer: "saca" },
    { date: new Date(), manufacturer: "sfas" },
    { date: new Date(), manufacturer: "fsaf" },
  ],
  recoveryDate: null,
  positiveResult: null,
};

const AddEdit = () => {
  const [state, setState] = useState(initialState);

  const navigate = useNavigate();

  const { id } = useParams();
  const f = async () => {
    const response = await axios.get(`http://localhost:8000/api/members/${id}`);
    console.log(response.data)
    setState(response.data)
  };
  useEffect(() => {
    if (id != undefined) f();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !state.IDp ||
      !state.firstName ||
      !state.lastName ||
      !state.address.city ||
      !state.address.street ||
      !state.address.building ||
      !state.birthDate ||
      !state.phoneNumber ||
      !state.phoneMobileNumber
    ) {
      toast.error("please provide value into each input field");
    } else {
      if (!id) {
        console.log(state);
        axios
          .post("http://localhost:8000/api/members", {
            ...state,
            IDp: state.IDp,
          })
          .then(() => {
            setState({
              IDp: "",
              firstName: "",
              lastName: "",
              address: { city: "", street: "", building: "" },
              birthDate: "",
              phoneNumber: "",
              phoneMobileNumber: "",
              vaccinations: [{ date: "", manufacturer: "" }],
              positiveResultDate: "",
              negativeResultDate: "",
            });
          })
          .catch((err) => toast.error(err.response.data));
        toast.success("Patient Added Successfully");
      } else {
        console.log(state);
        axios
          .put(`http://localhost:8000/api/members/${id}`, {
            ...state,
            IDp: state.IDp,
          })
          .then(() => {
            setState({
              IDp: "",
              firstName: "",
              lastName: "",
              address: { city: "", street: "", building: "" },
              birthDate: "",
              phoneNumber: "",
              phoneMobileNumber: "",
              vaccinations: [{ date: "", manufacturer: "" }],
              positiveResultDate: "",
              negativeResultDate: "",
            });
          })
          .catch((err) => toast.error(err.response.data));
        toast.success("Patient Updates Successfully");
      }

      setTimeout(() => navigate("/"), 500);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name){
      case "vacManuf1":{
        let arr=state.vaccinations;
        arr[0].manufacturer=value;
        setState({ ...state, vaccinations:arr});
        break;
      } case "vacManuf2":{
        let arr=state.vaccinations;
        arr[1].manufacturer=value;
        setState({ ...state, vaccinations:arr});
        break;
      } case "vacManuf3":{
        let arr=state.vaccinations;
        arr[2].manufacturer=value;
        setState({ ...state, vaccinations:arr});
        break;
      } case "vacManuf4":{
        let arr=state.vaccinations;
        arr[3].manufacturer=value;
        setState({ ...state, vaccinations:arr});
        break;
      } case "vacDate1":{
        let arr=state.vaccinations;
        arr[0].date=value;
        setState({ ...state, vaccinations:arr});
        break;
      } case "vacDate2":{
        let arr=state.vaccinations;
        arr[1].date=value;
        setState({ ...state, vaccinations:arr});
        break;
      }
      case "vacDate3":{
        let arr=state.vaccinations;
        arr[2].date=value;
        setState({ ...state, vaccinations:arr});
        break;
      }case "vacDate4":{
        let arr=state.vaccinations;
        arr[3].date=value;
        setState({ ...state, vaccinations:arr});
        break;
      }
      case "city":{
        setState({ ...state, address: { ...state.address, city: value } });
break;
      }
      case "street":{
        setState({ ...state, address: { ...state.address, street: value } });
break;
      }
      case "building":{
        setState({ ...state, address: { ...state.address, building: value } });
break;
      }
      default:
        setState({ ...state, [name]: value });
    }
  };

  return (
    <div class="container">
      <form onSubmit={handleSubmit}>
        <h2>Please fill the details below:</h2>
        <h3>-personal details-</h3>
        <br />
        <div class="row">
          <div class="form-group col-md-6">
            <label for="IDp">IDp</label>
            <input
              class="form-control"
              type="text"
              id="IDp"
              name="IDp"
              placeholder="id"
              value={state.IDp || ""}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div class="row">
          <div class="form-group col-md-4">
            <label htmlFor="firstName">First Name</label>
            <input
              class="form-control"
              type="text"
              id="firstName"
              name="firstName"
              placeholder="First Name"
              value={state.firstName || ""}
              onChange={handleInputChange}
            />
          </div>

          <div class="form-group col-md-4">
            <label htmlFor="lastName">Last Name</label>
            <input
              class="form-control"
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Last Name"
              value={state.lastName || ""}
              onChange={handleInputChange}
            />
          </div>
          <div class="form-group col-md-4">
            <label htmlFor="birthDate">Birth Date</label>
            <input
              class="form-control"
              type="text"
              id="birthDate"
              name="birthDate"
              placeholder="yyyy-mm-dd"
              value={state.birthDate || ""}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div class="row">
          <div class="form-group col-md-4">
            <label htmlFor="address.city">City</label>
            <input
              class="form-control"
              type="text"
              id="address.city"
              name="city"
              placeholder="City"
              value={state.address.city || ""}
              onChange={handleInputChange}
            />
          </div>
          <div class="form-group col-md-4">
            <label htmlFor="Street">Street</label>
            <input
              class="form-control"
              type="text"
              id="street"
              name="street"
              placeholder="Street"
              value={state.address.street || ""}
              onChange={handleInputChange}
            />
          </div>
          <div class="form-group col-md-4">
            <label htmlFor="building">Building</label>
            <input
              class="form-control"
              type="number"
              id="building"
              name="building"
              placeholder="Building"
              value={state.address.building || ""}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div class="row">
          <div class="form-group col-md-6">
            <label htmlFor="phoneNumber">Phone</label>
            <input
              class="form-control"
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              placeholder="Phone"
              value={state.phoneNumber || ""}
              onChange={handleInputChange}
            />
          </div>
          <div class="form-group col-md-6">
            <label htmlFor="phoneMobileNumber">CellPhone</label>
            <input
              class="form-control"
              type="text"
              id="phoneMobileNumber"
              name="phoneMobileNumber"
              placeholder="CellPhone"
              value={state.phoneMobileNumber || ""}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <h3>-Covid details-</h3>
        <div class="row">
          <div class="form-group col-md-3">
            <label htmlFor="FirstVaccinationDate">FirstVaccinationDate</label>
            <input
              class="form-control"
              type="text"
              id="vacDate1"
              name="vacDate1"
              placeholder="yyyy-mm-dd"
              value={state.vaccinations[0]?.date || ""}
              onChange={handleInputChange}
            />
          </div>
          <div class="form-group col-md-3">
            <label htmlFor="secondVaccinationDate">SecondVaccinationDate</label>
            <input
              class="form-control"
              type="text"
              id="vacDate2"
              name="vacDate2"
              placeholder="yyyy-mm-dd"
              value={state.vaccinations[1]?.date || ""}
              onChange={handleInputChange}
            />
          </div>
          <div class="form-group col-md-3">
            <label htmlFor="thirdVaccinationDate">ThirdVaccinationDate</label>
            <input
              class="form-control"
              type="text"
              id="vacDate3"
              name="vacDate3"
              placeholder="yyyy-mm-dd"
              value={state.vaccinations[2]?.date || ""}
              onChange={handleInputChange}
            />
          </div>
          <div class="form-group col-md-3">
            <label htmlFor="fourthVaccinationDate">FourthVaccinationDate</label>
            <input
              class="form-control"
              type="text"
              id="vacDate4"
              name="vacDate4"
              placeholder="yyyy-mm-dd"
              value={state.vaccinations[3]?.date || ""}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div class="row">
          <div class="form-group col-md-3">
            <label htmlFor="FirstVaccinationDate">
              FirstVaccinationManufacturer
            </label>
            <select
              class="form-control"
              name="vacManuf1"
              id="vacManuf1"
              value={state.vaccinations[0]?.manufacturer || ""}
              onChange={handleInputChange}
            >
              <option value="Moderna">Moderna</option>
              <option value="Pfizer">Pfizer</option>
            </select>
          </div>
          <div class="form-group col-md-3">
            <label htmlFor="secondVaccinationDate">
              SecondVaccinationManufacturer
            </label>
            <select
              class="form-control"
              name="vacManuf2"
              id="vacManuf2"
              value={state.vaccinations[1]?.manufacturer || ""}
              onChange={handleInputChange}
            >
              <option value="Moderna">Moderna</option>
              <option value="Pfizer">Pfizer</option>
            </select>
          </div>
          <div class="form-group col-md-3">
            <label htmlFor="thirdVaccinationDate">
              ThirdVaccinationManufacturer
            </label>
            <select
              class="form-control"
              name="vacManuf3"
              id="vacManuf3"
              value={state.vaccinations[2]?.manufacturer || ""}
              onChange={handleInputChange}
            >
              <option value="Moderna">Moderna</option>
              <option value="Pfizer">Pfizer</option>
            </select>
          </div>
          <div class="form-group col-md-3">
            <label htmlFor="fourthVaccinationDate">
              FourthVaccinationManufacturer
            </label>
            <select
              class="form-control"
              name="vacManuf4"
              id="vacManuf4"
              value={state.vaccinations[3]?.manufacturer || ""}
              onChange={handleInputChange}
            >
              <option value="Moderna">Moderna</option>
              <option value="Pfizer">Pfizer</option>
            </select>
          </div>
        </div>

        <div class="row">
          <div class="form-group col-md-6">
            <label htmlFor="positiveResultDate">PositiveResultDate</label>
            <input
              class="form-control"
              type="text"
              id="positiveResultDate"
              name="positiveResult"
              placeholder="yyyy-mm-dd"
              value={state.positiveResult || ""}
              onChange={handleInputChange}
            />
          </div>
          <div class="form-group col-md-6">
            <label htmlFor="negativeResultDate">NegativeResultDate</label>
            <input
              class="form-control"
              type="text"
              id="negativeResultDate"
              name="recoveryDate"
              placeholder="yyyy-mm-dd"
              value={state.recoveryDate || ""}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <br />
        <input
          type="submit"
          class="btn btn-success"
          value={id ? "Update" : "Save"}
        />
        <br />
        <br />
        <Link to="/">
          <input type="button" class="btn btn-secondary" value="Go Back" />
        </Link>
      </form>
    </div>
  );
};

export default AddEdit;
