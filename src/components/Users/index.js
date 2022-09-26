import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Container, Row, Col, Modal } from "react-bootstrap";
import DataTable from "../DataTable";
import Loader from "../Loader";
import Search from "../Search";
import CreateUser from "../CreateUser";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState({ name: "", active: false });

  const fetchUsers = async () => {
    setLoading(true);

    try {
      const res = await axios.get(
        "https://632e1123b37236d2ebe5af2c.mockapi.io/users"
      );

      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users", err);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };

  const createUser = async (user) => {
    setModal({ active: false });
    setLoading(true);

    try {
      const res = await axios.post(
        "https://632e1123b37236d2ebe5af2c.mockapi.io/users",
        user
      );

      setUsers([...users, res.data]);
    } catch (err) {
      console.error("Error creating user", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Container>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Row className="mb-3">
            <Col className="text-start">
              <Search />
            </Col>

            <Col className="text-end">
              <Button
                onClick={() => setModal({ name: "Create User", active: true })}
              >
                Create New User
              </Button>
            </Col>
          </Row>

          <DataTable users={users} />
        </>
      )}

      {modal.active && (
        <Modal show={modal.active} onHide={() => setModal({ active: false })}>
          {modal.name === "Create User" && (
            <CreateUser
              modal={modal}
              setModal={setModal}
              createUser={createUser}
            />
          )}
        </Modal>
      )}
    </Container>
  );
};

export default Users;
