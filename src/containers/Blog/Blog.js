import React, { Component } from "react";
import axios from "axios";

// import axios from "../../axios";

import { Route, NavLink, Switch, Redirect } from "react-router-dom";

import Posts from "./Posts/Posts";
import asyncComponent from "../../hoc/asyncComponent";

// import NewPost from "./NewPost/NewPost";
// import FullPost from "./FullPost/FullPost";

const AsyncNewPost = asyncComponent(() => {
  return import("./NewPost/NewPost");
});

import "./Blog.css";

class Blog extends Component {
  state = {
    auth: true
  };
  render() {
    return (
      <div className="Blog">
        <header>
          <nav>
            <ul>
              <li>
                <NavLink
                  to="/posts/"
                  exact
                  activeClassName="my-active"
                  activeStyle={{
                    color: "#fa923f",
                    textDecoration: "underline"
                  }}
                >
                  Posts
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={{
                    // pathname:this.props.match.url + '/new-post',
                    pathname: "/new-post",
                    // hash: "#submit",
                    search: "?quick-submit=true"
                  }}
                >
                  New Post
                </NavLink>
              </li>
            </ul>
          </nav>
        </header>

        {/* <Route path="/" exact render={() => <h1>Home</h1>} />
        <Route path="/" render={() => <h1>Home 2</h1>} /> */}
        <Switch>
          {this.state.auth ? (
            <Route path="/new-post" component={AsyncNewPost} />
          ) : null}
          <Route path="/posts/" component={Posts} />
          <Redirect from="/" to="/posts" />
          {/* <Route render={() => <h1>Not found</h1>} /> */}
        </Switch>
        {/* <Posts /> */}
      </div>
    );
  }
}

export default Blog;
