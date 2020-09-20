import React, { Component } from "react";

import Post from "./../../../components/Post/Post";
import axios from "../../../axios";
import { Link } from "react-router-dom";

import classes from "./Posts.module.css";

class Posts extends Component {
  state = {
    posts: [],
    selectedPostId: null,
    error: false
  };
  componentDidMount() {
    console.log(this.props);
    axios
      .get("/posts")
      .then((response) => {
        const posts = response.data.slice(0, 4);
        const updatedPosts = posts.map((post) => {
          return {
            ...post,
            author: "Max"
          };
        });
        this.setState({ posts: updatedPosts });
        // console.log(response);
      })
      .catch((error) => {
        this.setState({ error: true });
        // console.log(error);
      });
  }
  postSelectedHandler(id) {
    this.setState({ selectedPostId: id });
  }
  render() {
    let posts = <p style={{ textAlign: "center" }}>Something went wrong</p>;
    if (!this.state.error) {
      posts = this.state.posts.map((post) => {
        return (
          <Link to={"/posts/" + post.id} key={post.id}>
            <Post
              title={post.title}
              author={post.author}
              clicked={() => this.postSelectedHandler(post.id)}
            />
          </Link>
        );
      });
    }
    return <section className={classes.Posts}>{posts}</section>;
  }
}

export default Posts;
