import React, { useEffect, useState } from "react";
import dbService from "../AuthService/DB"; // Import your DBService class
import "../App.css"; // Import the CSS file
import { useDispatch, useSelector } from "react-redux";
import Loading from "./Loading";
import { startLoading, endLoading } from "../store/LoadingSlice";

const ShowPost = () => {
  const [posts, setPosts] = useState([]);
  const { status, userData } = useSelector((store) => store.authStore);
  const { loadingState } = useSelector((store) => store.loadingStore);
  const dispatch = useDispatch();

  useEffect(() => {
    if (status) {
      const fetchPosts = async () => {
        try {
          dispatch(startLoading());
          const response = await dbService.getPosts(userData);
          setPosts(response.documents); // `documents` contains the list of posts
          dispatch(endLoading());
        } catch (error) {
          console.error("Error fetching posts:", error);
        } finally {
          dispatch(endLoading());
        }
      };

      fetchPosts();
    }
  }, [status, userData]);

  return (
    <>
      {status ? (
        loadingState ? (
          <Loading />
        ) : (
          <div className="user-posts">
            <h2 className="user-posts-title">Your Posts</h2>
            {posts.length === 0 ? (
              <p className="user-posts-empty">No posts found</p>
            ) : (
              <ul className="user-posts-list">
                {posts.map((post) => (
                  <li key={post.$id} className="user-posts-item">
                    <h3 className="user-posts-item-title">{post.title}</h3>
                    <p className="user-posts-item-content">{post.content}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )
      ) : (
        <div className="create-post-hk">
          <h2>You must be logged in to Show your posts.</h2>
        </div>
      )}
    </>
  );
};

export default ShowPost;
