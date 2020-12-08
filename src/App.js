import React from "react";
import { Container } from "react-bootstrap";
import Switch from "react-bootstrap/esm/Switch";
import { Redirect, Route } from "react-router-dom";

import Home from "./Components/Home";
import { PostsForm } from "./Components/posts/PostsForm";
import { PostsView } from "./Components/posts/PostsView";
import UsersView from "./Components/user/UsersView";

const App = () => {
  return (
    <div>
      <Container fluid>
        <div className="container pt-4 pb-4">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/users" component={UsersView} />
            <Route path="/posts" component={PostsView} />
            <Route path="/posts/add" component={PostsForm} />
            <Route path={`/posts/edit/:id`} component={PostsForm} />
            <Redirect from="*" to="/" />
          </Switch>
        </div>
      </Container>
    </div>
  );
};

export default App;
