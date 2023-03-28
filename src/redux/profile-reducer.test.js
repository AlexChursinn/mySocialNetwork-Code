import profileReducer from "./profile-reducer";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("length of posts should be incremented", () => {
  //1. test data
  let action = addPostActionCreator("newPostText");

  let state = {
    posts: [
      { id: 1, message: "Hi, how are you?'", likesCount: "5" },
      { id: 2, message: "It's my first post", likesCount: "7" },
    ],
  };
  //2. action
  let newState = profileReducer(state, action);

  //3.expectation
  expect(newState.posts.length).toBe(5);
});
