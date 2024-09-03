import React, { useEffect, useState } from "react";
import dbService from "../AuthService/DB"; // Import your DBService class
import "../App.css"; // Import the CSS file
import { useSelector } from "react-redux";
import Loading from "./Loading";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { RxCrossCircled } from "react-icons/rx";
import EditPost from "./EditPost";

const ManagePost = () => {
  const [posts, setPosts] = useState([]);
  const { status, userData } = useSelector((store) => store.authStore);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editPostId, setEditPostId] = useState(null);

  useEffect(() => {
    setError("");
    if (status) {
      const fetchPosts = async () => {
        setLoading(true);
        try {
          const response = await dbService.getPosts(userData);
          setPosts(response.documents);
        } catch (err) {
          console.error("Error fetching posts:", err);
          setError("Failed to fetch posts. Please try again.");
        } finally {
          setLoading(false);
        }
      };

      fetchPosts();
    }
  }, [status, userData]);

  async function handleDeletePost(postId) {
    setLoading(true);
    setError("");
    try {
      await dbService.deletePost(postId);
      setPosts(posts.filter((post) => post.$id !== postId)); // Remove deleted post from state
      setError("");
    } catch (err) {
      console.error("Error deleting post:", err);
      setError("Failed to delete post. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleEditPostButton(postId) {
    setEditPostId(postId); // Set the ID of the post being edited
  }
  async function handleEditComponent(editFormData) {
    setError("");
    try {
      const updatedpost = await dbService.updatePost(editPostId, editFormData);
      setPosts(
        posts.map((post) => (post.$id === editPostId ? updatedpost : post))
      );
      setError("");
    } catch (error) {
      setError("Failed to update Post.");
    }
  }

  return (
    <>
      {status ? (
        loading ? (
          <Loading />
        ) : (
          <div className="user-posts">
            <h2 className="user-posts-title">Manage Your Posts</h2>
            {posts.length === 0 ? (
              <p className="user-posts-empty">No posts found</p>
            ) : (
              <ul className="user-posts-list">
                {posts.map((post) => (
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
