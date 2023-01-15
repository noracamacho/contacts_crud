import axios from "axios";
import React from "react";
import { Card, Container, Row, Stack } from "react-bootstrap";
import Swal from "sweetalert2";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";

const ListElements= ({ elementsList, selectElement, getElements, openForm, closeForm }) => {

  const elementsListOrd = elementsList.sort((a, b) => a.first_name.localeCompare(b.first_name));

  const deleteElement = (element) => {
    // Alert using seeetalert2
    Swal.fire({
      title: `Are you sure yoy want to delete ${element.first_name} ${element.last_name}?`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#555A88",
      cancelButtonColor: "#BDBDBD",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`https://users-crud.academlo.tech/users/${element.id}`).then((response) => {
          console.log(response);
          if (response.status === 204) {
            // Alert using seeetalert2
            Swal.fire({
              icon: "success",
              title: "Deleted!",
              text: `User "${element.first_name} ${element.last_name}" was successfully deleted`,
              confirmButtonColor: "#555A88",

            });
            getElements();
          } else {
            // Alert using seeetalert2
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: `Something went wrong, user ${response.data.first_name} ${response.data.last_name} was not deleted!`,
            });
          }
        })
      }
    })
    
  };

  return (
    <>
    <Container className="mt-5 mb-5">
        <div className="header">
            <h1>Users</h1>
            <button onClick={() => openForm()}>Create new user</button>
        </div>
        <Row>
        {elementsListOrd.map((element) => (
            <div key={element.id} className="col-4 mb-3 user_card">
            <Card>
              <Card.Body>
                <Card.Title className="text-center">{element.first_name} {element.last_name}</Card.Title>
                <hr />
                <Card.Subtitle className="text-muted">EMAIL</Card.Subtitle>
                <Card.Text>{element.email}</Card.Text>
                <Card.Subtitle className="text-muted">BIRTHDAY</Card.Subtitle>
                <Card.Text className="mb-3">{element.birthday}</Card.Text>
                <hr />  
                <Stack direction="horizontal">
                  <button className="btn btn-danger m-2 ms-auto" onClick={() => deleteElement(element)}><DeleteForeverOutlinedIcon /></button>
                  <button className="btn btn-secondary m-2" onClick={() => selectElement(element)}><ModeEditOutlineOutlinedIcon /></button>
                </Stack>
              </Card.Body>
            </Card>
            </div>
        ))}
        </Row>
     </Container>
     </>
  );

};

export default ListElements;
