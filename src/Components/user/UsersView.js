import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";

import { del, get } from "../../Services/APIUtils";
import Home from "../Home";

const UsersView = (props) => {
  const [users, setusers] = useState(null);

  useEffect(() => {
    get("users").then((res) => {
      const usersData = res.data;
      console.log("userData", usersData);
      setusers(usersData);
    });
  }, []);

  function deleteUser(id) {
    setusers(
      users.map((x) => {
        if (x.id === id) {
          x.isDeleting = true;
        }
        return x;
      })
    );
    del(`delete/${id}`).then(() => {
      setusers((users) => users.filter((x) => x.id !== id));
    });
  }

  return (
    <div>
    <Link to="/" component={Home} />
      <h1>Users</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Id</th>
            <th>User Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.username}</td>
                <td>{item.email}</td>
                <td>
                  <div className="btn-toolbar">
                    <Button>Edit</Button>{" "}
                    <Button
                      onClick={() => deleteUser(item.id)}
                      className="btn btn-sm btn-danger btn-delete-user"
                    >
                      Delete
                    </Button>{" "}
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};

export default UsersView;
