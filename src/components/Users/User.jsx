import React from "react";
import { NavLink } from "react-router-dom";
import userPhoto from "./../../assets/images/icon-256x256.png";
import s from "./Users.module.css";

let User = ({ user, followingInProgress, unfollow, follow }) => {
  return (
    <div>
      <span>
        <div>
          <NavLink to={"/profile/" + user.id}>
            <img
              src={user.photos.small != null ? user.photos.small : userPhoto}
              className={s.userPhoto}
            />
          </NavLink>
        </div>
        <div>
          {user.followed ? (
            <button
              disabled={followingInProgress.some(
                (id) => id === user.id
              )} /* если хоть одна id равна  id пользователя  метод some */
              onClick={() => {
                unfollow(user.id);
              }}
            >
              Unfollow
            </button>
          ) : (
            <button
              disabled={followingInProgress.some((id) => id === user.id)}
              onClick={() => {
                follow(user.id);
              }}
            >
              Follow
            </button>
          )}
        </div>
      </span>
      <span>
        <span>
          <div>{user.name}</div>
          <div>{user.status}</div>
        </span>
        <span>
          <div>{/* user.location.country */}</div>
          <div>{/* user.location.city */}</div>
        </span>
      </span>
    </div>
  );
};

export default User;
