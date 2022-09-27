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
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [selected, setSelected] = useState("firstname");
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
    console.log(users);
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

  //function for the search
  const getSearch = (e) => {
    setSearch(e.target.value);
  };
  const selectType = (e) => {
    setSelected(e.target.value);
  };

  //function for the filetering search state
  const filtSelection = { selected };
  const filter = users.filter((user) =>
    user[selected].toLowerCase().includes(search.toLowerCase())
  );
  useEffect(() => {
    setFiltered(filter);
  }, [search]);

  return (
    <Container>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Row className="mb-3">
            <Col className="text-start">
              <Search
                getSearch={getSearch}
                value={search}
                selected={selected}
                selectType={selectType}
              />
            </Col>

            <Col className="text-end">
              <Button
                onClick={() => setModal({ name: "Create User", active: true })}
              >
                Create New User
              </Button>
            </Col>
          </Row>

          <DataTable users={filtered.length > 0 ? filtered : users} />
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
