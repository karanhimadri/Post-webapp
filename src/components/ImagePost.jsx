import React, { useState } from "react";
import "../App.css";
import dbService from "../AuthService/DB";
import { useSelector } from "react-redux";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { RxCrossCircled } from "react-icons/rx";

const ImagePost = () => {
  const { status, userData } = useSelector((store) => store.authStore);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [message, setMessage] = useState({
    alert: "",
    theme: "",
    icon: null,
  }); // empty string is 'false'

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic
    try {
      const res = await dbService.createPost(title, content, userData);

      if (res) {
        setMessage({
          alert: "  Post created successfully !!",
          theme: "alert-success",
          icon: IoIosCheckmarkCircle,
        });
        setTimeout(() => {
          setMessage({
            alert: "",
            theme: "",
            icon: null,
          });
        }, 10000);
      }
    } catch (error) {
      setMessage({
        alert: " Failed to create Post",
        theme: "alert-danger",
        icon: RxCrossCircled,
      });
      setTimeout(() => {
        setMessage({
          alert: "",
          theme: "",
          icon: null,
        });
      }, 10000);
    }
    setTitle("");
    setContent("");
  };

  // Inside your component
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file)); // Preview the image
    } else {
      setImage(null);
      setImagePreview(null);
    }
  };

  return (
    <>
      {status ? (
        <div className="create-post-container">
          <h1>Create a New Post</h1>
          <form onSubmit={handleSubmit} className="create-post-form">
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter post title"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="content">Content</label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Enter post content"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="image">Upload Image</label>
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={(e) => handleImageChange(e)}
              />
            </div>

            {imagePreview && (
              <div className="image-preview">
                <img src={imagePreview} alt="Image Preview" />
              </div>
            )}

            <button type="submit" className="submit-button">
              Submit
            </button>
          </form>

          {message.alert && (
            <div className={`alert ${message.theme} myclass`} role="alert">
              <p>
                {message.icon && <message.icon />} {message.alert}
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="create-post-hk">
          <h2>You must be logged in to create a post.</h2>
        </div>
      )}
    </>
  );
};

export default ImagePost;
