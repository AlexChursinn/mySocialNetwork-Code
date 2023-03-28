import React from "react";
import { Field, reduxForm } from "redux-form";
import {
  maxLengthCreator,
  required,
} from "../../../utils/validators/validators";
import { Textarea } from "../../common/Preloader/FormsControls/FormsControls";
import s from "./MyPosts.module.css";
import Post from "./Post/Post";

const maxLength10 = maxLengthCreator(10);

function AddNewPostForm(props) {
  return (
    <form className={s.addPost} onSubmit={props.handleSubmit}>
      <Field
        className={s.textarea}
        component={Textarea}
        name="newPostText"
        placeholder="Enter your message"
        validate={[
          required,
          maxLength10,
        ]} /* Из документации запись если валидцая то какие функции и параметры там нужны */
      />
      <div>
        <button className={s.btn}>Add post</button>
      </div>
    </form>
  );
}

AddNewPostForm = reduxForm({ form: "ProfileAddNewPostForm" })(AddNewPostForm);

const MyPosts = React.memo((props) => {
  let postElements = props.posts.map((p) => (
    <Post
      profile={props.profile}
      key={p.id}
      message={p.message}
      likesCount={p.likesCount}
      id={p.id}
    />
  ));

  let onAddPost = (values) => {
    props.addPost(values.newPostText);
  };

  return (
    <div className={s.postsBlock}>
      <AddNewPostForm onSubmit={onAddPost} />
      <div className={s.posts}>{postElements}</div>
    </div>
  );
});

export default MyPosts;
