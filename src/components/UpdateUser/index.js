import { Modal, Form, Button } from "react-bootstrap";
import { useState } from "react";

const UpdateUser = ({
  users,
  modal,
  setModal,
  updateUser,
  setUpdateuser,
  updateDatawithnewrow,
}) => {
  const onInputChange = (e) => {
    console.log(updateUser.id);
    const { name, value } = e.target;

    setUpdateuser({ ...updateUser, [name]: value });
  };

  const onSubmit = (e) => {
    console.log("click");
    e.preventDefault();
    // custom validation

    updateDatawithnewrow(updateUser.id, updateUser);
  };
  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>{modal.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="First Name"
              name="firstname"
              onChange={onInputChange}
              defaultValue={updateUser.firstname}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Last Name"
              name="lastname"
              onChange={onInputChange}
              defaultValue={updateUser.lastname}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              placeholder="Email"
              name="email"
              onChange={onInputChange}
              defaultValue={updateUser.email}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Avatar URL</Form.Label>
            <Form.Control
              type="text"
              placeholder="Avatar URL"
              name="avatar"
              onChange={onInputChange}
              defaultValue={updateUser.avatar}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Birth date</Form.Label>
            <Form.Control
              type="date"
              placeholder="Birth date"
              name="birthdate"
              onChange={onInputChange}
              defaultValue={updateUser.birthdate}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setModal({ active: false })}>
          Close
        </Button>
        <Button variant="primary" onClick={onSubmit}>
          Update Changes
        </Button>
      </Modal.Footer>
    </>
  );
  return <div>deneme</div>;
};

export default UpdateUser;
