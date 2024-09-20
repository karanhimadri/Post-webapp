import React, { useEffect, useState } from "react";
import dbService from "../AuthService/DB"; // Import your DBService class
import "../App.css"; // Import the CSS file
import { useSelector, useDispatch } from "react-redux";
import Loading from "./Loading";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { RxCrossCircled } from "react-icons/rx";
import EditPost from "./EditPost";
import { updatePosts } from "../store/PostSlice";

const ManagePost = () => {
  const { status, userData } = useSelector((store) => store.authStore);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editPostId, setEditPostId] = useState(null);
  const { postsData } = useSelector((store) => store.postsStore);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPosts = async () => {
      console.log("OK Manage");
      setLoading(true);
      try {
        const response = await dbService.getPosts(userData);
        dispatch(updatePosts(response.documents)); // Dispatch posts to Redux
      } catch (err) {
        console.error("Error fetching posts:", err);
      } finally {
        setLoading(false); // Always stop loading once the fetch is done
      }
    };

    if (status && postsData.length === 0) {
      fetchPosts(); // Fetch posts only if logged in and postsData is empty
    }
    console.log(postsData);
  }, [status, postsData.length, dispatch]);

  const handleDeletePost = async (postId) => {
    setError("");
    try {
      await dbService.deletePost(postId);
      const updatedPost = postsData.filter((post) => post.$id !== postId);
      dispatch(updatePosts(updatedPost)); // Remove deleted post from state
    } catch (err) {
      console.error("Error deleting post:", err);
      setError("Failed to delete post. Please try again.");
    }
  };

  const handleEditPostButton = (postId) => {
    setEditPostId(postId); // Set the ID of the post being edited
  };

  const handleEditComponent = async (editFormData) => {
    setError("");
    try {
      const updatedPost = await dbService.updatePost(editPostId, editFormData);
      const EditedUpdatedPost = postsData.map((post) =>
        post.$id === editPostId ? updatedPost : post
      );
      dispatch(updatePosts(EditedUpdatedPost));
      setEditPostId(null);
      // Reset editPostId after successful edit
    } catch (err) {
      console.error("Error updating post:", err);
      setError("Failed to update post. Please try again.");
    }
  };

  return (
    <>
      {status ? (
        loading ? (
          <Loading />
        ) : (
          <div className="user-posts">
            <h2 className="user-posts-title">Manage Your Posts</h2>
            {postsData.length === 0 ? (
              <p className="user-posts-empty">No posts found</p>
            ) : (
              <ul className="user-posts-list">
                {postsData.map((post) => (
                  <li key={post.$id} className="user-posts-item">
                    {editPostId === post.$id ? (
                      <EditPost
                        Post={post}
                        setEditPostId={setEditPostId}
                        handleEditComponent={handleEditComponent}
                      />
                    ) : (
                      <>
                        <h3 className="user-posts-item-title">{post.title}</h3>
                        <p className="user-posts-item-content">
                          {post.content}
                        </p>
                        <div style={{ marginTop: "10px" }}>
                          <button
                            style={{ float: "right" }}
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => handleEditPostButton(post.$id)}
                          >
                            <FaEdit />
                            <span> Edit</span>
                          </button>
                          <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => handleDeletePost(post.$id)}
                          >
                            <MdDelete />
                            <span> Delete</span>
                          </button>
                        </div>
                        {error && (
                          <div
                            style={{ marginTop: "10px" }}
                            className="alert alert-danger"
                            role="alert"
                          >
                            <RxCrossCircled /> {error}
                          </div>
                        )}
                      </>
                    )}
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

export default ManagePost;
