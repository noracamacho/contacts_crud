import axios from "axios";
import React, { useEffect } from "react";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import CloseIcon from "@mui/icons-material/Close";

const ElementsForm = ({ getElements, elementSelected, setElementSelected, closeForm }) => {

  const { handleSubmit, register, reset } = useForm();
  const emptyElement = { first_name: "", last_name: "", email: "", password: "", birthday: "" };

  useEffect(() => {
    if (elementSelected) {
      reset(elementSelected);
    } else {
      reset(emptyElement);
    }
    // eslint-disable-next-line
  }, [elementSelected]);

  const submit = (data) => {
    if (elementSelected) {
      axios.put(`https://users-crud-pppc.onrender.com/users/${elementSelected.id}/`, data).then((response) => {
        if (response.status === 200) {
          closeForm();
          // Alert using seeetalert2
          Swal.fire({
            icon: "success",
            text: `User "${response.data.first_name} ${response.data.last_name}" was successfully updated`,
            confirmButtonColor: "#555A88",
          });
          setElementSelected(null);
          getElements();
        } else {
          // Alert using seeetalert2
          Swal.fire({
            icon: "error",
            text: "Something went wrong, update was not possible!",
            confirmButtonColor: "#555A88",
          });
        }
      });
    } else {
      axios.post('https://users-crud-pppc.onrender.com/users/', data).then((response) => {
        if (response.status === 201) {
          // Alert using seeetalert2
          Swal.fire({
            icon: "success",
            text: `User "${response.data.first_name} ${response.data.last_name}" was successfully created`,
            confirmButtonColor: "#555A88",
          });
          closeForm();
          getElements();
          reset(emptyElement);
        } else {
          // Alert using seeetalert2
          Swal.fire({
            icon: "error",
            text: "Something went wrong!",
            confirmButtonColor: "#555A88",
          });
        }
      });
    }
  };

  return (
      <div id="form_container">
        <form className="card__form" onSubmit={handleSubmit(submit)}>
          <button onClick={() => closeForm()} className="close__button"><CloseIcon /></button>
          <h1 className="mt-3 mb-5">{elementSelected ? 'Update User' : 'New User'}</h1>
          <div className="input-container mb-4">
            <label htmlFor="first_name">First Name</label>
            <input className="form-control-lg" type="text" id="first_name" placeholder="First Name" {...register("first_name")} required/>
          </div>
          <div className="input-container mb-4">
            <label htmlFor="last_name">Last Name</label>
            <input className="form-control-lg" type="text" id="last_name" placeholder="Last Name" {...register("last_name")} required/>
          </div>
          <div className="input-container mb-4">
            <label htmlFor="email">Email</label>
            <input className="form-control-lg" type="email" id="email" placeholder="Email" {...register("email")} required/>
          </div>
          <div className="input-container mb-4">
            <label htmlFor="password">Password</label>
            <input className="form-control-lg" type="password" id="password" placeholder="Password" {...register("password")} required/>
          </div>
          <div className="input-container mb-5">
            <label htmlFor="birthday">Birthday</label>
            <input className="form-control-lg" type="date" id="birthday" placeholder="dd/mm/yyy" {...register("birthday")} required/>
          </div>
          <button className="btn-send">{elementSelected ? 'Update' : 'Submit'}</button>
        </form>
      </div>
  );
};

export default ElementsForm;