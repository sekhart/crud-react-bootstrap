import React, { useEffect, useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { Link } from "react-router-dom";

import { del, get } from "../../Services/APIUtils";
import Home from "../Home";
import { PostsForm } from "./PostsForm";

export const PostsView = () => {
  const [posts, setposts] = useState(null);
  const [show, setshow] = useState(false);
  const [postItem, setpostItem] = useState(null);

  const handleClose = () => setshow(false);

  useEffect(() => {
    get("posts").then((res) => {
      const postsData = res.data;
      console.log("postsData", postsData);
      setposts(postsData);
    });
  }, []);

  const openModalForEdit = (item) => {
    setshow(true);
    setpostItem(item);
  };

  function deletePost(id) {
    const idValue = id;
    setposts(
      posts.map((x) => {
        if (x.id === id) {
          x.isDeleting = true;
        }
        return x;
      })
    );
    del(`posts/${id}`).then(() => {
      alert("Deleted Post Id: " + idValue);
      setposts((posts) => posts.filter((x) => x.id !== id));
    });
  }
  return (
    <div>
      <Link to="/" component={Home} />
      <h1>Users</h1>
      <Button
        onClick={() => {
          openModalForEdit(null);
        }}
        className="btn btn-sm btn-primary mr-1"
      >
        Add
      </Button>{" "}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Id</th>
            <th>User Id</th>
            <th>Title</th>
            <th>Destription</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {posts &&
            posts.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.userId}</td>
                <td>{item.title}</td>
                <td>{item.body}</td>
                <td>
                  <div className="btn-toolbar">
                    <Button
                      onClick={() => {
                        openModalForEdit(item);
                      }}
                      className="btn btn-sm btn-primary mr-1"
                    >
                      Edit
                    </Button>{" "}
                    <Button
                      onClick={() => deletePost(item.id)}
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
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <PostsForm postItem={postItem} setshow={setshow} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
