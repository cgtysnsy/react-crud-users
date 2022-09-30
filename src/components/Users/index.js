import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Container, Row, Col, Modal } from "react-bootstrap";
import DataTable from "../DataTable";
import Loader from "../Loader";
import Search from "../Search";
import CreateUser from "../CreateUser";
import UpdateUser from "../UpdateUser/index";
import ModalDelete from "../ModalDelete/index";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState({ name: "", active: false });
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [selected, setSelected] = useState("firstname");
  const [updateUser, setUpdateuser] = useState({
    id: null,
    firstname: "",
    lastname: "",
    email: "",
    avatar: "",
    birthdate: "",
  });
  //const[removeUser, setRemoveUser] = useState("")
  const [dependency, setDependency] = useState(false);

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

  useEffect(() => {
    fetchUsers();
  }, []);

  const createUser = async (user) => {
    setModal({ active: false });
    setLoading(true);
    console.log(user);
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

  //function for the search
  const getSearch = (e) => {
    setSearch(e.target.value);
  };
  //select type for search
  const selectType = (e) => {
    setSelected(e.target.value);
  };

  //function for the filtering search state
  // const filtSelection = { selected };

  useEffect(() => {
    const filter = users.filter((user) =>
      user[selected].toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(filter);
  }, [search]);

  //update button handler; store to state which user is selected -- modal name set
  const updateRow = (value) => {
    const willUpdateUser = users.filter((user) => user.createdAt === value);
    const newObject = willUpdateUser[0];

    setUpdateuser({
      ...updateUser,
      id: newObject.id,
      firstname: newObject.firstname,
      lastname: newObject.lastname,
      email: newObject.email,
      avatar: newObject.avatar,
      birthdate: newObject.birthdate,
    });
    setModal({ name: "Edit User", active: true });
  };
  //delete user from updateRow

  //first open model for "are you sure"
  const deleteConfirm = (id) => {
    setModal({ name: "Delete Confirm", active: true });
    const removeUser = users.filter((user) => user.id === id);
    const removeUserObject = removeUser[0];
    setUpdateuser({
      ...updateUser,
      id: removeUserObject.id,
      firstname: removeUserObject.firstname,
      lastname: removeUserObject.lastname,
      email: removeUserObject.email,
      avatar: removeUserObject.avatar,
      birthdate: removeUserObject.birthdate,
    });
  };

  const deleteRow = async (id) => {
    setModal({ active: false });
    setLoading(true);

    try {
      const res = await axios.delete(
        `https://632e1123b37236d2ebe5af2c.mockapi.io/users/${id}`
      );

      setUsers(res.data);
    } catch (err) {
      console.error("Error creating user", err);
    } finally {
      setLoading(false);
      setDependency(!dependency);
    }
  };

  //from edituser component, after update user, this user information and id wa came then with put method api data was updated.
  const updateDatawithnewrow = async (id, user) => {
    setModal({ active: false });
    setLoading(true);

    try {
      const res = await axios.put(
        `https://632e1123b37236d2ebe5af2c.mockapi.io/users/${id}`,
        user
      );

      setUsers(res.data);
    } catch (err) {
      console.error("Error creating user", err);
    } finally {
      setLoading(false);
      setDependency(!dependency);
    }
  };
  //useeffect is used with fake state, for after update new user list could be load
  useEffect(() => {
    fetchUsers();
  }, [dependency]);

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

          <DataTable
            users={filtered.length > 0 ? filtered : users}
            updateRow={updateRow}
            deleteRow={deleteRow}
            deleteConfirm={deleteConfirm}
          />
        </>
      )}

      {modal.active && (
        <Modal show={modal.active} onHide={() => setModal({ active: false })}>
          {modal.name === "Create User" ? (
            <CreateUser
              modal={modal}
              setModal={setModal}
              createUser={createUser}
            />
          ) : modal.name === "Edit User" ? (
            <UpdateUser
              users={users}
              modal={modal}
              setModal={setModal}
              updateUser={updateUser}
              setUpdateuser={setUpdateuser}
              updateDatawithnewrow={updateDatawithnewrow}
            />
          ) : (
            <ModalDelete
              users={users}
              modal={modal}
              setModal={setModal}
              deleteConfirm={deleteConfirm}
              updateUser={updateUser}
              setUpdateuser={setUpdateuser}
              deleteRow={deleteRow}
            />
          )}
        </Modal>
      )}
    </Container>
  );
};

export default Users;
