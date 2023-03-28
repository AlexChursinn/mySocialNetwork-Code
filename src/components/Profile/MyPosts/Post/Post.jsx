import React from "react";
import s from "./Post.module.css";
import userPhoto from "./../../../../assets/images/icon-256x256.png";

const Post = (props) => {
  return (
    <div className={s.post}>
      <div className={s.item}>
        <img src={userPhoto} className={s.mainPhoto} />
        <span className={s.message}>{props.message}</span>
      </div>
      <div className={s.like}>
        <span>like</span> {props.likesCount}
      </div>
    </div>
  );
};

export default Post;

/* src={props.profile.photos.small || userPhoto} */
