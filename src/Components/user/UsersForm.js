import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

export const UsersForm = (props) => {
  const [user, setuser] = useState({});

  const handleSubmit = (event) => {
    console.log("submit---", event.target);
  };

  const handleChange = (event) => {
    console.log(event.target);
  };

  return (
    <div className="submit-form">
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Id</Form.Label>
          <Form.Control
            type="id"
            name="id"
            value={user.id}
            placeholder="Enter Id"
          />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="username"
            name="username"
            value={user.username}
            placeholder="Enter Username"
          />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={user.email}
            placeholder="Enter email"
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};
