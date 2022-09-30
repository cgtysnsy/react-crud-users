import { Modal, Form, Button } from "react-bootstrap";
import { useState } from "react";

const ModalDelete = ({
  users,
  modal,
  setModal,
  deleteConfirm,
  updateUser,
  setUpdateuser,
  deleteRow,
}) => {
  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>{modal.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to delete {updateUser.firstname}{" "}
        {updateUser.lastname}
        {"?"}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setModal({ active: false })}>
          Close
        </Button>
        <Button variant="danger" onClick={() => deleteRow(updateUser.id)}>
          Delete
        </Button>
      </Modal.Footer>
    </>
  );
};

export default ModalDelete;
